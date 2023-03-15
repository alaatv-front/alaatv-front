import _ from 'underscore'

const events = {
  QUALITY_REQUESTED: 'qualityRequested',
  QUALITY_SELECTED: 'qualitySelected',
  PLAYER_SOURCES_CHANGED: 'playerSourcesChanged'
}

let initializing = false
const fnTest = /xyz/.test(function() { /* xyz */ }) ? /\b_super\b/ : /.*/

// The base Class implementation (does nothing)
const Class = function() {}

// Create a new Class that inherits from this class
Class.extend = function(className, prop) {
  if (prop === undefined) {
    prop = className
    className = 'Class'
  }

  const _super = this.prototype

  // Instantiate a base class (but only create the instance,
  // don't run the init constructor)
  initializing = true
  const prototype = new this()
  initializing = false

  // Copy the properties over onto the new prototype
  for (const name in prop) {
    // Check if we're overwriting an existing function
    prototype[name] = typeof prop[name] === 'function' &&
    typeof _super[name] === 'function' && fnTest.test(prop[name])
      ? (function(name, fn) {
          return function() {
            const tmp = this._super

            // Add a new ._super() method that is the same method
            // but on the super-class
            this._super = _super[name]

            // The method only need to be bound temporarily, so we
            // remove it when we're done executing
            const ret = fn.apply(this, arguments)
            this._super = tmp

            return ret
          }
        })(name, prop[name])
      : prop[name]
  }

  // The dummy class constructor
  function Class() {
    // All construction is actually done in the init method
    if (!initializing && this.init) { this.init.apply(this, arguments) }
  }

  // Populate our constructed prototype object
  Class.prototype = prototype

  // Enforce the constructor to be what we expect
  // eslint-disable-next-line
  const func = new Function(
    'return function ' + className + '(){ }'
  )()
  Class.prototype.constructor = func

  // And make this class extendable
  // eslint-disable-next-line
  // Class.extend = arguments.callee

  return Class
}
const qualitySelectorFactory = function (videojs) {
  const MenuItem = videojs.getComponent('MenuItem')

  /**
   * A MenuItem to represent a video resolution
   *
   * @class QualityOption
   * @extends videojs.MenuItem
   */
  return videojs.extend(MenuItem, {

    /**
     * @inheritdoc
     */
    constructor: function(player, options) {
      const source = options.source

      if (!_.isObject(source)) {
        throw new Error('was not provided a "source" object, but rather: ' + (typeof source))
      }

      options = _.extend({
        selectable: true,
        label: source.label
      }, options)

      MenuItem.call(this, player, options)

      this.source = source
    },

    /**
     * @inheritdoc
     */
    handleClick: function(event) {
      MenuItem.prototype.handleClick.call(this, event)
      this.player().trigger(events.QUALITY_REQUESTED, this.source)
    }

  })
}
const sourceInterceptorFactory = function (videojs) {
  videojs.use('*', function(player) {
    return {
      setSource: function(playerSelectedSource, next) {
        const sources = player.currentSources()

        if (player._qualitySelectorSafeSeek) {
          player._qualitySelectorSafeSeek.onPlayerSourcesChange()
        }

        if (!_.isEqual(sources, player._qualitySelectorPreviousSources)) {
          player.trigger(events.PLAYER_SOURCES_CHANGED, sources)
          player._qualitySelectorPreviousSources = sources
        }

        // There are generally two source options, the one that videojs
        // auto-selects and the one that a "user" of this plugin has
        // supplied via the `selected` property. `selected` can come from
        // either the `<source>` tag or the list of sources passed to
        // videojs using `src()`.

        const userSelectedSource = _.find(sources, function(source) {
          // Must check for boolean values as well as either the string 'true' or
          // 'selected'. When sources are set programmatically, the value will be a
          // boolean, but those coming from a `<source>` tag will be a string.
          return source.selected === true || source.selected === 'true' || source.selected === 'selected'
        })

        const chosenSource = userSelectedSource || playerSelectedSource

        player.trigger(events.QUALITY_SELECTED, chosenSource)

        // Pass along the chosen source
        next(null, chosenSource)
      }
    }
  })
}

