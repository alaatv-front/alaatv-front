<template>
  <div ref="contentItem"
       class="content-list-item"
       :class="selected ? 'selected-content-list' : ''"
       @click="changeSelectedItem">
    <div class="contentListItem-main-box">
      <div class="right-content">
        <q-card v-if="content.lesson_name"
                height="22"
                class="mb-2 rounded-pill text-center lesson_name"
                flat
                dark
                :color="content.color"
                v-text="content.lesson_name" />
        <div class="contentListItem-box">
          <q-img v-if="type === 'video'"
                 class="content-list-image"
                 :src="content.photo" />
          <div v-if="content.has_watched"
               class="flex seen justify-center align-center">
            <i class="fi fi-rr-check icon" />
          </div>
          <q-img v-if="type === 'pamphlet'"
                 src="https://nodes.alaatv.com/upload/abrisham-panel-pdf.png"
                 class="content-list-image" />
        </div>
      </div>
      <div class="left-content">
        <div class="flex">
          <q-chip v-if="content.start"
                  text-color="#3e5480"
                  depressed
                  height="22"
                  class="flex justify-center mb-2 rounded-pill time-sheet"
                  :color="selected ? 'white' : '#eff3ff'">
            <div class="clock flex align-center px-2">
              <i class="text-color fi fi-rr-clock ml-2 mt-1" />
              <div>
                <span class="text-color"
                      v-text="getClockTime().start" />
                <span class="text-color"> الی </span>
                <span class="text-color"
                      v-text="getClockTime().end" />
              </div>
            </div>
          </q-chip>
        </div>
        <div v-if=" type === 'video'"
             class="sheet-icon flex justify-space-between align-center">
          <div class=" title-box">
            <p class="contentListItem-title ellipsis">
              {{ content.short_title }}
            </p>
            <p class="contentListItem-description ellipsis">
              {{ content.title }}
            </p>
          </div>
        </div>
        <div v-else-if="type === 'pamphlet'"
             class="sheet-icon flex justify-between items-center">
          <div class="title-box">
            <p class="contentListItem-title">
              {{ content.short_title }}
            </p>
            <p class="contentListItem-description ellipsis">
              {{ content.title }}
            </p>
          </div>
          <div v-if="content.file">
            <a :href="content.file.pamphlet[0].link">
              <i class="fi fi-rr-download download-icon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Content } from 'src/models/Content.js'

export default {
  name: 'ContentListItem',
  props: {
    content: {
      type: Content,
      default: () => {
        return new Content()
      }
    },
    selected: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: ''
    }
  },
  mounted () {
    this.setScrollPosition()
  },
  methods: {
    setScrollPosition () {
      if (this.selected) {
        this.$refs.contentItem.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' })
      }
    },
    getClockTime () {
      return {
        start: this.formatClock(this.content.start),
        end: this.formatClock(this.content.end)
      }
    },
    formatClock (clock) {
      if (!clock) {
        return clock
      }
      const timeArray = clock.split(':')

      timeArray.splice(2, 1)
      return timeArray.join(':')
    },
    changeSelectedItem () {
      if (this.type === 'pamphlet' && !this.content.file) {
        window.open(this.content.url.web, '_blank').focus()
      } else {
        this.$emit('itemClicked')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content-list-item {
  &:hover {
    cursor: pointer;
    background-color: rgb(242 245 255 / 31%);
  }

  .contentListItem-main-box {
    display: grid;
    grid-template-columns:96px auto;
    align-items: center;
    border-bottom: solid 1px rgb(159 165 192 / 58%);
    margin: 0 26px;

    @media screen and (width <= 1920px){
      margin: 0 10px;
    }

    @media screen and (width <= 1023px){
      margin: 0 26px;
    }

    @media screen and (width <= 767px){
      margin: 0 10px;
    }

    @media screen and (width <= 575px){
      margin: 0 7px;
    }

    @media screen and (width <= 1920px) {
      padding-top: 15px;
      grid-template-columns:71px auto;
    }

    @media screen and (width <= 990px) {
      padding-top: 10px;
      grid-template-columns:96px auto;
    }

    @media screen and (width <= 768px) {
      padding-top: 10px;
      grid-template-columns:71px auto;
    }

    @media screen and (width <= 576px) {
      padding-top: 10px;
    }

    .right-content {
      margin-bottom: 21px;

      @media screen and (width <= 576px) {
        margin-bottom: 15px;
      }

      .lesson_name {
        font-size: 12px;
        line-height: 20px;

        @media screen and (width <= 768px) {
          font-size: 11px;
          line-height: 22px;
        }
      }

      .contentListItem-box {
        position: relative;

        .content-list-image {
          width: 96px;
          border-radius: 10px !important;

          @media screen and (width <= 1920px) {
            width: 71px;
            border-radius: 5px !important;
          }

          @media screen and (width <= 959px) {
            width: 96px;
            border-radius: 10px !important;
          }

          @media screen and (width <= 768px) {
            width: 70px;
            border-radius: 5px !important;
          }

          @media screen and (width <= 320px) {
            width: 60px;
          }

        }

        .seen {
          height: 54px;
          width: 96px;
          opacity: 0.5;
          border-radius: 10px;
          background-color: #000;
          position: absolute;
          top: 0;

          @media screen and (width <= 1920px) {
            height: 100%;
            width: 100%;
            border-radius: 5px;
          }

          @media screen and (width <= 320px) {
            height: 33px;
            width: 60px;
          }

          .icon {
            font-size: 25px;
            color: #fff;
          }
        }
      }
    }

    .left-content {
      margin-left: 15px;

      @media screen and (width <= 1920px) {

      }

      @media screen and (width <= 576px) {

      }

      .time-sheet {
        font-size: 12px;

        .clock {
          .text-color {
            color: #3e5480;
          }
        }
      }

      .sheet-icon {
        .title-box {
          .contentListItem-description {
            font-size: 14px;
            color: #9fa5c0;
            max-width: 338px;

            @media screen and (width <= 1920px) {
              font-size: 14px;
              color: #9fa5c0;
              max-width: 202px;
            }

            @media screen and (width <= 768px) {
              font-size: 12px;
              max-width: 338px;
            }

            @media screen and (width <= 350px) {
              font-size: 12px;
            }

          }

          .contentListItem-title {
            font-size: 18px;
            font-weight: 500;
            color: #3e5480;
            margin-bottom: 0;
            max-width: 336px;

            @media screen and (width <= 1920px) {
              font-size: 18px;
              font-weight: 500;
              color: #3e5480;
              margin-bottom: 0;
            }

            @media screen and (width <= 768px) {
              font-size: 14px;
            }

            @media screen and (width <= 350px) {
              font-size: 14px;
            }
          }
        }

        .download-icon {
          color: #3e5480;
          font-weight: 500;
          font-size: 20px;
          margin-right: 5px;

          @media screen and (width <= 959px) {
            font-size: 24px;
          }

          @media screen and (width <= 768px) {
            font-size: 15px;
          }
        }

        a {
          text-decoration: none;
        }
      }

    }
  }

  &:last-child {
    .contentListItem-main-box {
      border-bottom: none;
    }
  }
}

.selected-content-list {
  background-color: #f2f5ff !important;
}
</style>
