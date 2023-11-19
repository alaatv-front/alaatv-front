<template>
  <div class="profile-info">
    <div class="profile-box">
      <div class="profile-detail">
        <div class="profile-photo-box">
          <div class="profile-photo-img">
            <lazy-img :src="user.photo"
                      :alt="'user photo'"
                      width="60"
                      height="60"
                      class="user-photo" />
          </div>
        </div>
        <div v-if="isUserLogin"
             class="profile-detail-info">
          <div class="info-name">{{user.full_name}}</div>
          <!--                    <div class="info-phoneNumber">{{user.mobile}}</div>-->
          <div class="info-phoneNumber">ادمین کل</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'
import mixinAuthData from 'src/mixin/AuthData.js'

export default {
  name: 'ProfileInfo',
  components: { LazyImg },
  mixins: [
    mixinAuthData
  ],
  data() {
    return {}
  }

}
</script>

<style scoped lang="scss">
.profile-info {
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #6D708B;
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 16px;

    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;

      .profile-photo-box {
        //background: #FFB74D;

        width: 60px;
        height: 60px;
        border: 3px solid #FFF;
        border-radius: 16px;
        position: relative;

        .profile-photo-img {
          .q-img {
            border-radius: 16px;
            height: 100%;
          }

          width: 60px;
          height: 60px;
          border-radius: 16px;

          :deep(.user-photo) {
            max-width: 100%;
            width: 100%;
            height: 100%;

            img {
              border: 2px solid #FFB74D;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
              height: 100% !important;
            }
          }

          //.user-photo {
          //
          //}
        }

        .profile-photo-badge {
          position: absolute;
          bottom: -15px;
          left: -7px;
        }
      }

      .profile-detail-info {
        .info-name {
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          color: #434765;
        }
        .info-phoneNumber {}
      }
    }
  }
}
</style>
