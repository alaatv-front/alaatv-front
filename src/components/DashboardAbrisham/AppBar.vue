<template>
  <div class="app-bar-parent">
    <v-app-bar
      app
      elevate-on-scroll
      color="white"
      class="d-flex align-center app-bar"
    >
      <div class="right-logo">
        <q-img
          src="https://nodes.alaatv.com/upload/abrisham-panel-logo.png"
          class="logo-image"
        />
      </div>
      <div class="header-box ">
        <q-img
          src="https://nodes.alaatv.com/upload/abrisham-panel-logotype.png"
          class="header-logo-img"
        />
      </div>
      <div class="profile-box ">
        <i class="fi fi-rr-bell icon icon" />
        <q-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <q-avatar
              class="avatar"
              v-bind="attrs"
              v-on="on"
            >
              <img
                :src="user.photo"
                alt="">
            </q-avatar>
          </template>
          <q-card>
            <q-list>
              <q-item>
                <div class="avatar-header">
                  <div>
                    <img
                      :src="user.photo"
                      alt=""
                    >
                  </div>
                  <div>
                    <div>
                      {{ user.full_name }}
                    </div>
                    <span class="user-phone">
                      {{ user.mobile }}
                    </span>
                  </div>
                </div>
              </q-item>
            </q-list>
            <q-separator />
            <q-list>
              <q-item>
                <div class="avatar-body">
                  <div>
                    <a href="/"
                       class="avatar-link">رفتن به صفحه اصلی</a>
                  </div>
                  <div>
                    <a class="avatar-link exit"
                       @click="logout">خروج</a>
                  </div>
                </div>
              </q-item>
            </q-list>
          </q-card>
        </q-menu>
      </div>
    </v-app-bar>
  </div>
</template>

<script>
import { User } from 'src/models/User'

export default {
  name: 'AppBar',
  props: {
    width: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' }
      ]
    }
  },
  computed: {
    user() {
      return new User(this.$store.getters.user)
    }

  },
  methods: {
    logout() {
      window.document.getElementById('logout-form').submit()
      window.localStorage.setItem('access_token', '')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-parent {
    .app-bar {
        .header-box {
            .header-logo-img {
                width: 142px;
                @media screen and (max-width: 990px) {
                    width: 126px;
                }
                @media screen and (max-width: 768px) {
                    width: 86px;
                }
            }
        }

        .right-logo {
            display: none;
            @media screen and (max-width: 767px) {
                display: block;
                z-index: 10;
                position: absolute;
                right: 15px;
                top: 9px;
            }

            .logo-image {
                width: 30px;
            }
        }

        .profile-box {
            position: absolute;
            left: 0;
            margin-left: 70px;
            @media screen and (max-width: 1904px) {
                margin-left: 20px;
            }

            .icon {
                font-size: 24px;
                color: #3e5480;
                font-weight: 500;
                vertical-align: middle;
                margin-left: 25px;
                @media screen and (max-width: 1904px) {
                    margin-left: 15px;
                }
                @media screen and (max-width: 768px) {
                    font-size: 19px;
                    margin-left: 11px;
                }
            }

            .v-avatar {
                &.avatar {
                    width: 36px !important;
                    height: 36px !important;
                    min-width: 36px !important;
                    @media screen and (max-width: 768px) {
                        width: 24px !important;
                        height: 24px !important;
                        min-width: 24px !important;
                    }
                }
            }
        }
    }
}

.v-menu__content {
    top: 72px !important;
    border-radius: 0 30px 30px 30px !important;
    box-shadow: 0 3px 10px 0 rgba(44, 91, 185, 0.15) !important;
    @media screen and (max-width: 1904px) {
        top: 66px !important;
    }
    @media screen and (max-width: 960px) {
        top: 54px !important;
    }
    @media screen and (max-width: 960px) {
        border-radius: 0 20px 20px 20px !important;
    }

    .v-list {
        &:first-child {
            padding-bottom: 0 !important;
        }

        .v-list-item {
            display: flex;
            min-height: 0 !important;
            padding-bottom: 0px !important;
            padding-left: 24px;
            padding-right: 24px;
            @media screen and (max-width: 768px) {
                padding-left: 18px;
                padding-right: 18px;
            }

            .v-list-item__title {
                font-size: 18px !important;
                color: #3e5480;
                font-weight: 500 !important;
                padding-bottom: 5px !important;
                padding-top: 12px !important;
                @media screen and (max-width: 768px) {
                    font-size: 14px !important;
                    padding-bottom: 3px !important;
                }
            }

            .v-list-item__content {
                align-self: flex-start !important;
                padding: 0 !important;
            }

        }
        .avatar-header {
            display: flex;
            flex-direction: row;
            .v-avatar {
                margin-bottom: 0 !important;
                &.v-list-item__avatar {
                    border: solid 4px #ff8f00 !important;
                    width: 52px !important;
                    height: 52px !important;
                    min-width: 52px !important;
                    @media screen and (max-width: 768px){
                        width: 44px !important;
                        height: 44px !important;
                        min-width: 44px !important;
                    }
                    @media screen and (max-width: 768px){
                        width: 40px !important;
                        height: 40px !important;
                        min-width: 40px !important;
                    }
                }
            }

            .user-phone {
                font-size: 14px;
                color: #9fa5c0;
            }
        }

        .avatar-body {
            margin-bottom: 22px;
            align-self: flex-start;
            @media screen and (max-width: 768px) {
                margin-bottom: 25px;
            }

            .v-list-item__content {
                align-self: flex-start;
            }

            a {
                text-decoration: none;
            }
        }

    }

    .avatar-link {
        font-size: 16px;
        color: #9fa5c0;
        margin-bottom: 16px;
        @media screen and (max-width: 768px) {
            font-size: 14px;
        }

        &.exit {
            margin-bottom: 0 !important;
        }
    }

    .v-card {
        width: 240px;
        @media screen and (max-width: 768px) {
            width: 210px;
        }
        @media screen and (max-width: 576px) {
            width: 200px;
        }

        .v-divider {
            margin: 20px !important;
            @media screen and (max-width: 768px) {
                margin: 13px !important;
            }
        }
    }
}
</style>
<style lang="scss">
.app-bar-parent {
    .app-bar {
        .v-toolbar__content, .v-toolbar__extension {
            align-items: center;
            display: flex;
            flex-direction: row;
            margin: auto !important;
            position: static !important;

        }
    }
}
</style>
