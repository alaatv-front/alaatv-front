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
          <div class="set-item-teacher">
            <q-icon name="account_circle"
                    class="q-mr-xs"
                    size="16px" />
            {{ setItem.author?.first_name + " " + setItem.author?.last_name }}
          </div>
        </q-card-section>
        <q-card-section v-if="$q.screen.gt.xs"
                        class="last-content-card-section">
          <q-separator spaced
                       :vertical="$q.screen.gt.sm"
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
              <div class="last-content-link">
                <q-btn v-if="setItem.last_content_user_watched?.id"
                       flat
                       icon-right="chevron_left"
                       :to="{ name: 'UserPanel.Asset.EmtahanNahaee.Adviser.Content', params: {setId: setItem.id, contentId: setItem.last_content_user_watched?.id} }">مشاهده</q-btn>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card-section>
      <q-card-section v-if="$q.screen.lt.sm"
                      class="last-content-card-section">
        <q-separator spaced
                     inset />
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
                     icon-right="chevron_left"
                     :to="{ name: 'UserPanel.Asset.EmtahanNahaee.Adviser.Content', params: {setId: setItem.id, contentId: setItem.last_content_user_watched?.id} }">مشاهده</q-btn>
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
  name: 'ChatreNejatSetItem',
  props: {
    setItem: {
      type: Object,
      default: new Set()
    }
  },
  methods: {
    gotoAdvisorContent(set) {
      this.$router.push({ name: 'UserPanel.Asset.EmtahanNahaee.Adviser.Content', params: { setId: set.id, contentId: set.last_content_user_watched?.id } })
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
      width: 100%;
      display: flex;

      @media only screen and (max-width: 600px) {
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
      min-width: 40%;

      @media only screen and (max-width: 600px) {
        max-width: 100%;
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
        margin-bottom: 24px;

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
    }

    .last-content-card-section {
      display: flex;
      width: 100%;
      padding: 0;
      .last-content {
        margin-left: 24px;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media only screen and (max-width: 1449px) {
          max-width: 75%;
        }
        @media only screen and (max-width: 600px) {
          max-width: 90%;
          margin-left: 0;
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
}
</style>
