<template>
  <q-card
    class="product-item-box"
  >
    <div class="img-box">
      <!--      <router-link-->
      <!--        :to="product.url"-->
      <!--      >-->
      <!--        <img-->
      <!--          :src="product.photo"-->
      <!--          alt="product"-->
      <!--        />-->
      <!--      </router-link>-->
      <img
        :src="product.photo"
        alt="product"
      />
    </div>
    <div class="product-content-box">
      <div class="main-title">
        <!--          <router-link-->
        <!--            :to="product.url"-->
        <!--          >-->
        <!--            <span class="title-text">-->
        <!--              {{ product.name }}-->
        <!--            </span>-->
        <!--          </router-link>-->
        <span class="title-text">
          {{ product.title }}
        </span>
      </div>
      <div class="price-box">
        <div class="price-info">
          <div
            v-if="product.price['final'] !== product.price['base']"
            class="discount">
            <span>
              %{{ ((1 - (product.price['final'] / product.price['base'])) * 100).toFixed(0) }}
            </span>
          </div>
          <div class="main-price">{{ (product.price['base']) }}</div>
          <div class="final-price-box">
            <div class="final-price">
              {{ (product.price['final']) }}
            </div>
            <div class="price-Toman">
              تومان
            </div>
          </div>
        </div>
      </div>
      <div class="action-box">
        <div class="more-detail product-more-detail">
          <!--            <router-link-->
          <!--              :to="product.url"-->
          <!--            >-->
          <!--              <span>توضیحات</span>-->
          <!--              <span class="more">بیشتر</span>-->
          <!--            </router-link>-->
          <span> توضیحات </span>
          <span class="more">بیشتر</span>
        </div>
        <q-btn
          :productId="product.id"
          :data-product-id="product.id"
          class="btn-style flex"
        >
          <div class="row items-center">
            <div class="row items-center ">
              <img src="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product&#45;&#45;section-add-square.png"
                   alt="add icon">
            </div>
            <span>ثبت نام</span>
          </div>

        </q-btn>
        <!--          <q-btn-->
        <!--            class="btn-style active hide"-->
        <!--          >-->
        <!--            <div class="content">-->
        <!--              <q-img-->
        <!--                src="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product--section-tick-square.png" />-->
        <!--              اضافه شد-->
        <!--            </div>-->
        <!--          </q-btn>-->
      </div>
    </div>
  </q-card>
</template>

<script>
import { Product } from 'src/models/Product'

export default {
  name: 'product-item',
  data: () => ({
    product: new Product()
  }),
  props: {
    data: {
      type: Product,
      default: new Product()
    }
  },
  created () {
  },
  mounted () {
    this.product = new Product(this.data)
  },
  methods: {}
}

</script>

<style scoped lang="scss">

.product-item-box {
  width: 260px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 20px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(46, 56, 112, 0.05);
  background-color: #ffffff;

  .img-box {
    border-radius: inherit;
    box-shadow: none;
    width: 100%;
    height: 270px;
    img {
      width: inherit;
      border-radius: 20px 20px 0 0;
    }
  }

  .product-content-box {
    padding: 10px 16px 16px 16px;

    .main-title {
      margin-bottom: 5px;

      a {
        margin-bottom: 0;
      }
      .title-text {
        font-weight: 500;
        font-size: 14px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: #333333;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

    .price-box {
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 13px;

      .add-cart-info {
        display: flex;
        justify-content: center;
        align-items: center;

        .add-cart-icon {
          width: 19px;
          order: 1;
        }
      }

      .price-info {
        display: flex;
        justify-content: center;
        align-items: baseline;

        .final-price-box {
          display: flex;
          justify-content: center;
          align-items: center;

          .final-price {
            margin-left: 4px;
            font-size: 16px;
            font-weight: 500;
            line-height: 28px;
          }
        }

        .main-price {
          color: #ff5050;
          text-decoration: line-through;
          margin-left: 12px;
          font-size: 12px;
        }

        .price-Toman {
          font-size: 10px;
          font-weight: 500;
          line-height: 17px;
        }
      }
    }

    .action-box {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .more-detail {
        font-weight: 500;
        font-size: 12px;
        line-height: 21px;
        color: #666666;
        cursor: pointer;

        a {
          text-decoration: none;
          color: inherit;
        }
      }

      .btn-style {
        width: 116px;
        height: 40px;
        background-color: #4CAF50;
        border-radius: 10px;
        border: none;
        color: white;
        font-size: 14px;
        letter-spacing: -0.03em;
        img {
          width: 15px;
          height: 15px;
          margin-right: 7px;
        }

        .content {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .active {
          border: 2px solid #4CAF50;
          color: #4CAF50;
          background-color: white;
        }
      }
    }

    .discount {
      width: 36px;
      height: 22px;
      border-radius: 6px 6px 6px 0;
      background-color: #E05555;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-left: 5px;

      span {
        color: white;
        font-weight: 500;
        font-size: 14px;
        padding-top: 3px;
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .product-item-box {
    .img-box {
      .img {
      }
    }

    .product-content-box {
      .main-title {
        a {
        }

        .title-box {
          .title-text {
          }
        }
      }

      .price-box {
        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
            }
          }

          .main-price {
          }

          .price-Toman {
          }
        }
      }

      .action-box {
        .more-detail {
          a {
          }
        }

        .btn-style {
          width: 102px;

          img {
            margin-left: 0;
          }

          .content {
          }

          .active {
          }
        }
      }

      .discount {
        span {
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {

}

@media screen and (max-width: 575px) {
  .product-item-box {
    width: 310px;
    min-height: 120px;
    max-height: 120px;
    display: flex;
    border-radius: 18px;
    margin-bottom: 16px;
    padding: 10px;

    .img-box {
      width: 100px;
      img {
        border-radius: 10px;
      }
    }

    .product-content-box {
      padding: 0 0 0 16px;
      width: 100%;

      .main-title {
        margin-bottom: 0;

        a {
        }

        .title-box {
          height: 44px;
          justify-content: center;

          .title-text {
            -webkit-line-clamp: 2;
          }
        }
      }

      .price-box {
        margin-bottom: 0;

        .add-cart-info {
          .add-cart-icon {
          }
        }

        .price-info {
          .final-price-box {
            .final-price {
              margin-left: 2px;
            }
          }

          .main-price {
            margin-left: 4px;
          }

          .price-Toman {
          }
        }
      }

      .action-box {
        .more-detail {
          a {
          }

          .more {
            display: none;
          }
        }

        .btn-style {
          width: 100px;
          height: 25px !important;
          border-radius: 8px;
          img {
            margin-left: 0;
          }

          .content {
          }

          .active {
          }
        }
      }

      .discount {
        height: 20px;
        margin-left: 3px;

      }
    }
  }
}

</style>
