<template>
  <q-card flat
          class="content-box q-mb-md">
    <div class="row">
      <div class="col-md-3">
        <a :href="'https://alaatv.com/c/'+ data.id"
           class="m-link">
          <div class="content-img-box flex">
            <img :src="data.photo"
                 :alt="data.title"
                 class="content-image  videoImage">
          </div>
        </a>
      </div>
      <div class="col-md-9">
        <a :href="'https://alaatv.com/c/'+ data.id"
           class="m-link content-link">
          <div class="content-order">
            <div class="">
              <div class="videoOrder-title text-primary q-mr-sm">جلسه</div>
              <q-avatar color="primary"
                        size="lg"
                        text-color="white">
                <div class="videoOrder-number">{{ data.order }}</div>
              </q-avatar>
            </div>
          </div>
          <div class="inner-content q-pl-md-md q-px-xs-sm">
            <div class="title q-mt-sm">
              <p>
                {{ data.set ? data.set.short_title : data.title }}
              </p>
            </div>
            <div class="details">
              <div class="videoDetaileWrapper">
                <div class="flex items-center">
                  <span class="svg-icon flex items-center">
                    <svg viewBox="0 0 24 24"
                         preserveAspectRatio="xMidYMid meet"
                         focusable="false"
                         class="style-scope yt-icon">
                      <path d="M3.67 8.67h14V11h-14V8.67zm0-4.67h14v2.33h-14V4zm0 9.33H13v2.34H3.67v-2.34zm11.66 0v7l5.84-3.5-5.84-3.5z"
                            class="style-scope yt-icon" />
                    </svg>
                  </span>
                  <p class="content-description">
                    از دوره ی
                  </p>
                  <p class="content-description">
                    {{ data.set ? data.set.title : '' }}
                  </p>
                </div>
                <q-icon name="mdi-calendar-text"
                        class="q-mr-sm"
                        color="black"
                        data-toggle="m-tooltip"
                        data-placement="top"
                        data-original-title="تاریخ بروزرسانی" />
                <span class="content-description">
                  {{ data.updated_at }}
                </span>
              </div>
              <div class="content-description q-mb-sm q-mt-xs-md">
                <q-btn-group flat
                             square
                             outline>
                  <q-btn v-for="(quality, index) in data.file?.video"
                         :key="index"
                         unelevated
                         color="teal-6"
                         class="download-btn"
                         icon="mdi-cloud-download">
                    <a :href="quality.link +'?download=1'"
                       class="download-link"
                       target="_blank">
                      <span class="q-pl-sm">{{ quality.caption }}</span>
                    </a>
                  </q-btn>
                </q-btn-group>
                <router-link v-if="data.id"
                             :to="{name: 'Public.Content.Show', params:{id:data.id}}">
                  <q-btn unelevated
                         class="q-ml-sm q-mt-sm-none q-mt-xs-sm"
                         color="teal-6">... بیشتر
                  </q-btn>
                </router-link>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
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
p {
  margin-bottom: 0;
}

.content-box {
  max-width: 100%;
  position: relative;
  border-radius: 15px;
  display: flex;
  box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%) !important;

  @media screen and (width <= 1024px) {
    flex-direction: column;
  }

  .content-img-box {
    width: 100%;
    max-width: 100%;
    position: relative;
    z-index: 5;
    height: 100%;

    @media screen and (width <= 1024px) {
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 15px 0 0 15px;

      @media screen and (width <= 1024px) {
        border-radius: 15px 15px 0 0 !important;
        width: 100% !important;

      }
    }
  }

  .content-link {
    .download-link {
      color: white;
    }

    .content-order {
      position: absolute;
      z-index: 5;
      right: 15px;
      top: 40%;

      div {
        display: flex;
        align-items: center;
      }
    }

    .inner-content {
      width: 100%;

      .title {
        font-weight: 700;
        font-size: 16px;
        line-height: 31px;
        letter-spacing: -0.03em;
        color: #3D3F46;
      }

      .details {
        .videoDetaileWrapper {
          .svg-icon {
            .style-scope {
              width: 20px;
            }
          }

          .content-description {
            .download-link {
              color: white;
            }

            .download-btn {
              font-size: 12px;
              letter-spacing: -1px;
            }
          }

          .mdi-calendar-text {
            width: 20px;
            font-size: 18px;
          }
        }

        .content-description {
          font-weight: 400;
          font-size: 14px;
          line-height: 31px;
          letter-spacing: -0.03em;
          color: #3D3F46;

          @media screen and (width <= 500px) {
            font-size: 12px !important;
          }
        }
      }

    }
  }

  &:hover .content-hover {
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

</style>
