<template>
  <q-badge v-if="localOptions.price['final'] !== localOptions.price['base']"
           floating
           class="discount-badge"
           color="transparent">
    <lazy-img src="https://nodes.alaatv.com/upload/widget_items/dis.png"
              alt="discount-badge"
              height="64"
              width="64"
              class="discount-badge_percent__img" />
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
import Price from 'src/models/Price.js'
import LazyImg from 'src/components/lazyImg.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'ProductDiscountBadge',
  components: { LazyImg },
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
$size: 64px;
.discount-badge {
  z-index: 2;
  width: $size;
  height: $size;
  &_percent {
    position: absolute;
    top: 15px;
    right: 7px;
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
      top: 7px;
      right: 16px;
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
  :deep(.discount-badge_percent__img) {
    position: absolute;
    width: $size;
    @media screen and (max-width: 600px){
      width: 32px;
      top: 0;
      right: 12px;
    }
  }
}
</style>
