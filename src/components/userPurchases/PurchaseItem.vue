<template>
  <!--  <div>-->
  <!--    <div class="productItem bg-amber-1 q-mb-sm">-->
  <!--      <div class="row no-gutters1">-->
  <!--        <div class="col-md-2 productItem-imageCol">-->
  <!--          <div class="productItem-image">-->
  <!--            <q-img :src="product.photo"-->
  <!--                   :alt="product.title"-->
  <!--            />-->
  <!--          </div>-->
  <!--        </div>-->
  <!--        <div class="col-md-10 productItem-descriptionCol">-->
  <!--          <div class="productItem-description">-->
  <!--            <div class="title"-->
  <!--                 v-html="product.title"></div>-->
  <!--            <div class="action">-->
  <!--              <button v-if="product.sets.list.length === 1 && product.sets.list[0].videos_count > 0"-->
  <!--                      @click="setSelectedSet(product, product.sets.list[0], 'video')"-->
  <!--                      class="btn btn-warning btn-lg btnViewContentSet btnViewVideo">-->
  <!--                فیلم ها-->
  <!--              </button>-->
  <!--              <button v-if="product.sets.list.length === 1 && product.sets.list[0].pamphlets_count > 0"-->
  <!--                      @click="setSelectedSet(product, product.sets.list[0], 'pamphlet')"-->
  <!--                      class="btn btn-secondary btn-lg btnViewContentSet btnViewPamphlet">-->
  <!--                جزوات-->
  <!--              </button>-->
  <!--              <div v-if="product.sets.list.length > 1"-->
  <!--                   class="CustomDropDown solidBackground background-yellow">-->
  <!--                <div class="CustomDropDown solidBackground background-yellow"-->
  <!--                     @click="toggleDropdown">-->
  <!--                  <div class="select-selected"-->
  <!--                       :class="{'select-arrow-active': setsDropdownOpen}"-->
  <!--                       v-html="selectedSetTitle"></div>-->
  <!--                </div>-->

  <!--              </div>-->
  <!--              <div v-if="product.sets.list.length === 0"-->
  <!--                   role="alert"-->
  <!--                   class="alert alert-info noContentInProductMessage bg-yellow">-->
  <!--                به زودی-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <transition-->
  <!--      name="fade-PurchaseItem"-->
  <!--      mode="out-in"-->
  <!--      appear-->
  <!--      :duration="500"-->
  <!--    >-->
  <!--      <div v-if="product.sets.list.length > 1"-->
  <!--           v-show="setsDropdownOpen"-->
  <!--           class="productItem-extra CustomParentOptions CustomDropDown CustomDropDown-show">-->
  <!--        <div class="select-items">-->

  <!--          <div class="select-item"-->
  <!--               v-for="(item, index) in product.sets.list"-->
  <!--               v-if="canShowSet(item)"-->
  <!--          >-->
  <!--            <div class="setRow">-->
  <!--              <div class="setRow-label bg-red"-->
  <!--              >{{item.title}}</div>-->
  <!--              <div class="setRow-action">-->
  <!--                <button type="button"-->
  <!--                        class="btn btn-warning btnViewContentSet btnViewVideo"-->
  <!--                        v-if="item.videos_count > 0"-->
  <!--                        @click="setSelectedSet(product, item, 'video')">-->
  <!--                  فیلم ها-->
  <!--                </button>-->
  <!--                <button type="button"-->
  <!--                        class="btn btn-secondary btnViewContentSet btnViewPamphlet"-->
  <!--                        v-if="item.pamphlets_count > 0"-->
  <!--                        @click="setSelectedSet(product, item, 'pamphlet')">-->
  <!--                  جزوات-->
  <!--                </button>-->
  <!--              </div>-->
  <!--            </div>-->
  <!--          </div>-->
  <!--        </div>-->
  <!--      </div>-->
  <!--    </transition>-->
  <!--  </div>-->

  <q-card
    class="product-item q-mb-sm">
    <div class="row">
      <div class="col-3">
        <div class="img-box">
          <q-img  :src="product.photo"
                  class="img-style"
                  :alt="product.title" />
        </div>
      </div>
      <div class="col-9  product-content q-px-md">
        <div class="product-title q-my-sm">
          {{product.title}}
        </div>
        <div class="col-9 text-center q-mb-sm">
          <q-btn
            color="yellow-8"
            class="product-btn full-width"
            unelevated
            text-color="grey-10"
            :icon-right="openSetList ? 'mdi-menu-up' : 'mdi-menu-down'"
            @click="openSetList = !openSetList">
            <span class="text-limit-size ellipsis">
              {{selectedSetTitle}}
            </span>
          </q-btn>
        </div>
      </div>
    </div>
  </q-card>
  <q-expansion-item
    v-model="openSetList"
    class="hide-expansion-header bg-transparent"
  >
    <q-card    v-for="(item, index) in setList"
               :key="index"
               class="q-ma-md  set-item">
      <div class="row q-mb-md q-pa-md">
        <div class="col-xl-9 col-md-7 col-sm-9 col-xs-7">
          <div class="ellipsis-2-lines set-title q-pr-sm">
            {{item.title }}
          </div>
        </div>
        <div class="col-xl-3 col-md-5 col-sm-3 col-xs-5">
          <div class="row ">
            <div v-if="item.videos_count > 0"
                 class="col-12 text-right">
              <q-btn unelevated
                     padding="0 20px"
                     color="yellow-8"
                     text-color="grey-10"
                     class=""
                     @click="setSelectedSet(product, item, 'video')"
              >
                فیلم ها
              </q-btn>
            </div>
            <div v-if="item.pamphlets_count > 0"
                 class="col-12 text-right">
              <q-btn unelevated
                     padding="0 22px"
                     color="grey-12"
                     class=" q-mt-sm"
                     text-color="grey-10"
                     @click="setSelectedSet(product, item, 'pamphlet')"
              >
                جزوات
              </q-btn>
            </div>
          </div>
        </div>
      </div>
    </q-card>
  </q-expansion-item>

