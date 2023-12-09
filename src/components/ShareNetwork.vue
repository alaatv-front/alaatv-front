<template>
  <div>
    <q-btn v-for="network in networks"
           :key="network.name"
           rounded
           dense
           flat
           color="grey-10"
           :icon="network.icon || undefined"
           class="size-sm q-mx-xs"
           @click="onClickItem(network)">
      <q-tooltip>
        {{ network.tooltip }}
      </q-tooltip>
    </q-btn>
  </div>
</template>

<script>
export default {
  name: 'ShareNetwork',
  props: {
    url: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      networks: [
        {
          name: 'whatsapp',
          tooltip: 'whatsapp',
          icon: 'ph:whatsapp-logo'
        },
        {
          name: 'telegram',
          tooltip: 'telegram',
          icon: 'ph:telegram-logo'
        },
        {
          name: 'mail',
          tooltip: 'mail',
          icon: 'ph:envelope-simple'
        },
        {
          name: 'linkedin',
          tooltip: 'linkedin',
          icon: 'ph:linkedin-logo'
        },
        {
          name: 'pinterest',
          tooltip: 'pinterest',
          icon: 'ph:pinterest-logo'
        },
        {
          name: 'twitter',
          tooltip: 'twitter',
          icon: 'ph:twitter-logo'
        },
        {
          name: 'facebook',
          tooltip: 'facebook',
          icon: 'ph:facebook-logo'
        }
      ]
    }
  },
  methods: {
    onClickItem (item) {
      this.$emit('on-select', {
        name: item.name,
        url: this.getShareLink(item.name)
      })
    },
    getShareLink (socialMedia) {
      if (socialMedia === 'telegram') {
        return 'https://telegram.me/share/url?url=' + this.url
      } else if (socialMedia === 'whatsapp') {
        return 'https://web.whatsapp.com/send?l=en&text=' + this.url
      } else if (socialMedia === 'mail') {
        return 'mailto:info@alaatv.com?&subject=' + this.url
      } else if (socialMedia === 'linkedin') {
        return 'https://www.linkedin.com/shareArticle?mini=true&url=' + this.url
      } else if (socialMedia === 'pinterest') {
        return 'https://pinterest.com/pin/create/button/?url=' + this.url
      } else if (socialMedia === 'twitter') {
        return 'https://twitter.com/home?status=' + this.url
      } else if (socialMedia === 'facebook') {
        return 'https://www.facebook.com/sharer/sharer.php?u=' + this.url
      }
    }
  }
}
</script>
