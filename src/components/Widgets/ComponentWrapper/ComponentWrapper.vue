<template>
  <div class="component-wrapper"
       :style="localOptions.style"
       :class="localOptions.className">
    <div v-if="localOptions.type === 'image'"
         class="image-wrapper">
      <image-widget :options="localOptions.imageWidgetOptions" />
    </div>
    <div v-if="localOptions.type === 'text'"
         class="text-wrapper">
      <text-widget :options="localOptions.textWidgetOptions" />
    </div>
    <div v-if="localOptions.type === 'button'"
         class="action-btn-wrapper">
      <action-button :options="localOptions.actionButtonOptions" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import ActionButton from 'src/components/Widgets/ActionBox/ActionBox.vue'
import TextWidget from 'src/components/Widgets/TextWidget/TextWidget.vue'
import ImageWidget from 'src/components/Widgets/ImageWidget/ImageWidget.vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'ComponentWrapper',
  components: {
    ActionButton,
    TextWidget,
    ImageWidget
  },
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        type: '',
        align: '',
        direction: '',
        actionButtonOptions: {},
        textWidgetOptions: {},
        imageWidgetOptions: {}
      }
    }
  },
  computed: {
    flaxDirection () {
      if (this.localOptions.direction === 'top' || this.localOptions.direction === 'bottom') {
        return 'row'
      } else {
        return 'column'
      }
    },
    justifyContent () {
      return this.localOptions.align
    },
    alignItems () {
      return 'center'
    }
  }
})
</script>

<style lang="scss" scoped>
$flaxDirection: v-bind('flaxDirection');
$justifyContent: v-bind('justifyContent');
$alignItems: v-bind('alignItems');

.component-wrapper {
  display: flex;
  flex-direction: $flaxDirection;
  justify-content: $justifyContent;
  align-items: $alignItems;
}
</style>
