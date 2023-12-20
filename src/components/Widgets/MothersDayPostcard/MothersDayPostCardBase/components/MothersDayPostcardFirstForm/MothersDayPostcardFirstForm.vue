<template>
  <div class="row postal-cart-container">
    <div v-if="showBreadCrumbs"
         class="col-12">
      <q-breadcrumbs class="text-grey-9"
                     active-color="grey-6">
        <template v-slot:separator>
          <q-icon size="xs"
                  name="isax:arrow-right-3"
                  color="grey-6" />
        </template>
        <q-breadcrumbs-el to="/"
                          label="خانه" />
        <q-breadcrumbs-el label="صفحه اول" />
      </q-breadcrumbs>
    </div>
    <div class="col-12 theme-title">
      <h6>انتخاب تم</h6>
    </div>
    <div class="col-12 theme-description body1">از میان تم های زیر، یک تم را برای کارت پستال خود انتخاب کنید.</div>
    <div class="col-12">
      <div class="row theme-banner-container q-col-gutter-lg-x-lg q-col-gutter-md-x-md q-col-gutter-sm-y-md q-col-gutter-xs-y-sm">
        <div v-for="(theme, index) in themes"
             :key="index"
             class="col-md-4 col-xs-12 banner">
          <q-img v-if="theme.isSelected"
                 :src="theme.selectedModeImage" />
          <q-img v-else
                 :src="theme.image"
                 class="cursor-pointer"
                 @click="selectTheme(index)" />
        </div>
      </div>
    </div>
    <div class="col-12 poem-title">
      <h6>انتخاب شعر</h6>
    </div>
    <div class="col-12 poem-description body1">از میان ابیات زیر، یک بیت را برای کارت پستال خود انتخاب کنید.</div>
    <div class="col-12">
      <div class="row poem-cards">
        <div v-for="poem in displayablePoems"
             :key="poem"
             class="col-md-6 col-xs-12 poem-container">
          <q-card class="card-2 outline-card"
                  :class="{'grey-card': selectedPoem !== poem}">
            <q-card-section>
              <div class="poem">
                <q-radio v-model="selectedPoem"
                         color="secondary"
                         :val="poem" />
                <div class="row verses">
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-1 hemistich-1 ellipsis">
                    {{poem.verse1.hemistich1}}
                  </div>
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-1 hemistich-2 ellipsis">
                    {{poem.verse1.hemistich2}}
                  </div>
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-2 hemistich-1 ellipsis">
                    {{poem.verse2.hemistich1}}
                  </div>
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-2 hemistich-2 ellipsis">
                    {{poem.verse2.hemistich2}}
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section />
          </q-card>
        </div>
      </div>
      <div v-if="showMoreBtn"
           class="col-12 more-btns text-center">
        <q-btn v-if="isPoemsCollapsed"
               flat
               class="size-xs action-btn"
               icon-right="ph:caret-down"
               text-color="secondary"
               color="grey-9"
               label="مشاهده بیشتر"
               @click="expandPanel" />
        <q-btn v-else
               flat
               class="size-xs action-btn"
               icon-right="ph:caret-up"
               text-color="secondary"
               color="grey-9"
               label="بستن"
               @click="collapsePanel" />
      </div>
    </div>
    <div class="col-12 message-title">
      <h6>پیام شما</h6>
    </div>
    <div class="col-12 message-description body1">داخل کارت پستال، یک پیام از طرف خودتون برای تبریک روز مادر بنویسید و تقدیمش کنید.</div>
    <div class="col-12 message-input-container">
      <q-input v-model="message"
               type="textarea"
               :maxlength="200"
               :hint="message.length + '/200'"
               placeholder="پیام خودتون رو بنویسید" />
    </div>
    <div class="col-12 action-btns-container">
      <div class="action-btns flex justify-sm-end justify-xs-center">
        <div class="preview-btn">
          <q-btn label="پیش نمایش"
                 outline
                 color="grey"
                 class="size-md btn"
                 icon="ph:eye"
                 @click="showPreview" />
        </div>
        <div class="save-btn">
          <q-btn label="ذخیره و ثبت"
                 class="size-md btn"
                 color="primary"
                 icon="ph:check"
                 @click="takeAction" />
        </div>
      </div>
    </div>
    <auth-and-check-user-info v-if="showAuthCheckDialog"
                              @completed="completeCheckUserInfo" />
  </div>
</template>

<script>

