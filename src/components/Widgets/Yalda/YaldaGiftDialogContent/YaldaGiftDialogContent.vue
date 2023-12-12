<template>
  <div class="gift-dialog-container">
    <div class="header-section">
      <div class="header-image">
        <lazy-img :src="headerImage" />
      </div>
    </div>
    <div v-if="!loading"
         class="gift">
      <div v-if="code === 1"
           class="gift-poem">
        <text-widget :options="randomGift.poem1" />
        <text-widget :options="randomGift.poem2" />
      </div>
      <div v-if="code === 1"
           class="gift-omen">
        <div class="gift-omen__title">
          ای صاحب فال :
        </div>
        <div class="gift-omen__text">
          <text-widget :options="randomGift.omen" />
        </div>
      </div>
      <div v-if="code === 2"
           class="gift-duplicate">
        عیدیت رو قبلا گرفتی! کیف پولت شارژ شده
      </div>
      <div class="gift-separator">
        <div v-for="item in 3"
             :key="item"
             class="gift-separator__dot">
          <lazy-img width="100%"
                    :src="separatorImage" />
        </div>
      </div>
      <div class="gift-wallet">
        <div class="gift-wallet__content">
          <div class="gift-wallet__content--header">
            <div class="header-message">
              تبریک
            </div>
            <div class="header-coupon">
              <div class="coupon-amount">
                {{ amount }}+
              </div>
              <div class="coupon-title">
                تومان اعتبار کیف پول
              </div>
            </div>
          </div>
          <div class="gift-wallet__content--message">
            <text-widget :options="localOptions.congratulationMessage" />
          </div>
          <div class="gift-wallet__content--action">
            <q-btn icon-right="ph:caret-left"
                   label="استفاده از کیف پول"
                   @click="onActionButtonClick" />
          </div>
        </div>
        <div class="gift-wallet__image">
          <lazy-img :src="walletImage" />
        </div>
      </div>
    </div>
    <div v-else
         class="gift">
      <q-spinner-gears color="primary"
                       size="3rem"
                       :thickness="5" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import TextWidget from 'components/Widgets/TextWidget/TextWidget.vue'
