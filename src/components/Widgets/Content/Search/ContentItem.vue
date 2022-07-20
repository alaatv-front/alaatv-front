<template>
  <div class="item ">
    <a
      :href="'https://alaatv.com/c/'+ data.id"
      class="m-link"
    >
      <div class="pic">
        <!--            <img-->
        <!--                :src="data.photo"-->
        <!--                :alt="data.title"-->
        <!--                class="content-image lazy-image videoImage lazy-done d-block"-->
        <!--                :a-lazyload="1"-->
        <!--                :data-loaded="true"-->
        <!--            />-->
        <img
          src="https://nodes.alaatv.com/loder.jpg?w=16&h=9"
          :data-src="data.photo"
          :alt="data.title"
          class="content-image lazy-image videoImage  d-block"
          width="16"
          height="9"
        />
      </div>
    </a>
    <a
      :href="'https://alaatv.com/c/'+ data.id"
      class="m-link content-link"
    >
      <div class="content">
        <div class="title">
          <h2>
            {{ data.set ? data.set.short_title : '' }}
          </h2>
        </div>
        <div class="detailes">
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
            {{ data.title }}
          </div>
        </div>
      </div>
    </a>
    <div class="itemHover"></div>
  </div>
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

.lazy-image:not(.lazy-done) {
    -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
    filter: blur(5px);
    transition: all 1.5s;
}
.lazy-image.lazy-done {
    -webkit-filter: blur(0px); /* Safari 6.0 - 9.0 */
    filter: blur(0px);
    transition: all 1.5s;
}
.lazy-image {
    height: auto;
}
.item{
    min-height: 170px;
    @media screen and (max-width: 1024px) {
    }
    .pic{
        width:300px !important;
        @media screen and (max-width: 1024px) {
            width:100% !important;
        }
        img{
            width:300px;
            @media screen and (max-width: 1024px) {
                width:100% !important;
            }
        }

    }
    .content-link{
        width: 100%;
        .content{
            width: 100%;
            .title{
                h2{
                    @media screen and (max-width: 767px) {
                        padding-right:5px
                    }

                }
            }
            .detailes{
                .content-description{
                    font-size: 1.2rem;
                    font-weight: 300;
                    @media screen and (max-width: 500px) {
                        font-size:12px !important;
                    }
                }
            }

        }
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
//        .detailes {
//            .videoOrder {
//                .videoOrder-number {
//
//                }
//            }
//        }
//    }
//}

</style>
