<template>
  <div class="consulting-card "
       :class=" oneDayPast ? 'card-opacity':''">
    <div class="card-header">
      <span class="card-title"
            :class=" oneDayPast ? 'card-opacity':''">
        {{ newItem.title }}
      </span>
      <span class="card-date"
            :class=" oneDayPast ? 'card-opacity':''">
        {{ newItem.shamsiDate('created_at').dateTime }}
      </span>
    </div>
    <!--        v-if="!longDescription"-->
    <p v-if="!false"
       class="card-description"
       :class=" oneDayPast ? 'card-opacity':''"
       v-html="newItem.description" />
  </div>
</template>

<script>
import { LiveDescription } from 'src/models/LiveDescription'

export default {
  name: 'consultingMessage',
  props: {
    newItem: {
      type: LiveDescription,
      default: new LiveDescription()
    }
  },
  data () {
    return {
      oneDayPast: false
    }
  },
  methods: {
    escapeHtml (unsafe) {
      return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;')
    }
  }
}
</script>
<style lang="scss" scoped>
.consulting-card {
    background-color: #fff;
    height: 148px;
    width: 500px;
    border-radius: 20px;
    padding: 20px 20px 24px;
    margin-right: 16px;
    margin-bottom: 20px;
    margin-top: 20px;

    &:first-child{
        margin-right: 20px;
    }

    @media screen and (width <= 1904px) {
        width: 460px;
    }

    @media screen and (width <= 1200px) {
        padding: 15px 20px 24px;
    }

    @media screen and (width <= 990px) {
        height: 140px;
        padding: 15px 16px 16px;

        &:first-child{
            margin-right: 15px;
        }
    }

    @media screen and (width <= 768px) {
        height: 122px;
        width: 371px;
        border-radius: 10px;
        padding: 15px 16px 16px 19px;
    }

    @media screen and (width <= 576px) {
        height: 130px;
        width: 303px;
        padding: 10px 15px;
    }

    @media screen and (width <= 350px) {
        height: 135px;
        width: 276px;
        padding: 10px 16px 13px;
    }

    &.card-opacity {
        opacity: 0.7;

    }

    .card-header {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        .card-title {
            color: #3e5480;
            font-size: 18px;
            font-weight: 500;

            @media screen and (width <= 768px) {
                font-size: 16px;
            }
        }

        .card-date {
            font-size: 12px;
            color: #9fa5c0;

            @media screen and (width <= 768px) {
                font-size: 10px;
            }
        }
    }

    .card-description {
        color: #3e5480;
        font-size: 16px;
        overflow: auto;
        overflow-x: hidden;
        height: 76px;
        margin-bottom: 0 !important;

        @media screen and (width <= 768px) {
            height: 60px;
            font-size: 12px;
        }

        @media screen and (width <= 576px) {
            height: 80px;
        }

        &:deep(p) {
            overflow: hidden;
            margin-bottom: 0 !important;
        }
    }
}
</style>
