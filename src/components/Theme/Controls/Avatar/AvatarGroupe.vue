<template>
  <div class="avatar-groupe">
    <q-avatar v-for="(item, index) in avatars"
              :key="index"
              :class="computedClass"
              :size="computedSize">
      <q-img :src="item"
             spinner-color="primary"
             :spinner-size="computedSize" />
    </q-avatar>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AvatarGroupe',
  props: {
    avatars: {
      type: Array,
      default: () => []
    },
    size: {
      type: String,
      default: '40px'
    }
  },
  computed: {
    computedSize () {
      return this.size === 'xs' ? '24px' : this.size === 'sm' ? '32px' : this.size === 'md' ? '40px' : this.size === 'lg' ? '48px' : this.size === 'xl' ? '56px' : this.size
    },
    computedClass () {
      return this.size === 'xs' ? 'avatar-xs' : this.size === 'sm' ? 'avatar-sm' : this.size === 'md' ? 'avatar-md' : this.size === 'lg' ? 'avatar-lg' : this.size === 'xl' ? 'avatar-xl' : ''
    }
  }
})
</script>
