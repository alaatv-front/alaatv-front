<template>
  <div class="set">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label header>{{ set.title }}</q-item-label>
        </q-item-section>

        <q-item-section
          side
        >
          <q-item-label caption>
            <span>فیلم ها : {{ contentVideos.length }}</span>
            |
            <span>جزوه ها : {{ contentPamphlets.length }}</span>
          </q-item-label>
        </q-item-section>
      </q-item>
      <q-tabs
        v-model="tab"
        dense
        align="justify"
        class="bg-primary text-white shadow-2"
        :breakpoint="0"
      >
        <q-tab
          name="videos"
          class="filter-tab"
        >
          <div class="flex items-center">
            <q-icon
              name="isax:play"
              size="25px"
            />
            <span class="tab-title"> فیلم ها</span>
          </div>
        </q-tab>
        <q-tab
          name="pamphlets"
          class="filter-tab"
        >
          <div class="flex items-center">
            <q-icon
              name="isax:book"
              size="25px"
            />
            <span class="tab-title"> جزوه ها</span>
          </div>
        </q-tab>
      </q-tabs>
      <q-tab-panels
        v-model="tab"
        animated
        swipeable
      >
        <q-tab-panel name="videos">
          <q-infinite-scroll
            @load="onContentLoad"
            :offset="250"
          >
            <div
              v-if="set.contents.list"
              v-for="(content , index) in contentVideos"
              :key="index"
            >
              <q-item>
                <q-item-section
                  top
                  class="col-2 gt-sm"
                >
                  <q-btn>
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      دانلود یا تماشای فیلم
                    </q-tooltip>
                    <img
                      class="content-img"
                      :src="getContentImage(content.photo)"
                    >
                  </q-btn>
                </q-item-section>

                <q-item-section top>
                  <q-item-label lines="1">
                    <span class="text-weight-medium">
                      <q-item-label class="q-mt-sm">
                        {{getContentTitle(content.title, index)}}
                      </q-item-label>
                    </span>
                    <div>
                      <q-chip class="content-chip text-grey-8">{{(content.is_free && content.is_free.toString() === '1') ? 'پولی' : 'رایگان'}}</q-chip>
                    </div>
                  </q-item-label>
                  <q-item-label
                    caption
                  >
                    آخرین به روز رسانی :
                    {{getShamsiDate(content.updated_at.split(' ')[0], false)}}
                    | آلا
                  </q-item-label>
                  <q-item-label
                    class="q-mt-xs"
                  >
                    <span> {{ ' ' + content.title}}  </span>
                    <span> {{ ' ' + set.title  }}  </span>
                    <span> فیلم جلسه {{ index }} - </span>
                    <span> {{ content.title }} </span>
                  </q-item-label>
                </q-item-section>

                <q-item-section
                  top
                  side
                >
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn
                      class="watch-btn"
                      rounded
                      icon="isax:eye"
                      icon-right="isax:play"
                      label="/"
                    >
                      <q-tooltip
                        anchor="top middle"
                        self="bottom middle"
                        :offset="[10, 10]"
                      >
                        دانلود یا تماشای فیلم
                      </q-tooltip>
                    </q-btn>
                  </div>
                </q-item-section>
              </q-item>
              <q-separator spaced />
            </div>
            <template v-slot:loading>
              <div class="row justify-center q-my-md">
                <q-spinner-dots color="primary"
                                size="40px" />
              </div>
            </template>
          </q-infinite-scroll>
        </q-tab-panel>
        <q-tab-panel name="pamphlets">
          <div>lsdkfjsdlfikj</div>
        </q-tab-panel>
      </q-tab-panels>
    </q-list>
  </div>
</template>

<script>
import moment from 'moment-jalaali'
import API_ADDRESS from 'src/api/Addresses'
import { mixinWidget } from 'src/mixin/Mixins'
import { Set } from 'src/models/Set'
import { ContentList } from 'src/models/Content'

