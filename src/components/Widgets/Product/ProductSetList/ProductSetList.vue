<template>
  <div class="product-page">
    <q-list v-if="!setListLoading"
            class="rounded-borders">
      <q-banner class="info-banner">
        سرفصل های زیر تاکنون مطابق برنامه مطالعاتی منتشر شده است.
        <template v-slot:avatar>
          <q-icon name="ph:info"
                  size="xs" />
        </template>
      </q-banner>
      <div v-if="setSections.length > 0"
           class="set-sections">
        <div v-for="(sectoin, sectoinIndex) in setSections"
             :key="sectoinIndex"
             class="set-section">
          <div class="separator-div">
            <span class="separator-title">
              {{sectoin.title}}
            </span>
            <q-separator />
          </div>
          <expansion-item-component v-for="(set, index) in sectoin.sets"
                                    :key="index"
                                    :hasAction="true"
                                    class="expansion-item"
                                    icon="ph:book-open"
                                    :label="set.short_title.split('-')[2]"
                                    :grey="true"
                                    @show="getSet(set.id)">
            <template v-slot:action>
              <div class="duration-column gt-xs body-2 ">
                {{set.contents_duration === 0 || set.contents_duration === null ? ' ' : humanizeDuration(set.contents_duration) }}
              </div>
            </template>
            <template v-slot:body>
              <q-card class="set-card">
                <q-card-section v-if="!setLoading || set.contents.list.length > 0">
                  <q-list class="set-list"
                          separator>
                    <q-item v-for="(content, index) in set.contents.list"
                            :key="index"
                            :to="content.isPamphlet() ? '' : { name: 'Public.Content.Show', params: {id: content.id} }"
                            clickable
                            @click="setSelectedData($event,content,set)">
                      <q-item-section class="cursor-pointer ellipsis body2"
                                      @click="download(content)">
                        <div class="row items-center">
                          <q-icon v-if="content.isPamphlet()"
                                  size="xs"
                                  name="ph:file-pdf" />
                          <q-icon v-else
                                  size="xs"
                                  name="ph:play-circle" />
                          <div class="q-ml-xs">
                            {{ content.title }}
                          </div>
                        </div>
                      </q-item-section>
                      <q-item-section class="side-section body2"
                                      side>
                        {{ content.duration === null || content.duration == 0 ? 'مدت ندارد' : humanizeDuration(content.duration) }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-card-section>
                <q-card-section v-else>
                  <q-list>
                    <q-item v-for="item in 4"
                            :key="item">
                      <q-skeleton width="100%"
                                  bordered />
                    </q-item>
                  </q-list>
                </q-card-section>
              </q-card>
            </template>
            <!--                        <template v-slot:header>-->
            <!--                          <q-item-section class="title-column flex column no-wrap">-->
            <!--                            <div class="ellipsis"><q-icon name="square"-->
            <!--                                                          class="set-title-icon"-->
            <!--                                                          size="16px" />-->
            <!--                              <span class="set-title">{{ set.short_title.split('-')[2] }}</span>-->
            <!--                            </div>-->
            <!--                            <div class="lt-sm title-duration ellipsis">{{set.contents_duration === 0 || set.contents_duration === null ? ' ' : humanizeDuration(set.contents_duration) }}</div>-->
            <!--                          </q-item-section>-->

            <!--                          &lt;!&ndash; <q-item-section side-->
            <!--                                          class="steps-count-column">-->
            <!--                            {{set.contents_count}} گام-->
            <!--                          </q-item-section> &ndash;&gt;-->
            <!--                          <q-item-section side-->
            <!--                                          class="duration-column gt-xs">-->
            <!--                            {{set.contents_duration === 0 || set.contents_duration === null ? ' ' : humanizeDuration(set.contents_duration) }}-->
            <!--                          </q-item-section>-->
            <!--                        </template>-->
            <!--            <q-separator inset />-->
          </expansion-item-component>
        </div>
      </div>
      <template v-else>
        <expansion-item-component v-for="(set, index) in setList"
                                  :key="index"
                                  header-class="expanded-item-header"
                                  expand-icon-class="expanded-item-icon"
                                  @show="getSet(set.id)">
          <template v-slot:header>
            <q-item-section class="title-column ellipsis">
              {{ set.short_title.split('-')[2] }}
            </q-item-section>

            <!-- <q-item-section side
                            class="steps-count-column">
              {{set.contents_count}} گام
            </q-item-section> -->
            <q-item-section side
                            class="duration-column">
              {{set.contents_duration === 0 || set.contents_duration === null ? ' ' : humanizeDuration(set.contents_duration) }}
            </q-item-section>
          </template>
          <q-separator inset />
          <q-card class="set-card">
            <q-card-section v-if="!setLoading || set.contents.list.length > 0">
              <q-list class="set-list"
                      separator>
                <q-item v-for="(content, index) in set.contents.list"
                        :key="index"
                        :to="content.isPamphlet() ? '' : { name: 'Public.Content.Show', params: {id: content.id} }"
                        clickable
                        @click="setSelectedData($event,content,set)">
                  <q-item-section class="cursor-pointer ellipsis"
                                  @click="download(content)">
                    {{ content.title }}
                    <q-tooltip>
                      {{ content.title }}
                    </q-tooltip>
                  </q-item-section>
                  <q-item-section v-if="!content.isPamphlet()"
                                  avatar>
                    <q-icon :name="content.can_see ? 'play_circle_outline' : 'lock_outline'" />
                  </q-item-section>
                  <q-item-section v-if="content.isPamphlet()"
                                  class="side-section"
                                  side>
                    <q-btn color="primary"
                           label="دانلود"
                           @click="download(content)" />
                  </q-item-section>
                  <q-item-section v-else
                                  class="side-section"
                                  side>
                    {{ content.duration === null || content.duration == 0 ? 'مدت ندارد' : humanizeDuration(content.duration) }}
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
            <q-card-section v-else>
              <q-list>
                <q-item v-for="item in 4"
                        :key="item">
                  <q-skeleton width="100%"
                              bordered />
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </expansion-item-component>
      </template>
    </q-list>
    <q-list v-else>
      <q-item v-for="item in 10"
              :key="item">
        <q-skeleton width="100%"
                    bordered />
      </q-item>
    </q-list>
    <q-dialog v-model="productItemDialog">
      <q-card class="custom-card">
        <q-card-section class="flex justify-between items-center">
          <div class="h1">
            شما محصول را خریداری نکرده اید
          </div>
          <q-btn color="primary"
                 icon="close"
                 flat
                 @click="toggleProductItemDialog" />
        </q-card-section>
        <q-card-section class="row items-center">
          <product-item class="product-item"
                        :options="{
                          product: localOptions.product
                        }" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { openURL } from 'quasar'
