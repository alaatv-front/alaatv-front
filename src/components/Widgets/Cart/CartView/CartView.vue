<template>
  <div class="cart-view-container">
    <template v-if="cart.loading">
      <div class="cart-count">
        <q-skeleton type="text"
                    width="100px" />
      </div>
      <div class="cart-items">
        <q-card class="cart-card">
          <q-card-section class="card-section">
            <div class="order-image-section">
              <div class="order-image-container">
                <q-skeleton height="100%"
                            square />
              </div>
            </div>

            <div class="product-text-info">
              <div class="order-item-header">
                <div class="title ellipsis q-px-lg q-pt-lg">
                  <q-skeleton type="text" />
                  <q-skeleton type="text"
                              width="85%" />
                </div>
                <q-skeleton type="QBtn"
                            width="25px"
                            height="25px" />
              </div>
            </div>
          </q-card-section>

          <q-card-section class="card-actions">
            <div class="product-details row expanded">
              <div class="price-container col-md-6 col-sm-3">
                <q-skeleton type="text"
                            width="150px" />
              </div>
              <div class="action-buttons col-md-12 col-sm-3">
                <q-skeleton type="QBtn"
                            height="20px" />
              </div>
            </div>

          </q-card-section>

        </q-card>
      </div>
    </template>
    <template v-else-if="cart.count > 0">
      <div class="cart-count">
        {{localOptions.title}} ({{cart.count}})
      </div>
      <div class="cart-view-widget">
        <div v-for="(order, i) in cartItemsList"
             :key="i"
             class="cart-items">
          <q-card class="cart-card cart">
            <q-card-section class="card-section">
              <div class="order-image-section">
                <div class="order-image-container">
                  <router-link :to="{name: 'Public.Product.Show', params:{id: getProductKey(order, 'id')}}">
                    <lazy-img :src="getProductKey(order, 'photo')"
                              :alt="getProductKey(order, 'title')"
                              width="1"
                              height="1"
                              class="order-image" />
                  </router-link>
                </div>
              </div>
              <div class="product-text-info">
                <div class="order-item-header">
                  <div class="title ellipsis"
                       :class="{'floating': localOptions.floating}">
                    {{ getProductKey(order, 'title') }}
                    <q-tooltip>
                      {{ getProductKey(order, 'title') }}
                    </q-tooltip>
                  </div>
                  <q-btn v-if="!order.hasGrand()"
                         flat
                         square
                         class="trash-button"
                         icon="ph:trash-simple"
                         @click="changeDialogState(true, order)" />
                </div>

                <div v-if="getProductKey(order, 'attributes')?.info"
                     class="product-information">
                  <div v-if="getProductKey(order, 'attributes').info.teacher"
                       class="product-info">
                    <q-icon name="ph:student"
                            class="info-icon" />
                    <div class="info-value">
                      {{ getProductKey(order, 'attributes').info.teacher.join('، ') }}
                    </div>
                  </div>
                  <div v-if="getProductKey(order, 'attributes').info.major"
                       class="product-info">
                    <q-icon name="ph:book-open"
                            class="info-icon" />
                    <div class="info-value">
                      رشته تحصیلی: {{ getProductKey(order, 'attributes').info.major.join(' - ') }}
                    </div>
                  </div>
                  <div v-if="getProductKey(order, 'attributes').info.production_year"
                       class="product-info">
                    <q-icon name="ph:calendar"
                            class="info-icon" />
                    <div class="info-value">
                      {{ getProductKey(order, 'attributes').info.production_year.join('، ') }}
                    </div>
                  </div>
                </div>
              </div>
            </q-card-section>
            <q-card-section class="card-actions">
              <div v-for="item in order.order_product.list"
                   :key="item.id"
                   class="product-details"
                   :class="expandedObject[i] ?'expanded': ''">
                <div v-if="item.price.final !== null"
                     class="price-container col-md-6 col-sm-3">
                  <div class="discount-part">
                    <div v-if="hasDiscount(item)"
                         class="discount-percent">
                      {{ item.price.discountInPercent() }}%
                    </div>

                    <div v-if="hasDiscount(item)"
                         class="base-price">
                      {{ item.price.toman('base', null) }}
                    </div>
                  </div>
                  <div class="final-part">
                    <div class="final-price">{{ item.price.toman('final', null) }}</div>
                    <div class="toman">تومان</div>
                  </div>
                </div>
                <div v-if="false"
                     class="action-buttons col-md-6 col-sm-3"
                     :class="expandedObject[i] ? '' : 'open-expansion'">
                  <router-link :to="{name: 'Public.Product.Show', params:{id: item.product_id}}"
                               class="go-product subtitle2 text-center">
                    رفتن
                    به صفحه دوره
                  </router-link>
                  <q-expansion-item v-if="order.order_product?.list.length > 0"
                                    v-model="expandedObject[i]"
                                    label="جزئیات محصول"
                                    class="details-expansion"
                                    :class="expandedObject[i] ?'open-expansion-style': 'close-expansion-style'"
                                    :header-class=" expandedObject[i] ? 'hide-expansion-header' : ''">
                    <q-card class="details-expansion-card">
                      <q-card-section class="details-expansion-card-section">
                        <div v-for="(orderProduct, index) in order.order_product.list"
                             :key="orderProduct.id"
                             class="pamphlet">
                          <div class="title ellipsis">
                            {{ orderProduct.product.title }}
                          </div>
                          <div class="right-part">
                            <span class="price"
                                  :class="index !== 0 ? 'without-trash': ''">
                              {{ orderProduct.price.toman('final') }}
                            </span>
                            <q-btn flat
                                   square
                                   class="trash-button"
                                   icon="ph:trash-simple"
                                   @click="changeDialogState(true, orderProduct)" />
                          </div>
                        </div>
                      </q-card-section>
                      <q-card-section class="details-expansion-actions">
                        <router-link v-if="order.hasGrand()"
                                     :to="{name: 'Public.Product.Show', params:{id: order.grand.id}}"
                                     class="link expansion-link">
                          {{ descLinkLabel }}
                        </router-link>
                        <q-btn-dropdown class="details-button"
                                        label="جزئیات محصول"
                                        dropdown-icon="ph:caret-up"
                                        flat
                                        @click="expandedObject[i] = !expandedObject[i]" />
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </template>
    <q-dialog v-model="dialogState"
              class="delete-dialog">
      <q-card class="delete-dialog-card">

        <q-btn square
               icon="ph:x"
               size="xl"
               flat
               @click="changeDialogState(false)" />

        <q-card-section class="delete-dialog-card-section">
          <div class="info-icon">
            <q-icon name="ph:info" />
          </div>

          <p class="are-u-sure-statement">آیا از حذف محصول مطمئن هستید؟</p>
        </q-card-section>

        <q-card-actions class="delete-dialog-card-actions">
          <q-btn class="dont-delete-button"
                 color="grey"
                 :loading="cart.loading"
                 @click="changeDialogState(false)">
            انصراف
          </q-btn>

          <q-btn class="surely-delete-button"
                 color="primary"
                 :loading="cart.loading"
                 @click="removeItem">
            بله، مطمئن هستم
          </q-btn>
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { Cart } from 'src/models/Cart.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import { CartItem } from 'src/models/CartItem.js'