const SafeSeek = Class.extend({
  init: function(player, seekToTime) {
    this._player = player
    this._seekToTime = seekToTime
    this._hasFinished = false
    this._keepThisInstanceWhenPlayerSourcesChange = false
    this._seekWhenSafe()
  },

  _seekWhenSafe: function() {
    const HAVE_FUTURE_DATA = 3

    // `readyState` in Video.js is the same as the HTML5 Media element's `readyState`
    // property.
    //
    // `readyState` is an enum of 5 values (0-4), each of which represent a state of
    // readiness to play. The meaning of the values range from HAVE_NOTHING (0), meaning
    // no data is available to HAVE_ENOUGH_DATA (4), meaning all data is loaded and the
    // video can be played all the way through.
    //
    // In order to seek successfully, the `readyState` must be at least HAVE_FUTURE_DATA
    // (3).
    //
    // @see http://docs.videojs.com/player#readyState
    // @see https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/readyState
    // @see https://dev.w3.org/html5/spec-preview/media-elements.html#seek-the-media-controller
    if (this._player.readyState() < HAVE_FUTURE_DATA) {
      this._seekFn = this._seek.bind(this)
      // The `canplay` event means that the `readyState` is at least HAVE_FUTURE_DATA.
      this._player.one('canplay', this._seekFn)
    } else {
      this._seek()
    }
  },

  onPlayerSourcesChange: function() {
    if (this._keepThisInstanceWhenPlayerSourcesChange) {
      // By setting this to `false`, we know that if the player sources change again
      // the change did not originate from a quality selection change, the new sources
      // are likely different from the old sources, and so this pending seek no longer
      // applies.
      this._keepThisInstanceWhenPlayerSourcesChange = false
    } else {
      this.cancel()
    }
  },

  onQualitySelectionChange: function() {
    // `onPlayerSourcesChange` will cancel this pending seek unless we tell it not to.
    // We need to reuse this same pending seek instance because when the player is
    // paused, the `preload` attribute is set to `none`, and the user selects one
    // quality option and then another, the player cannot seek until the player has
    // enough data to do so (and the `canplay` event is fired) and thus on the second
    // selection the player's `currentTime()` is `0` and when the video plays we would
    // seek to `0` instead of the correct time.
    if (!this.hasFinished()) {
      this._keepThisInstanceWhenPlayerSourcesChange = true
    }
  },

  _seek: function() {
    this._player.currentTime(this._seekToTime)
    this._keepThisInstanceWhenPlayerSourcesChange = false
    this._hasFinished = true
  },

  hasFinished: function() {
    return this._hasFinished
  },

  cancel: function() {
    this._player.off('canplay', this._seekFn)
    this._keepThisInstanceWhenPlayerSourcesChange = false
    this._hasFinished = true
  }
})
const videoJsResolutionSwitcher = function(videojs) {
  qualitySelectorFactory(videojs)
  sourceInterceptorFactory(videojs)

  videojs.hook('setup', function(player) {
    function changeQuality(event, newSource) {
      const sources = player.currentSources(),
        currentTime = player.currentTime(),
        currentPlaybackRate = player.playbackRate(),
        isPaused = player.paused()

      // Clear out any previously selected sources (see: #11)
      _.each(sources, function(source) {
        source.selected = false
      })

      const selectedSource = _.findWhere(sources, { src: newSource.src })
      // Note: `_.findWhere` returns a reference to an object. Thus the
      // following updates the original object in `sources`.
      selectedSource.selected = true

      if (player._qualitySelectorSafeSeek) {
        player._qualitySelectorSafeSeek.onQualitySelectionChange()
      }

      player.src(sources)

      player.ready(function() {
        if (!player._qualitySelectorSafeSeek || player._qualitySelectorSafeSeek.hasFinished()) {
          // Either we don't have a pending seek action or the one that we have is no
          // longer applicable. This block must be within a `player.ready` callback
          // because the call to `player.src` above is asynchronous, and so not
          // having it within this `ready` callback would cause the SourceInterceptor
          // to execute after this block instead of before.
          //
          // We save the `currentTime` within the SafeSeek instance because if
          // multiple QUALITY_REQUESTED events are received before the SafeSeek
          // operation finishes, the player's `currentTime` will be `0` if the
          // player's `src` is updated but the player's `currentTime` has not yet
          // been set by the SafeSeek operation.
          player._qualitySelectorSafeSeek = new SafeSeek(player, currentTime)
          player.playbackRate(currentPlaybackRate)
        }

        if (!isPaused) {
          player.play()
        }
      })
    }

    // Add handler to switch sources when the user requests a change
    player.on(events.QUALITY_REQUESTED, changeQuality)
  })
}

