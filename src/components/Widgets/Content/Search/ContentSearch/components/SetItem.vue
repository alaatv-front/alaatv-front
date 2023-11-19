<template>
  <router-link :to="{
                 name: 'Public.Set.Show',
                 params: { id: data.id? data.id:-1, title: data.title }
               }"
               class="set-box">
    <q-card flat
            class="content-box-card ">
      <lazy-img :src="data.photo"
                :alt="data.title"
                width="16"
                height="9">
        <div class="absolute-left column justify-center items-center">
          <div class="text-h6">{{ data.contents_count }}</div>
          <div class="q-mb-sm">محتوا</div>
          <q-icon name="mdi-playlist-play"
                  color="#fff" />
        </div>
      </lazy-img>
      <div class="content-description">
        <p>{{ data.title }}</p>
      </div>
    </q-card>
  </router-link>
</template>

<script>
import LazyImg from 'components/lazyImg.vue'
export default {
  name: 'SetBox',
  components: {
    LazyImg
  },
  props: ['data']
}
</script>

<style lang="scss" scoped>

.set-box {
  .content-box-card {
    width: 300px;
    font-size: 18px;
    font-weight: 500;
    border-radius: 15px;

    @media screen and (width <= 1904px) {
      width: 278px;
      height: 248px;
    }

    @media screen and (width <= 1264px) {
      font-size: 16px;
      width: 285px;
      height: 240px;
    }

    @media screen and (width <= 960px) {
      width: 218px;
      height: 210px;
    }

    @media screen and (width <= 600px) {
      width: 238px;
      height: 205px;
      font-size: 14px;
    }

    .image-container {
      position: relative;
      width: 100%;
      height: 100%;

      img {
        width: 100%;
      }

      .image-body {
        //width: 293px;
        //height: 163px;
        //@media screen and (max-width: 1904px){
        //    width: 278px;
        //    height: 155px;
        //}
        //@media screen and (max-width: 1264px){
        //    width: 285px;
        //    height: 160px;
        //}
        //@media screen and (max-width: 960px){
        //    width: 218px;
        //    height: 122px;
        //}
        //@media screen and (max-width: 600px){
        //    width: 238px;
        //    height: 133px;
        //}
        //@media screen and (max-width: 350px){
        //    width: 232px;
        //    height: 129px;
        //}
      }
    }

    .content-description {
      padding: 16px;

      @media screen and (width <= 500px) {
        padding: 10px;
      }

      p {
        font-size: 16px;
        font-weight: 300;
        color: #333;
        line-height: 25px;
        min-height: 50px;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        margin-bottom: 0;

        @media screen and (width <= 600px) {
          font-size: 12px;
        }

        &::before {
          content: ".";
          color: #36a3f7;
          font-size: 35px;
          margin-right:5px;
          font-weight: bold;
          line-height: 10px;
        }
      }
    }
  }
}
</style>
