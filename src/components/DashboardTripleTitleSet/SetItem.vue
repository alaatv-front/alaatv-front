<template>
  <q-card class="custom-card set-item-card"
          bordered>
    <q-card-section horizontal
                    class="set-base-section">
      <q-img v-if="$q.screen.gt.xs"
             :src="setItem.photo"
             class="set-item-image"
             @click="gotoAdvisorContent(setItem)" />
      <q-card-section :horizontal="$q.screen.gt.xs"
                      class="set-item-info">
        <q-img v-if="$q.screen.lt.sm"
               :src="setItem.photo"
               class="set-item-image"
               @click="gotoAdvisorContent(setItem)" />
        <q-card-section class="set-info">
          <div class="set-item-title ellipsis"
               @click="gotoAdvisorContent(setItem)">
            {{ setItem.title }}
          </div>
          <div class="set-item-description">
            {{ setItem.title }}
          </div>
          <div v-if="setItem?.author"
               class="set-item-teacher">
            <q-icon name="account_circle"
                    class="q-mr-xs"
                    size="16px" />
            {{ setItem?.author?.first_name + " " + setItem?.author?.last_name }}
          </div>
          <div class="product-item-progress">
            <div class="progress-description">
              <div class="progress-title">
                پیشرفت دوره
              </div>
              <div class="progress-percent">
                {{ setItem.contents_progress }}%
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
                       class="last-content-separator"
                       inset />
          <div class="last-content">
            <div class="last-content-pre">
              آخرین جلسه دیده شده :
            </div>
            <div class="last-content-title ellipsis">
              {{ setItem.last_content_user_watched?.title }}
            </div>
            <div class="last-content-footer">
              <div class="last-content-section ellipsis">
                <q-icon name="menu_book" />
                {{ setItem.last_content_user_watched?.title }}
              </div>
              <q-btn v-if="setItem.last_content_user_watched?.id"
                     flat
                     class="size-md"
                     icon-right="chevron_left"
                     :to="{ name: 'UserPanel.Asset.TripleTitleSet.Adviser.Content', params: {setId: setItem.id, contentId: setItem.last_content_user_watched?.id} }">مشاهده</q-btn>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section v-if="$q.screen.lt.sm"
                      class="last-content-card-section">
        <q-separator spaced
                     inset
                     class="last-content-separator" />
        <div class="last-content">
          <div class="last-content-pre">
            آخرین جلسه دیده شده :
          </div>
          <div class="last-content-title ellipsis">
            {{ setItem.last_content_user_watched?.title }}
          </div>
          <div class="last-content-footer">
            <div class="last-content-section">
              <q-icon name="menu_book" />
              {{ setItem.last_content_user_watched?.title }}
            </div>
            <div class="last-content-link">
              <q-btn v-if="setItem.last_content_user_watched?.id"
                     flat
                     class="size-md"
                     icon-right="chevron_left"
                     :to="{ name: 'UserPanel.Asset.TripleTitleSet.Adviser.Content', params: {setId: setItem.id, contentId: setItem.last_content_user_watched?.id} }">مشاهده</q-btn>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card-section>
  </q-card>
</template>
<script>
import { Set } from 'src/models/Set.js'

export default {
  name: 'SetItem',
  props: {
    setItem: {
      type: Object,
      default: new Set()
    }
  },
  computed: {
    progress() {
      return (this.setItem?.contents_progress) / 100
    }
  },
  methods: {
    gotoAdvisorContent(set) {
      this.$router.push({ name: 'UserPanel.Asset.TripleTitleSet.Adviser.Content', params: { setId: set.id, contentId: set.last_content_user_watched?.id } })
    }
  }
}
</script>
<style lang="scss" scoped>
.set-item-card {
  min-height: 148px;
  border-radius: 20px;
  background: #fff;
  width: 90% !important;
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
    min-height: 217px;
    padding: 10px 5px 10px 0px;
    align-items: flex-start;
  }

  .row {
    box-shadow: none;
  }

  .set-base-section {
    width: 100%;
    display: flex;
    justify-content: space-between;
    background: transparent;

    @media only screen and (max-width: 600px) {
      display: block;
    }

    .set-item-info {
      width: calc( 100% - 80px );
      display: flex;

      @media only screen and (max-width: 600px) {
        width: 100%;
        padding: 0;
      }
    }

    .set-item-image {
      width: 80px;
      height: 80px;
      background: #CACACA;
      border-radius: 10px !important;
      margin: auto;
      min-width: 80px;
      cursor: pointer;

      @media only screen and (max-width: 600px) {
        margin: 0 0 0 17px;
      }
    }

    .set-info {
      width: 40%;
      min-width: 40%;

      @media only screen and (max-width: 600px) {
        width: calc(100% - 80px);
        max-width: calc(100% - 80px);
      }

      .set-item-title {
        font-style: normal;
        font-weight: 400;
        font-size: 20px;
        line-height: 28px;
        letter-spacing: -0.03em;
        color: #333333;
        cursor: pointer;

        @media only screen and (max-width: 600px) {
          font-size: 16px;
          line-height: 20px;
        }
      }

      .set-item-description {
        font-style: normal;
        font-weight: 400;
        font-size: 12px;
        line-height: 19px;
        letter-spacing: -0.02em;
        color: #333333;
        margin-bottom: 5px;

        @media only screen and (max-width: 600px) {
          font-size: 12px;
          line-height: 16px;
          margin-bottom: 5px;
        }
      }

      .set-item-teacher {
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
      width: 60%;
      padding: 0;
      @media only screen and (max-width: 600px) {
        width: 100%;
      }
      .last-content-separator {
        margin: 8px;
      }
      .last-content {
        padding-left: 24px;
        width: calc( 100% - 17px );
        display: flex;
        flex-direction: column;
        justify-content: center;

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
          max-width: 65%;

          @media only screen and (max-width: 600px) {
            font-size: 14px;
            line-height: 20px;
            margin-bottom: 5px;
          }

        }
        .last-content-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;

          $last-content-link: 100px;
          .last-content-section {
            font-style: normal;
            font-weight: 400;
            font-size: 12px;
            line-height: 19px;
            letter-spacing: -0.02em;
            color: #6C6C6C;
            width: calc( 100% - #{$last-content-link} );
          }

          .last-content-link {
            width: $last-content-link;
          }
        }
      }
    }
  }
}
</style>
