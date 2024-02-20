<template>
  <div class="chatre-nejat-header">
    <div class="logo-box" />
    <div class="header-box flex justify-center items-center">
      <q-img :src="event.logo"
             class="header-logo-img" />
    </div>
    <div class="profile-box flex items-center">
      <q-btn v-if="hostName === 'ehsan.alaatv.com'"
             color="grey"
             class="size-lg q-mx-sm"
             square
             flat
             icon="ph:bell-simple"
             :disable="!hasUnreadMessage"
             size="md">
        <template v-if="hasUnreadMessage">
          <q-badge :label="unreadMessagesCount"
                   rounded
                   floating
                   class="badge-xs"
                   color="secondary" />
          <q-menu anchor="center middle"
                  self="top left">
            <q-item v-for="item in messages"
                    :key="item.id"
                    class="message-menu-item"
                    clickable>
              <q-item-section class="message-menu-item-section">{{ item.message }}</q-item-section>
            </q-item>
            <q-separator />
            <q-item v-close-popup
                    class="message-menu-item"
                    clickable
                    @click="readAllMessages">
              <q-item-section>خواندن همه</q-item-section>
            </q-item>
          </q-menu>
        </template>
      </q-btn>
      <btn-user-profile-menu />
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinAuth, mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import BtnUserProfileMenu from 'src/components/BtnUserProfileMenu.vue'

export default {
  name: 'TripleTitleSetPanel',
  components: { BtnUserProfileMenu },
  mixins: [mixinAuth, mixinTripleTitleSet],
  data () {
    return {
      messages: [],
      activePage: null,
      unreadMessagesCount: 0
    }
  },
  computed: {
    hasUnreadMessage () {
      return !!this.unreadMessagesCount && this.unreadMessagesCount > 0
    }
  },
  mounted () {
    if (window.innerWidth < 1024) {
      this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
    }
    this.loadBonyadEhsanUnreadMessages()
  },
  methods: {
    logOut () {
      this.$store.dispatch('Auth/logOut')
    },
    loadBonyadEhsanUnreadMessages () {
      if (this.hostName !== 'ehsan.alaatv.com') {
        return
      }

      this.getUnreadMessages()
    },
    getUnreadMessages () {
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
        .then(() => {
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

.message-menu-item {
  width: 320px;

  .message-menu-item-section {
    width: 100%;
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
