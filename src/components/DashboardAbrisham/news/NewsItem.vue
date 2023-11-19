<template>
  <div class="news-item flex justify-between">
    <div class="flex img-title-seen-tag">
      <div class="img-box">
        <q-img v-if="newItem.photo"
               class="img"
               :src="newItem.photo" />
      </div>
      <div class="title-des-seen-tag ">
        <div class="title-box">
          {{ newItem.title }}
        </div>
        <div class="description-box">
          <p class="description-text "
             :class="showMore ? '' : 'single-line ellipsis'"
             v-html="newItem.description" />
        </div>
        <div class="flex items-end seen-tag">
          <div v-if="newItem.tags && newItem.tags !==null"
               class="flex">
            <div v-for="(tag, index) in newItem.tags"
                 :key="index"
                 class="tag">
              {{ tag }}
            </div>
          </div>
          <span class="text">
            {{ newItem.seen_counter }}
          </span>
          <i class="fi fi-rr-eye icon items-center flex" />
        </div>
      </div>
    </div>
    <div class="date-show-more">
      <div class="flex date-box">
        <!--            <q-img-->
        <!--              v-if="pin"-->
        <!--              src="https://nodes.alaatv.com/upload/abrishamDashboard/asset/abrisham-dashboard-news-pin.png"-->
        <!--              class="img"-->
        <!--            />-->
        <q-icon v-if="pin"
                class="pin-color"
                name="push_pin" />
        <div class="date">
          {{ newItem.shamsiDate('created_at').dateTime }}
        </div>
      </div>
      <div v-if="!showMore"
           class="btn-style cursor-pointer"
           @click="showMoreClicked">
        <span class="text">
          مشاهده خبر
        </span>
        <i class="fi fi-rr-angle-down flex icon" />
      </div>
      <div v-if="showMore"
           class="btn-style cursor-pointer"
           @click="showMore = false">
        <span class="text">
          بستن
        </span>
        <i class="flex fi fi-rr-angle-up icon" />
      </div>
    </div>
  </div>
</template>

<script>
import { LiveDescription } from 'src/models/LiveDescription'

export default {
  name: 'NewsItem',
  props: {
    pin: {
      type: Boolean,
      default: false
    },
    newItem: {
      type: LiveDescription,
      default: new LiveDescription()
    }
  },
  data () {
    return {
      showMore: false
    }
  },
  methods: {
    showMoreClicked () {
      this.showMore = true
      this.$emit('seenNews', this.newItem.id)
    }
  }
}
</script>

<style lang="scss" scoped>
.news-item {
  border-radius: 20px !important;
  box-shadow: 0 3px 10px 0 rgb(44 91 185 / 15%) !important;
  width: 100%;
  padding: 16px 16px 16px 25px;

  @media screen and (width <= 768px) {
    padding: 10px 10px 10px 16px;
    border-radius: 15px !important;
    box-shadow: 0 2px 5px 0 rgb(44 91 185 / 15%) !important;
  }

  @media screen and (width <= 576px) {
    padding: 10px !important;
    position: relative;
    margin-bottom: 15px;
  }

  .img-box {
    .img {
      border-radius: 10px;
      width: 108px;
      height: 108px;

      @media screen and (width <= 768px) {
        width: 80px;
        height: 80px;
      }

      @media screen and (width <= 576px) {
        width: 70px;
        height: 70px;
      }
    }
  }

  .title-box {
    font-size: 18px;
    height: 28px;
    line-height: 28px;
    font-weight: 500;
    color: #3e5480;
    margin-bottom: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 100%;

    @media screen and (width <= 768px) {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
      margin-bottom: 5px;
    }

    @media screen and (width <= 576px) {
      height: 49px;
      line-height: 24px;
      -webkit-line-clamp: 2;
    }

  }

  .date-show-more{
    display: grid;
    grid-template-columns: 1fr;
    align-content: space-between;

    .date-box {
      width: 100%;
      justify-content: flex-end;

      @media screen and (width <= 768px) {
        min-width: 100px;
      }

      @media screen and (width <= 576px) {
        min-width: 0;
      }

      .pin-color{
        color: #9fa5c0;
        font-size: 18px;
        margin-right: 5px;

        @media screen and (width <= 576px) {
          display: none;
        }
      }

    }

    .btn-style {
      border-radius: 15px;
      letter-spacing: 0;
      font-weight: normal !important;
      display: flex;
      align-items: center;
      justify-content: flex-end;

      @media screen and (width <= 768px) {
        height: 18px;
      }

      @media screen and (width <= 576px) {
        width: 95px;
        max-height: 19px;
      }

      &:deep(.q-btn){
        height: 19px;
      }

      .icon {
        color: #3e5480;
        font-size: 14px;
        align-items: center;
        font-weight: 600;

        @media screen and (width <= 768px) {
          font-size: 12px;
          align-items: center;
        }

        @media screen and (width <= 576px) {
          font-size: 8px;
        }
      }

      .text {
        margin-right: 10px;
        color: #3e5480;
        font-size: 14px;
        letter-spacing: 0;

        @media screen and (width <= 768px) {
          font-size: 12px;
        }

        @media screen and (width <= 575px) {
          font-size: 10px;
          margin-right: 5px;
        }
      }
    }

    @media screen and (width <= 575px) {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }

  .date {
    font-size: 12px;
    color: #9fa5c0;
    margin-right: 10px;

    @media screen and (width <= 576px) {
      font-size: 10px;
    }
  }

  .icon {
    width: 15px;
    height: 22px;
    color: #9fa5c0;
  }

  .title-des-seen-tag {
    margin: 5px  0  0 16px;

    @media screen and (width <= 768px) {
      margin: 1px 0 0 16px;
    }

    @media screen and (width <= 576px) {
      margin: 1px 0 0 10px;
    }

    .seen-tag{
      @media screen and (width <= 576px) {
        position: absolute;
        bottom: 10px;
        left: 10px;
      }

      .text {
        color: #9fa5c0;

        @media screen and (width <= 768px) {
          font-size: 10px;
          align-items: center;
        }
      }

      .icon {
        font-size: 14px;
        margin-left: 5px;
        color: #9fa5c0;
        height: 15px;

        @media screen and (width <= 768px) {
          font-size: 12px;
        }
      }

      .tag {
        margin-right: 23px;
        padding: 3px 23px;
        font-size: 12px;
        color: #3e5480;
        background-color: #eff3ff;
        border-radius: 13px;

        @media screen and (width <= 768px) {
          padding: 0 14px;
          margin-right: 10px;
        }

        @media screen and (width <= 576px) {
          padding: 0 18px;
        }
      }
    }
  }

  .description-box {
    margin-bottom: 5px;

    .description-text {
      margin-bottom: 6px;
      font-size: 16px;
      color: #9fa5c0;
      transition: all ease-in-out 0.5s;
      max-width: 750px;

      @media screen and (width <= 1200px) {
        max-width: 600px;
      }

      @media screen and (width <= 768px) {
        max-width: 250px;
        margin-bottom: 5px;
        font-size: 12px;
      }

      @media screen and (width <= 576px) {
        max-width: 200px;
        margin-bottom: 0;
        font-size: 12px;
        line-height: 24px;
      }
    }
  }

  .down-part {
    @media screen and (width <= 576px) {
      position: absolute;
      width: 100%;
      right: 10px;
      bottom: 10px;
    }

    .date {
      display: none;
      font-size: 10px;
      color: #9fa5c0;

      @media screen and (width <= 576px) {
        display: flex;
        align-items: center;
      }

      @media screen and (width <= 350px) {

      }
    }

  }
}

</style>
