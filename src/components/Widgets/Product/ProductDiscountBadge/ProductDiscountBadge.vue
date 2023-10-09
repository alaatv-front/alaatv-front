<template>
  <q-badge v-if="localOptions.price['final'] !== localOptions.price['base']"
           floating
           class="discount-badge"
           color="transparent">
    <q-img :src="'https://nodes.alaatv.com/upload/widget_items/dis.png'"
           class="discount-badge_percent__img"
           spinner-color="primary"
           spinner-size="64px" />
    <div class="discount-badge_percent">
      <div class="discount-badge_percent__number">
        %{{
          (
            (1 - localOptions.price['final'] / localOptions.price['base']) *
            100
          ).toFixed(0)
        }}
      </div>
      <span class="discount-badge_percent__text">
        تخفیف
      </span>
    </div>
  </q-badge>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import Price from 'src/models/Price.js'

export default defineComponent({
  name: 'ProductDiscountBadge',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        price: new Price()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.discount-badge {
  &_percent {
    position: absolute;
    top: 15px;
    right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &__number {
      text-align: center;
      color: #FFF;
      font-size: 20px;
      font-style: normal;
      font-weight: 900;
      line-height: normal;
    }

    &__text {
      margin-top: -8px;
      text-align: center;
      color: #FFF;
      font-size: 8px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
    }

    @media screen and (max-width: 600px){
      top: 9px;
      right: 12px;
      &__number {
        text-align: center;
        color: #FFF;
        font-size: 10px;
        font-style: normal;
        font-weight: 900;
        line-height: normal;
      }

      &__text {
        margin-top: -3px;
        text-align: center;
        color: #FFF;
        font-size: 4px;
        font-style: normal;
        font-weight: 600;
        line-height: normal;
      }
    }
  }
  .discount-badge_percent__img {
    width: 64px;
    @media screen and (max-width: 600px){
      width: 32px;
    }
  }
}
</style>
