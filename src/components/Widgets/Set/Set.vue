<template>
  <div class="set">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label header>{{ set.title }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-item-label
            caption
            class="nav-detail"
          >
            <div class="nav-group-box">
              <q-btn
                class="reorder-btn"
                rounded
                icon="isax:sort"
                @click="reorderContents"
              >
                <q-tooltip
                  anchor="top middle"
                  self="bottom middle"
                  :offset="[10, 10]"
                >
                  تغییر ترتیب نمایش ویدیو ها
                </q-tooltip>
              </q-btn>
              <bookmark
                v-model:value="set.is_favored"
                :base-route="getSetBookmarkBaseRoute(set.id)"
              />
            </div>
            <span>فیلم ها : {{ rawContentVideos.length }}</span>
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
        <q-tab-panel
          name="videos"
          class="videosPanel"
        >
          <q-virtual-scroll
            v-if="set.contents.list"
            style="max-height: 680px"
            :items="rawContentVideos"
            separator
            v-slot="{ item, index }"
          >
            <q-item class="videosPanelItems">
              <q-item-section
                top
                class="col-12 col-md-2 items-md-center content-poster"
              >
                <q-btn @click="goToChosenContent(item.id)">
                  <q-tooltip
                    anchor="top middle"
                    self="bottom middle"
                    :offset="[10, 10]"
                  >
                    دانلود یا تماشای فیلم
                  </q-tooltip>
                  <img
                    class="content-img"
                    :src="getContentImage(item.photo)"
                  />
                </q-btn>
              </q-item-section>

              <q-item-section top>
                <q-item-label>
                  <span class="text-weight-medium">
                    <q-item-label class="q-mt-sm">
                      {{ getContentTitle(item.title, item.index) }}
                    </q-item-label>
                  </span>
                  <div>
                    <q-chip class="content-chip text-grey-8">{{
                      item.is_free && item.is_free.toString() === '1'
                        ? 'پولی'
                        : 'رایگان'
                    }}</q-chip>
                  </div>
                </q-item-label>
                <q-item-label caption>
                  آخرین به روز رسانی :
                  {{ getShamsiDate(item.updated_at.split(' ')[0], false) }}
                  | آلا
                </q-item-label>
                <q-item-label class="q-mt-xs">
                  <span> {{ ' ' + item.title }} </span>
                  <span> {{ ' ' + set.title }} </span>
                  <span> فیلم جلسه {{ item.index }} - </span>
                  <span> {{ item.title }} </span>
                </q-item-label>
              </q-item-section>

              <q-item-section
                top
                side
              >
                <div class="text-grey-8 q-gutter-xs">
                  <bookmark
                    v-model:value="item.is_favored"
                    :base-route="getContentBookmarkBaseRoute(item.id)"
                  />
                  <q-btn
                    class="watch-btn"
                    rounded
                    icon="isax:eye"
                    icon-right="isax:play"
                    label="/"
                    @click="goToChosenContent(item.id)"
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
          </q-virtual-scroll>
        </q-tab-panel>
        <q-tab-panel name="pamphlets">
          <q-virtual-scroll
            v-if="set.contents.list"
            style="max-height: 680px"
            :items="contentPamphlets"
            separator
            v-slot="{ item, index }"
          >
            <q-item>
              <q-item-section
                top
                class="col-auto"
              >
                <svg
                  width="50"
                  height="50"
                  viewBox="-79 0 512 512"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m353.101562 485.515625h-353.101562v-485.515625h273.65625l79.445312 79.449219zm0 0"
                    fill="#e3e4d8"
                  ></path>
                  <path
                    d="m273.65625 0v79.449219h79.445312zm0 0"
                    fill="#d0cebd"
                  ></path>
                  <path
                    d="m0 353.101562h353.101562v158.898438h-353.101562zm0 0"
                    fill="#b53438"
                  ></path>
                  <g fill="#fff">
                    <path
                      d="m52.964844 485.515625c-4.871094 0-8.828125-3.953125-8.828125-8.824219v-88.277344c0-4.875 3.957031-8.828124 8.828125-8.828124 4.875 0 8.828125 3.953124 8.828125 8.828124v88.277344c0 4.871094-3.953125 8.824219-8.828125 8.824219zm0 0"
                    ></path>
                    <path
                      d="m300.136719 397.242188h-52.964844c-4.871094 0-8.828125-3.957032-8.828125-8.828126 0-4.875 3.957031-8.828124 8.828125-8.828124h52.964844c4.875 0 8.828125 3.953124 8.828125 8.828124 0 4.871094-3.953125 8.828126-8.828125 8.828126zm0 0"
                    ></path>
                    <path
                      d="m300.136719 441.378906h-52.964844c-4.871094 0-8.828125-3.953125-8.828125-8.828125 0-4.871093 3.957031-8.828125 8.828125-8.828125h52.964844c4.875 0 8.828125 3.957032 8.828125 8.828125 0 4.875-3.953125 8.828125-8.828125 8.828125zm0 0"
                    ></path>
                    <path
                      d="m247.171875 485.515625c-4.871094 0-8.828125-3.953125-8.828125-8.824219v-88.277344c0-4.875 3.957031-8.828124 8.828125-8.828124 4.875 0 8.828125 3.953124 8.828125 8.828124v88.277344c0 4.871094-3.953125 8.824219-8.828125 8.824219zm0 0"
                    ></path>
                  </g>
                  <path
                    d="m170.203125 95.136719c-.863281.28125-11.695313 15.261719.847656 27.9375 8.351563-18.371094-.464843-28.054688-.847656-27.9375m5.34375 73.523437c-6.296875 21.496094-14.601563 44.703125-23.527344 65.710938 18.378907-7.042969 38.375-13.195313 57.140625-17.546875-11.871094-13.621094-23.738281-30.632813-33.613281-48.164063m65.710937 57.175782c7.167969 5.445312 8.914063 8.199218 13.613282 8.199218 2.054687 0 7.925781-.085937 10.636718-3.828125 1.316407-1.820312 1.828126-2.984375 2.019532-3.59375-1.074219-.574219-2.515625-1.710937-10.335938-1.710937-4.449218 0-10.027344.191406-15.933594.933594m-119.957031 38.601562c-18.804687 10.425781-26.464843 19-27.011719 23.835938-.089843.804687-.328124 2.90625 3.785157 6.011718 1.316406-.414062 8.96875-3.859375 23.226562-29.847656m-23.421875 44.527344c-3.0625 0-6-.980469-8.507812-2.832032-9.15625-6.796874-10.390625-14.347656-9.808594-19.492187 1.597656-14.132813 19.304688-28.945313 52.648438-44.03125 13.230468-28.636719 25.820312-63.921875 33.324218-93.398437-8.773437-18.871094-17.3125-43.351563-11.097656-57.714844 2.179688-5.03125 4.910156-8.894532 9.976562-10.566406 2.011719-.652344 7.078126-1.480469 8.941407-1.480469 4.617187 0 9.050781 5.507812 11.183593 9.089843 3.972657 6.648438 3.992188 14.390626 3.363282 21.859376-.609375 7.253906-1.84375 14.46875-3.265625 21.601562-1.039063 5.242188-2.214844 10.460938-3.46875 15.660156 11.855469 24.175782 28.644531 48.816406 44.746093 65.683594 11.539063-2.054688 21.460938-3.097656 29.546876-3.097656 13.761718 0 22.121093 3.167968 25.519531 9.691406 2.828125 5.402344 1.660156 11.726562-3.433594 18.769531-4.898437 6.769531-11.640625 10.34375-19.523437 10.34375-10.710938 0-23.15625-6.671875-37.050782-19.851562-24.957031 5.15625-54.097656 14.34375-77.65625 24.515625-7.355468 15.410156-14.398437 27.824218-20.964844 36.933594-8.996093 12.5-16.773437 18.316406-24.472656 18.316406"
                    fill="#b53438"
                  ></path>
                  <path
                    d="m79.449219 450.207031h-26.484375c-4.871094 0-8.828125-3.953125-8.828125-8.828125v-52.964844c0-4.875 3.957031-8.828124 8.828125-8.828124h26.484375c19.472656 0 35.308593 15.835937 35.308593 35.3125 0 19.472656-15.835937 35.308593-35.308593 35.308593zm-17.65625-17.65625h17.65625c9.734375 0 17.652343-7.917969 17.652343-17.652343 0-9.738282-7.917968-17.65625-17.652343-17.65625h-17.65625zm0 0"
                    fill="#fff"
                  ></path>
                  <path
                    d="m158.898438 485.515625h-8.828126c-4.875 0-8.828124-3.953125-8.828124-8.824219v-88.277344c0-4.875 3.953124-8.828124 8.828124-8.828124h8.828126c29.199218 0 52.964843 23.753906 52.964843 52.964843 0 29.210938-23.765625 52.964844-52.964843 52.964844zm0-17.652344h.085937zm0-70.621093v70.621093c19.472656 0 35.308593-15.839843 35.308593-35.3125 0-19.472656-15.835937-35.308593-35.308593-35.308593zm0 0"
                    fill="#fff"
                  ></path>
                </svg>
              </q-item-section>

              <q-item-section top>
                <q-item-label>
                  <span class="text-weight-medium">
                    <q-item-label class="q-mt-sm">
                      {{ item.title }}
                    </q-item-label>
                  </span>
                </q-item-label>
                <q-item-label caption>
                  آخرین به روز رسانی :
                  {{ getShamsiDate(item.updated_at.split(' ')[0], false) }}
                  | آلا
                </q-item-label>
              </q-item-section>

              <q-item-section
                top
                side
              >
                <div class="text-grey-8 q-gutter-xs">
                  <q-btn
                    class="document-btn"
                    rounded
                    icon="isax:document-upload"
                    @click="openInNewTab(item.url.web)"
                  >
                    <q-tooltip
                      anchor="top middle"
                      self="bottom middle"
                      :offset="[10, 10]"
                    >
                      دانلود فایل
                    </q-tooltip>
                  </q-btn>
                </div>
              </q-item-section>
            </q-item>
            <q-separator spaced />
          </q-virtual-scroll>
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
import Bookmark from 'components/Bookmark'

export default {
  name: 'SetShowInfo',
  components: { Bookmark },
  mixins: [mixinWidget],
  props: {
    data: {
      type: [Set, Number, String],
      default() {
        return new Set()
      }
    }
  },
  watch: {
    data() {
      this.loadSet()
    },
    'data.id': function () {
      this.loadSet()
    }
  },
  data() {
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
      ],
      ordered: true
    }
  },
  computed: {
    getContentTitle() {
      return (title, index) => {
        return `فیلم جلسه ${index} - ${title} `
      }
    },
    getContentImage() {
      return (img) => {
        return img || 'https://nodes.alaatv.com/loder.jpg'
      }
    },
    getShamsiDate() {
      return (date, getTime) => {
        const completeMoment = moment(date, 'YYYY/M/D HH:mm:ss').format(
          'jYYYY/jM/jD HH:mm:ss'
        )
        if (getTime) {
          return completeMoment
        }
        return moment(date, 'YYYY/M/D').format('jYYYY/jM/jD')
      }
    }
  },
  created() {
    this.loadSet()
  },
  methods: {
    getContentBookmarkBaseRoute(id) {
      return API_ADDRESS.content.show(id)
    },
    getSetBookmarkBaseRoute(id) {
      return API_ADDRESS.set.show(id)
    },
    goToChosenContent(contentId) {
      console.log('contentId', contentId)
      this.$router.push({ name: 'User.Content.Show', params: { contentId } })
    },
    reorderContents() {
      this.ordered = !this.ordered
      if (!this.ordered) {
        this.rawContentVideos.sort((a, b) => (a.index > b.index ? -1 : 1))
        return
      }
      this.rawContentVideos.sort((a, b) => (a.index > b.index ? 1 : -1))
    },
    openInNewTab(url) {
      window.open(url, '_blank').focus()
    },
    indexContentTypeVideos() {
      this.rawContentVideos.forEach((content, index) => {
        content.index = index
      })
    },
    filterResponse(contents) {
      return new Promise((resolve, reject) => {
        contents.forEach((content) => {
          const type = content.type.toString()
          if (type === '1') {
            this.contentPamphlets.push(content)
          } else if (type === '8') {
            this.rawContentVideos.push(content)
          }
        })
        resolve()
      })
    },
    setGroupsOfContents() {
      const groupsCount = Math.ceil(this.rawContentVideos.length / 5)
      for (let i = 0; i < groupsCount; i++) {
        const start = 5 * i
        const end = 5 * i + 5
        this.allGroupsOfContents.push(this.rawContentVideos.slice(start, end))
      }
    },
    initFirstGroupOfContents() {
      this.contentVideos = this.rawContentVideos.slice(0, 5)
    },
    loadSet() {
      if (typeof this.data === 'object') {
        this.set = this.data
      } else if (
        typeof this.data === 'number' ||
        typeof this.data === 'string'
      ) {
        this.set.id = this.data
        this.getSet()
      }
    },
    getSet() {
      this.set.loading = true
      const url = API_ADDRESS.set.show(this.set.id)
      let promise = null
      if (typeof this.options.getData === 'function') {
        promise = this.options.getData(url)
      } else {
        promise = this.$axios.get(url)
      }

      promise
        .then((response) => {
          this.set = new Set(response.data.data)
          this.filterResponse(this.set.contents.list).then((res) => {
            this.indexContentTypeVideos()
          })
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

<style
  scoped
  lang="scss"
>
.set {
  background: #f6f8fa;
  border-radius: 25px;
  .content-img {
    width: 100%;
  }
  .watch-btn {
    color: #fff;
    background-color: #5867dd;
    border-color: #5867dd;
    border-radius: 10px;
    padding-right: 5px;
    padding-left: 5px;
  }
  .document-btn {
    color: #fff;
    background-color: #5867dd;
    border-color: #5867dd;
    padding: 5px;
  }
  .reorder-btn {
    color: #fff;
    background-color: #5867dd;
    border-color: #5867dd;
    padding: 5px;
    margin: 5px;
  }
  .filter-tab {
    font-size: 18px;
    .tab-title {
      margin-left: 5px;
    }
  }
  .videosPanel {
    .videosPanelItems {
      flex-wrap: wrap !important;
      .content-poster {
        align-items: center;
      }
    }
  }
  .nav-detail {
    display: flex;
    flex-direction: column;
    align-items: center;
    .nav-group-box {
    }
  }
}
@media screen and (max-width: 1022px) {
  .set {
    .videosPanel {
      .videosPanelItems {
        .content-poster {
          margin-bottom: 10px;
          align-items: start;
          img {
            width: 250px;
          }
        }
      }
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
