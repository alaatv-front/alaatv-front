<template>
  <div class="video-list bg-white q-mr-md shadow-4">
    <div class="q-px-md row">
      <h6 class="main-title col-2 q-pt-lg">
        فیلم ها
      </h6>
      <div class="set-title col q-ml-lg q-mt-lg">
        {{set.title}}
      </div>
    </div>
    <q-separator class="q-my-md"/>
    <q-scroll-area class="scroll" :thumb-style="thumbStyle">
      <div :class="{current: isCurrent(contents)}" class="other-contents row q-pt-md"
           v-for="(contents,index) in set.contents.list" :key="index" ref="items">
        <div class="col-2">
          <router-link :to="{name: 'User.Content.Show', params: {id: contents.id}}"><img width="80" height="45"
                                                                                         :src=contents.inputData.photo>
          </router-link>
        </div>
        <router-link class="col q-ml-lg" :to="{name:'User.Content.Show', params: {id: contents.id}}">
          <h6 class="video-title">
            {{contents.title}}
          </h6>
        </router-link>
      </div>
    </q-scroll-area>
  </div>
</template>

<script>
  import API_ADDRESS from "src/api/Addresses";
  import {Content} from "src/models/Content";
  import {Set} from "src/models/Set";
  import {mixinWidget} from "src/mixin/Mixins";
  import {scroll} from 'quasar'

  const {getScrollTarget, setVerticalScrollPosition} = scroll

  export default {
    name: 'ContentVideoList',
    mixins: [mixinWidget],
    props: {
      data: {
        type: [Content, Number, String],
        default() {
          return new Content()
        }
      },
    },
    watch: {
      data() {
        this.loadContent()
      },
      'data.id': function () {
        this.loadContent()
      },
    },
    data() {
      return {
        content: new Content(),
        set: new Set(),
        thumbStyle: {
          left: '2px',
          borderRadius: '10px',
          backgroundColor: '#ff9000',
          width: '8px',
          opacity: '0.75'
        },
        sections: [
          {
            data: {
              rows: [
                {
                  cols: [
                    {
                      widgets: []
                    }
                  ],
                  options: {
                    boxed: false
                  }
                }
              ]
            }
          }
        ]
      }
    },
    created() {
      this.loadContent()
    },
    methods: {
      loadContent() {
        if (typeof this.data === 'object') {
          this.content = this.data
        } else if (typeof this.data === 'number' || typeof this.data === 'string') {
          this.content.id = this.data
          this.getContent()
        }
      },
      getContent() {
        this.content.loading = true
        const url = API_ADDRESS.content.show(this.content.id)
        let promise = null
        if (typeof this.options.getData === 'function') {
          promise = this.options.getData(url)
        } else {
          promise = this.$axios.get(url)
        }

        promise
          .then(response => {
            this.content = new Content(response.data.data)
            this.content.loading = false
            this.getSet()
          })
          .catch(() => {
            this.content.loading = false
          })
      },
      getSet() {
        this.set.loading = true
        this.options.getData(API_ADDRESS.set.show(this.content.set.id))
          .then(response => {
            this.set = new Set(response.data.data)
            console.log(this.set.contents)
            this.scrollToElement(this.set.contents.list)
          })
          .catch(() => {
            this.set.loading = false
          })
      },
      isCurrent(content) {
        return this.$route.params.id == content.id
      },
      scrollToElement() {
        let index = this.set.contents.list.findIndex(content => content.id === this.content.id)
        this.$nextTick(() => {
          let el = this.$refs.items[index]
          const target = getScrollTarget(el)
          const offset = el.offsetTop
          const duration = 1000
          setVerticalScrollPosition(target, offset, duration)
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  h6 {
    margin: 0 !important;
    font-size: 20px;
  }

  .scroll {
    height: 75%;
    width: auto
  }

  .video-list {
    height: 100%;
  }

  .video-title {

    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .video-title, .main-title {
    font-size: 18px;
    color: #575962;
  }

  .set-title {
    color: #afb2c1
  }

  .current {
    background: #ffd196;
  }
</style>