export default videoJsResolutionSwitcher

// const videoJsResolutionSwitcher1 = function(videojs) {
//   if (typeof window === 'undefined') {
//     return {}
//   }
//
//   let currentResolution = {} // stores current resolution
//
//   const defaults = {},
//     menuItemsHolder = {} // stores menuItems
//
//   function setSourcesSanitized(player, sources, label, customSourcePicker) {
//     currentResolution = {
//       label,
//       sources
//     }
//     if (typeof customSourcePicker === 'function') {
//       return customSourcePicker(player, sources, label)
//     }
//     return player.src(sources.map(function(src) {
//       return { src: src.src, type: src.type, res: src.res }
//     }))
//   }
//
//   /*
//      * Resolution menu item
//      */
//   const MenuItem = videojs.getComponent('MenuItem')
//   class ResolutionMenuItem extends MenuItem {
//     constructor (player, options, onClickListener, label) {
//       // Sets this.player_, this.options_ and initializes the component
//       // MenuItem.call(this, player, options)
//       super(player, options)
//
//       this.onClickListener = onClickListener
//       this.label = label
//
//       this.src = options.src
//
//       this.on('click', this.onClick)
//       this.on('touchstart', this.onClick)
//
//       if (options.initialySelected) {
//         this.showAsLabel()
//         this.selected(true)
//
//         this.addClass('vjs-selected')
//       }
//     }
//
//     showAsLabel () {
//       // Change menu button label to the label of this item if the menu button label is provided
//       if (this.label) {
//         this.label.innerHTML = this.options_.label
//       }
//     }
//
//     onClick (customSourcePicker) {
//       this.onClickListener(this)
//       // Remember player state
//       const currentTime = this.player_.currentTime()
//       const isPaused = this.player_.paused()
//       this.showAsLabel()
//
//       // add .current class
//       this.addClass('vjs-selected')
//
//       // Hide bigPlayButton
//       if (!isPaused) {
//         this.player_.bigPlayButton.hide()
//       }
//       if (typeof customSourcePicker !== 'function' &&
//         typeof this.options_.customSourcePicker === 'function') {
//         customSourcePicker = this.options_.customSourcePicker
//       }
//       // Change player source and wait for loadeddata event, then play video
//       // loadedmetadata doesn't work right now for flash.
//       // Probably because of https://github.com/videojs/video-js-swf/issues/124
//       // If player preload is 'none' and then loadeddata not fired. So, we need timeupdate event for seek handle (timeupdate doesn't work properly with flash)
//       let handleSeekEvent = 'loadeddata'
//       if (this.player_.techName_ !== 'Youtube' && this.player_.preload() === 'none' && this.player_.techName_ !== 'Flash') {
//         handleSeekEvent = 'timeupdate'
//       }
//       setSourcesSanitized(this.player_, this.src, this.options_.label, customSourcePicker).one(handleSeekEvent, function() {
//         this.player_.currentTime(currentTime)
//         this.player_.handleTechSeeked_()
//         if (!isPaused) {
//           // Start playing and hide loadingSpinner (flash issue ?)
//           this.player_.play().handleTechSeeked_()
//         }
//         this.player_.trigger('resolutionchange')
//       })
//     }
//   }
//
//   /*
//      * Resolution menu button
//      */
//   const MenuButton = videojs.getComponent('MenuButton')
//   class ResolutionMenuButton extends MenuButton {
//     constructor (player, options, settings, label) {
//       super(player, options)
//       this.sources = options.sources
//       this.label = label
//       this.label.innerHTML = options.initialySelectedLabel
//       // Sets this.player_, this.options_ and initializes the component
//       MenuButton.call(this, player, options, settings)
//       this.controlText('Quality')
//
//       if (settings.dynamicLabel) {
//         this.el().appendChild(label)
//       } else {
//         const staticLabel = document.createElement('span')
//         videojs.dom.addClass(staticLabel, 'vjs-resolution-button-staticlabel')
//         this.el().appendChild(staticLabel)
//       }
//     }
//
//     createItems () {
//       const menuItems = []
//       const labels = (this.sources && this.sources.label) || {}
//       const onClickUnselectOthers = function(clickedItem) {
//         menuItems.forEach((item) => {
//           item.selected(item === clickedItem)
//           item.removeClass('vjs-selected')
//         })
//       }
//
//       for (const key in labels) {
//         if (Object.prototype.hasOwnProperty.call(labels, key)) {
//           menuItems.push(new ResolutionMenuItem(
//             this.player_,
//             {
//               label: key,
//               src: labels[key],
//               initialySelected: key === this.options_.initialySelectedLabel,
//               customSourcePicker: this.options_.customSourcePicker
//             },
//             onClickUnselectOthers,
//             this.label))
//           // Store menu item for API calls
//           menuItemsHolder[key] = menuItems[menuItems.length - 1]
//         }
//       }
//       return menuItems
//     }
//   }
//
//   /**
//    * Initialize the plugin.
//    * @param {object} [options] configuration for the plugin
//    */
//   const videoJsResolutionSwitcher = function(options) {
//     const settings = videojs.mergeOptions(defaults, options),
//       player = this,
//       label = document.createElement('span')
//     let groupedSrc = {}
//
//     videojs.dom.addClass(label, 'vjs-resolution-button-label')
//
//     /**
//      * Updates player sources or returns current source URL
//      * @param   {Array}  [src] array of sources [{src: '', type: '', label: '', res: ''}]
//      * @returns {Object|String|Array} videojs player object if used as setter or current source URL, object, or array of sources
//      */
//     player.updateSrc = function(src) {
//       // Return current src if src is not given
//       if (!src) { return player.src() }
//       // Dispose old resolution menu button before adding new sources
//       if (player.controlBar.resolutionSwitcher) {
//         player.controlBar.resolutionSwitcher.dispose()
//         delete player.controlBar.resolutionSwitcher
//       }
//       // Sort sources
//       src = src.sort(compareResolutions)
//       groupedSrc = bucketSources(src)
//       const choosen = chooseSrc(groupedSrc, src)
//       const menuButton = new ResolutionMenuButton(player, { sources: groupedSrc, initialySelectedLabel: choosen.label, initialySelectedRes: choosen.res, customSourcePicker: settings.customSourcePicker }, settings, label)
//       videojs.dom.addClass(menuButton.el(), 'vjs-resolution-button')
//       player.controlBar.resolutionSwitcher = player.controlBar.el_.insertBefore(menuButton.el_, player.controlBar.getChild('fullscreenToggle').el_)
//       player.controlBar.resolutionSwitcher.dispose = function() {
//         this.parentNode.removeChild(this)
//       }
//       return setSourcesSanitized(player, choosen.sources, choosen.label)
//     }
//
//     /**
//      * Returns current resolution or sets one when label is specified
//      * @param {String}   [label]         label name
//      * @param {Function} [customSourcePicker] custom function to choose source. Takes 3 arguments: player, sources, label. Must return player object.
//      * @returns {Object}   current resolution object {label: '', sources: []} if used as getter or player object if used as setter
//      */
//     player.currentResolution = function(label, customSourcePicker) {
//       if (label == null) { return currentResolution }
//       if (menuItemsHolder[label] != null) {
//         menuItemsHolder[label].onClick(customSourcePicker)
//       }
//       return player
//     }
//
//     /**
//      * Returns grouped sources by label, resolution and type
//      * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
//      */
//     player.getGroupedSrc = function() {
//       return groupedSrc
//     }
//
//     /**
//      * Method used for sorting list of sources
//      * @param   {Object} a - source object with res property
//      * @param   {Object} b - source object with res property
//      * @returns {Number} result of comparation
//      */
//     function compareResolutions(a, b) {
//       if (!a.res || !b.res) { return 0 }
//       return (+b.res) - (+a.res)
//     }
//
//     /**
//      * Group sources by label, resolution and type
//      * @param   {Array}  src Array of sources
//      * @returns {Object} grouped sources: { label: { key: [] }, res: { key: [] }, type: { key: [] } }
//      */
//     function bucketSources(src) {
//       const resolutions = {
//         label: {},
//         res: {},
//         type: {}
//       }
//       src.forEach((source) => {
//         initResolutionKey(resolutions, 'label', source)
//         initResolutionKey(resolutions, 'res', source)
//         initResolutionKey(resolutions, 'type', source)
//
//         appendSourceToKey(resolutions, 'label', source)
//         appendSourceToKey(resolutions, 'res', source)
//         appendSourceToKey(resolutions, 'type', source)
//       })
//       return resolutions
//     }
//
//     function initResolutionKey(resolutions, key, source) {
//       if (resolutions[key][source[key]] == null) {
//         resolutions[key][source[key]] = []
//       }
//     }
//
//     function appendSourceToKey(resolutions, key, source) {
//       resolutions[key][source[key]].push(source)
//     }
//
//     /**
//      * Choose src if option.default is specified
//      * @param   {Object} groupedSrc {res: { key: [] }}
//      * @param   {Array}  src Array of sources sorted by resolution used to find high and low res
//      * @returns {Object} {res: string, sources: []}
//      */
//     function chooseSrc(groupedSrc, src) {
//       let selectedRes = settings.default // use array access as default is a reserved keyword
//       let selectedLabel = ''
//       if (selectedRes === 'high') {
//         selectedRes = src[0].res
//         selectedLabel = src[0].label
//       } else if (selectedRes === 'low' || selectedRes == null || !groupedSrc.res[selectedRes]) {
//         // Select low-res if default is low or not set
//         selectedRes = src[src.length - 1].res
//         selectedLabel = src[src.length - 1].label
//       } else if (groupedSrc.res[selectedRes]) {
//         selectedLabel = groupedSrc.res[selectedRes][0].label
//       }
//
//       return { res: selectedRes, label: selectedLabel, sources: groupedSrc.res[selectedRes] }
//     }
//
//     function initResolutionForYt(player) {
//       // Init resolution
//       player.tech_.ytPlayer.setPlaybackQuality('default')
//
//       // Capture events
//       player.tech_.ytPlayer.addEventListener('onPlaybackQualityChange', function() {
//         player.trigger('resolutionchange')
//       })
//
//       // We must wait for play event
//       player.one('play', function() {
//         const qualities = player.tech_.ytPlayer.getAvailableQualityLevels()
//         // Map youtube qualities names
//         const _yts = {
//           highres: { res: 1080, label: '1080', yt: 'highres' },
//           hd1080: { res: 1080, label: '1080', yt: 'hd1080' },
//           hd720: { res: 720, label: '720', yt: 'hd720' },
//           large: { res: 480, label: '480', yt: 'large' },
//           medium: { res: 360, label: '360', yt: 'medium' },
//           small: { res: 240, label: '240', yt: 'small' },
//           tiny: { res: 144, label: '144', yt: 'tiny' },
//           auto: { res: 0, label: 'auto', yt: 'default' }
//         }
//
//         const _sources = []
//
//         qualities.forEach((q) => {
//           _sources.push({
//             src: player.src().src,
//             type: player.src().type,
//             label: _yts[q].label,
//             res: _yts[q].res,
//             _yt: _yts[q].yt
//           })
//         })
//
//         groupedSrc = bucketSources(_sources)
//
//         // Overwrite defualt sourcePicer function
//         const _customSourcePicker = function(_player, _sources, _label) {
//           player.tech_.ytPlayer.setPlaybackQuality(_sources[0]._yt)
//           return player
//         }
//
//         const choosen = { label: 'auto', res: 0, sources: groupedSrc.label.auto }
//         const menuButton = new ResolutionMenuButton(player, {
//           sources: groupedSrc,
//           initialySelectedLabel: choosen.label,
//           initialySelectedRes: choosen.res,
//           customSourcePicker: _customSourcePicker
//         }, settings, label)
//
//         menuButton.el().classList.add('vjs-resolution-button')
//         player.controlBar.resolutionSwitcher = player.controlBar.addChild(menuButton)
//       })
//     }
//
//     player.ready(function() {
//       if (player.options_.sources.length > 1) {
//         // tech: Html5 and Flash
//         // Create resolution switcher for videos form <source> tag inside <video>
//         player.updateSrc(player.options_.sources)
//       }
//
//       if (player.techName_ === 'Youtube') {
//         // tech: YouTube
//         initResolutionForYt(player)
//       }
//     })
//   }
//
//   // register the plugin on client side
//   videojs.registerPlugin('videoJsResolutionSwitcher', videoJsResolutionSwitcher)
// }
