<template>
  <div class="sidebar">
    <div class="box">
      <div class="logo">
        <router-link :to="{ name: 'Public.Home' }">
          <svg width="40"
               height="40"
               viewBox="0 0 40 40"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path d="M18.4486 26.9174L16.4635 14.1759L13.061 14.7109L14.9617 26.9174H18.4439H18.4486Z"
                  fill="white" />
            <path d="M32.166 14.1102H28.7261V31.9999H32.166V14.1102Z"
                  fill="white" />
            <path d="M22.2264 26.1149C22.2264 26.7344 21.9823 27.3304 21.5459 27.7669C21.1094 28.2033 20.5181 28.452 19.9033 28.452H12.9202V31.9014H19.9033C21.4333 31.9014 22.8975 31.2913 23.9769 30.2025C25.0563 29.1184 25.6663 27.6495 25.671 26.1102V14.1102H22.2311V26.1149H22.2264Z"
                  fill="white" />
            <path d="M33.3254 8H25.7368V11.0458H33.3254C33.8322 11.0458 34.3203 11.2522 34.677 11.6136C35.0336 11.975 35.2401 12.463 35.2401 12.9699V15.1005H38.2718V12.9793C38.2718 11.6605 37.7509 10.3981 36.8217 9.46422C35.8925 8.53031 34.6394 8.00469 33.3254 8V8Z"
                  fill="white" />
            <path d="M7.65467 25.5566H10.1326V22.3654H7.44818V22.3747C4.91396 22.4827 2.89128 24.5664 2.89128 27.1334C2.89128 27.6872 2.98983 28.2128 3.16347 28.7103H1V31.9015H10.1326V28.7103H7.65467C6.78647 28.7103 6.07782 28.0063 6.07782 27.1334C6.07782 26.2605 6.78177 25.5519 7.65467 25.5519V25.5566Z"
                  fill="white" />
          </svg>
        </router-link>
      </div>
      <div class="menu-section">
        <q-tabs vertical
                align="center"
                class="menu-items">
          <!--          <q-route-tab :to="{ name: 'UserPanel.Asset.GiftCard.Dashboard' }"-->
          <!--                       exact-->
          <!--                       replace>-->
          <!--            <svg width="24"-->
          <!--                 height="24"-->
          <!--                 viewBox="0 0 24 24"-->
          <!--                 fill="none"-->
          <!--                 xmlns="http://www.w3.org/2000/svg">-->
          <!--              <path d="M9.02 2.84004L3.63 7.04004C2.73 7.74004 2 9.23004 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29004 21.19 7.74004 20.2 7.05004L14.02 2.72004C12.62 1.74004 10.37 1.79004 9.02 2.84004Z"-->
          <!--                    stroke="white"-->
          <!--                    stroke-width="1.5"-->
          <!--                    stroke-linecap="round"-->
          <!--                    stroke-linejoin="round" />-->
          <!--            </svg>-->
          <!--          </q-route-tab>-->
          <q-route-tab :to="{ name: 'UserPanel.Asset.GiftCard.MyGiftCards' }"
                       exact
                       replace>
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M2 12.61H19"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M19 10.28V17.43C18.97 20.28 18.19 21 15.22 21H5.78003C2.76003 21 2 20.2501 2 17.2701V10.28C2 7.58005 2.63 6.71005 5 6.57005C5.24 6.56005 5.50003 6.55005 5.78003 6.55005H15.22C18.24 6.55005 19 7.30005 19 10.28Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M22 6.73V13.72C22 16.42 21.37 17.29 19 17.43V10.28C19 7.3 18.24 6.55 15.22 6.55H5.78003C5.50003 6.55 5.24 6.56 5 6.57C5.03 3.72 5.81003 3 8.78003 3H18.22C21.24 3 22 3.75 22 6.73Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M5.25 17.8101H6.96997"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M9.10986 17.8101H12.5499"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-miterlimit="10"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
          </q-route-tab>
          <q-route-tab :to="{ name: 'UserPanel.Asset.GiftCard.Transactions' }"
                       exact
                       replace>
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M18.04 13.55C17.62 13.96 17.38 14.55 17.44 15.18C17.53 16.26 18.52 17.05 19.6 17.05H21.5V18.24C21.5 20.31 19.81 22 17.74 22H6.26C4.19 22 2.5 20.31 2.5 18.24V11.51C2.5 9.44001 4.19 7.75 6.26 7.75H17.74C19.81 7.75 21.5 9.44001 21.5 11.51V12.95H19.48C18.92 12.95 18.41 13.17 18.04 13.55Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M2.5 12.4101V7.8401C2.5 6.6501 3.23 5.59006 4.34 5.17006L12.28 2.17006C13.52 1.70006 14.85 2.62009 14.85 3.95009V7.75008"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M22.5588 13.9702V16.0302C22.5588 16.5802 22.1188 17.0302 21.5588 17.0502H19.5988C18.5188 17.0502 17.5288 16.2602 17.4388 15.1802C17.3788 14.5502 17.6188 13.9602 18.0388 13.5502C18.4088 13.1702 18.9188 12.9502 19.4788 12.9502H21.5588C22.1188 12.9702 22.5588 13.4202 22.5588 13.9702Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M7 12H14"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
          </q-route-tab>
          <q-route-tab :to="{ name: 'UserPanel.Asset.GiftCard.UserInfo' }"
                       exact
                       replace>
            <svg width="24"
                 height="24"
                 viewBox="0 0 24 24"
                 fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M18.1401 21.62C17.2601 21.88 16.2201 22 15.0001 22H9.00011C7.78011 22 6.74011 21.88 5.86011 21.62C6.08011 19.02 8.75011 16.97 12.0001 16.97C15.2501 16.97 17.9201 19.02 18.1401 21.62Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M15 2H9C4 2 2 4 2 9V15C2 18.78 3.14 20.85 5.86 21.62C6.08 19.02 8.75 16.97 12 16.97C15.25 16.97 17.92 19.02 18.14 21.62C20.86 20.85 22 18.78 22 15V9C22 4 20 2 15 2ZM12 14.17C10.02 14.17 8.42 12.56 8.42 10.58C8.42 8.60002 10.02 7 12 7C13.98 7 15.58 8.60002 15.58 10.58C15.58 12.56 13.98 14.17 12 14.17Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
              <path d="M15.5799 10.58C15.5799 12.56 13.9799 14.17 11.9999 14.17C10.0199 14.17 8.41992 12.56 8.41992 10.58C8.41992 8.60002 10.0199 7 11.9999 7C13.9799 7 15.5799 8.60002 15.5799 10.58Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round" />
            </svg>
          </q-route-tab>
        </q-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