import { ContentList } from 'src/models/Content.js'
import { Product } from 'src/models/Product.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ExpansionItemComponent from 'src/components/Utils/ExpansionItem.vue'

export default {
  name: 'ProductSetList',
  components: {
    ExpansionItemComponent,
    ProductItem: defineAsyncComponent(() => import('src/components/Widgets/Product/ProductItem/ProductItem.vue'))
  },
  mixins: [mixinWidget],
  emits: ['updateSetList'],
  data () {
    return {
      setLoading: false,
      defaultOptions: {
        product: new Product(),
        setList: []
      },
      productItemDialog: false,
      LocalSetList: [],
      loading: false
    }
  },
  computed: {
    productId () {
      if (typeof this.localOptions.productId !== 'undefined' && this.localOptions.productId !== null) {
        return this.localOptions.productId
      }
      if (this.localOptions.urlParam && this.$route.params[this.localOptions.urlParam]) {
        return this.$route.params[this.localOptions.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    },
    setList () {
      if (typeof this.localOptions.setList !== 'undefined' && this.localOptions.setList !== null) {
        return Object.assign(this.LocalSetList, this.localOptions.setList)
      }
      return this.LocalSetList
    },
    setSections () {
      const sections = []
      const getSectionTitle = (shortTitle) => {
        if (shortTitle.split('-').length > 0 && shortTitle.split('-')[0] && shortTitle.split('-')[1]) {
          return shortTitle.split('-')[0] + ' - ' + shortTitle.split('-')[1]
        }

        return null
      }
      const sectionTitles = this.setList.filter((item, index, array) => array.findIndex(item2 => getSectionTitle(item.short_title) === getSectionTitle(item2.short_title)) === index).map(item => getSectionTitle(item.short_title))

      sectionTitles.forEach(item => {
        sections.push({
          title: item,
          sets: this.setList.filter(setItem => getSectionTitle(setItem.short_title) === item)
        })
      })

      return sections
    }
  },
  mounted () {
    if (typeof this.localOptions.setList === 'undefined' || this.localOptions.setList === null) {
      this.getProductSets()
    }
  },
  methods: {
    humanizeDuration (durationInSeconds) {
      const durationInMinutes = Math.floor(durationInSeconds / 60)
      const hours = Math.floor(durationInMinutes / 60)
      const minutes = durationInMinutes % 60
      if (hours > 0) {
        return hours + ' ساعت و ' + minutes + ' دقیقه'
      }

      return minutes + ' دقیقه'
    },
    download (content) {
      if (content.can_see === 0) {
        this.toggleProductItemDialog()
      } else if (content.isPamphlet() && content.file !== null && content.file.pamphlet.length > 0) {
        openURL(content.file.pamphlet[0].link)
      }
    },
    toggleProductItemDialog () {
      this.productItemDialog = !this.productItemDialog
    },
    setSelectedData (event, content, set) {
      if (content.isPamphlet()) {
        event.stopPropagation()
      }
    },
    getProductSets () {
      this.loading = true
      this.$apiGateway.product.getSets(this.productId)
        .then((setList) => {
          const normalizedSets = setList.list.map(set => {
            if (set.short_title !== null) {
              const splitted = set.short_title.split('-')
              const productName = splitted[0] ? splitted[0].trim() : 'متفرقه'
              const topicName = splitted[1] ? splitted[1].trim() : 'متفرقه'
              const setName = splitted[2] ? splitted[2].trim() : 'متفرقه'
              set.short_title = productName + '-' + topicName + '-' + setName

              return set
            } else {
              set.short_title = 'عنوان ندارد'
              return set
            }
          })

          this.LocalSetList = normalizedSets
          this.$emit('updateSetList', normalizedSets)
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
    },
    getSet (setId) {
      this.loading = true
      this.$apiGateway.set.getContents(setId)
        .then(contentList => {
          this.LocalSetList.find(set => set.id === setId).contents = new ContentList(contentList)
          this.$emit('updateSetList', this.LocalSetList)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/Theme/spacing";
$page-size-md: map-get($sizes, "md");

.set-sections {
  .set-section {
    .separator-div{
      margin-top: $space-6;
      padding-bottom: $space-2;

      .separator-title {
        background: white;
        padding-right: $space-2;
      }

      .q-separator {
        margin-top: -$space-2;
      }
    }
  .expansion-item {
    margin: $space-5 0;

    @media screen and (width <= $page-size-md){
      margin: $space-4 0;
    }
  }
  }
}

.product-item {
  width: 318px;
  height: 510px;
}

.product-page {
  max-width: 100%;

  &:deep(.q-item) {
    padding: 12px 24px;
    height: 48PX;
    border-radius: 8px;
    background:#F5F7FA;
    color:#424242;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.36px;

    @media only screen and (width <= 600px) {
      height: auto;
      max-height: 92px;
      padding: 16px;
    }

    i {
      color: #616161;
    }
  }

  .expanded-item-header {
    height: 100%;
    border-radius: 8px;
    background:#F5F7FA;
    color:#424242;
    font-size: 18px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.36px;
  }

  .expanded-item-icon {
    color: #78909C;
  }

  &:deep(.q-expansion-item__toggle-icon) {
    @media only screen and (width <= 600px) {
      position: absolute !important;
      top: 0 !important;
    }
  }

  .set-card {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background:#F5F7FA;
  }

  .side-section {
    width: 145px;

    @media only screen and (width <= 600px) {
      max-width: 70px;
    }
  }

  .title-column {
    i {
      color: #d9d9d9;
    }
  }

  .title-duration {
    color: #616161;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    margin-top: 12px;
  }

  .duration-column {
    color:#616161;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .set-title {
    margin-left: 8px;
    color: #424242;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
  }

  .content-title {
    max-width: 80%;

    .content-title-text {
      max-width: 100%;
    }
  }
}
</style>