import { APIGateway } from 'src/api/APIGateway'
import { Postcard } from 'src/models/Postcard'
import AuthAndCheckUserInfo from 'src/components/Widgets/MothersDayPostcard/MothersDayPostCardBase/components/MothersDayPostcardFirstForm/AuthAndCheckUserInfo.vue'

export default {
  name: 'MothersDayPostcardFirstForm',
  components: {
    AuthAndCheckUserInfo
  },
  props: {
    postcard: {
      type: Postcard,
      default: new Postcard()
    }
  },
  emits: ['togglePreviewDialog', 'toggleForm'],
  data () {
    return {
      showAuthCheckDialog: false,
      studyEventId: 28,
      localPostcard: new Postcard(),
      message: '',
      themes: [
        {
          image: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/11702373602.png',
          selectedModeImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1selected1702373784.png',
          type: 'theme1',
          isSelected: true
        },
        {
          image: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/21702373813.png',
          selectedModeImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2selected1702373828.png',
          type: 'theme2',
          isSelected: false
        },
        {
          image: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/31702373855.png',
          selectedModeImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3selected1702373863.png',
          type: 'theme3',
          isSelected: false
        }
      ],
      patternBackgrounds: {
        theme1: {
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back10241702374341.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back6001702374421.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back3601702374436.png'
        },
        theme2: {
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back1440-19201702902151.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back1440-19201702902151.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back10241702902222.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back6001703073803.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back3601703074392.png'
        },
        theme3: {
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3back1440-19201702902359.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3back1440-19201702902359.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3back10241702902374.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3back6001702902297.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3back3601702902326.png'
        }
      },
      postcardBackgrounds: {
        theme1: {
          themeType: 'theme1',
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main1440-19201702904779.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main1440-19201702904779.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main10241702904792.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1main6001703073672.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1main3601703073709.png'
        },
        theme2: {
          themeType: 'theme2',
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main1440-19201702901801.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main1440-19201702901801.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main10241702901893.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main6001702901910.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main3601703073754.png'
        },
        theme3: {
          themeType: 'theme3',
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3main1440-19201702904904.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3main1440-19201702904904.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3main10241702904917.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3main6001702901997.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3main3601702902006.png'
        }
      },
      entranceBodyMovin: {
        theme1: {
          xs: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/360-800-Blue.webm'
          },
          sm: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/600-960-Blue.webm'
          },
          md: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1024-745-Blue.webm'
          },
          lg: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1440-920-Blue1702981773.webm'
          },
          xl: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1920-930-Blue.webm'
          }
        },
        theme2: {
          xs: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/360-800-Green.webm'
          },
          sm: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/600-960-Green.webm'
          },
          md: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1024-745-Green.webm'
          },
          lg: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1440-920-Green1702996563.webm'
          },
          xl: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1920-930-Green.webm'
          }
        },
        theme3: {
          xs: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/360-800-Pink.webm'
          },
          sm: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/600-960-Pink.webm'
          },
          md: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1024-745-Pink.webm'
          },
          lg: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1440-920-Pink1702996586.webm'
          },
          xl: {
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1920-930-Pink.webm'
          }
        }
      },
      flowerImages: {
        theme1: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/object1702374033.png',
        theme2: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2object1702902432.png',
        theme3: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3object1702902417.png'
      },
      poems: [
        {
          poemId: 1,
          verse1: {
            hemistich1: 'در کوچه جان همیشه مادر بـــاقیست',
            hemistich2: ' دریـای مـحبـتـش چو کوثر باقیست'
          },
          verse2: {
            hemistich1: 'در گـــویــش عـاشـقانـه ، نـام مــــادر',
            hemistich2: 'شعریست کــه تا ابد به دفتر باقیست'
          }
        },
        {
          poemId: 2,
          verse1: {
            hemistich1: 'مادر‌ ای والاترین رویای عشق',
            hemistich2: 'مادر‌ ای دلواپس فردای عشق'
          },
          verse2: {
            hemistich1: 'مادر‌ ای غمخوار بی همتای من',
            hemistich2: 'اولین و آخرین معنای عشق'
          }
        },
        {
          poemId: 3,
          verse1: {
            hemistich1: 'مادر‌ ای پرواز نرم قاصدک',
            hemistich2: 'مادر‌ ای معنای عشق شاپرک‌'
          },
          verse2: {
            hemistich1: 'ای تمام ناله‌هایت بی صدا',
            hemistich2: 'مادر‌ ای زیباترین شعر خدا'
          }
        },
        {
          poemId: 4,
          verse1: {
            hemistich1: 'مادر! حضور نام تو در شعر های من',
            hemistich2: 'لطف خداست شامل حال غزل شده است'
          },
          verse2: {
            hemistich1: 'غیر از تو جای هیچ کسی نیست در دلم',
            hemistich2: 'این مسأله میان من و عشق حل شده است..'
          }
        },
        {
          poemId: 5,
          verse1: {
            hemistich1: 'سایه لطف خدایی مادر',
            hemistich2: 'معنی عشق و وفایی مادر'
          },
          verse2: {
            hemistich1: 'شعر من درخور تفسیرت نیست',
            hemistich2: 'اوج مهری و صفایی مادر'
          }
        },
        {
          poemId: 6,
          verse1: {
            hemistich1: 'بعد از خدا، خدای دل و جان من توئی',
            hemistich2: 'من، بنده‌ای که بار گنه می‌کشم به دوش'
          },
          verse2: {
            hemistich1: 'تو، آن فرشته‌ای که ز مهرت سرشته‌اند',
            hemistich2: 'چشم از گناهکاری فرزند خود بپوش'
          }
        },
        {
          poemId: 7,
          verse1: {
            hemistich1: 'اى مادر عزیز که جان داده‌اى مرا',
            hemistich2: 'سهل است اگر که جان دهم اکنون براى تو'
          },
          verse2: {
            hemistich1: 'گر جان خویش هم ز برایت فدا کنم',
            hemistich2: 'کـارى بزرگ نیست، کـه باشد سزاى تو'
          }
        },
        {
          poemId: 8,
          verse1: {
            hemistich1: 'ای مادر عزیز که جانم فدای تو',
            hemistich2: 'قربان مهربانی و لطف و صفای تو'
          },
          verse2: {
            hemistich1: 'هرگز نشد محبت یاران و دوستان',
            hemistich2: 'هم‌پایه محبت و مهر و وفای تو'
          }
        },
        {
          poemId: 9,
          verse1: {
            hemistich1: 'مادر تو بهشت جاودانی مادر',
            hemistich2: 'خورشید بلند آسمانی مادر'
          },
          verse2: {
            hemistich1: 'در چشم تو نور زندگانی جاریست',
            hemistich2: 'سر چشمه‌ی مهر بیکرانی مادر'
          }
        },
        {
          poemId: 10,
          verse1: {
            hemistich1: 'مادر قسم به تو که تویی نور کردگار',
            hemistich2: 'یزدان تو را ز نور وفا آفریده است'
          },
          verse2: {
            hemistich1: 'نازم به آن شکوه و به آن عزت و مقام',
            hemistich2: 'جنت به زیر پای تو خوش آرمیده است'
          }
        }
      ],
      selectedTheme: null,
      selectedPoem: null,
      isPoemsCollapsed: true,
      windowWidth: 0
    }
  },
  computed: {
    showMoreBtn () {
      return this.windowWidth < this.$q.screen.sizes.md
    },
    showBreadCrumbs () {
      return this.windowWidth >= this.$q.screen.sizes.md
    },
    displayablePoems () {
      if (this.isPoemsCollapsed && this.windowWidth < this.$q.screen.sizes.md) {
        return this.poems.slice(0, 3)
      } else {
        return this.poems
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.onResize)
    this.windowWidth = window.innerWidth
    this.setSelectedPoem()
    this.setSelectedTheme()
    this.message = this.postcard.value.postcardMessageText ? this.postcard.value.postcardMessageText : ''
  },
  methods: {
    expandPanel () {
      this.isPoemsCollapsed = false
    },
    collapsePanel () {
      this.isPoemsCollapsed = true
    },
    onResize () {
      this.windowWidth = window.innerWidth
    },
    setSelectedTheme () {
      const postcardThemeBackGrounds = this.postcard.value.postcardBackgrounds
      if (!postcardThemeBackGrounds) {
        return
      }
      const themeIndex = this.themes.findIndex(theme => theme.type === postcardThemeBackGrounds.themeType)
      this.selectTheme(themeIndex)
    },
    setSelectedPoem () {
      const postcardPoem = this.postcard.value.postcardPoemBody
      if (postcardPoem) {
        this.selectedPoem = this.poems.filter(poem => poem.poemId === postcardPoem.poemId)[0]
      } else {
        this.selectedPoem = this.poems[0]
      }
    },
    selectTheme (themeIndex) {
      this.themes.forEach((theme, index) => {
        theme.isSelected = themeIndex === index
      })
    },
    completeCheckUserInfo () {
      if (this.postcard.value.postcardPoemBody) {
        const sendData = {
          data: {
            value: JSON.stringify(this.localPostcard.value.loadApiResource()),
            study_event_id: this.studyEventId
          },
          id: this.postcard.id
        }
        this.requestPostalCard(sendData, 'editPostalCard')
      } else {
        const sendData = {
          value: JSON.stringify(this.localPostcard.value.loadApiResource()),
          study_event_id: this.studyEventId
        }
        this.requestPostalCard(sendData, 'savePostalCardData')
      }
    },
    takeAction () {
      this.fillPoemData()
      this.showAuthCheckDialog = true
    },
    requestPostalCard (sendData, ApiMethod) {
      APIGateway.postcard[ApiMethod](sendData)
        .then((Postcard) => {
          this.$emit('toggleForm')
        })
        .catch(() => {})
    },
    showPreview () {
      this.fillPoemData()
      this.$emit('togglePreviewDialog', this.localPostcard)
    },
    fillPoemData () {
      this.selectedTheme = this.themes.filter(theme => theme.isSelected)[0]
      const theme = this.selectedTheme.type
      this.localPostcard.value.patternBackgrounds = this.patternBackgrounds[theme]
      this.localPostcard.value.postcardBackgrounds = this.postcardBackgrounds[theme]
      this.localPostcard.value.flowerImage = this.flowerImages[theme]
      this.localPostcard.value.entranceBodyMovin = this.entranceBodyMovin[theme]
      this.localPostcard.value.postcardMessageText = this.message
      this.localPostcard.value.postcardPoemBody = this.selectedPoem
      this.localPostcard.loadApiResource()
    }
  }
}