export default {
  name: 'GiftCardPanel',
  data() {
    return {
      q: useQuasar()
    }
  },
  beforeMount() {
    if (this.q.screen.width > 1024) {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', true)
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
  background: #F5F7FA;
  position: absolute;
  top: -10px;
  right: 10px;
  width: 100%;
  height: 100%;

  .box {
    position: relative;
    width: 96px;
    margin-left: 30px;
    margin-top: 30px;
    max-height: 860px;
    min-height: 860px;
    background: #FF9000;
    box-shadow: 2px 6px 6px rgb(193 114 12 / 20%);
    border-radius: 20px;

    .logo {
      width: 100%;
      padding-top: 36px;
      text-align: center;
    }

    .menu-section {
      position: absolute;
      width: 100%;
      height: calc( 100% - 83px );

      //display: flex;
      //flex-flow: column;
      //justify-content: center;
      //align-items: center;
      .menu-items {
        color: white;
        width: 100%;

        :deep(.q-tabs__content) {
          display: flex !important;
          flex-flow: column;
          justify-content: center;
          align-items: center;

          .q-tab {
            min-height: 64px;
            max-height: 64px;

            .q-tab__indicator {
              width: 9px;
              height: 30px;
              position: absolute;
              top: 20px;
              left: -3px;
              border-radius: 10px;
            }
          }
        }
      }
    }
  }

  @media screen and (width <= 1024px) {
    //display: none;
  }
}
</style>
