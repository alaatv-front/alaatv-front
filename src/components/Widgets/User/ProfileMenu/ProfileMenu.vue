<template>
  <div class="ProfileMenu sticky-menu">
    <q-card class="custom-card">
      <q-card-section>
        <div class="user-info">
          <div class="user-photo">
            <q-avatar>
              <lazy-img :src="previewImg"
                        class="full-width" />
            </q-avatar>
            <q-file ref="file"
                    v-model="file"
                    :model-value="file"
                    label="Label"
                    class="hidden"
                    @update:model-value="updateFile()" />
            <q-btn v-if="!controls"
                   icon="ph:camera"
                   flat
                   square
                   class="photo-edit size-xs"
                   @click="updatePhoto" />
            <div v-if="controls"
                 class="controls">
              <q-btn icon="ph:check-circle"
                     square
                     class="size-xs"
                     color="primary"
                     @click="confirmUpdate" />
              <q-btn icon="ph:x-circle"
                     class="size-xs"
                     square
                     color="grey"
                     text-color="white"
                     @click="discardUpdate" />
            </div>
          </div>
          <div class="q-ml-lg namePhone full-width">
            <div class="fullName ellipsis-2-lines">
              <q-tooltip> {{ fullName }} </q-tooltip>
              {{ fullName }}
            </div>
            <div v-if="user.mobile"
                 class="phoneNumber q-mt-sm">
              {{ user.mobile }}
            </div>
          </div>
          <div class="edit-action">
            <q-btn class="size-xs"
                   icon="ph:note-pencil"
                   flat
                   square
                   :to="{name: 'UserPanel.Profile'}" />
          </div>
        </div>
        <!--        <div class="q-mt-lg status">-->
        <!--          <div class="flex no-wrap q-mx-md status-detail">-->
        <!--            دانش آموز &#9679; ریاضی دوازدهم-->
        <!--            <div>۹۵۵</div>-->
        <!--            <div class="yellow-star" />-->
        <!--          </div>-->
        <!--        </div>-->
        <q-separator class="q-mt-md"
                     size="2px" />
        <q-list class="menu-items q-mt-md">
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Profile'}"
                  :active="isRouteSelected('UserPanel.Profile')">
            <q-item-section class="menu-item-custom">
              <q-icon name="isax:user dashboard"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">پروفایل</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.MyPurchases'}"
                  :active="isRouteSelected('UserPanel.MyPurchases')">
            <q-item-section class="menu-item-custom">
              <div class="play-btn" />
              <div class="menu-item-title q-ml-sm">محصولات من</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.MyOrders'}"
                  :active="isRouteSelected('UserPanel.MyOrders')">
            <q-item-section class="menu-item-custom">
              <div class="note" />
              <div class="menu-item-title q-ml-sm">سفارش های من</div>
            </q-item-section>
          </q-item>
          <!--          <q-item v-ripple-->
          <!--                  clickable>-->
          <!--            <q-item-section class="menu-item-custom">-->
          <!--              <div class="empty-wallet" />-->
          <!--              <div class="menu-item-title q-ml-sm">کیف پول</div>-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.MyFavorites'}"
                  :active="isRouteSelected('UserPanel.MyFavorites')">
            <q-item-section class="menu-item-custom">
              <div class="bookmark" />
              <div class="menu-item-title q-ml-sm">نشان شده ها</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Asset.Abrisham.Progress'}">
            <q-item-section class="menu-item-custom">
              <q-icon name="ph:compass"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">داشبورد راه ابریشم</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Asset.AbrishamPro.Progress'}">
            <q-item-section class="menu-item-custom">
              <q-icon name="ph:compass"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">داشبورد راه ابریشم پرو</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Asset.TripleTitleSet.Products', params: {eventName: 'abrisham2'}}">
            <q-item-section class="menu-item-custom">
              <q-icon name="ph:compass"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">داشبورد راه ابریشم ۲</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Asset.TripleTitleSet.Products', params: {eventName: 'chatre-nejat'}}">
            <q-item-section class="menu-item-custom">
              <q-icon name="ph:umbrella"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">داشبورد چترنجات</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Asset.TripleTitleSet.Products', params: {eventName: '110'}}">
            <q-item-section class="menu-item-custom">
              <q-icon name="ph:fire"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">داشبورد 110</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Asset.TripleTitleSet.Products', params: {eventName: 'emtahan-nahaee'}}">
            <q-item-section class="menu-item-custom">
              <q-icon name="isax:bill"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">داشبورد امتحان نهایی</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  @click="runEvent('showLiveClassesLink')">
            <q-item-section class="menu-item-custom">
              <q-icon name="isax:document-1 dashboard"
                      size="22px" />
              <div class="menu-item-title q-ml-sm">
                همایش های آنلاین
              </div>
            </q-item-section>
          </q-item>
          <!--          <q-item v-ripple-->
          <!--                  clickable>-->
          <!--            <q-item-section class="menu-item-custom">-->
          <!--              <div class="leightner" />-->
          <!--              <div class="menu-item-title q-ml-sm">جعبه لایتنر</div>-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <!--          <q-item v-ripple-->
          <!--                  clickable>-->
          <!--            <q-item-section class="menu-item-custom">-->
          <!--              <div class="channels" />-->
          <!--              <div class="menu-item-title q-ml-sm">کانال‌های من</div>-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <!--          <q-item v-ripple-->
          <!--                  clickable>-->
          <!--            <q-item-section class="menu-item-custom">-->
          <!--              <div class="messages" />-->
          <!--              <div class="menu-item-title q-ml-sm">نظرات من</div>-->
          <!--            </q-item-section>-->
          <!--          </q-item>-->
          <q-item v-ripple
                  clickable
                  :to="{name: 'UserPanel.Ticket.Index'}"
                  :active="isRouteSelected('UserPanel.Ticket.Index')">
            <q-item-section class="menu-item-custom">
              <div class="ticket" />
              <div class="menu-item-title q-ml-sm">تیکت</div>
            </q-item-section>
          </q-item>
          <q-item v-ripple
                  clickable
                  @click="logout">
            <q-item-section class="menu-item-custom">
              <div class="logout" />
              <div class="menu-item-title q-ml-sm">خروج</div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinWidget, mixinAuthData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProfileMenu',
  components: { LazyImg },
  mixins: [mixinWidget, mixinAuthData],
  data () {
    return {
      api: APIGateway.user.APIAdresses.base,
      user: new User(),
      file: null,
      previewImg: null,
      controls: false
    }
  },
  computed: {
    fullName () {
      if (!this.user || !this.user.full_name) {
        return 'وارد نشده'
      }

      return this.user.full_name
    }
  },
  created () {
    this.api = APIGateway.user.APIAdresses.base + '/' + this.user.id
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.previewImg = this.user.photo
    },
    runEvent (eventName) {
      this.$bus.emit(eventName)
    },
    isRouteSelected (itemName) {
      return (this.$route.name === itemName)
    },
    updatePhoto () {
      this.$refs.file.pickFiles()
    },
    updateFile () {
      this.controls = true
      this.previewImg = URL.createObjectURL(this.file)
    },
    discardUpdate () {
      this.controls = false
      this.file = null
      this.previewImg = this.user.photo
    },
    confirmUpdate () {
      const fd = new FormData()
      fd.append('photo', this.file)
      fd.append('updateType', 'photo')
      APIGateway.user.updateProfile(this.user.id, fd)
        .then(() => {
          this.$store.dispatch('Auth/updateUser')
          this.controls = false
        })
        .catch(() => {})
    },
    logout () {
      this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.q-list.menu-items {
  :deep(.q-item) {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    cursor: pointer;
    border-radius: 14px;

    &.q-item--active {
      &:hover {
        .q-focus-helper {
          background: currentcolor;
          opacity: 0.15;
        }
      }
    }
  }
}
</style>

<style scoped lang="scss">
.ProfileMenu {
  .user-info {
    display: flex;
    flex-wrap: nowrap;
    position: relative;

    .user-photo {
      width: 80px;
      padding: 5px;
    }

    .namePhone {
      width: calc( 100% - 80px );

      .fullName {
        width: 100%;
      }
    }

    .edit-action {
      position: absolute;
      right: 0;
      top: 0;
    }
  }
}

:deep(.q-btn .q-btn__content) {
  margin: 3px;
}

.controls {
  position: absolute;
  top: 65px;
}

.sticky-menu {
  position: sticky;
  top: 110px;
}

.avatar-img {
  width: 80px;
  height: 80px;
  background-image: url('data:image/png;base64,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');
}

.play-btn {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAI7SURBVHgBtVU7UgJBEB0QYjYlcm/gyqeKcD2BegLhBEpmpmRmcAPwBoRmLBlVfFxPwEYQshYhP9+DGYRxFiSgq5re6el+M9M/hDgTxQ5t5nI5F+J2tVrZYCcWi4VYh5A++L3b7fonAefzeWe5XFbx6RIoHo83sf6WwFc8BNIGe8lkstTpdIKjwNls9hGiBhAPstLr9TzT4ZlMpgibFx6Ag8qDwaAmogjGLwBegaONNEK4XqXPg9GgUCjYNKChOJF4EfCEGKbNITnqUNd1LXEYnP4ttY7zR2bfRsxKOiCNZ7PZcDqdTvBdN94KJH1dibUBRvDvIAI9UQB8Epvs38OxQkfoWkycDix9WTW/wKAr8JfhIpcADPr9fhOOr4vF4ga6NnR13P7TcRw9PJ4sxS0ww2AqdguGgVr4vs9Diqjra/okEomiZs9aT+0Cn0Sy40J2ZJRNQsoARpeG/VBXMDmwZWNYCI1e7yn1oW7M+LoGYD5tHTOWG5JWBWgLOsF4MzSaPTHaW2AYNiFsVSqKoG8wGSx+lNsQa7ZxGYkk6F5OZKVY8/m8sfZVG6q4kZybXQdk3kGS7jCEQnADeKHhZesGYQHg0Pu9Dd6WLc15IU4kNWNwB1vpLtTHaDQK0uk0Y/oGKcbjcfufoFX4PDNEmHAfSv9nbHIIyawHbNOosSnzwWTaqOsySrCxu28c9HwS4lqHE50DMP8xWDkp6NhtHAEWZzaSVTJUx/G/Js4RALDl2YWW7FAe4kW95qz0A4pIG6PctQeMAAAAAElFTkSuQmCC');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.note {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGaSURBVHgB1VXdbYMwEHZI8p4RyARNFJB4JBM0naBlg46QTNBmgjYTtJ0gPCIhiEdgBN4R0O+LjOTQ8JNWPPSTjO3z3fnz+XwIMRBGbYu2bS+Kongpy9K8MBqNkul06gVBkNzs2HEcM8uyI8eGYfj6GjZz0c3yPJ9LKdNejskSDB/RaLyA02UYhlLXWQDj8fgE5hJ6Eux3dfZGnSXYHKH8BKOzDONZfXM4NbXpBic7kVAj49VqxaObOOIafUpWnKP5mtpMydIoiuYgb0KPdgnm66uMARdMD4hbwtipDfZkrzXG9IC1JQ2oi+6LtrqjSTXgzucj4MYrmTJ6Fh1gnLkpQ1nF2hAD4f85njQtWJblIvXeauJ9HMev4i+OeftII1+X4ZJEXzQ6Vq/NE7/EpG2R6dO23laEGh3jFfKpfogW4Bl7ONn7TY7xsnzE+OFaraiAjT9FH4Blidbr1nUgg7a01WX1PPbR7rtiq4O6LLPIIl+XX1Q39cdgpWKhkarvwoYfFiVVW346JlQZ3ILBXVt8K/DvgljvdKeD4htwX79yq2BfSgAAAABJRU5ErkJggg==');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.dashboard {
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.empty-wallet {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHxSURBVHgBtZTbbeJgEIV/jHlel2AqWC8Xibc1FWyoIKGCKBWwW0GSCsJWEDqIH5G4xFQQl+AAD0gIyHeInQRIAsHKkUbzX49nzox/Y74JuUMO+b7vjMfj81wu5zF1CoVCs9vtRkcRi2w6nXqr1aqlKRZbltVZLpcaO4vFohiGYfzRfWt7oVKp+NjlZDJ5gPSOKA3+QkS9Xq+Jr4vYtm3PfAI7HdRqNXc+n99A4is6CK+53N6X8l5iSBWdUqv3+/3AZMRa43K5fIK7RcNfpOrzgZ+f3HGwE84EZBcpGHQfDYfD9g5xqVQ648ANwwhzGYf42ByIRL6Ibqmn0tnbh5JqR+YL8DzPzefzd5KTaVFrG12BFI2vkgq6Q5ZNhq66aidi2kkSpB1yaZ713AEk/7YLrDm10p67Q5xiNpvF6CWN39WZYr18ELJz3Bk6O8neb1zb/iA1ETbNHqjouCui7GAjrelPRY7/tskAyE7VdsjQMK8ZtCRHJmIwIsLTarXq0RVr2ajNeiMTMa15BeEfdL3H0uUY8sAyGaA2GwwGRVKvy7RGy15ofYOYRnfMEVCr8WBFGhP5WhIrmXRwMZstcySSvo+QJ9D85aF/+16offCPB3L+oIB6m32sgTSdDWIh+ef/6nVLG/4QoGtAxNdoG5rvxhM+evh+jxdLQwAAAABJRU5ErkJggg==');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.bookmark {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAExSURBVHgB7VXLbYNAFFwCBVDCpgPER+KW7SDpwKQDpwKWCpJUkLiDdBCOHBDZDkwJSBz5ZZ60jkhiY2zZN0YagXZnZh8cZhm7Eoy/C67rRoZhrIZh4GwGoC2h3RRF8X4wGKExhBJMycBmoO97gQdHuER48k/ged4DOPi+L9mJII/2it3azWj/HqzyPJfsRGhPhalX+4I5Pl+x86Hg5/uCL4oleAlegidgzREFQeDsesCyrNcsy8pjnsmJhRA2qvQZ1fiF4AhcN02zRZO9hWHI5wZXoD0KjOu63qJY1mDSdd0tEdsbMMIBn6Q5FPxT9NSpmIiEH5RNh1Dht237qJQqxybHcbhpmhKv9HtoL6XD4H9C2b/8CobYhpgW7/TtkaBnUzYBXeyxvsYUvoiGqNg18Q2GS4Rt5c2/kAAAAABJRU5ErkJggg==');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.leightner {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJKSURBVHgBzZU5buNAEEWb2iIFNBQIWgLOCURrAZSJOsHMnGCYzWTjOYHlbELfwPYNrBO4nSnQQt2AkeSQsVb/T3cTpLyINmDABRTY6i6++l3NLgnxSWakDex0OvZ2u7U5zmQyfrFY9KSUwYfB3W7XWq/XVxg6Lyx7hmFIPIfj8VjGFzLiiAF6h4cFQH8ymRh0KD7F3E/4fL/f/4DftdvtGUW8qRhBzm6362HoAmihBN88z/NfS854wLkrgdhTxAYJxc1m0221WjMqAPAMbmL6+i0ojWUAsI+hmcvlzhKlAPQcoCt4wG3n83lul+ChSGEq+RCiehGYSgEbwP8he58KUFtbbc0TKQ3v+3hYERgTv8TTyV7G4hzMe8fKEDeobSh4VAqe+qGyBgJTq1UCLbwzjysOMGHqANu2OeZJ36eF8h3Es3wyAhMAeE8H4WTD+maz2dSKEevwqc9EK75lNqU0HhyI9ObAfX0mIXiz2TBLAKWuSvQeoLYGfK5/hGDeFPH0DX7nb3xqPhMhoZuGqK4yz+Q2AaZhUnKR5WAi/L6An/PiHAOvVit+rj7aQATO6kG5XPbRXP6grsZisZDL5XJUq9XYSwbVatWF25VK5aRerwusP/Adx3HMUqn0G6X7D7+YTqdS8xJNCM1kAJV/VdMJ64wdWEjGvtFTnxONOwpULzEJxeUaxFmJJoSa8uYFAM3Y2DlnmiYB3KLkWqgGlwm7u2G5IOLkEPpMcUxh2IMPlgi9YZLDpv6SvfoPonqyxXGhUJCj0cgXX8EeAWz0IZ+CjM76AAAAAElFTkSuQmCC');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.channels {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAH7SURBVHgBtVU7bsJAEF0H07ulMyeIw0eiNF06yAkCJyA5AfYJYk4QpUznG+B0FHx8A5yKlggqvnnPMciCtQlWMtJqxrs7b9/O7IyF+CdRLm0wTVNbLpfd3W7XVBRljik/n8/bg8EgSPPLpS2Wy+XOarVyYRoAfYf+xLjHIa1CofA1m818cQ3jWq2mr9frVxLG6G23W8v3fbIVhmFouVzOgtnB8MC+LWOvyFhC0XEOlu3hcOjJDq9UKuZ+v+fhGrQ9Ho8dKXAayzTBARaAuzADsK8f2CsxptNwIoVlkiA8OsLTJ/hoNKpz7uZwLSg9CygFNwvoC9OsVqvGERhZ1qlVVQ1ERtlsNgE1wqLFgT1qPK2myCgIRSP+HQLzKlA9XOelVCp1xZUS+ThnwBQE/QnANobFRPKVXAJkPJGfCX1ITApMQeIsgsPk05smsWeZcw0hnCCmrEobz9NJBI5JkMSeL2ixWJAlb/jMvTKAJOCQPVgUaZM9DpiA5RQM+wAMsHaHPUeWUZ4e8DrC/qGKFIk2FwHK12ICkNMeAF3ZfuTpOJ8KfOLgiitEFgoPQ4+qMVWim+gIz1n7VBIcWPcsTRfXfzst8+jQBgBbWPexXv8VcOTMrvVIRuIn8x7/IASDzbJlW+0hWY6sC178NUV9l8xu+Q37A7abpVn9iXwD4rALgUm8LL0AAAAASUVORK5CYII=');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.messages {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAICSURBVHgBtVTBbcJAELwzRkKCBx3EqSAO8OAX0wFUAFRAUgGkAqCDuAOoIM6PBxBTAU4FieAJiMzAHUJwgEnESNaevXfj3bndFeJGkKccnudlZ7NZTUr5tF6v3ZMEUv7ARNjTH4/Hb2eJi8Wis1gs3rHM4mCIQxNFcAT4uOcB1sPTAvkrv9umzSBt0q5Wq8cwDCMRA7lc7hk/aBcKhY/hcBgcRUwJ5vP5NzZ18No/9DPydDodBUFwlEE+n2eW0Wg0qssDwjaWZUogLiNIJpP1wWAQ7RF3eCeI+HEnBUg/xVbTLg/Zth2Z2JbLpaN0bUKyKVIvMXWdDX1c20qfGowDTe9jaKr9PaYOIt5HcLjJUn+qwvTjXpQGSH0Yz3Xd7CniTVmJK2FZVkSbSqXMxFqX/0Jpv6kWYx1Tc8oDzSuJRIIyeSihCjRt4LuDy3o5wc1G+dpFbAAzcFQULEnd0uyusukAflpV/h7fpfo4RSQ+ImmJK4BSIxGbIiApHh+Z1XYR79ffX4DzzKyuSYmNxhwyMA/iSuAc04+QaenQpzWmLh4HiYgJpSkv2Tf55d5GDp0GHpaLruku0ttchhqlnCWUzFXW30/fSEzwMhg5orij5qwArEuZTCZUs4RNEaAMJ7ChnhEXiQ3p8sYdsZ0PnCWluG1vnXOCqA4TsuXZLNfOkpvgFzcEB9Mr5NAAAAAAAElFTkSuQmCC');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.ticket {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAG3SURBVHgB7ZTNccIwFIRlY864gzgV4AAHjkoFoQOSCgIVYCoIqSBQQUgFITdmmAFTAS7BMxz5cXYd2XE8jn+GKzsjZMl6nx77ZAlxlZIWPXS7XetwOIyCIJCaplmimny0eb1eHy+XSy8GK+gngP75fJ6phT87a9oDOokNh/9RdV238L7P59PpdOe6rm9wAOiA/fF4vOdkMqjT6TDIXq/XU5Ej27YntVptZxgGWY6u5pto2zRUZTxHexUFUrEfTIJjQwWb6L6yAlarlcs4UULgeJElYcYYmJxotVqj9GL6DztkEVRKSUYzGodgGP7EjLGjA/ggGQDfHxHwlgfl5vv9fkM+2oJzoRXwh4NFu91uAM6XE1FBPKYqwduoTnp6EcANUV0WE0sWPwTTQ2TLv9tT5zi9mV8A3qJJWvIHDL0QCsAwfV7hMcfDPCosCK2DJTsk+B6/wGCHrB1xocCZgrNJZuyi8jdZi5VNz6KcWJ/f4sECetTDZ2lmLJZogyIizzE6GwluQyZ/CMR3vlGbzFBALwoocwlBJi6iPj80+M37xouvTcAtwB08EmSKavIAXqB4Y0LFVUl9A4g9zOG7QxHSAAAAAElFTkSuQmCC');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.logout {
  background: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAHYSURBVHgBtVU7bsJAEF0v0NMhoHEalNL8JEpzg3CCxCcInCA5QjgB3IDcIPR85DJdtoPS6QjfvGetIwL4A4gnjXa9nn1+OzM7FuJGMM5xrtVq9na7NaWUJp8xV6lUyh2NRu5FxNVq9RnDKywb4qJgnclk8h4sSBGDSqXyguHNMAyqamUymTsQGDQoL+92O0e7DniiRIobjYa5Wq2+MO2DyAnzsywri5B84ONiPB6XYxUvl0vbd5KyG+Xnuq4H5V2YVa/XrVhiKKCTdyo5h0Aih3rqE6cPHZCoRwztzWbTBDGToUQCQLXCXgHV5hGxJu0zUTwe5kNtZ0OeIl2v101xJdKa9IGkwSIyPOCxIhVJ2YmKva8YKr39RZZNnPEGijjFqL0hLoKDDT0EXyBxLR3ji/EX4+l02te3yGKxs+jFFfhXxyTH0IJyxWcWu+4TZ+OojnUj8ZsJSJ8wsFq6cUQUgbiLQFTkzUNomPXsfnMJA/Ji6T0qlhgKqJx9IDIctm1noZRdULEQuJaK2jCfzxf5fP4Hm9qFQsEsFovfpVLJU0ot+J7dL5fL2eiAPTzew5zZbPbJd4kaPUqxDXKqNkNcFN47gdrExAH0r8nCrfNLkb8mzNU+4c3xC2Y+zcPc1ksPAAAAAElFTkSuQmCC');
  margin-right: 10px;
  width: 22px;
  height: 22px;
}

.photo-edit {
  position: absolute;
  top: 45px;
  left: 0;
}

.fullName {
  width: 95px;
  font-size: 18px;
}

.phoneNumber {
  font-size: 14px;
  color: #656f7b;
}

.status {
  background: #f1f3f4;
  border-radius: 10px;
  height: 50px;
  display: flex;
  align-items: center;

  /* width: 100%; */
}

.yellow-star {
  width: 20px;
  height: 20px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFUSURBVHgBtZQ9TsNAEIXfrMENjY8QNwQqwg2Sk2CKIErfIBwhdAhTmBvACcINSIdASPYNsgUNGO8y/gkx+AfsJE9ayR7vfHqemV1gw6K/NujXsxPEaspbJa8L6l/fdgbqp/MexOcjb7PykIQZ2WT7si5HNAFhxJMCLJGFD9NFF4eZuzio+NToUjS7q5SFyJw0OtSBa+H9zYEwjqDVgCO9X79aIS1BNIfmZpG+p33PXwFfxjNoDLGOCA8MHZEOHC707gKbkDJskRaX6VhbFNLhVZg1JTZOkwA6i3OVGKVPy1A2JmqWNaQ9LHH3A7iCxnwyYP2bx3VbwkrAFPo8XrQAhtT37GJAlBy2cQf08pxqIEQ0QFsZ8bAeCKMOKPNVlsKgHqhVOUnjEuaezcU/5pfyXUgkG4A7d9/zmAy70iM68FyypzLpJPVvnKSrhYMw55HxsU19AeN3eoJ/cWYTAAAAAElFTkSuQmCC');
}

.status-detail {
  width: 100%;
  justify-content: space-between;
}

.menu-item-title {
  font-size: 16px;
}

.menu-item-custom {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 64px;
}

.q-item {
  padding-top: 0;
  padding-bottom: 0;
}

.namePhone {
  justify-content: center;
  display: flex;
  flex-direction: column;
}
</style>