</script>

<style lang="scss" scoped>
.postal-cart-container {
  padding: $space-7 0;
  @include media-max-width('md') {
    padding: 0 0 $space-8 ;
  }
  .theme-title, .poem-title, {
    color: $grey-9;
    margin-top: $space-7;
    color: $grey-9;
  }
  .theme-title {
    @include media-max-width('md') {
      margin-top: $space-4;
    }
  }
  .theme-description, .poem-description, .message-description {
    margin-top: $space-3;
    color: $grey-9;
  }
  .theme-banner-container, .poem-cards, .message-input-container {
    margin-top: $space-6;
  }
  .theme-banner-container {
  }
  .message-title {
    color: $grey-9;
    margin-top: $space-2;
    @include media-max-width('lg') {
      margin-top: $spacing-base;
    }
    @include media-max-width('md') {
      margin-top: $space-6;
    }
  }
  .poem-cards {
    .poem-container:nth-child(2n + 1) {
      padding-right: $space-3;
    }
    .poem-container:nth-child(2n) {
      padding-left: $space-3;
    }
    @include media-max-width('md') {
      .poem-container {
        padding-left: $spacing-none !important;
        padding-right: $spacing-none !important;
      }
    }
    .poem-container {
      margin-bottom: $space-6;
      @include media-max-width('lg') {
        margin-bottom: $space-5;
      }
      @include media-max-width('md') {
        margin-bottom: $space-3;
      }
      .poem {
        display: flex;
        align-items: flex-start;
        gap: $space-3;
        .verses {
          color: $grey-8;
          @include media-max-width('lg') {
            text-align: center;
          }
          .verse-1 {
            &.hemistich-1, &.hemistich-2 {
              margin-bottom: $space-3;
            }
          }
        }
        @include media-max-width('sm') {
          gap: $spacing-none;
          .verses {
            .verse-1 {
              &.hemistich-1 {
                margin-bottom: $spacing-none;
              }
            }
          }
        }
      }
    }
  }
  .more-btns {
    margin-top: $space-2;
  }
  .action-btns-container {
    margin-top: $spacing-base;
    @include media-max-width('md') {
      margin-top: $space-4;
    }
    .action-btns {
      @include media-max-width('sm') {
        flex-wrap: nowrap;
        width: 100%;
        .preview-btn, .save-btn {
          width: inherit;
          .btn {
            width: inherit;
          }
        }
      }
      .preview-btn {
        margin-right: $space-4;
      }
    }
  }
}
</style>
