<template>
  <div class="content-list-box">
    <!--    <v-overlay-->
    <!--      v-if="loading"-->
    <!--      absolute-->
    <!--    >-->
    <!--      <v-progress-circular indeterminate />-->
    <!--    </v-overlay>-->
    <slot name="header">
      <div>
        <div class="slot-header-box">
          <q-card
            class="main-header-text"
          >
            {{ header.title }}
          </q-card>
          <div
            v-if="header.button"
            class="header-button d-flex justify-end"
          >
            <q-chip
              text-color="#9fa5c0"
              depressed
              color="transparent"
              class="slot-header-box-days"
            >
              <div
                @click="clickOnHeaderButton()"
              >
                {{ header.button.title }}
              </div>
            </q-chip>
          </div>
        </div>
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
        <div
        >
          <content-list-item
            v-for="(item , index) in filteredList"
            :key="index"
            :content="item"
            :type="type"
            :selected="selectedItem.id === item.id"
            @itemClicked="changeSelectedId(item)"
          />
        </div>
      </div>
      <div
        v-for="i in 6"
        :key="i"
      >
        <q-skeleton />
        <!--        <v-skeleton-loader-->
        <!--          v-if="loading"-->
        <!--          max-height="100"-->
        <!--          type="list-item-avatar-three-line"-->
        <!--        />-->
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
      default () {
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
      default: () => {}
    }
  },

  data() {
    return {
      selectedItem: new Content()
    }
  },

  computed: {
    filteredList () {
      const list = this.contents.list.filter(item => {
        return item.content_type.name === this.type
      })
      return list
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
    btnClicked () {
      this.$emit('headerAction')
    },
    changeSelectedId(content) {
      this.$emit('input', content)
    }
  }
}
</script>

<style lang="scss" scoped>

.content-list-box{
    position: relative;
    display: flex;
    flex-direction: column;
    border-radius: 30px;
    border: solid 6px #eff3ff;
    height: 100%;
    overflow: hidden;
    @media screen and (max-width: 1200px){
        border-radius: 20px;
    }
    @media screen and (max-width: 768px){
        border-radius: 15px;
    }
    .slot-header-box{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin: 19px 14px;
        @media screen and (max-width: 1920px){
            margin: 13px 11px;
        }
        @media screen and (max-width: 350px){
            margin: 13px 0;
        }
        .main-header-text{
            color:#3e5480;
            font-size: 20px;
            font-weight: 500;
            @media screen and (max-width: 768px){
                font-size: 16px;
            }
            @media screen and (max-width: 350px){
                padding:0 15px 0 0;
            }
        }
        .header-button{
            margin: auto;
            .slot-header-box-days{
                font-size: 14px;
                padding-bottom:0;
                justify-self: end;
                cursor: pointer;
                @media screen and (max-width: 768px){
                    font-size: 12px;
                }
            }
        }
    }
    .content-list-items-box{
        position: relative;
        height: 100%;
        .content-box {
            position: absolute;
            overflow: auto;
            height: 100%;
            width: 100%;
            @media screen and (max-width: 960px){
                position: relative !important;
                max-height: 300px;
            }
        }
    }
    .v-select-box{
        .v-select--is-menu-active{
            .v-input__control{
                .v-input__slot{
                    border:solid;
                    background-color: transparent !important;
                }
            }

        }
        .v-menu__content{
            top:274px;
        }
        .v-text-field{
            .v-text-field--enclosed{
                margin-right: 0!important;
            }
        }
    }

}
@media screen and (max-width: 1920px)
{
    .v-select-box{
        margin: 0 10px;
    }
}
@media screen and (max-width: 350px) {
    .v-select-box{
        margin: 0 6px;
    }
}
</style>

<style lang="scss">
.v-select {
    &.v-input--dense {
        .v-select__selection--comma{
            font-size: 14px;
            font-weight: 500;
            color: #3e5480;
        }
    }
}
</style>
