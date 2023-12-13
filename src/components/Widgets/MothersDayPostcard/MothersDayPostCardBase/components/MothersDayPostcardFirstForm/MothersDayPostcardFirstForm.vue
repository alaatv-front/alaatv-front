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
             @click="savePostalCard" />
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
  emits: ['togglePreviewDialog'],

  data () {
    return {
      message: '',
      themes: [
        {
          image: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/11702373602.png',
          selectedModeImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/1selected1702373784.png',
          type: 'theme1',
          previewData: {
            flowerImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/object1702374033.png',
            postcardPoemBody: '',
            postcardMessageText: '',
            patternBackgrounds: {
              size1920: '',
              size1440: '',
              size1024: '',
              size600: '',
              size360: ''
            },
            postcardBackgrounds: {
              size1920: '',
              size1440: '',
              size1024: '',
              size600: '',
              size360: ''
            }
          },
          isSelected: true
        },
        {
          image: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/21702373813.png',
          selectedModeImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/2selected1702373828.png',
          type: 'theme2',
          previewData: {
            flowerImage: '',
            postcardPoemBody: '',
            postcardMessageText: '',
            patternBackgrounds: {
              size1920: '',
              size1440: '',
              size1024: '',
              size600: '',
              size360: ''
            },
            postcardBackgrounds: {
              size1920: '',
              size1440: '',
              size1024: '',
              size600: '',
              size360: ''
            }
          },
          isSelected: false
        },
        {
          image: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/31702373855.png',
          selectedModeImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3selected1702373863.png',
          type: 'theme3',
          previewData: {
            flowerImage: '',
            postcardPoemBody: '',
            postcardMessageText: '',
            patternBackgrounds: {
              size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
              size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
              size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back10241702374341.png',
              size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back6001702374421.png',
              size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back3601702374436.png'
            },
            postcardBackgrounds: {
              size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/19201702280797.png',
              size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/14401702280833.png',
              size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/10241702280978.png',
              size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/6001702280907.png',
              size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3601702281026.png'
            }
          },
          isSelected: false
        }
      ],
      poems: [
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        },
        {
          verse1: {
            hemistich1: 'ايه اصل و نسب در گردش دوران زر است',
            hemistich2: 'هر كسي صاحب زر است او از همه بالاتر است'
          },
          verse2: {
            hemistich1: 'پادشه مفلس كه شد چون مرغ بي بال و پر است',
            hemistich2: 'دائماً خون ميخورد تيغي كه صاحب جوهر است'
          }
        }
      ],
      selectedTheme: null,
      selectedPoem: null
    }
  },
  mounted () {
    console.log(JSON.parse('{"image":"https://nodes.alaatv.com/upload/alaaPages/2023-12/11702373602.png","selectedModeImage":"https://nodes.alaatv.com/upload/alaaPages/2023-12/1selected1702373784.png","type":"theme1","previewData":{"flowerImage":"https://nodes.alaatv.com/upload/alaaPages/2023-12/object1702374033.png","postcardPoemBody":"\\nايه اصل و نسب در گردش دوران زر است<br>\\n\\nهر كسي صاحب زر است او از همه بالاتر است<br>\\n\\nپادشه مفلس كه شد چون مرغ بي بال و پر است<br>\\nدائماً خون ميخورد تيغي كه صاحب جوهر است","postcardMessageText":"eewrwer","patternBackgrounds":{"size1920":"","size1440":"","size1024":"","size600":"","size360":""},"postcardBackgrounds":{"size1920":"","size1440":"","size1024":"","size600":"","size360":""}},"isSelected":true}'))
    this.selectedPoem = this.poems[0]
  },
  methods: {
    selectTheme (themeIndex) {
      this.themes.forEach((theme, index) => {
        theme.isSelected = themeIndex === index
      })
    },
    savePostalCard () {
      this.fillPoemData()
      const sendData = new Postcard({
        value: JSON.stringify(this.selectedTheme.previewData),
        study_event_id: 28
      })
      APIGateway.postcard.savePostalCardData(sendData)
        .then((Postcard) => {
          this.$emit('togglePreviewDialog')
        })
        .catch(() => {})
    },
    showPreview () {
      this.fillPoemData()
      this.$emit('togglePreviewDialog', this.selectedTheme.previewData)
    },
    fillPoemData () {
      debugger
      this.selectedTheme = this.themes.filter(theme => theme.isSelected)[0]
      this.selectedTheme.previewData.postcardMessageText = this.message
      this.selectedTheme.previewData.postcardPoemBody = '' +
        `\n${this.selectedPoem.verse1.hemistich1}` +
        '<br>\n' +
        `\n${this.selectedPoem.verse1.hemistich2}` +
        '<br>\n' +
        `\n${this.selectedPoem.verse2.hemistich1}` +
        `<br>\n${this.selectedPoem.verse2.hemistich2}`
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
        justify-content: flex-end;
        align-items: flex-start;
        gap: $space-3;
        .verses {
          .verse-1 {
            &.hemistich-1, &.hemistich-2 {
              margin-bottom: $space-3;
            }
          }
        }
        @include media-max-width('sm') {
          gap: $spacing-none;
          .verses {
            text-align: center;
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
