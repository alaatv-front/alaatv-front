<template>
  <div class="btn-group-wrapper"
       :class="[localOptions.className, responsiveShow]"
       :style="localOptions.style">
    <action-button v-for="(btn, index) in localOptions.buttonList"
                   :key="index"
                   :options="btn.options" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ActionButton from 'src/components/Widgets/ActionButton/ActionButton.vue'

export default defineComponent({
  name: 'ButtonGroup',
  components: {
    ActionButton
  },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        buttonList: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
        responsiveShow: {
          xl: true,
          lg: true,
          md: true,
          sm: true,
          xs: true
        },
        boxShadows: [],
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  },
  computed: {
    responsiveShow () {
      let responsiveShow = ''
      Object.keys(this.localOptions.responsiveShow).forEach(key => {
        if (this.localOptions.responsiveShow[key] === false) {
          responsiveShow += key + '-hide '
        }
      })

      return ' ' + responsiveShow
    }
  }
})
</script>

<style lang="scss" scoped>
.btn-group-wrapper {
  @media screen and (max-width: 600px){
    place-content: center;
    display: grid;
  }
}
</style>