const initialPoemOmen = {
  poem1: {
    text: '',
    fontFamily: null,
    color: null,
    fontSize: null,
    fontWeight: null,
    fontStyle: null,
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
    xs: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    sm: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    md: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    lg: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    xl: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    responsiveSpacing: {
      xs: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      sm: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      md: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      lg: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      xl: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      }
    },
    hasTheme: null,
    activeTheme: 'default',
    themes: {
      theme1: {
        borderColor: null,
        borderSize: null,
        borderWidth: null,
        borderHeight: null,
        top: null,
        left: null,
        bottom: null,
        right: null
      }
    }
  },
  poem2: {
    text: '',
    fontFamily: null,
    color: null,
    fontSize: null,
    fontWeight: null,
    fontStyle: null,
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
    xs: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    sm: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    md: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    lg: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    xl: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    responsiveSpacing: {
      xs: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      sm: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      md: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      lg: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      xl: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      }
    },
    hasTheme: null,
    activeTheme: 'default',
    themes: {
      theme1: {
        borderColor: null,
        borderSize: null,
        borderWidth: null,
        borderHeight: null,
        top: null,
        left: null,
        bottom: null,
        right: null
      }
    }
  },
  omen: {
    text: '',
    fontFamily: null,
    color: null,
    fontSize: null,
    fontWeight: null,
    fontStyle: null,
    responsiveShow: {
      xl: true,
      lg: true,
      md: true,
      sm: true,
      xs: true
    },
    xs: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    sm: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    md: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    lg: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    xl: {
      fontSize: null,
      fontWeight: null,
      fontStyle: null,
      lineHeight: null,
      letterSpacing: null
    },
    responsiveSpacing: {
      xs: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      sm: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      md: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      lg: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      },
      xl: {
        marginTop: null,
        marginLeft: null,
        marginRight: null,
        marginBottom: null,
        paddingTop: null,
        paddingLeft: null,
        paddingRight: null,
        paddingBottom: null
      }
    },
    hasTheme: null,
    activeTheme: 'default',
    themes: {
      theme1: {
        borderColor: null,
        borderSize: null,
        borderWidth: null,
        borderHeight: null,
        top: null,
        left: null,
        bottom: null,
        right: null
      }
    }
  }
}
export default defineComponent({
  name: 'YaldaGiftDialogContent',
  components: {
    TextWidget,
    LazyImg
  },
  mixins: [mixinWidget],
  emits: ['ActionButtonClick'],
  data () {
    return {
      code: 0,
      amount: 0,
      loading: false,
      separatorImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/vector1701681190.png',
      headerImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/anar1701759403.png',
      walletImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/wallet1701759600.png',
      defaultOptions: {
        poemAndOmenList: [],
        congratulationMessage: {
          text: '',
          fontFamily: null,
          color: null,
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          responsiveShow: {
            xl: true,
            lg: true,
            md: true,
            sm: true,
            xs: true
          },
          xs: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          sm: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          md: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          lg: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          xl: {
            fontSize: null,
            fontWeight: null,
            fontStyle: null,
            lineHeight: null,
            letterSpacing: null
          },
          responsiveSpacing: {
            xs: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            sm: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            md: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            lg: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            },
            xl: {
              marginTop: null,
              marginLeft: null,
              marginRight: null,
              marginBottom: null,
              paddingTop: null,
              paddingLeft: null,
              paddingRight: null,
              paddingBottom: null
            }
          },
          hasTheme: null,
          activeTheme: 'default',
          themes: {
            theme1: {
              borderColor: null,
              borderSize: null,
              borderWidth: null,
              borderHeight: null,
              top: null,
              left: null,
              bottom: null,
              right: null
            }
          }
        }
      },
      randomGift: initialPoemOmen
    }
  },
  mounted () {
    this.getGift()
    this.getRandomGift()
  },
  methods: {
    getRandomGift () {
      let poemOmen = initialPoemOmen
      if (this.localOptions.poemAndOmenList.length > 0) {
        poemOmen = this.localOptions.poemAndOmenList[Math.floor(Math.random() * this.localOptions.poemAndOmenList.length)]
      }
      this.randomGift = poemOmen
    },
    getGift () {
      this.loading = true
      APIGateway.yalda.participate()
        .then(codeAndAmount => {
          this.code = codeAndAmount.code
          this.amount = codeAndAmount.amount
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onActionButtonClick () {
      this.$emit('ActionButtonClick')
    }
  }
})
</script>

<style lang="scss" scoped>
$page-size-lg: map-get($sizes, "lg");
$page-size-md: map-get($sizes, "md");
$page-size-sm: map-get($sizes, "sm");

.gift-dialog-container {
  width: 660px;
  min-width: 660px;
  min-height: 299px;
  border-radius: 30px;

  @media screen and (width < #{$page-size-md}) {
    width: 536px;
    min-width: 536px;
  }
  @media screen and (width < #{$page-size-sm}) {
    width: 320px;
    min-width: 320px;
  }

  .header-section {
    display: flex;
    justify-content: center;
    align-items: center;

    .header-image {
      width: 74px;
      height: 52px;

      @media screen and (width < #{$page-size-md}) {
        width: 46px;
        height: 32.324px;
      }
      @media screen and (width < #{$page-size-sm}) {
        width: 46px;
        height: 32.324px;
      }

      :deep(.lazy-img) {
        width: 100%;
      }
    }
  }

  .gift {
    display: flex;
    padding: 40px 32px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    align-self: stretch;
    border-radius: 30px;
    background: #fff;

    @media screen and (width < #{$page-size-md}) {
      padding: 24px;
      gap: 12px;
    }
    @media screen and (width < #{$page-size-sm}) {
      padding: 20px;
      gap: 12px;
    }

    &-poem {
      display: flex;
      padding: 20px 24px;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      align-self: stretch;
      border-radius: 16px;
      background: var(--green-01, #E4F7F2);

      @media screen and (width < #{$page-size-md}) {
        padding: 20px;
        gap: 12px;
      }
      @media screen and (width < #{$page-size-sm}) {
        padding: 16px;
        gap: 12px;
      }
    }

    &-omen {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 8px;
      align-self: stretch;

      &__title {
        color: #303030;
        text-align: center;
        font-family: ModamFaNumWeb;
        font-size: 18px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.54px;

        @media screen and (width < #{$page-size-md}) {
          font-size: 14px;
          font-weight: 600;
          letter-spacing: -0.42px;
        }
      }
    }

    &-duplicate {
      color: #303030;
      text-align: center;
      font-family: ModamFaNumWeb;
      font-size: 18px;
      font-style: normal;
      font-weight: 400;
      line-height: normal;
      letter-spacing: -0.54px;
    }

    &-separator {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      gap: 16px;

      &__dot {
        width: 16px;
        height: 16px;

        :deep(.lazy-img) {
          width: 100%;
        }
      }
    }

    &-wallet {
      position: relative;
      display: flex;
      padding: 24px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      gap: 12px;
      align-self: stretch;
      border-radius: 20px;
      background: linear-gradient(275deg, #2DBD77 0%, #259A61 98.8%);

      @media screen and (width < #{$page-size-md}) {
        padding: 20px;
        gap: 12px;
      }
      @media screen and (width < #{$page-size-sm}) {
        padding: 16px;
        gap: 12px;
      }

      &__content {
        display: flex;
        padding-right: 180px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 16px;

        @media screen and (width < #{$page-size-md}) {
          padding-right: 96px;
          gap: 12px;
        }
        @media screen and (width < #{$page-size-sm}) {
          padding-right: 0;
          gap: 12px;
        }

        &--header {
          display: flex;
          padding-left: 8px;
          justify-content: flex-start;
          align-items: center;
          gap: 32px;
          align-self: stretch;

          @media screen and (width < #{$page-size-sm}) {
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 12px;
            z-index: 99;
          }

          .header-message {
            color:#FFF;
            font-family: ModamFaNumWeb;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.6px;

            @media screen and (width < #{$page-size-md}) {
              font-size: 16px;
              letter-spacing: -0.48px;
            }
          }

          .header-coupon {
            display: flex;
            padding: 2px 20px;
            justify-content: center;
            align-items: center;
            gap: 16px;
            border-radius: 8px;
            background: #FFF;

            @media screen and (width < #{$page-size-md}) {
              padding: 2px 16px;
              gap: 12px;
            }
            @media screen and (width < #{$page-size-sm}) {
              width: 100%;
            }

            .coupon-amount {
              color: #29A86A;
              font-family: ModamFaNumWeb;
              font-size: 24px;
              font-style: normal;
              font-weight: 700;
              line-height: normal;
              letter-spacing: -0.72px;

              @media screen and (width < #{$page-size-md}) {
                font-size: 20px;
                letter-spacing: -0.6px;
              }
            }

            .coupon-title {
              color: #565656;
              font-family: ModamFaNumWeb;
              font-size: 14px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.42px;

              @media screen and (width < #{$page-size-md}) {
                font-size: 12px;
                letter-spacing: -0.36px;
              }
            }
          }
        }

        &--message {
          @media screen and (width < #{$page-size-md}) {
            max-width: 317px;
          }
        }

        &--action {
          :deep(.q-btn) {
            border-radius: 100px;
            border: 1.5px solid var(--neutral-01, #FFF);
            font-family: ModamFaNumWeb;
            font-size: 18px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
            letter-spacing: -0.54px;

            @media screen and (width < #{$page-size-md}) {
              font-size: 16px;
              font-weight: 700;
              letter-spacing: -0.48px;
            }
          }
        }
      }

      &__image {
        width: 177px;
        height: 197px;
        position: absolute;
        right: 18px;
        top: -40px;

        @media screen and (width < #{$page-size-md}) {
          width: 128px;
          height: 144px;
          top: -22px;
        }
        @media screen and (width < #{$page-size-sm}) {
          width: 90.059px;
          height: 100px;
          top: -22px;
        }

        :deep(.lazy-img) {
          width: 100%;
        }
      }
    }
  }
}
</style>
