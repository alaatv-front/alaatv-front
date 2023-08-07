<template>
  <div class="contact-form-container new-theme"
       :style="localOptions.style"
       :class="localOptions.className">
    <div class="form-title-wrapper">
      <q-icon class="q-mr-sm"
              :name="localOptions.iconName"
              :color="localOptions.iconColor"
              :size="iconSize"
              :style="{color: localOptions.iconColor}" />
      <text-widget :options="localOptions.titleOption" />
    </div>
    <div class="form-subtitle-wrapper">
      <text-widget :options="localOptions.subtitleOption" />
    </div>
    <div class="form-inputs-wrapper">
      <form-builder ref="formBuilder"
                    v-model:value="localOptions.inputs" />
    </div>
    <div class="form-action-wrapper">
      <action-button :options="localOptions.actionButtonOptions"
                     :disable="loading"
                     @action-button="CallAction" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import TextWidget from 'src/components/Widgets/TextWidget/TextWidget.vue'
import ActionButton from 'src/components/Widgets/ActionButton/ActionButton.vue'
import { FormBuilder, inputMixin } from 'quasar-form-builder'

export default defineComponent({
  name: 'ContactForm',
  components: {
    TextWidget,
    FormBuilder,
    ActionButton
  },
  mixins: [inputMixin, mixinWidget],
  data() {
    return {
      defaultOptions: {
        titleOption: {},
        subtitleOption: {},
        actionButtonOptions: {},
        inputs: [],
        iconName: 'warning',
        iconColor: 'primary',
        iconSize: {},
        eventId: null,
        borderStyle: {},
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
      },
      loading: false
    }
  },
  computed: {
    iconSize() {
      return this.$q.screen.lt.xl ? this.localOptions.iconSize.xs : this.$q.screen.lt.sm ? this.localOptions.iconSize.sm : this.$q.screen.lt.md ? this.localOptions.iconSize.md : this.$q.screen.lt.lg ? this.localOptions.iconSize.lg : this.localOptions.iconSize.xl
    },
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows () {
      const shadows = []
      if (!Array.isArray(this.localOptions.cssHoverEffects?.boxShadows)) {
        return ''
      }
      this.localOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    cssHoverEffectsBorderStyle () {
      const borderCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderCssString : ''
      const borderRadiusCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString : ''

      return {
        borderCssString,
        borderRadiusCssString
      }
    }
  },
  methods: {
    CallAction() {
      const values = this.$refs.formBuilder.getValues()
      const form = {}
      values.forEach(field => {
        form[field.name] = field.value
      })
      form.event_id = this.localOptions.eventId
      this.$apiGateway.user.newsletter(form)
        .then(message => {
          this.$q.notify({
            type: 'positive',
            message,
            position: 'top'
          })
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
})
</script>

<style lang="scss" scoped>
$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('cssHoverEffectsBorderStyle.borderCssString');
$hoverBorderRadius: v-bind('cssHoverEffectsBorderStyle.borderRadiusCssString');
$skewX: v-bind('localOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('localOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('localOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('localOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('localOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('localOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('localOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('localOptions.cssHoverEffects.transition.time');

.contact-form-container {
  width: 100%;
  padding: 30px;
  box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  -webkit-border-radius: $borderRadius;
  -moz-border-radius: $borderRadius;
  border: $border;

  &:hover {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    box-shadow: $hoverShadows;
    -webkit-box-shadow: $hoverShadows;
    -moz-box-shadow: $hoverShadows;
    border-radius: $hoverBorderRadius;
    -webkit-border-radius: $hoverBorderRadius;
    -moz-border-radius: $hoverBorderRadius;
    border: $hoverBorder;
  }

  .form-title-wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
}
</style>
