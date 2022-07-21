<template>
  <q-card flat
          class="content-box q-mb-md">
    <a
      :href="'https://alaatv.com/c/'+ data.id"
      class="m-link"
    >
      <div class="pic">
        <img
          :src="data.photo"
          :alt="data.title"
          class="content-image  videoImage"
        />
      </div>
    </a>
    <a
      :href="'https://alaatv.com/c/'+ data.id"
      class="m-link content-link"
    >
      <div class="flex items-center">
        <div class="videoOrder-title text-primary q-mr-sm">جلسه</div>
        <q-avatar color="primary"
                  size="lg"
                  text-color="white">
          <div class="videoOrder-number">{{ data.order }}</div>
        </q-avatar>
      </div>

      <div class="content">
        <div class="title">
          <p>
            {{ data.set ? data.set.short_title : '' }}
          </p>
        </div>
        <div class="details">
          <div class="videoDetaileWrapper">
            <span>
              <svg
                viewBox="0 0 24 24"
                preserveAspectRatio="xMidYMid meet"
                focusable="false"
                class="style-scope yt-icon"
              >
                <path
                  d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
                  class="style-scope yt-icon">
                </path>
              </svg>
            </span>

            <span>
              از دوره ی
            </span>
            <span class="content-description">
              {{ data.set ? data.set.title : '' }}
            </span>
            <br>
            <i
              class="fa fa-calendar-alt m--margin-right-5"
              data-toggle="m-tooltip"
              data-placement="top"
              data-original-title="تاریخ بروزرسانی"
            />
            <span class="content-description">
              {{ data.updated_at }}
            </span>
            <div class="videoOrder">
              <div class="videoOrder-title">جلسه</div>
              <div class="videoOrder-number">{{ data.order }}</div>
              <div class="videoOrder-om"> اُم</div>
            </div>
          </div>
          <div class="videoDescription content-description">
            **{{ data.title }}
          </div>
        </div>
      </div>
    </a>
    <div class="content-hover"></div>
  </q-card>
</template>

<script>
import { Content } from 'src/models/Content'

export default {
  name: 'Contents',
  props: {
    data: {
      type: Content,
      default: () => {
        return new Content()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
//#212529

.content-box {
  border-radius: 15px;
  min-height: 170px;
  max-height: 170px;
  display: flex;
  @media screen and (max-width: 1024px) {
    max-height: none;
    flex-direction: column;
  }

  .pic {
    width: 300px !important;
    position: relative;
    z-index: 5;
    @media screen and (max-width: 1024px) {
      width: 100% !important;
    }

    img {
      width: 300px;
      border-radius: 15px 0 0 15px;

      @media screen and (max-width: 1024px) {
        border-radius: 15px 15px 0 0 !important;
        width: 100% !important;

      }
    }

  }

  .content-link {
    width: 100%;

    .content {
      width: 100%;

      .title {

      }

      .details {
        .videoDetaileWrapper{
          .style-scope{
            width: 36px;
          }
        }

        .content-description {
          font-size: 1.2rem;
          font-weight: 300;
          @media screen and (max-width: 500px) {
            font-size: 12px !important;
          }
        }
      }

    }
  }
  &:hover .content-hover{
    background-color: #ff8e0017;
    border-radius: 15px;
    width: 100% !important;
  }
  .content-hover {
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    z-index: 1;
    transition: all 0.7s;
  }
}

//.item {
//    display: flex;
//    flex-direction: row;
//    height: 180px;
//    @media screen and (max-width: 1904px) {
//        height: 150px;
//    }
//    @media screen and (max-width: 1264px) {
//        height: 140px;
//    }
//    @media screen and (max-width: 960px) {
//        flex-direction: column;
//        height: 525px;
//    }
//    @media screen and (max-width: 600px) {
//        height: 390px;
//    }
//    @media screen and (max-width: 350px) {
//        height: 416px;
//    }
//
//    .image-box {
//        width: 320px;
//        height: 100%;
//        @media screen and (max-width: 1904px) {
//            width: 243px;
//        }
//        @media screen and (max-width: 1264px) {
//            width: 198px;
//        }
//        @media screen and (max-width: 960px) {
//            height: 335px;
//            width: 100%;
//        }
//        @media screen and (max-width: 600px) {
//            height: 197px;
//        }
//        @media screen and (max-width: 350px) {
//            height: 177px;
//        }
//
//        .content-image {
//            width: 100%;
//            height: 100%;
//        }
//    }
//
//    .content {
//        height: 100%;
//        @media screen and (max-width: 960px) {
//            height: 191px;
//            width: 100%;
//        }
//        @media screen and (max-width: 600px) {
//            height: 208px;
//        }
//        @media screen and (max-width: 350px) {
//            height: 211px;
//        }
//
//        .details {
//            .videoOrder {
//                .videoOrder-number {
//
//                }
//            }
//        }
//    }
//}

</style>
