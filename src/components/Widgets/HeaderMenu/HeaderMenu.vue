<template>
  <div class="header-menu">
    <div class="logo-pic"
         @click="routeTo('Public.Home')">
      <lazy-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
                :alt="'logo'"
                width="40"
                height="40"
                class="logo-pic-img" />
      <div class="logo-text">
        مدرسه آنلاین آلاء
      </div>

    </div>
    <div class="routes">
      <q-list class="routes-list">
        <q-item v-for="item in menuLink"
                :key="item"
                class="route-link"
                clickable>
          <q-item-section>{{ item.label }}</q-item-section>
        </q-item>
      </q-list>
    </div>
    <div class="user">
      <q-btn color="white"
             flat
             label="ثبت نام"
             @click="routeTo('Login')" />
    </div>
  </div>
</template>

<script>
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'HeaderMenu',
  components: { LazyImg },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      menuLink: []
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.menuLink = this.options.menuLink
    },
    routeTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.header-menu {
  display: flex;
  justify-content: space-between;

  .logo-pic {
    cursor: pointer;
    display: flex;
    height: 72px;
    align-items: center;
    @media screen and (max-width: 1023px) {
      height: 64px;
    }
    .logo-pic-img {
      height: 40px;
      width: 40px;
      @media screen and (max-width: 1023px) {
        height: 48px;
        width: 48px;
      }
    }
    .logo-text {
      padding: 0 10px;
      color: #fff;
      padding: 0 10px;
      font-weight: 400;
      font-size: 16px;
      line-height: 28px;
    }
  }

  .routes {
    .routes-list {
      display: flex;

      .route-link {
        color: #fff;
        margin: 0 20px;
        font-weight: 400;
        font-size: 16px;
        line-height: 28px;
        cursor: pointer;

        &:deep(.q-focus-helper) {
          display: none;
        }
      }
    }
  }

  .user {
    margin: 0 20px;
    font-weight: 400;
    font-size: 16px;
    line-height: 28px;
    &:deep(.q-btn .q-focus-helper) {
      display: none;
    }
  }
}
</style>
