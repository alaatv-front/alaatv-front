<template>
  <div class="content-list-box">
    <slot name="header">
      <div class="slot-header-box items-center flex justify-between">
        <span
          class="main-header-text"
        >
          {{ header.title }}
        </span>
        <q-btn
          v-if="header.button"
          unelevated
          class="slot-header-box-days"
          :label=" header.button.title"
          @click="clickOnHeaderButton"
        />
      </div>
    </slot>
    <slot name="filter" />
    <div class="content-list-items-box">
      <div
        class="content-box"
      >
        <!--        <v-alert-->
        <!--          v-if="!filteredList.length"-->
        <!--          dense-->
        <!--          outlined-->
        <!--          text-->
        <!--          type="warning"-->
        <!--          class="mx-5"-->
        <!--          border="left"-->
        <!--        >-->
        <!--          موردی وجود ندارد-->
        <!--        </v-alert>-->
        <div v-if="loading"
             class="q-pa-md">
          <q-item v-for="i in 5"
                  :key="i"
                  style="max-width: 300px">
            <q-item-section avatar>
              <q-skeleton type="QAvatar" />
            </q-item-section>

            <q-item-section>
              <q-item-label>
                <q-skeleton type="text" />
              </q-item-label>
              <q-item-label caption>
                <q-skeleton type="text"
                            width="65%" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </div>
        <content-list-item
          v-for="(item , index) in filteredList"
          v-else
          :key="index"
          :content="item"
          :type="type"
          :selected="selectedItem.id === item.id"
          @itemClicked="changeSelectedId(item)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ContentListItem from './ContentListItem'
import { Content, ContentList } from 'src/models/Content'

export default {
  name: 'ContentList',

  components: {
    ContentListItem
  },

  props: {
    contents: {
      type: ContentList,
      default: () => {
        return new ContentList()
      }
    },

    value: {
      type: Content,
      default() {
        return new Content()
      }
    },

    type: {
      type: String,
      default: ''
    },

    loading: {
      type: Boolean,
      default: false
    },

    afterLoad: {
      type: Boolean,
      default: false
    },

    contentTitle: {
      type: String,
      default: 'لیست فیلم ها '
    },

    header: {
      type: Object,
      default: () => {
      }
    }
  },

  data() {
    return {
      selectedItem: new Content()
    }
  },

  computed: {
    filteredList() {
      return this.contents.list.filter(item => {
        return item.content_type.name === this.type
      })
    }
  },

  watch: {
    value: function () {
      this.selectedItem = this.value
    }
  },

  created() {
    this.selectedItem = this.value
  },

  methods: {
    btnClicked() {
      this.$emit('headerAction')
    },
    clickOnHeaderButton() {
      this.$emit('clicked')
    },
    changeSelectedId(content) {
      this.$emit('input', content)
    }
  }
}
</script>

<style lang="scss" scoped>

.content-list-box {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 30px;
  border: solid 6px #eff3ff;
  padding: 19px 26px;
  height: 100%;
  overflow: hidden;
  @media screen and (max-width: 1023px){
    height: 707px;

  }
  @media screen and (max-width: 1200px) {
    border-radius: 20px;
  }
  @media screen and (max-width: 768px) {
    border-radius: 15px;
  }
  @media screen and (max-width: 600px) {
    border-radius: 15px;
  }

  .slot-header-box {
    margin-bottom: 20px;
    @media screen and (max-width: 1920px) {
      margin-bottom: 15px;
    }
    @media screen and (max-width: 990px) {
      margin-bottom: 20px;
    }
    @media screen and (max-width: 600px) {
      margin-bottom: 15px;
    }

    .main-header-text {
      color: #3e5480;
      font-size: 20px;
      font-weight: 500;
      @media screen and (max-width: 768px) {
        font-size: 16px;
      }
      @media screen and (max-width: 350px) {
        padding: 0 15px 0 0;
      }
    }

    .slot-header-box-days {
      font-size: 14px;
      padding-bottom: 0;
      justify-self: end;
      color: var(--abrishamGray);
      cursor: pointer;
      @media screen and (max-width: 768px) {
        font-size: 12px;
      }
    }

  }

  .content-list-items-box {
    margin-top: 20px;
    position: relative;
    height: 100%;

    .content-box {
      position: absolute;
      overflow: auto;
      height: 100%;
      width: 100%;
      @media screen and (max-width: 960px) {
        position: relative !important;
        max-height: 300px;
      }
    }
  }

  .v-select-box {
    .v-select--is-menu-active {
      .v-input__control {
        .v-input__slot {
          border: solid;
          background-color: transparent !important;
        }
      }

    }

    .v-menu__content {
      top: 274px;
    }

    .v-text-field {
      .v-text-field--enclosed {
        margin-right: 0 !important;
      }
    }
  }

}

@media screen and (max-width: 1920px) {
  .v-select-box {
    margin: 0 10px;
  }
}

@media screen and (max-width: 350px) {
  .v-select-box {
    margin: 0 6px;
  }
}
</style>

<style lang="scss">
.v-select {
  &.v-input--dense {
    .v-select__selection--comma {
      font-size: 14px;
      font-weight: 500;
      color: #3e5480;
    }
  }
}
</style>