</template>

<script>
import Assist from 'src/plugins/Assist'

import { Product } from 'src/models/Product'
export default {
  name: 'PurchaseItem',
  props: {
    product: {
      type: Product,
      default: []
    },
    searchTarget: {
      type: String,
      default: ''
    }
  },
  computed: {
    setList () {
      if (!this.searchTarget) {
        return this.product.sets.list
      }
      return this.product.sets.list.filter(set => (Assist.stringContain(this.filter, set.title))).length
    }

  },
  data () {
    return {
      openSetList: true,
      selectedSetTitle: null,
      setsDropdownOpen: false
    }
  },
  methods: {
    setSelectedSet (product, set, contentType) {
      this.updateSetTitle(set.title)
      this.$emit('setSelected', {
        contentType,
        setId: set.id
      })
    },
    updateSetTitle (title) {
      this.selectedSetTitle = title
    },
    toggleDropdown () {
      this.setsDropdownOpen = !this.setsDropdownOpen
    }
  },
  created () {
    if (this.product.sets.list.length > 0) { this.selectedSetTitle = this.product.sets.list[0].title }
  }
}
</script>
<style lang="scss" scoped>

.product-item{
  box-shadow: -2px -4px 10px rgba(255, 255, 255, 0.6), 2px 4px 10px rgba(112, 108, 162, 0.05);
  border-radius: 15px;
  max-height: 120px;
  .img-box{
    height:100%;
    max-height: 120px;
    .img-style{
      height:100%;
      border-radius: 15px 0 0 15px;
    }
  }
  .product-content{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .product-title{
      font-size: 16px;
      font-weight: 700;

    }
  }
}
.set-item{
  border-radius: 15px;
}
</style>

<style lang="scss" scoped>

.text-limit-size{
  width: 250px;
   @media only screen and (max-width: 1800px){
     width: 200px;
   }
  @media only screen and (max-width: 1024px){
    width: 350px;
  }
  @media only screen and (max-width: 600px){
    width: 250px;
  }
  @media only screen and (max-width: 500px){
    width: 150px;
  }
}
.product-btn{
 text-overflow: ellipsis;
}

    .fade-PurchaseItem-enter > * > *,
    .fade-PurchaseItem-leave-to > * > * {
        opacity: 0;
        transform: translateY(-40px);
    }

    @media only screen and (max-width: 767px) {
        .productItem {
            padding: 0 5px;
        }
    }

</style>

<style lang="scss">
.hide-expansion-header{
  .q-expansion-item__container{
    .q-item{
      display: none;
    }
  }
}
    @for $i from 2 through 10 {
        .fade-PurchaseItem-enter-active > * > *:nth-child(#{$i}) {
            transition-delay: #{($i * 100)}ms;
        }
        .fade-PurchaseItem-leave-active > * > *:nth-child(#{$i}) {
            transition-delay: #{($i * 100)}ms;
        }
    }

</style>
