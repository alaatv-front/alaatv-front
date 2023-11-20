<template>
  <div class="search-options"
       dir="ltr">
    <q-checkbox v-model="showRichSnippet"
                label="Rich Snippet" />
    <q-checkbox v-model="showDate"
                label="Date" />
    <q-checkbox v-if="viewMode === 'desktop'"
                v-model="showCached"
                label="Cached" />
  </div>
  <div class="options-rules"
       dir="ltr">
    <div class="title q-mr-xs">
      Title(<span v-if="viewMode === 'desktop'">{{ this.titleWidth }}</span><span v-else>{{ this.titleWidthMobile }}</span>px / 573px)
    </div>
    <div class="url q-mr-xs">
      URL(<span v-if="viewMode === 'desktop'">{{ this.urlWidth }}</span><span v-else>{{ this.urlWidthMobile }}</span> / 536px)
    </div>
    <div class="meta q-mr-xs">
      META(<span v-if="viewMode === 'desktop'">{{ this.metaWidth }}</span><span v-else>{{ this.metaWidthMobile }}</span> / 930px)
    </div>
  </div>
  <div class="row"
       dir="ltr">
    <div class="col-2" />
    <div class="col-8 container">
      <div class="search-area row">
        <div class="col-2 google-logo">
          <q-img src="/img/google-logo.png"
                 width="92px"
                 height="30px" />
        </div>
        <div class="col-10">
          <q-input v-model="text"
                   class="search-box"
                   dense
                   rounded
                   outlined>
            <template v-slot:append>
              <q-icon v-if="text === ''"
                      name="search" />
              <q-icon v-else
                      name="clear"
                      class="cursor-pointer"
                      @click="text = ''" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="search-categories row">
        <div class="col-2" />
        <div class="col-10 d-flex"
             style="justify-content: space-between">
          <div class="categories">
            <div v-for="item in categories"
                 :key="item"
                 class="categories-btn"
                 :class="item.class">
              <q-icon :name="item.icon"
                      style="margin: 0 2px 6px"
                      size="14px" />
              {{ item.title }}
              <div v-if="item.active === true"
                   style="border-bottom: 3px solid #1A73E8; position: relative; bottom: -4px;" />
            </div>
          </div>
          <div class="d-flex">
            <q-btn-toggle v-model="viewMode"
                          spread
                          flat
                          no-caps
                          toggle-color="primary"
                          color="white"
                          text-color="black"
                          :options="[
                            {value: 'desktop', slot: 'one'},
                            {value: 'mobile', slot: 'two'}]">
              <template v-slot:one>
                <div class="d-flex">
                  <q-icon name="mdi-desktop-mac"
                          style="margin-right: 4px;" />
                  Desktop
                </div>
              </template>

              <template v-slot:two>
                <div class="d-flex">
                  <q-icon name="mdi-cellphone"
                          style="margin-right: 4px" />
                  Mobile
                </div>
              </template>
            </q-btn-toggle>
          </div>
        </div>
      </div>
      <q-separator style="width: 100%" />
      <div v-if="viewMode === 'desktop'"
           class="desktop-content">
        <div class="search-title">
          <span ref="desktopTitle"
                class="title d-inline-flex">
            {{ this.title }}
          </span>
        </div>
        <div class="search-url">
          <span ref="desktopUrl"
                class="d-inline-flex">
            {{ this.url }}
            <q-icon v-if="showCached"
                    name="mdi-menu-down"
                    style="cursor: pointer" />
          </span>
        </div>
        <div v-if="showRichSnippet"
             class="rating d-flex">
          <q-rating v-model="rate"
                    color="orange"
                    icon-half="star_half"
                    readonly
                    style="margin-right: 5px" />
          Rating: {{ this.rate }} - 798 votes
        </div>
        <div class="d-flex date-and-description">
          <span ref="desktopMeta">
            <span v-if="showDate"
                  class="date">
              24 Dec, 2019 -
            </span>
            <span class="description">
              {{ this.description }}
            </span>
          </span>
        </div>
      </div>
      <div v-if="viewMode === 'mobile'"
           class="mobile-content">
        <q-card class="mobile-card">
          <q-card-section>
            <div class="search-url">
              <q-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
                     width="16px"
                     height="16px"
                     style="margin-right: 12px" />
              <span ref="mobileUrl"
                    class="d-inline-flex">
                {{ this.url }}
              </span>
            </div>
            <div class="search-title">
              <span ref="mobileTitle"
                    class="title d-inline-flex">
                {{ this.title }}
              </span>
            </div>
            <div class="description d-flex">
              <span class="d-inline-flex">
                <template v-if="showDate">
                  24 Dec, 2019 -
                </template>
                {{ this.description }}
              </span>
            </div>
            <!--            -------------------hidden the text for getting the width of the content----------------------               -->
            <span ref="mobileMeta"
                  class="hidden-text d-inline-flex">
              <template v-if="showDate">
                24 Dec, 2019 -
              </template>
              {{ this.description }}
            </span>
            <!--            ------------------------------------- END ----------------------------------------------------               -->
            <p v-if="showRichSnippet"
               style="margin-bottom: 1px; margin-top: 3px; margin-left: 2px">Rating</p>
            <div v-if="showRichSnippet"
                 class="rating d-flex">
              {{ this.rate }}/5.0
              <q-rating v-model="rate"
                        color="orange"
                        icon-half="star_half"
                        readonly
                        style="margin-right: 5px" />
              (798)
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <div class="col-2" />
  </div>