export default {
  name: 'SetShowInfo',
  mixins: [mixinWidget],
  props: {
    data: {
      type: [Set, Number, String],
      default () {
        return new Set()
      }
    }
  },
  watch: {
    data () {
      this.loadSet()
    },
    'data.id': function () {
      this.loadSet()
    }
  },
  data () {
    return {
      tab: '',
      set: new Set(),
      rawContentVideos: [],
      contentVideos: [],
      allGroupsOfContents: [],
      contentPamphlets: [],
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
  computed: {
    getContentTitle () {
      return (title, index) => {
        return `فیلم جلسه ${index} - ${title} `
      }
    },
    getContentImage () {
      return (img) => {
        return img || 'https://nodes.alaatv.com/loder.jpg'
      }
    },
    getShamsiDate () {
      return (date, getTime) => {
        const completeMoment = moment(date, 'YYYY/M/D HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
        if (getTime) {
          return completeMoment
        }
        return moment(date, 'YYYY/M/D').format('jYYYY/jM/jD')
      }
    }

  },
  created () {
    this.loadSet()
  },
  methods: {
    onContentLoad (index, done) {
      console.log('index', index)
      // done()
      setTimeout(() => {
        console.log('this.allGroupsOfContents[index]', this.allGroupsOfContents[index])
        console.log('this.allGroupsOfContents[index + 1]', this.allGroupsOfContents[index + 1])
        // Object.assign(this.contentVideos, this.allGroupsOfContents[index])
        console.log('this.contentVideos.length', this.contentVideos.length)
        // done()
      }, 2000)
    },
    filterResponse (contents) {
      contents.forEach(content => {
        const type = content.type.toString()
        if (type === '1') {
          this.contentPamphlets.push(content)
        } else if (type === '8') {
          this.rawContentVideos.push(content)
        }
      })
    },
    setGroupsOfContents () {
      const groupsCount = Math.ceil(this.rawContentVideos.length / 5)
      for (let i = 0; i < groupsCount; i++) {
        this.allGroupsOfContents.push(this.rawContentVideos.slice(5 * i, (5 * i) + 5))
      }
      console.log('this.allGroupsOfContents', this.allGroupsOfContents)
    },
    initFirstGroupOfContents () {
      this.contentVideos = this.rawContentVideos.slice(0, 5)
    },
    loadSet () {
      if (typeof this.data === 'object') {
        this.set = this.data
      } else if (typeof this.data === 'number' || typeof this.data === 'string') {
        this.set.id = this.data
        this.getSet()
      }
    },
    getSet () {
      this.set.loading = true
      const url = API_ADDRESS.set.show(this.set.id)
      let promise = null
      if (typeof this.options.getData === 'function') {
        promise = this.options.getData(url)
      } else {
        promise = this.$axios.get(url)
      }

      promise
        .then(response => {
          this.set = new Set(response.data.data)
          this.filterResponse(this.set.contents.list)
          this.setGroupsOfContents()
          this.initFirstGroupOfContents()
          this.tab = 'videos'
          this.set.loading = false
        })
        .catch(() => {
          this.set.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.set {
  background: #F6F8FA;
  border-radius: 25px;
  .content-img {
    width: 100%;
  }
  .watch-btn {
      color: #fff;
      background-color: #5867dd;
      border-color: #5867dd;
      border-radius: 10px;
  }
  .filter-tab{
    font-size: 18px;
    .tab-title {
      margin-left: 5px;
    }
  }
}
</style>
<style lang="scss">
.set {
  .on-left {
    margin-right: 5px !important;
  }
  .on-right {
    margin-left: 5px !important;
  }
  .q-btn .q-btn__content {
    margin: 0px;
  }
  .q-btn:not(.q-btn--rounded) {
    border-radius: 0;
  }
  .content-chip {
    background: var(--alaa-Primary);
    color: #f4f5f6 !important;
    .q-chip__content {
      padding-right: 0px;
    }
  }
}
</style>
