<template>
  <div class="row postal-cart-container">
    <div class="col-12">
      <q-breadcrumbs class="text-grey-9"
                     active-color="grey-6">
        <template v-slot:separator>
          <q-icon size="xs"
                  name="isax:arrow-right-3"
                  color="grey-6" />
        </template>
        <q-breadcrumbs-el label="خانه" />
        <q-breadcrumbs-el label="صفحه اول" />
      </q-breadcrumbs>
    </div>
    <div class="col-12 theme-title">
      <h6>انتخاب تم</h6>
    </div>
    <div class="col-12 theme-description body1">از میان تم های زیر، یک تم را برای کارت پستال خود انتخاب کنید.</div>
    <div class="col-12">
      <div class="row theme-banner-container q-col-gutter-lg">
        <div v-for="(theme, index) in themes"
             :key="index"
             class="col-md-4 col-xs-12">
          <div class="banner">
            <q-img v-if="theme.isSelected"
                   :src="theme.selectedModeImage" />
            <q-img v-else
                   :src="theme.image"
                   class="cursor-pointer"
                   @click="selectTheme(index)" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-12 poem-title">
      <h6>انتخاب شعر</h6>
    </div>
    <div class="col-12 poem-description body1">از میان ابیات زیر، یک بیت را برای کارت پستال خود انتخاب کنید.</div>
    <div class="col-12">
      <div class="row poem-cards">
        <div v-for="poem in poems"
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
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-1 hemistich-1">
                    {{poem.verse1.hemistich1}}
                  </div>
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-1 hemistich-2">
                    {{poem.verse1.hemistich2}}
                  </div>
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-2 hemistich-1">
                    {{poem.verse2.hemistich1}}
                  </div>
                  <div class="subtitle2 col-sm-6 col-xs-12 verse-2 hemistich-2">
                    {{poem.verse2.hemistich2}}
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section />
          </q-card>
        </div>
      </div>
    </div>
    <div class="col-12 message-title">
      <h6>پیام شما</h6>
    </div>
    <div class="col-12 message-description body1">داخل کارت پستال، یک پیام از طرف خودتون برای تبریک روز مادر بنویسید و تقدیمش کنید.</div>
    <div class="col-12 message-input-container">
      <q-input v-model="message"
               type="textarea"
               :hint="message.length + '/200'"
               placeholder="پیام خودتون رو بنویسید" />
    </div>
    <div class="col-12 flex justify-end action-btns">
      <q-btn label="پیش نمایش"
             outline
             color="grey"
             class="preview-btn"
             icon="ph:eye"
             @click="showPreview" />
      <q-btn label="ذخیره و ثبت"
             color="primary"
             icon="ph:check"
             @click="takeAction" />
    </div>
  </div>
</template>

<script>

import { APIGateway } from 'src/api/APIGateway'
import { Postcard } from 'src/models/Postcard'

export default {
  name: 'MothersDayPostcardFirstForm',
  components: {
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
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back10241702902222.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2back10241702902222.png'
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
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main1440-19201702904779.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main1440-19201702904779.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main10241702904792.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main10241702904792.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/main10241702904792.png'
        },
        theme2: {
          size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main1440-19201702901801.png',
          size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main1440-19201702901801.png',
          size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main10241702901893.png',
          size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main6001702901910.png',
          size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2main6001702901910.png'
        },
        theme3: {
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
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1920-930-Blue.webm'
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
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1920-930-Green.webm'
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
            src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1920-930-Pink.webm'
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
      selectedPoem: null
    }
  },
  computed: {
    displayableProducts () {
      if (this.isPanelCollapsed) {
        return this.data.slice(0, this.options.showInCollapse)
      } else {
        return this.data
      }
    }
  },
  mounted () {
    this.setSelectedPoem()
    this.message = this.postcard.value.postcardMessageText ? this.postcard.value.postcardMessageText : ''
  },
  methods: {
    setSelectedPoem () {
      if (this.postcard.value.postcardPoemBody) {
        const index = this.poems.findIndex(poem => JSON.parse(JSON.stringify(poem)) === JSON.parse(JSON.stringify(this.postcard.value.postcardPoemBody)))
        this.selectedPoem = this.poems[index]
      } else {
        this.selectedPoem = this.poems[0]
      }
    },
    selectTheme (themeIndex) {
      this.themes.forEach((theme, index) => {
        theme.isSelected = themeIndex === index
      })
    },
    takeAction () {
      this.fillPoemData()
      if (this.postcard.value.postcardPoemBody) {
        const sendData = {
          data: {
            value: JSON.stringify(this.localPostcard.value.loadApiResource()),
            study_event_id: 28
          },
          id: this.postcard.id
        }
        this.requestPostalCard(sendData, 'editPostalCard')
      } else {
        const sendData = {
          value: JSON.stringify(this.localPostcard.value.loadApiResource()),
          study_event_id: 28
        }
        this.requestPostalCard(sendData, 'savePostalCardData')
      }
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
  .theme-title, .poem-title, .message-title {
    margin-top: $space-7;
    color: $grey-9;
  }
  .theme-description, .poem-description, .message-description {
    margin-top: $space-3;
    color: $grey-9;
  }
  .theme-banner-container, .poem-cards, .message-input-container {
    margin-top: $space-6;
  }
  .theme-banner-container {
    .banner {
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
      padding-bottom: $space-6;
      .poem {
        display: flex;
        align-items: flex-start;
        gap: $space-3;
        .verses {
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
  .action-btns {
    .preview-btn {
      margin-right: $space-4;
    }
  }
}
</style>
