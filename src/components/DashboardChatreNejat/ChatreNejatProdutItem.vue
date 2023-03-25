<template>
  <q-card class="custom-card product-item-card"
          flat
          bordered>
    <q-card-section horizontal
                    class="product-base-section">
      <img v-if="$q.screen.gt.xs"
           :src="product.photo"
           class="product-item-image">
      <q-card-section :horizontal="$q.screen.gt.xs"
                      class="product-item-info">
        <img v-if="$q.screen.lt.sm"
             :src="product.photo"
             class="product-item-image">
        <q-card-section class="product-info">
          <div class="product-item-title ellipsis">
            {{ product.title }}
          </div>
          <div class="product-item-description">
            {{ product.title }}
          </div>
          <div class="product-item-teacher">
            <q-icon name="account_circle"
                    class="q-mr-xs"
                    size="16px" />
            {{ product.attributes?.info?.teacher[0] }}
          </div>
        </q-card-section>
        <q-card-section v-if="$q.screen.gt.xs"
                        class=" flex"
                        style="width: 100%;max-width: 350px;">
          <q-separator spaced
                       :vertical="$q.screen.gt.sm"
                       inset />
          <div class="last-content">
            <div class="last-content-pre">
              آخرین جلسه دیده شده :
            </div>
            <div class="last-content-title ellipsis">
              {{ product.last_content_user_watched?.title }}
            </div>
            <div class="last-content-footer">
              <div class="last-content-section ellipsis">
                <q-icon name="menu_book" />
                {{ product.title }}
              </div>
              <div class="last-content-link">
                <q-btn flat
                       icon-right="chevron_left"
                       :to="{ name: 'UserPanel.Asset.ChatreNejat.ProductPage', params: {productId: product.id} }">مشاهده</q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section v-if="$q.screen.lt.sm"
                      class=" flex"
                      style="width: 100%;padding: 0;">
        <q-separator spaced
                     style="width:100%"
                     inset />
        <div class="last-content">
          <div class="last-content-pre">
            آخرین جلسه دیده شده :
          </div>
          <div class="last-content-title ellipsis">
            {{ product.last_content_user_watched?.title }}
          </div>
          <div class="last-content-footer">
            <div class="last-content-section ellipsis">
              <q-icon name="menu_book" />
              {{ product.title }}
            </div>
            <div class="last-content-link">
              <q-btn flat
                     icon-right="chevron_left"
                     :to="{ name: 'UserPanel.Asset.ChatreNejat.ProductPage', params: {productId: product.id} }"
                     @click="setSelectedProduct">مشاهده</q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-actions v-if="$q.screen.gt.xs"
                      vertical
                      align="right">
        <!--        icon="more_vert"-->
        <q-btn flat>
          <q-menu fit
                  anchor="top right"
                  self="top left">
                  <!--            <q-item clickable>-->
                  <!--              <q-item-section>گزینه اول</q-item-section>-->
                  <!--            </q-item>-->
                  <!--            <q-item clickable>-->
                  <!--              <q-item-section>نمیدونم</q-item-section>-->
                  <!--            </q-item>-->
          </q-menu>
        </q-btn>
      </q-card-actions>
    </q-card-section>
    <q-card-actions v-if="$q.screen.lt.sm"
                    vertical
                    align="right">
      <!--       icon="more_vert"-->
      <q-btn flat>
        <q-menu fit
                anchor="top right"
                self="top left">
                <!--          <q-item clickable>-->
                <!--            <q-item-section>گزینه اول</q-item-section>-->
                <!--          </q-item>-->
                <!--          <q-item clickable>-->
                <!--            <q-item-section>نمیدونم</q-item-section>-->
                <!--          </q-item>-->
        </q-menu>
      </q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
import { Product } from 'src/models/Product.js'

export default {
  name: 'ChatreNejatProductItem',
  props: {
    product: {
      type: Object,
      default: new Product()
    }
  },
  methods: {
    setSelectedProduct(product) {
      this.$store.dispatch('setSelectedProduct', product)
    }
  }
}
</script>
<style lang="scss" scoped>
.product-item-card {
  max-height: 148px;
  border-radius: 20px;
  background: #fff;
  width: 90%;
  margin: 10px;
  padding: 24px 5px 24px 30px;
  box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media only screen and (max-width: 1024px) {
    padding: 10px 5px 10px 15px;
  }

  @media only screen and (max-width: 600px) {
    max-height: 217px;
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

    @media only screen and (max-width: 1700px) {
      width: 100%;
    }
    @media only screen and (max-width: 1450px) {
      width: 80%;
    }
    @media only screen and (max-width: 1024px) {
      width: 100%;
    }
    @media only screen and (max-width: 900px) {
      width: 80%;
    }
    @media only screen and (max-width: 600px) {
      display: block;
      width: 85%;
    }

    .product-item-info {
      width: 100%;
      display: flex;

      @media only screen and (max-width: 600px) {
        padding: 0;
      }
    }

    .product-item-image {
      width: 80px;
      height: 80px;
      background: #CACACA;
      border-radius: 10px !important;
      margin: auto;
      min-width: 80px;

      @media only screen and (max-width: 600px) {
        margin: 0 0 0 17px;
      }
    }

    .product-info {
      min-width: 35%;

      @media only screen and (max-width: 600px) {
        min-width: 70%;
      }

      .product-item-title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -0.03em;
        color: #333333;

        @media only screen and (max-width: 600px) {
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
        color: #333333;
        margin-bottom: 24px;

        @media only screen and (max-width: 600px) {
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

        @media only screen and (max-width: 600px) {
          font-size: 10px;
          line-height: 12px;
        }
      }
    }

    .last-content {
      margin-left: 24px;
      width: 85%;

      @media only screen and (max-width: 600px) {
          width: 100%;
        }

      .last-content-pre {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        letter-spacing: -0.03em;
        color: #666666;

        @media only screen and (max-width: 600px) {
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
        color: #333333;
        margin-bottom: 10px;
        width: 80%;

        @media only screen and (max-width: 600px) {
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

        .last-content-link {
          font-style: normal;
          font-weight: 400;
          font-size: 14px;
          line-height: 22px;
          letter-spacing: -0.03em;
          color: #333333;
        }
      }
    }
  }
}
</style>
