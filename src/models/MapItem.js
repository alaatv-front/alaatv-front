import MapItemType from './MapItemType.js'
import MapItemEntity from './MapItemEntity.js'
import { MapItemAction } from './MapItemAction.js'
import { Model, Collection } from 'js-abstract-model'

class MapItem extends Model {
  constructor (data) {
    super(data, [
      { key: 'id' },
      {
        key: 'map_id',
        default: 1
      },
      {
        key: 'min_zoom',
        default: 0
      },
      {
        key: 'max_zoom',
        default: 10
      },
      {
        key: 'action',
        relatedModel: MapItemAction
      },
      {
        key: 'type',
        relatedModel: MapItemType
      },
      {
        key: 'typ_id',
        default: 0
      },
      {
        key: 'tags',
        default: []
      },
      {
        key: 'entity',
        relatedModel: MapItemEntity
      },
      {
        key: 'editMode',
        default: false
      },
      {
        key: 'enable',
        value: function (itemVal, inputData) {
          if (inputData.enable === true || parseInt(inputData.enable) === 1) {
            return true
          } else if (inputData.enable === false || parseInt(inputData.enable) === 0) {
            return false
          }
        }
      },
      {
        key: 'data',
        value: function (itemVal, inputData) {
          if (typeof inputData.data === 'string') {
            return JSON.parse(inputData.data)
          } else if (typeof inputData.data === 'object') {
            return inputData.data
          } else {
            return {
              latlng: {
                lng: 0,
                lat: 0
              },
              headline: {
                text: null,
                fontSize: 14
              },
              icon: {
                options: {
                  iconAnchor: [0, 0],
                  iconUrl: null,
                  iconSize: [70, 70]
                }
              }
            }
          }
        }
      },
      { key: 'fileData' }
    ])

    // this.actionUrl = '/api/v2/mapDetail';
    this.actionUrl = '/mapDetail'
    const that = this
    this.apiResource = {
      sendType: 'form-data',
      fields: [
        { key: 'id' },
        { key: 'map_id' },
        { key: 'min_zoom' },
        { key: 'max_zoom' },
        {
          key: 'enable',
          value: function () {
            if (that.enable) {
              return 1
            } else {
              return 0
            }
          }
        },
        {
          key: 'tags',
          value: function () {
            return that.tags.join().replace(/\s/g, '_')
          }
        },
        {
          key: 'type_id',
          value: function () {
            return that.type.id
          }
        },
        {
          key: 'data',
          value: function () {
            if (that.type.id === 1 && !that.data.icon.options.iconUrl) {
              that.data.icon.options.iconUrl = ''
            }
            return JSON.stringify(that.data)
          }
        },
        {
          key: 'action',
          value: function () {
            that.action.convertToValidValue()
            return JSON.stringify(that.action.loadApiResource())
          }
        },
        {
          key: 'photo_address',
          value: function () {
            if (that.data.icon) {
              return that.data.icon.options.iconUrl
            } else {
              return ''
            }
          }
        },
        {
          key: 'photo',
          value: function () {
            if (!that.fileData) {
              return null
            }
            return that.fileData
          }
        },
        {
          key: 'entity_type',
          value: function () {
            if (!that.entity || that.entity.entity_type === 'nothing') {
              return ''
            }
            return that.entity.entity_type
          }
        },
        {
          key: 'entity_id',
          value: function () {
            if (!that.entity || that.entity.entity_type === 'nothing') {
              return ''
            }
            return that.entity.entity_id
          }
        }
      ]
    }

    this.loadType()
    this.loadAction()
    if (this.data && !this.data.latlng && typeof this.data.latlng === 'string') {
      this.data = JSON.parse(this.data)
    }
  }

  getCleanMarker () {
    return new MapItem({
      id: null,
      min_zoom: 3.1,
      max_zoom: 11,
      type: {
        id: 1,
        name: 'marker'
      },
      data: {
        latlng: [0, 0],
        headline: {
          text: '',
          fontSize: '',
          strokeWidth: '',
          fillColor: '',
          strokeColor: ''
        },
        icon: {}
        // icon: (typeof window !== 'undefined') ? icon({
        //   iconUrl: '',
        //   shadowUrl: '',
        //
        //   iconSize: [70, 70], // size of the icon
        //   shadowSize: [0, 0], // size of the shadow
        //   iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
        //   shadowAnchor: [0, 0], // the same for the shadow
        //   popupAnchor: [0, 0] // point from which the popup should open relative to the iconAnchor
        // }) : {}
      },
      action: {
        id: 0,
        title: 'بدون فعالیت',
        name: 'noAction',
        data: {}
      }
    })
  }

  getCleanPolyline () {
    return new MapItem({
      id: null,
      min_zoom: 0,
      max_zoom: 10,
      type: {
        id: 2,
        name: 'polyline'
      },
      data: {
        latlngs: [],
        line: {
          color: 'red',
          bubblingMouseEvents: true,
          weight: 5,
          dashArray: '10 15',
          dashOffset: '0',
          options: {
            flowing: {
              style: {
                'animation-duration': 5
              },
              dir: 'fixed' // flowing - reverse - fixed
            }
          }
        },
        displayZoom: 6,
        iconSize: [16, 16],
        iconAnchor: [10, 10]
      },
      action: {
        id: 0,
        title: 'بدون فعالیت',
        name: 'noAction',
        data: {}
      }
    })
  }

  loadAction () {
    if (typeof this.action.inputData === 'string' && this.action.name === null) {
      this.action = JSON.parse(this.action.inputData)
    } else {
      return null
    }
  }

  loadType () {
    if (this.type.name) {
      this.type = new MapItemType({ name: this.type.name })
      this.type.convertToValidValue()
      this.type_id = this.type.id
    }
  }

  isInBounds (bounds, margin = 0) {
    // if (this.type.name !== 'marker') {
    //   return true
    // }
    if (typeof bounds._southWest === 'undefined') {
      return false
    }
    return (
      this.data.latlng.lat > bounds._southWest.lat - margin &&
      this.data.latlng.lat < bounds._northEast.lat + margin &&
      this.data.latlng.lng > bounds._southWest.lng - margin &&
      this.data.latlng.lng < bounds._northEast.lng + margin
    )
  }

  canShowMapItem (bounds, currentZoom) {
    this.isInView = this.isInBounds(bounds, 50)
    return (
      this.isInView &&
      this.min_zoom <= currentZoom &&
      this.max_zoom >= currentZoom
      // !this.editMode &&
      // (
      //   this.enable ||
      //   this.editMode
      // )
    )
  }
}

class MapItemList extends Collection {
  constructor (data) {
    super(data)

    // this.actionUrl = '/api/v2/mapDetail';
    this.actionUrl = '/mapDetail'
  }

  model () {
    return MapItem
  }

  getMarkers () {
    return this.list.filter((item) => { return item.type.name === 'marker' || item.type.id === 1 })
  }

  getPolylines () {
    return this.list.filter((item) => { return item.type.name === 'polyline' || item.type.id === 2 })
  }
}

export { MapItem, MapItemList }