export default {
  name: 'CartView',
  components: { LazyImg },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  emits: ['cartReview'],
  data () {
    return {
      // cart: new Cart(),
      mounted: false,
      dialogState: false,
      test: null,
      expandedObject: {},
      clickedOrderProductToRemove: null,
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        title: 'سبد خرید شما',
        floating: false
      }
    }
  },
  computed: {
    cart: {
      get () {
        if (this.mounted) {
          return this.$store.getters['Cart/cart']
        }

        return new Cart()
      },
      set (newValue) {
        this.$store.commit('Cart/updateCart', newValue)
      }
    },
    cartItemsList () {
      return this.getOrderedList(this.cart.items.list)
    },

    windowSize() {
      return this.$store.getters['AppLayout/windowSize']
    },

    descLinkLabel() {
      if (this.windowSize.x > 1439) {
        return 'رفتن به صفحه محصول'
      } else {
        return 'صفحه محصول'
      }
    }
  },
  mounted () {
    this.mounted = true
    this.cartReview()
    this.$bus.on('busEvent-refreshCart', this.cartReview)
  },
  methods: {
    getProductKey (order, key) {
      if (order.hasGrand()) {
        return order.grand[key]
      }

      return order.order_product.list[0].product[key]
    },
    hasDiscount(order) {
      return order.price.discountInPercent() > 0
    },
    cartReview() {
      this.cart.loading = true
      this.$store.dispatch('Cart/reviewCart')
        .then((response) => {
          // const invoice = response

          const cart = new Cart(response)

          // if (invoice.count > 0) {
          //   invoice.items.list[0].order_product.list.forEach((order) => {
          //     cart.items.list.push(order)
          //   })
          // }
          this.cart = cart
          this.cart.loading = false
        }).catch(() => {
          this.cart.loading = false
        })
    },
    getOrderedList (cartItems) {
      if (!cartItems || cartItems.list?.length === 0) {
        return
      }
      const customItems = []

      cartItems.forEach((item, i) => {
        if (item.hasGrand()) {
          customItems.push(item)
        } else {
          item.order_product.list.forEach(order => {
            // customItems.push({ grand: new OrderProduct(order), orderProductId: order.id })
            customItems.push(new CartItem({
              order_product: [order]
            }))
          })
        }
        this.expandedObject[i] = true
      })

      return customItems
    },
    removeItem() {
      this.changeDialogState(false)
      this.$store.dispatch('Cart/removeItemFromCart', this.clickedOrderProductToRemove)
        .then(() => {
          this.cartReview()
          this.$bus.emit('busEvent-refreshCart')
        })
        .catch(() => {
          this.cartReview()
          this.$bus.emit('busEvent-refreshCart')
        })
    },
    changeDialogState (state, cartItem) {
      this.dialogState = state
      if (!state) {
        return
      }
      if (cartItem.hasGrand && cartItem.hasGrand()) {
        this.clickedOrderProductToRemove = cartItem.grand
      } else if (cartItem.hasGrand && !cartItem.hasGrand()) {
        this.clickedOrderProductToRemove = cartItem.order_product.list[0].product
      } else if (!cartItem.hasGrand) {
        this.clickedOrderProductToRemove = cartItem.product
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/spacing.scss";

.cart-count {
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #6D708B;
  margin: 24px 0 24px 0;

  @media screen and (max-width: 1439px) {
    letter-spacing: -0.03em;
    margin: 20px 0;
  }
}

.cart-view-widget {
  &:deep(.q-btn .q-btn__content) {
    margin: 0;
  }
  .cart-items {
    .cart-card {
      background: #ffffff;
      box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
      2px 4px 10px rgba(112, 108, 162, 0.05);
      border-radius: 16px;
      padding: 20px 20px 4px 20px;
      margin-bottom: 16px;

      @media screen and (max-width: 1439px) {
        padding: 16px 16px 0 16px;
        border-radius: 12px;
      }

      @media screen and (max-width: 1023px) {
        border-radius: 12px;
      }

      @media screen and (max-width: 599px) {
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 19px;
      }
      &.cart {
        padding-bottom: 20px;

        @media screen and (max-width: 1439px) {
          padding-bottom: 16px;
        }
      }

      .card-section {
        padding: 0;
        display: flex;

        $orderImageSectionWidth-size-1: 144px;
        $orderImageSectionWidth-size-2: 110px;
        $orderImageSectionWidth-size-3: 72px;

        .order-image-section {
          height: $orderImageSectionWidth-size-1;
          width: $orderImageSectionWidth-size-1;
          padding: 0;
          margin-right: 20px;

          @media screen and (max-width: 1439px) {
            margin-right: 16px;
          }

          @media screen and (max-width: 1023px) {
            width: $orderImageSectionWidth-size-2;
            height: $orderImageSectionWidth-size-2;
          }

          @media screen and (max-width: 599px) {
            width: $orderImageSectionWidth-size-3;
            height: $orderImageSectionWidth-size-3;
            margin-right: 8px;
          }

          .order-image-container {
            width: 100%;
            border-radius: 10px;
            background: #F6F9FF;

            @media screen and (max-width: 599px) {
              margin-top: 34px;
            }

            :deep(.order-image) {
              width: 100%;
              border-radius: 10px;
            }
          }
        }

        .product-text-info {
          flex-direction: column;
          width: calc( 100% - #{$orderImageSectionWidth-size-1} );
          @media screen and (max-width: 1023px) {
            width: calc( 100% - #{$orderImageSectionWidth-size-2} );
          }

          @media screen and (max-width: 599px) {
            width: calc( 100% - #{$orderImageSectionWidth-size-3} );
          }
          .order-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 24px;
            margin-bottom: 10px;
            max-width: 100%;

            @media screen and (max-width: 1023px) {
              margin-bottom: 12px;
            }

            @media screen and (max-width: 599px) {
              justify-content: flex-end;
              align-items: normal;
              margin-bottom: 8px;
            }

            .title {
              font-style: normal;
              font-weight: 600;
              font-size: 16px;
              line-height: 25px;
              letter-spacing: -0.03em;
              color: #434765;
              width: 100%;

              &.floating {
                width: 200px;
                max-width: 100%;
              }

              @media screen and (max-width: 599px) {
                position: absolute;
                padding-right: 36px;
                font-size: 14px;
              }
            }
          }

          .product-information {
            margin-bottom: 3px;

            @media screen and (max-width: 1439px) {
              margin-bottom: 0;
            }

            @media screen and (max-width: 599px) {
              margin-bottom: 5px;
            }

            .product-info {
              display: flex;
              align-items: center;
              margin-bottom: 8px;

              @media screen and (max-width: 1439px) {
                margin-bottom: 9px;
              }

              @media screen and (max-width: 1023px) {
                margin-bottom: 7px;
              }

              @media screen and (max-width: 599px) {
                margin-bottom: 6px;
              }

              .info-icon {
                font-size: 12px;
                margin-right: 6px;
                color: #65677f;
              }

              .info-value {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px;
                color: #65677f;
              }
            }
          }
        }
      }

      .card-actions {
        padding: 0;
        display: flex;
        justify-content: left;

        .product-details {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: -32px;
          margin-left: 164px;

          @media screen and (max-width: 1439px) {
            margin-left: 160px;
          }

          @media screen and (max-width: 1023px) {
            flex-direction: column;
            align-items: flex-end;
            margin-left: 0;

          }

          @media screen and (max-width: 599px) {
            margin-top: 0;
          }

          .price-container {
            display: flex;
            align-items: center;

            .discount-part {
              display: flex;
              align-items: center;

              @media screen and (max-width: 599px) {
                margin-right: 6px;
              }

              .discount-percent {
                text-align: center;
                padding: 3px 0;
                background: #e86562;
                font-size: 12px;
                width: 30px;
                height: 20px;
                border-radius: 6px 6px 0 6px;
                margin-right: 6px;
                color: white;

                @media screen and (max-width: 1439px) {
                  margin-right: 4px;

                }
              }

              .base-price {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                text-decoration-line: line-through;
                color: #E86562;
                margin-right: 19px;

                @media screen and (max-width: 1023px) {
                  margin-right: 8px;
                }

                @media screen and (max-width: 599px) {
                  text-align: left;
                }
              }
            }

            .final-part {
              display: flex;
              align-items: center;

              .final-price {
                font-style: normal;
                font-weight: 600;
                font-size: 18px;
                line-height: 28px;
                color: #434765;
                margin-right: 4px;

                @media screen and (max-width: 1439px) {
                  margin-right: 2px;
                }

              }

              .toman {
                font-style: normal;
                font-weight: 400;
                font-size: 14px;
                line-height: 22px;
                color: #434765;
              }
            }
          }

          .action-buttons {
            display: flex;
            align-items: center;
            width: 100%;
            justify-content: flex-end;

            .link {
              font-weight: 600;
              font-size: 12px;
              line-height: 19px;
              color: $primary;
              cursor: pointer;
              text-decoration: none;
              margin-right: 24px;

              @media screen and (max-width: 1439px) {
                margin-right: 12px;
              }

              @media screen and (max-width: 1023px) {
                margin-right: 24px;
              }

              @media screen and (max-width: 599px) {
                margin-right: 40px;
              }
            }

            .details-expansion {
              margin-left: 24px;

              @media screen and (max-width: 1439px) {
                margin-left: 12px;
              }

              @media screen and (max-width: 1023px) {
                margin-left: 0;
              }

              .details-button {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px;
                color: #65677F;

                &:deep(.q-icon) {
                  font-size: 14px;
                  margin-left: 2px;
                }
              }

              &.open-expansion-style {
                width: 100%;
              }

              &.close-expansion-style {
                .details-expansion-card {
                  display: none;
                }
              }

              .details-expansion-card {
                margin-bottom: 20px;

                @media screen and (max-width: 1439px) {
                  margin-bottom: 16px;
                }

                @media screen and (max-width: 599px) {
                  margin-bottom: 12px;
                }

                .details-expansion-card-section {
                  padding: 0;
                  margin: 20px 0 20px 0;

                  @media screen and (max-width: 599px) {
                    margin: 16px 0 16px 0;
                  }

                  .pamphlet {
                    padding: 0 16px;
                    background: #FFFFFF;
                    border: 1.5px solid #E4E8EF;
                    border-radius: 8px;
                    height: 40px;
                    margin-bottom: 10px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    flex-flow: row;
                    flex-wrap: wrap;

                    @media screen and (max-width: 599px) {
                      flex-direction: column;
                      padding: 10px 12px;
                      height: 68px;
                    }

                    .title {
                      font-style: normal;
                      font-weight: 400;
                      font-size: 12px;
                      line-height: 19px;
                      letter-spacing: -0.03em;
                      color: #6D708B;
                      padding-right: 10px;
                      width: calc( 100% - 100px );
                    }

                    .right-part {
                      display: flex;
                      align-items: center;
                      width: 100px;
                      justify-content: space-between;

                      .price {
                        font-style: normal;
                        font-weight: 400;
                        font-size: 12px;
                        line-height: 19px;
                        color: #6D708B;
                      }

                      .hidden-trash-button {
                        display: none
                      }

                      .trash-button {
                        &:deep(.q-icon) {
                          font-size: 14px;
                          color: #6D708B;;
                        }
                      }
                    }
                  }
                }

                .details-expansion-actions {
                  display: flex;
                  justify-content: flex-end;
                  align-items: center;
                  padding: 0;

                  .expansion-link {
                    margin-right: 24px;
                  }
                }
              }

              &:deep(.hide-expansion-header) {
                display: none;
              }

              &:deep(.q-item__label) {
                font-style: normal;
                font-weight: 400;
                font-size: 12px;
                line-height: 19px !important;
                color: #65677F;
              }

              &:deep(.q-item__section--main ~ .q-item__section--side) {
                padding-left: 0;
              }

              &:deep(.q-item) {
                padding: 0;
              }

              &:deep(.q-icon) {
                font-size: 24px;
                margin-left: 2px;
              }
            }

            &:deep(.q-btn) {
              min-height: 24px !important;

              &.trash-button {
                width: 24px;
                border-radius: 100%;
              }
            }
          }

          &.expanded {
            .action-buttons {
              .go-product {
                color: $grey-9 !important;
                display: none;
              }
            }
            flex-direction: column;
            margin-top: 0;
          }

        }
      }
    }
  }
}

.delete-dialog {
  .delete-dialog-card {
    width: 348px;
    max-width: 100%;
    background: #FFFFFF;
    border-radius: 10px;
    text-align: end;

    .delete-dialog-card-section {
      padding: 0 24px 24px 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .info-icon {
        font-size: 58px;
        color: #E86562;
      }

      .are-u-sure-statement {
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        line-height: 25px;
        text-align: center;
        color: #23263B;
      }
    }

    .delete-dialog-card-actions {
      padding: 24px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 360px) {
        justify-content: center;
      }

      .surely-delete-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 144px;
        height: 40px;
        @media screen and (max-width: 599px) {
          order: 1;
          width: 100%;
          margin-bottom: $space-2;
          margin-left: $spacing-none;
        }
      }

      .dont-delete-button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 144px;
        height: 40px;

        @media screen and (max-width: 599px) {
          order: 2;
          width: 100%;
        }

        @media screen and (max-width: 360px) {
          margin: 16px 0;
        }
      }
    }
  }
}
</style>
