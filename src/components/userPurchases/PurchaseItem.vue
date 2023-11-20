<template>
  <q-card class="product-item q-mb-sm">
    <div class="row">
      <div class="col-3">
        <div class="img-box">
          <q-img :src="product.photo"
                 class="img-style"
                 :alt="product.title" />
        </div>
      </div>
      <div class="col-9  product-content q-px-md">
        <div class="product-title q-my-sm">
          {{product.title}}
        </div>
        <div class="col-9 text-center q-mb-sm">
          <q-btn color="yellow-8"
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
  <q-expansion-item v-model="openSetList"
                    class="hide-expansion-header bg-transparent">
    <q-card v-for="(item, index) in setList"
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
                     @click="setSelectedSet(product, item, 'video')">
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
                     @click="setSelectedSet(product, item, 'pamphlet')">
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
import Assist from 'src/plugins/Assist.js'
import { Product } from 'src/models/Product.js'
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
  emits: [
    'setSelected'
  ],
  data () {
    return {
      openSetList: true,
      selectedSetTitle: null,
      setsDropdownOpen: false
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
  created () {
    if (this.product.sets.list.length > 0) { this.selectedSetTitle = this.product.sets.list[0].title }
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
  }
}
</script>
<style lang="scss" scoped>

.product-item{
  box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 2px 4px 10px rgb(112 108 162 / 5%);
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

   @media only screen and (width <= 1800px){
     width: 200px;
   }

  @media only screen and (width <= 1024px){
    width: 350px;
  }

  @media only screen and (width <= 600px){
    width: 250px;
  }

  @media only screen and (width <= 500px){
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

    @media only screen and (width <= 767px) {
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
