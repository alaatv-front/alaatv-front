<template>
  <div
    class="product-item-box"
  >
    <q-card class="img-box">
      <!--      <router-link-->
      <!--        :to="product.url"-->
      <!--      >-->
      <!--        <img-->
      <!--          :src="product.photo"-->
      <!--          alt="product"-->
      <!--        />-->
      <!--      </router-link>-->
      <q-img
        :src="product.photo"
        class="img"
        alt="product"
      />
    </q-card>
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
          label="ثبت نام"
        >
          <!--          <q-img-->
          <!--            src="https://nodes.alaatv.com/upload/landing/28/productSection/landing-taftan-product&#45;&#45;section-add-square.png" />-->
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
  </div>
</template>

<script>
import { Product } from 'src/models/Product'

export default {
  name: 'product-item',
  data: () => ({
    product: new Product()
  }),
  props: {
    productData: {
      type: Product,
      default: new Product()
    }
  },
  created () {
  },
  mounted () {
    this.product = new Product(this.productData)
  },
  methods: {}
}

</script>

<style scoped lang="scss">

.product-item-box {
  width: 260px;
  margin-bottom: 25px;
  position: relative;
  border-radius: 20px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(46, 56, 112, 0.05);
  background-color: #ffffff;

  .img-box {
    border-radius: inherit;
    box-shadow: none;
    .img {
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
        text-align: right;
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
        height: 32px;
        background-color: #4CAF50;
        border-radius: 10px;
        border: none;
        color: white;
        font-size: 14px;
        letter-spacing: -0.03em;
        display: flex;

        img {
          width: 15px;
          height: 15px;
          margin-left: 7px;
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
  //.landing-content-width {
  //  padding-left: 11px;
  //  padding-right: 11px;
  //}
  .product-item-box {
    min-height: 120px;
    max-height: 120px;
    display: flex;
    border-radius: 18px;
    margin-bottom: 16px;

    .img-box {
      .img {
        border-radius: 0 18px 18px 0;
      }
    }

    .product-content-box {
      padding: 10px 12px 10px 12px;
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
          height: 30px;
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

        span {
        }
      }
    }
  }
}

</style>

<!--<style >-->
<!--.product-item-box {-->
<!--  margin-bottom: 25px;-->
<!--  position: relative;-->
<!--  border-radius: 20px;-->
<!--  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(46, 56, 112, 0.05);-->
<!--  background-color: #ffffff;-->
<!--}-->
<!--.product-item-box .product-content-box {-->
<!--  padding: 10px 16px 14px 16px;-->
<!--}-->

<!--.product-item-box .img-box .img {-->
<!--  border-radius: 20px 20px 0 0;-->
<!--}-->

<!--.product-item-box .img-box * {-->
<!--  width: 100%;-->
<!--}-->

<!--/*&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;title&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;*/-->
<!--.product-item-box .product-content-box  .main-title {-->
<!--  margin-bottom: 2px;-->
<!--}-->

<!--.product-item-box .product-content-box  .main-title a {-->
<!--  margin-bottom: 0;-->
<!--}-->

<!--.product-item-box .product-content-box  .main-title .title-box {-->
<!--  display: flex;-->
<!--  align-items: start;-->
<!--  width: 100%;-->
<!--  height: 24px;-->
<!--}-->

<!--.product-item-box .product-content-box  .main-title .title-box .title-text {-->
<!--  font-weight: 500;-->
<!--  font-size: 14px;-->
<!--  line-height: 24px;-->
<!--  text-align: right;-->
<!--  letter-spacing: -0.03em;-->
<!--  color: #333333;-->
<!--  display: -webkit-box;-->
<!--  -webkit-line-clamp: 1;-->
<!--  -webkit-box-orient: vertical;-->
<!--  text-overflow: ellipsis;-->
<!--  overflow: hidden;-->
<!--}-->

<!--/*-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;img box&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;*/-->
<!--.product-item-box .img-box {-->

<!--  max-height: 260px;-->
<!--}-->

<!--.product-item-box .img-box .img {-->
<!--  max-height: 260px;-->
<!--}-->

<!--/*-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;price box&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;*/-->
<!--.product-item-box .product-content-box  .price-box {-->
<!--  display: flex;-->
<!--  flex-wrap: nowrap;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--  margin-bottom: 13px;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .add-cart-info {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .price-info {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: baseline;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .price-info .final-price-box {-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--}-->

<!--.product-item-box .discount {-->
<!--  width: 36px;-->
<!--  height: 22px;-->
<!--  border-radius: 6px 6px 6px 0;-->
<!--  background-color: #E05555;-->
<!--  display: flex;-->
<!--  justify-content: center;-->
<!--  align-items: center;-->
<!--  margin-left: 5px;-->
<!--}-->

<!--.product-item-box .discount span {-->
<!--  color: white;-->
<!--  font-weight: 500;-->
<!--  font-size: 14px;-->
<!--  padding-top: 3px;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .price-info .main-price {-->
<!--  color: #ff5050;-->
<!--  text-decoration: line-through;-->
<!--  margin-left: 12px;-->
<!--  font-size: 12px;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .price-info .final-price-box .final-price {-->
<!--  margin-left: 4px;-->
<!--  font-size: 16px;-->
<!--  font-weight: 500;-->
<!--  line-height: 28px;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .price-Toman {-->
<!--  font-size: 10px;-->
<!--  font-weight: 500;-->
<!--  line-height: 17px;-->
<!--}-->

<!--.product-item-box .product-content-box  .price-box .add-cart-info .add-cart-icon {-->
<!--  width: 19px;-->
<!--  order: 1;-->
<!--}-->

<!--/*-&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45; action-box &#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;&#45;*/-->
<!--.product-item-box .product-content-box  .action-box {-->
<!--  display: flex;-->
<!--  justify-content: space-between;-->
<!--  align-items: center;-->
<!--}-->

<!--.product-item-box .product-content-box  .action-box .more-detail {-->
<!--  font-weight: 500;-->
<!--  font-size: 12px;-->
<!--  line-height: 21px;-->
<!--  color: #666666;-->
<!--  cursor: pointer-->
<!--}-->

<!--.product-item-box .product-content-box  .action-box .more-detail a {-->
<!--  text-decoration: none;-->
<!--  color: inherit;-->
<!--}-->

<!--.product-item-box .product-content-box  .action-box .btn-style {-->
<!--  width: 116px;-->
<!--  height: 32px;-->
<!--  background-color: #4CAF50;-->
<!--  border-radius: 10px;-->
<!--  border: none;-->
<!--  color: white;-->
<!--  font-size: 14px;-->
<!--  letter-spacing: -0.03em;-->
<!--}-->

<!--.product-item-box .product-content-box  .action-box .btn-style .content{-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->

<!--.product-item-box .product-content-box  .action-box .btn-style img {-->
<!--  width: 15px;-->
<!--  height: 15px;-->
<!--  margin-left:7px;-->
<!--}-->

<!--.product-item-box .product-content-box  .action-box .active {-->
<!--  border: 2px solid #4CAF50;-->
<!--  color: #4CAF50;-->
<!--  background-color: white;-->
<!--}-->

<!--@media screen and (max-width: 992px){-->
<!--  .product-item-box .img-box {-->

<!--    max-height: 230px;-->
<!--  }-->

<!--  .product-item-box .img-box .img {-->
<!--    max-height: 230px;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .action-box .btn-style {-->
<!--    width: 102px;-->
<!--  }-->
<!--  .product-item-box .product-content-box  .action-box .btn-style img {-->
<!--    margin-left: 0;-->
<!--  }-->
<!--}-->
<!--@media screen and (max-width: 768px){-->
<!--  .product-item-box .img-box {-->
<!--    max-height: 241px;-->
<!--  }-->

<!--  .product-item-box .img-box .img {-->
<!--    max-height: 241px;-->
<!--  }-->
<!--}-->

<!--@media screen and (max-width: 575px) {-->
<!--  .landing-content-width {-->
<!--    padding-left: 11px;-->
<!--    padding-right: 11px;-->
<!--  }-->

<!--  .product-item-box {-->
<!--    min-height: 120px;-->
<!--    max-height: 120px;-->
<!--    display: flex;-->
<!--    border-radius: 18px;-->
<!--    margin-bottom: 16px;-->
<!--  }-->

<!--  .product-item-box .img-box {-->
<!--    min-width: 120px;-->
<!--    min-height: 120px;-->
<!--    max-width: 120px;-->
<!--    max-height: 120px;-->
<!--  }-->

<!--  .product-item-box .img-box .img {-->
<!--    border-radius: 0 18px 18px 0;-->
<!--    min-width: 120px;-->
<!--    min-height: 120px;-->
<!--    max-width: 120px;-->
<!--    max-height: 120px;-->
<!--  }-->

<!--  .product-item-box .product-content-box {-->
<!--    padding: 10px 12px 10px 12px;-->
<!--    width: 100%;-->
<!--  }-->

<!--  .action-box .more-detail .more {-->
<!--    display: none;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .action-box .btn-style {-->
<!--    width: 100px;-->
<!--    height: 30px;-->
<!--    border-radius: 8px;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .action-box .btn-style .tick {-->
<!--  }-->

<!--  .product-item-box .discount {-->
<!--    height: 20px;-->
<!--    margin-left: 3px;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .main-title .title-box {-->
<!--    height: 44px;-->
<!--    justify-content: center;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .main-title {-->
<!--    margin-bottom: 0;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .main-title .title-box .title-text {-->
<!--    -webkit-line-clamp: 2;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .price-box {-->
<!--    margin-bottom: 0;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .price-box .price-info .main-price {-->
<!--    margin-left: 4px;-->
<!--  }-->

<!--  .product-item-box .product-content-box  .price-box .price-info .final-price-box .final-price {-->
<!--    margin-left: 2px;-->
<!--  }-->
<!--}-->
<!--</style>-->