</template>

<script>
export default {
  name: 'GoogleSearch',
  props: {
    title: {
      type: String,
      default: 'جلسه معرفی'
    },
    url: {
      type: String,
      default: 'https://office.alaatv.com:700 › c/29524'
    },
    description: {
      type: String,
      default: 'توضیحات کلی راجع به مصاحبه با ستارگان عدالت اموزشی'
    }
  },
  data () {
    return {
      text: '',
      titleWidth: 0,
      urlWidth: 0,
      metaWidth: 0,
      titleWidthMobile: 0,
      urlWidthMobile: 0,
      metaWidthMobile: 0,
      showRichSnippet: true,
      showDate: true,
      showCached: true,
      viewMode: 'desktop',
      rate: 4.5,
      categories: [
        {
          icon: 'search',
          title: 'All',
          class: 'active',
          active: true
        },
        {
          icon: 'image',
          title: 'Images'
        },
        {
          icon: 'isax:video-square',
          title: 'Videos'
        },
        {
          icon: 'mdi-newspaper',
          title: 'News'
        },
        {
          icon: 'mdi-dots-vertical',
          title: 'More'
        }
      ]
    }
  },
  watch: {
    showCached (newVal) {
      setTimeout(() => {
        this.widthOfRef('urlWidth', 'desktopUrl')
      }, 10)
    },
    showDate (newVal) {
      setTimeout(() => {
        if (this.viewMode === 'desktop') {
          this.widthOfRef('metaWidth', 'desktopMeta')
        } else {
          this.widthOfRef('metaWidthMobile', 'mobileMeta')
        }
      }, 10)
    },
    viewMode (newVal) {
      setTimeout(() => {
        if (this.viewMode === 'desktop') {
          this.widthOfRef('titleWidth', 'desktopTitle')
          this.widthOfRef('urlWidth', 'desktopUrl')
          this.widthOfRef('metaWidth', 'desktopMeta')
        } else {
          this.widthOfRef('titleWidthMobile', 'mobileTitle')
          this.widthOfRef('urlWidthMobile', 'mobileUrl')
          this.widthOfRef('metaWidthMobile', 'mobileMeta')
        }
      }, 10)
    }
  },
  mounted () {
    this.widthOfRef('titleWidth', 'desktopTitle')
    this.widthOfRef('urlWidth', 'desktopUrl')
    this.widthOfRef('metaWidth', 'desktopMeta')
  },
  methods: {
    widthOfRef (key, refName) {
      this[key] = this.$refs[refName].clientWidth
    }
  }
}
</script>

<style scoped>
.d-flex {
  display: flex;
}

.d-inline-flex {
  display: inline-flex;
}

.search-title {
  margin-bottom: 5px;
}

.hidden-text {
  visibility: hidden;
  white-space: nowrap;
  position: absolute;
  line-height: 0;
}

.search-title .title{
  cursor: pointer;
  color: #1a0dab;
  font-size: 20px;
  font-family: arial, sans-serif !important;
  font-weight: 400;
  text-decoration: none;

}

.search-url {
  display: flex;
  margin-bottom: 5px;
  line-height: 16px;
  color: #006621;
  font-size: 16px;
  font-family: Roboto, Helvetica, Arial, sans-serif !important;
  font-weight: 400;
}

</style>

<style lang="scss" scoped>
.search-options {
  display: flex;
  justify-content: center;
}

.options-rules {
  display: flex;
  justify-content: center;
}

.container {
  background: #FFF;
  margin-top: 10px;
  padding: 24px 16px;
  border: 1px solid transparent;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

  .search-area {
    .google-logo {
      display: grid;
      place-items: center center;
    }

    .search-box {
      &:deep(.q-field__control::before) {
        border: 1px solid transparent;
        box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);
      }
    }
  }

  .search-categories {
    margin-top: 16px;

    .categories {
      display: flex;
      justify-content: center;
      align-items: center;

      .active {
        color: #1A73E8 !important;
        padding-top: 7px;
      }

      .categories-btn {
        color: #5f6368;
        margin: 0 8px;

        &:deep(.q-btn__content) {
          font-size: 14px;
          font-family: "Google Sans", arial, sans-serif;
        }
      }
    }
  }

  .desktop-content {
    margin-top: 30px;
    padding-left: 0;
    padding-right: 17.5%;

    .rating {
      font-family: Roboto, Helvetica, Arial, sans-serif !important;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
      color: grey;

      &:deep(.q-rating__icon-container) {
        margin: 0;
      }
    }

    .date-and-description {
      color: #545454;
      font-family: Roboto, Helvetica, Arial, sans-serif !important;
      font-size: 14px;
      font-weight: 400;
      line-height: 20px;
    }
  }

  .mobile-content {
    display: flex;
    justify-content: center;
    margin-top: 24px;

    .mobile-card {
      width: 100%;
      max-width: 360px;
      color: #3C4043;

      .search-title {
        .title {
          color: #1967D2;
          font-size: 16px;
        }

        margin-top: 10px;
        margin-bottom: 12px;
      }

      .search-url {
        color: #3C4043;
        font-size: 12px;
      }

      .rating {
        font-family: Roboto, Helvetica, Arial, sans-serif !important;
        font-size: 14px;
        font-weight: 400;
        line-height: 20px;
        color: grey;

        &:deep(.q-rating__icon-container) {
          margin: 0;
        }
      }
    }
  }

}
</style>
