<template>
  <q-card class="comment-card"
          :style="localOptions.style"
          :class="localOptions.className">
    <q-card-section class="comment-author">
      <q-avatar class="author-avatar"
                size="48px">
        <q-img :src="comment.image"
               spinner-color="primary"
               spinner-size="48px" />
      </q-avatar>
      <div class="comment-author-info">
        <div class="author-name">{{ comment.first_name + ' ' + comment.last_name }}</div>
        <div class="author-info">
          <div class="author-rank">
            {{ comment.rank }}
          </div>
          <q-separator class="info-separator"
                       vertical />
          <div class="author-major">
            {{ comment.major }}
          </div>
        </div>
      </div>
    </q-card-section>
    <q-separator class="message-separator" />
    <q-card-section class="comment-message">
      {{ comment.message }}
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default defineComponent({
  name: 'CommentItem',
  mixins: [mixinWidget],
  props: {
    comment: {
      type: Object,
      default() {
        return {
          order: null,
          message: null,
          major: null,
          rank: null,
          first_name: null,
          last_name: null,
          image: null
        }
      }
    }
  },
  data() {
    return {
      loading: false
    }
  },
  computed: {
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
    },
    parentComponent() {
      if (this.localOptions.action.route) {
        if (this.isExternal(this.localOptions.action.route)) {
          return 'a'
        } else {
          return 'router-link'
        }
      }
      return 'div'
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
.comment-card {
  padding: 30px 24px;
  margin: 12PX;
  width: 438px;
  max-height: 218px;
  height: 100%;
  max-width: 100%;
  box-shadow: $shadows;
  -webkit-box-shadow: $shadows;
  -moz-box-shadow: $shadows;
  -webkit-border-radius: $borderRadius;
  -moz-border-radius: $borderRadius;
  border: $border;
  transition: all ease-in-out .4s;

  @media screen and (max-width: 600px){
    padding: 20px 15px;
    margin: 5PX;
    width: 310px;
    height: 308px;
  }

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

  .comment-author {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0;

    .author-avatar {
      margin-right: 17px;
    }

    .author-name {
      color:#424242;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.32px;
      text-align: left;

      @media screen and (max-width: 600px){
        font-size: 16px;
        letter-spacing: -0.32px;
      }
    }

    .author-info {
      display: flex;
      align-items: center;
      justify-content: flex-start;

      .author-rank {
        color:#FF944A;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.28px;

        @media screen and (max-width: 600px){
          font-size: 14px;
          letter-spacing: -0.28px;
        }
      }

      .info-separator {
        margin: auto 16px;
        height: 14px;
      }

      .author-major {
        color:#9E9E9E;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.28px;

        @media screen and (max-width: 600px){
          font-size: 14px;
          letter-spacing: -0.28px;
        }
      }
    }
  }

  .message-separator {
    margin: 16px 0;
  }

  .comment-message {
    padding: 0;
    width: 100%;
    max-width: 100%;
    color:#424242;
    font-size: 14px;
    text-align: left;
  }
}
</style>
