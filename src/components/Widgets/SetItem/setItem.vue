<template>
  <q-card
    class="set-box"
  >
    <div class="image-container active">
      <img
        class="setItem-image"
        :src="set.photo"
        alt="set photo"
      >
    </div>
    <div class="info-box row">
      <div class="title-box self-start">
        {{ set.title }}
      </div>
      <div class="action-box self-end">
        <div class="row justify-end">
          <div
            class="action-box-title row items-center"
          >
            مشاهده دوره
            <img
              src="https://nodes.alaatv.com/upload/landing/30/sets-section/landing-30-sets-section-arrow-btn.png"
              height="24"
              width="24"
              alt="icon"
            >
          </div>
          <span class="action-box-active-title">
            در حال نمایش
          </span>
        </div>

      </div>
    </div>
  </q-card>

</template>

<script>
import { Set } from 'src/models/Set'

export default {
  name: 'setItem',
  props: {
    data: {
      type: Set,
      default: new Set()
    }
  },
  data: () => ({
    set: new Set()
  }),
  mounted () {
    this.set = new Set(this.data)
    console.log(this.data)
  }

}
</script>

<style lang="scss" scoped>
.set-box {
  margin-bottom: 10px;
  width: 333px;
  padding: 16px 16px 16px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(85, 85, 85, 0.15);
  border-radius: 20px;
  cursor:pointer;
  display: flex;
  &.active{
    background: linear-gradient(0deg, rgba(58, 181, 73, 0.08), rgba(58, 181, 73, 0.08)), #FFFFFF;
    border-bottom: 3.5px solid #3AB549;
    box-shadow: 0 4px 12px rgba(85, 85, 85, 0.15);
  }
  .image-container{
    width: 100px;
    height: 100px;
    border-radius: 16px;
    img{
      width: inherit;
      height: inherit;
      border-radius:inherit;
    }
  }
  .info-box {
    border-radius: 0;
    padding-left: 16px;
    .title-box {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0;
      font-weight: 500;
      font-size: 16px;
      line-height: 28px;
      color: #333333;
    }
    .action-box {
      margin: 0;
      width: 100%;
      .action-box-title {
        color: #3AB549;
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        img{
          margin-left: 8px;
        }
      }
      .action-box-active-title {
        display: block;
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
        color: #3AB549;
      }
    }
  }
}

.set-box.active  .info-box .action-box .action-box-title {
  display: none;
}

.set-box .info-box .action-box .action-box-active-title {
  display: none;
}

@media screen and (max-width: 1479px){

}
@media screen and (max-width: 1199px){

}
@media screen and (max-width: 991px){

}
@media screen and (max-width: 767px){

}
@media screen and (max-width: 575px){
.set-box {
  width: 288px;
  .image-container{

  }
  .info-box {

    .title-box {

    }
    .action-box {
      .action-box-title {

      }

    }
  }
}
}
</style>
