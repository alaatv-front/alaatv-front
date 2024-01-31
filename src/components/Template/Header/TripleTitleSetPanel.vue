<template>
  <div class="chatre-nejat-header">
    <div class="logo-box">
      <router-link :to="{name: 'Public.Home'}">
        <q-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
               class="logo-image" />
      </router-link>
    </div>
    <div class="header-box flex justify-center items-center">
      <q-img :src="logoImage"
             class="header-logo-img" />
    </div>
    <div class="profile-box flex items-center">
      <q-btn v-if="hostName === 'ehsan.alaatv.com'"
             :color="hasUnreadMessage ? 'primary' : 'grey'"
             class="size-lg q-mx-sm"
             square
             flat
             icon="ph:bell-simple"
             :disable="hasUnreadMessage"
             size="md">
        <q-badge v-if="hasUnreadMessage"
                 :label="unreadMessagesCount"
                 rounded
                 floating
                 class="q-ml-lg q-mt-lg badge-xs"
                 color="secondary" />
        <q-menu v-if="messages.length > 0"
                anchor="center middle"
                self="top left">
          <q-item v-for="item in messages"
                  :key="item.id"
                  clickable>
            <q-item-section>{{ item.message }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item v-if="hasUnreadMessage"
                  v-close-popup
                  clickable
                  @click="readAllMessages">
            <q-item-section>خواندن همه</q-item-section>
          </q-item>
        </q-menu>
      </q-btn>

      <btn-user-profile-menu />

    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinAuth, mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import BtnUserProfileMenu from 'components/BtnUserProfileMenu.vue'

export default {
  name: 'TripleTitleSetPanel',
  components: { BtnUserProfileMenu },
  mixins: [mixinAuth, mixinTripleTitleSet],
  data: () => ({
    user: new User(),
    activePage: null,
    messages: [],
    unreadMessagesCount: 0
  }),
  computed: {
    hasUnreadMessage () {
      return !!this.unreadMessagesCount && this.unreadMessagesCount > 0
    },
    hostName () {
      if (typeof window === 'undefined') {
        return 'else'
      }
      return this.domainSameWithAppDomain ? window.location.host : 'else'
    },
    logoImage () {
      const logoImages = {
        'localhost:8083': this.event.logo,
        'alaatv.com': this.event.logo,
        'ehsan.alaatv.com': 'https://nodes.alaatv.com/upload/alaaPages/2024-01/boniad-ehsan-logo1704111571.png',
        else: null
      }
      return logoImages[this.hostName]
    }
  },
  mounted () {
    this.loadAuthData()
    if (window.innerWidth < 1024) {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
    }
    this.loadMessageData()
  },
  methods: {
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    },
    logOut () {
      this.$store.dispatch('Auth/logOut')
    },
    loadMessageData () {
      if (this.hostName === 'ehsan.alaatv.com') {
        // this.getMessages()
        this.countUnreadMessages()
      }
    },
    getMessages () {
      APIGateway.bonyad.getMessages({
        read: 'read',
        owner_id: 1
      })
        .then(messagesObject => {
          this.messages = messagesObject.messages
        })
        .catch(() => {})
    },
    countUnreadMessages () {
      APIGateway.bonyad.getMessages({
        read: 'unread',
        owner_id: 1
      })
        .then(messagesObject => {
          this.messages = messagesObject.messages
          this.unreadMessagesCount = messagesObject.meta.total
        })
        .catch(() => {})
    },
    readAllMessages () {
      APIGateway.bonyad.readAllMessages()
        .then(response => {
          this.unreadMessages = []
          this.unreadMessagesCount = 0
        })
        .catch(() => {})
    }
  }
}
</script>

<style scoped lang="scss">
.menu-item{
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #9fa5c0;

  .profile-photo{
    margin-right:15px;

    .img{
      width: 36px;
      height: 36px;
    }

  }

  .name{
    font-size: 16px;
    font-weight: 500;
    color: #3e5480;
    margin-bottom: 3px;
  }

  .phone-number{
    font-size: 14px;
  }

  .separator{
    width: 90%;
  }
}

$header-height: 64px;
.chatre-nejat-header{
  height: $header-height;
  background: #fff;
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;

  .logo-box {
    width: auto;
    height: $header-height;
    align-self: center;
    margin-left: 25px;
    visibility: hidden;

    @media screen and (width <= 990px) {
      visibility: visible;
    }
  }

  .profile-box{
    padding-right: 18px;
  }

  .header-box {
    height: $header-height;
    .header-logo-img {
      width: 142px;
      max-height: $header-height;
      :deep(.q-img) {
        width: auto;
        max-height: $header-height;
      }

      @media screen and (width <= 990px) {
        width: 126px;
      }

      @media screen and (width <= 768px) {
        width: 86px;
      }
    }
  }

  .profile-box {
    height: $header-height;
    padding-right: 18px;
  }

  .expanded-panel{
    margin: 0 30px;
    box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
  }
}
</style>
