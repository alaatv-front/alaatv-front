<template>
  <q-btn :class="computedClassName"
         class="bookmark-btn"
         :rounded="rounded"
         :flat="!color"
         :loading="loading"
         :icon="isFavored ? favoredIcon : unFavoredIcon"
         @click="bookmark">
    <q-tooltip anchor="top middle"
               self="bottom middle"
               :offset="[10, 10]">
      نشان کردن
    </q-tooltip>
    <template v-slot:loading>
      <q-spinner color="primary" />
    </template>
  </q-btn>
</template>

<script>
export default {
  name: 'Bookmark',
  props: {
    isFavored: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    rounded: {
      default: true,
      type: Boolean
    },
    favoredIcon: {
      default: 'ph:book-bookmark',
      type: String
    },
    unFavoredIcon: {
      default: 'ph:book-bookmark',
      type: String
    },
    className: {
      default: undefined,
      type: String
    },
    color: {
      default: undefined,
      type: String
    },
    textColor: {
      default: 'black',
      type: String
    }
  },
  emits: [
    'update:value',
    'clicked'
  ],
  data () {
    return {}
  },
  computed: {
    computedClassName () {
      const favoredClass = this.isFavored ? 'favored-state' : 'unfavored-state'
      const propClass = this.className || ''
      return propClass + ' ' + favoredClass
    },
    isUserLogin () {
      return this.$store.getters['Auth/isUserLogin']
    }
  },
  methods: {
    bookmark () {
      this.$emit('clicked')
      // if (!this.isUserLogin) {
      //   this.$store.commit('Auth/updateRedirectTo', { name: this.$route.name, params: this.$route.params })
      //   this.$store.commit('AppLayout/updateLoginDialog', true)
      // }
    }
  }
}
</script>

<style scoped lang="scss">
.bookmark-btn {
  z-index: 1000;
  padding: 5px;
  margin: 5px;
  &.favored-state {
    color: $primary;
  }
  &.unfavored-state {

  }
}
.hide{
  display: none;
}
</style>
