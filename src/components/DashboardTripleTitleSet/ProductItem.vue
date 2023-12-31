<template>
  <q-card class="custom-card product-item-card"
          flat
          bordered>
    <q-card-section horizontal
                    class="product-base-section">
      <q-img v-if="$q.screen.gt.xs"
             :src="product.photo"
             class="product-item-image"
             @click="gotoProductPage(product)" />
      <q-card-section :horizontal="$q.screen.gt.xs"
                      class="product-item-info">
        <q-img v-if="$q.screen.lt.sm"
               :src="product.photo"
               class="product-item-image"
               @click="gotoProductPage(product)" />
        <q-card-section class="product-info">
          <div class="product-item-title ellipsis"
               @click="gotoProductPage(product)">
            {{ product.title }}
          </div>
          <div class="product-item-description">
            {{ product.title }}
          </div>
          <div v-for="(teacher, index) in product.attributes?.info?.teacher"
               :key="index"
               class="product-item-teacher">
            <q-icon name="account_circle"
                    class="q-mr-xs"
                    size="16px" />
            {{ teacher }}
          </div>
          <div class="product-item-progress">
            <div class="progress-description">
              <div class="progress-title">
                پیشرفت دوره
              </div>
              <div class="progress-percent">
                {{ product.contents_progress }}%
              </div>
            </div>
            <div class="progress-bar">
              <q-linear-progress reverse
                                 color="teal-4"
                                 :value="progress"
                                 class="q-mt-md" />
            </div>
          </div>
        </q-card-section>
        <q-card-section v-if="$q.screen.gt.xs"
                        class="last-content-card-section">
          <q-separator spaced
                       :vertical="$q.screen.gt.sm"
                       inset />
          <div class="last-content">
            <div class="last-content-pre">
              آخرین جلسه دیده شده :
            </div>
            <div class="last-content-title ellipsis-2-lines"
                 @click="gotoLastContent(product)">
              {{ product.last_content_user_watched?.title }}
            </div>
            <div class="last-content-footer">
              <div class="last-content-section ellipsis">
                <q-icon name="menu_book" />
                {{ product.title }}
              </div>
              <q-btn flat
                     class="size-md"
                     icon-right="chevron_left"
                     :to="{ name: 'UserPanel.Asset.TripleTitleSet.Content', params: {productId: product.id, setId: product.last_content_user_watched.set.id, contentId: product.last_content_user_watched?.id} }">مشاهده</q-btn>
            </div>

          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section v-if="$q.screen.lt.sm"
                      class="last-content-card-section">
        <q-separator spaced
                     inset />
        <div class="last-content">
          <div class="last-content-pre">
            آخرین جلسه دیده شده :
          </div>
          <div class="last-content-title ellipsis-2-lines"
               @click="gotoLastContent(product)">
            {{ product.last_content_user_watched?.title }}
          </div>
          <div class="last-content-footer">
            <div class="last-content-section ellipsis">
              <q-icon name="menu_book" />
              {{ product.title }}
            </div>
            <q-btn flat
                   class="size-md"
                   icon-right="chevron_left"
                   :to="{ name: 'UserPanel.Asset.TripleTitleSet.Content', params: {productId: product.id, setId: product.last_content_user_watched.set.id, contentId: product.last_content_user_watched?.id} }">مشاهده</q-btn>
          </div>

        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
import { Product } from 'src/models/Product.js'

export default {
  name: 'ProductItem',
  props: {
    product: {
      type: Object,
      default: new Product()
    }
  },
  computed: {
    progress () {
      return (this.product?.contents_progress) / 100
    }
  },
  methods: {
    gotoProductPage (product) {
      this.$router.push({ name: 'UserPanel.Asset.TripleTitleSet.ProductPage', params: { productId: product.id } })
    },
    gotoLastContent (product) {
      this.$router.push({ name: 'UserPanel.Asset.TripleTitleSet.Content', params: { productId: product.id, setId: product.last_content_user_watched.set.id, contentId: product.last_content_user_watched?.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.product-item-card {
  min-height: 148px;
  border-radius: 20px;
  background: #fff;
  padding: 24px 5px 24px 30px;
  box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (width <= 1024px) {
    padding: 10px 5px 10px 15px;
  }

  @media only screen and (width <= 600px) {
    min-height: 217px;
    padding: 10px 5px 10px 15px;
    align-items: flex-start;
    width: 100%;
  }

  .row {
    box-shadow: none;
  }

  .product-base-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: transparent;

    @media only screen and (width <= 600px) {
      display: block;
    }

    .product-item-info {
      width: calc( 100% - 80px );
      display: flex;

      @media only screen and (width <= 600px) {
        padding: 0;
        width: 100%;
      }
    }

    .product-item-image {
      width: 80px;
      height: 80px;
      background: #CACACA;
      border-radius: 10px !important;
      margin: auto;
      min-width: 80px;
      cursor: pointer;

      @media only screen and (width <= 600px) {
        margin: 0 0 0 17px;
      }
    }

    .product-info {
      width: 35%;
      min-width: 35%;

      @media only screen and (width <= 600px) {
        width: calc( 100% - 97px );
        min-width: calc( 100% - 97px );
      }

      .product-item-title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -0.03em;
        color: #333;
        cursor: pointer;

        @media only screen and (width <= 600px) {
          font-size: 16px;
          line-height: 20px;
        }
      }

      .product-item-description {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: -0.02em;
        color: #333;
        margin-bottom: 5px;

        @media only screen and (width <= 600px) {
          font-size: 12px;
          line-height: 16px;
          margin-bottom: 5px;
        }
      }

      .product-item-teacher {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: -0.02em;
        color: #6C6C6C;
        margin-bottom: 10px;

        @media only screen and (width <= 600px) {
          font-size: 10px;
          line-height: 12px;
        }
      }

      .product-item-progress {
        .progress-description {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .progress-title {
            color:#616161;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.24px;
          }

          .progress-percent {
            color:#616161;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.24px;
          }
        }
      }
    }

    .last-content-card-section {
      display: flex;
      width: 65%;
      padding: 0;

      @media only screen and (width <= 600px) {
        width: 100%;
      }

      .last-content {
        padding-left: 24px;
        width: calc( 100% - 17px );
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media only screen and (width <= 600px) {
          padding-left: 0;
        }
        @include media-max-width('md') {
          width: calc( 100% - 34px );
        }

        .last-content-pre {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.03em;
          color: #666;

          @media only screen and (width <= 600px) {
            font-size: 12px;
            line-height: 16px;
          }
        }

        .last-content-title {
          font-style: normal;
          font-weight: 400;
          font-size: 18px;
          line-height: 28px;
          letter-spacing: -0.03em;
          color: #333;
          margin-bottom: 10px;
          max-width: 65%;
          cursor: pointer;

          @media only screen and (width <= 600px) {
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 5px;
            width: 95%;
          }

        }

        .last-content-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .last-content-section {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            letter-spacing: -0.02em;
            color: #6C6C6C;
          }
        }
      }
    }

  }
}
</style>
