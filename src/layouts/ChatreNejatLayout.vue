<template>
  <div class="drawer-inside">
    <div class="side-menu-main-layout bg-white">
      <div class="header">
        <div class="product-box">
          <div class="photo">
            <q-img :src="productImg"
                   class="product-image" />
          </div>
          <div class="title">
            {{ productTitle }}
          </div>
        </div>
        <div class="back-btn">
          <q-btn flat
                 icon-right="chevron_left"
                 :to="{ name: 'UserPanel.Asset.ChatreNejat.Products' }">بازگشت</q-btn>
        </div>
      </div>
      <div class="side-menu-body">
        <q-list class="side-menu-list"
                padding>
          <q-input v-model="searchText"
                   dense
                   filled
                   class="gray-input search-input"
                   placeholder="جست و جو"
                   @update:model-value ="search(titlesList)">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
          <menu-item :menu="titlesList" />
          <q-item v-for="(item, index) in productItems"
                  :key="index"
                  class="menu-item">
            <q-btn flat
                   class="full-width menu-item-btn"
                   color="background: #EAEAEA;"
                   :style="{background: item.name === selectedTopic? '#EAEAEA' : ''}"
                   @click="setSelectedTopic(item.name)">
              <div class="label">{{item.label}}</div>
              <div />
            </q-btn>
          </q-item>
        </q-list>
        <div class="log-out" />
      </div>
    </div>
  </div>
</template>

<script>
import menuItem from 'components/Menu/SideMenu/MenuItem.vue'
export default {
  name: 'ChatreNejatLayout',
  components: { menuItem },
  data () {
    return {
      productImg: 'https://nodes.alaatv.com/upload/images/product/riazie110_20220831103918.jpg?w=400&h=400',
      productTitle: 'زیست شناسی',
      selectedTopic: '',
      productItems: [
        {
          name: 'pamphlet',
          label: 'جزوات'
        },
        {
          name: 'notes',
          label: 'یادداشت ها'
        },
        {
          name: 'favoredContents',
          label: 'نشان شده ها'
        }
      ],
      clickedItem: null,
      searchText: '',
      titlesList: [
        {
          title: 'ست تستی',
          icon: 'isax:document-upload',
          routeName: 'Admin.UploadCenter.Contents',
          active: false,
          show: true,
          open: false,
          children: [
            {
              title: 'تایتل ست',
              icon: 'isax:document-upload',
              routeName: 'UserPanel.Asset.ChatreNejat.Products',
              active: false,
              show: true,
              open: false
            }
          ]
        }
      ],
      examsPlan: [
        {
          divider: true
        },
        {
          name: 'دهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_dahom.pdf'
        },
        {
          name: 'دهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_dahom.pdf'
        },
        {
          name: 'دهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_dahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'یازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_yazdahom.pdf'
        },
        {
          name: 'یازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_yazdahom.pdf'
        },
        {
          name: 'یازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_yazdahom.pdf'
        },
        {
          divider: true
        },
        {
          name: 'دوازدهم تجربی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_tajrobi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم ریاضی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_riyazi_davazdahom.pdf'
        },
        {
          name: 'دوازدهم انسانی',
          link: 'https://nodes.alaatv.com/aaa/pdf/1401_plan_ensani_davazdahom.pdf'
        }
      ]
    }
  },
  computed: {
    isUserLogin() {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    setSelectedTopic (TopicName) {},
    search (list, parentContain = false) {
      if (!list || list.length === 0) {
        return false
      }
      if (parentContain) {
        return true
      }
      let flag = false
      list.forEach(item => {
        const contain = item.title.includes(this.searchText)
        if (this.search(item.children, contain) || contain) {
          flag = true
          item.show = true
          item.open = true
        } else {
          item.open = false
          item.show = false
        }
      })
      return flag
    },
    logOut () {
      return this.$store.dispatch('Auth/logOut')
    }
  }
}
</script>

<style lang="scss" scoped>
.side-menu-main-layout {
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  height: calc(100vh - 65px);
  width: 350px;
  font-weight: 400;
  font-size: 20px;
  line-height: 28px;
  color: #333333;
  .header {
    display: grid;
    grid-template-columns: auto auto;
    padding: 0 25px;
    .back-btn {
      text-align: end;
      cursor: pointer;
      .alaa-logo {
        width: 50px;
      }
      .logo-image {
        text-align: left;
        .q-img__container {
        }
      }
    }
    .product-box {
      margin-bottom: 20px;
      .photo {
        width: 50px;
        height: 50px;
        margin-bottom: 10px;
        :deep(.q-img) {
          border-radius: 10px;
        }
      }
    }
  }
  .side-menu-body {
    display: grid;
    height: calc(100vh - 200px);
    grid-template-rows: 1fr 2fr;
    .q-list {
      padding: 0;
      &.side-menu-list {
        .search-input {
          margin-bottom: 30px;
        }
        margin: 0 24px 109px 24px;
        .menu-item-btn {
          :deep(.q-btn__content) {
             width: 100%;
             display: grid;
             grid-template-columns: auto auto auto;
             //width: 100%;
             padding: 5px 10px;
             justify-content: normal;
            .label {
              font-size: 16px;
              font-weight: 400;
              line-height: 28px;
            }
          }
        }
        @media screen and (max-width: 1919px) {
          margin: 0 24px 34px 24px;
        }
        @media screen and (max-width: 1439px) {
          margin: 0 21px 26px 21px;
        }
        @media screen and (max-width: 599px) {
          margin: 0 18px 8px 18px;
        }

        .top-separator {
          margin: 0 40px 32px 40px;
          @media screen and (max-width: 1919px) {
            margin: 0 30px 25px 30px;
          }
          @media screen and (max-width: 1439px) {
            margin: 0 45px 22px 45px;
          }
        }

        .q-item {
          padding: 0;
          min-height: 0;
        }
      }
    }
    .log-out {
      align-self: end;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      height: 40px !important;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      padding: 0 14px 0 10px;
      margin: 0 0 36px 27px;
      @media screen and (max-width: 1439px) {
        margin: 0 31px 33px 31px;
      }
      @media screen and (max-width: 599px) {
        margin: 0 30px 30px 30px;
        //padding: 0 0 0 10px;
      }
      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .q-avatar {
        height: 22px;
        width: 22px;
        margin-right: 12px;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
    }
  }
  &:deep(.side-menu-main-layout) {
    .q-expansion-item__container {
      .q-item {
        display: flex;
        padding: 0 10px !important;
      }
      .q-icon {
        font-size: 21px;
      }
    }
  }
}
</style>
