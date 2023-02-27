<template>
  <q-card class="content-item-box"
          :style="{minWidth: options.minWidth}">
    <router-link :to="{
      name: 'Public.Content.Show',
      params: { id: content.id ? content.id : -1 }
    }">
      <div class="img-box">
        <div class="img-title-container">
          <lazy-img :src="content.photo"
                    :alt="content.title"
                    class="img"
                    width="16"
                    height="9" />
        </div>
        <div class="play-btn">
          <div class="play-icon" />
        </div>
      </div>
      <div class="content-content-box">
        <div class="main-title ellipsis-2-lines">
          {{ content.title }}
        </div>
      </div>
    </router-link>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'contentItem',
  components: { LazyImg },
  props: {
    options: {
      type: Object,
      default: () => {
        return {
          style: {},
          minWidth: 'auto',
          content: new Content()
        }
      }
    }
  },
  data: () => ({
    content: new Content()
  }),
  created () {
    if (!this.options.content) {
      this.content = new Content(this.options)
    } else {
      this.content = new Content(this.options.content)
    }
  }
}
</script>

<style lang="scss" scoped>
.content-item-box {
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  width: 260px;
  margin-bottom: 10px;
  position: relative;
  border-radius: 20px;
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6),
  2px 4px 10px rgba(46, 56, 112, 0.05);
  background-color: #ffffff;
  top: 0;
  transition: all ease 0.5s;

  &:hover {
    box-shadow: -5px -6px 10px rgba(255, 255, 255, 0.6),
    5px 5px 20px rgba(0, 0, 0, 0.1);
    top: -10px;

    .img-box .img-videos {
      opacity: 0.6;
    }
  }

  &:hover .play-btn {
    opacity: 1;
    background: #ffc107;
    transition: opacity ease 0.5s;
  }

  &.q-card {
    //min-width: 318px;
  }

  .img-box {
    position: relative;

    .img-title-container {
      border-radius: inherit;
      box-shadow: none;
      width: 100%;

      .img {
        width: inherit;
        border-radius: 20px 20px 0 0;
      }
    }

    .img-videos {
      background: #000000;
      color: white;
      opacity: 0;
      position: absolute;
      width: 100%;
      height: 40px;
      top: 140px;
      display: flex;
      align-items: center;
      padding-right: 12.19px;
      padding-left: 14px;
      justify-content: space-between;
      transition: all ease 0.5s;
    }
  }

  .content-content-box {
    padding: 10px 16px 16px 16px;

    .main-title {
      font-style: normal;
      font-weight: 400;
      font-size: 16px;
      line-height: 24px;
      letter-spacing: -0.03em;
      margin-bottom: 15px;

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
      margin-top: 21px;

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
            font-style: normal;
            font-weight: 400;
            font-size: 18px;
            line-height: 18px;
            text-align: center;
            letter-spacing: -0.03em;
            color: #656f7b;
            margin-left: 8px;
          }
        }

        .main-price {
          text-decoration: line-through;
          /* margin-left: 12px; */
          font-style: normal;
          font-weight: 400;
          font-size: 12px;
          line-height: 19px;
          color: #656f7b;

          opacity: 0.4;
        }

        .price-Toman {
          font-size: 12px;
          font-weight: 400;
          line-height: 19px;
          margin-left: 3px;
          color: #656f7b;
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
        background-color: #4caf50;
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
          border: 2px solid #4caf50;
          color: #4caf50;
          background-color: white;
        }
      }
    }

    .discount {
      width: 36px;
      height: 24px;
      border-radius: 6px;
      background-color: #ef5350;
      display: flex;
      justify-content: center;
      align-items: center;

      span {
        color: white;
        font-weight: 500;
        font-size: 14px;
        padding-top: 3px;
      }
    }
  }

  .play-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 60px;
    width: 60px;
    background: #000000;
    opacity: 0.6;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;

    .play-icon {
      background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAAUCAYAAABvVQZ0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAADKSURBVHgBrdRdDcIwFAXgO4KASagFHGwOwEFxABJQMFAwCzjoJOCASpiDci60SyF0W39Och62Nd9u2qREiDGmQU+ooJwwYL7TJ6N2on+JRjdoHfgmUcU/owhsLgLtAD5RSZmYj/YWbXIxH1Wh/YzFXCTKU3Y+moq58OEoB+ZiHMFgKWxKCUyjhxLYDd1VVfXghy2lZUCPQLT/MnayAW2BtL8QRUym0TOA+9yiJWykz75cAY0La99YaNFlLTLF3rJlLkcL7u0lWVNGXs6ulXAPwEiJAAAAAElFTkSuQmCC');
      height: 19px;
      width: 19px;
      margin-right: 5px;
    }
  }

  @media screen and (max-width: 992px) {
    .img-box {
      .img {
      }
    }

    .content-content-box {
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

  @media screen and (max-width: 575px) {
    width: 310px;
    min-height: 120px;
    max-height: 280px;
    display: flex;
    border-radius: 18px;
    margin-bottom: 16px;

    .img-box {
      width: 100%;

      .img {
        border-radius: 10px;
      }
    }

    .content-content-box {
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
        /* margin-left: 3px; */
      }
    }
  }
}
</style>
