<template>
  <q-card class="item-box q-mb-md">
    <q-img
      :src="set.photo"
      class="img"
      alt="set"
    />
    <q-card-section
    >
      <p   class="title">
        {{set.title}}
        {{set.title}}
      </p>

    </q-card-section>
  </q-card>
  <q-card
    class="row set-box"
  >
    <div class="image-container active">
      <img
        class="setItem-image"
        :src="set.photo"
        alt="set photo"
      >
    </div>
    <div class="info-box">
      <div class="title-box row">
        {{ set.title }}
      </div>
      <div class="action-box row">
        <div
          class="action-box-title"
        >
          مشاهده دوره
          <img
            src="https://nodes.alaatv.com/upload/landing/30/sets-section/landing-30-sets-section-arrow-btn.png"
            height="24"
            width="24"
          >
        </div>
        <span class="action-box-active-title">
          در حال نمایش
        </span>
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
.item-box{
  width: 260px;
  border-radius: 20px;
  .title{
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    height:48px;
    letter-spacing: -0.03em;
    color: #333333;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
    &::before{
      content: '.';
      font-size: 50px;
      color: #36a2f5;
      line-height: 10px;
      margin-right: 5px;
    }
  }
}
.set-box {
  padding: 16px 16px 16px 20px;
  background: #FFFFFF;
  box-shadow: 0px 4px 12px rgba(85, 85, 85, 0.15);
  border-radius: 20px;
  cursor:pointer;
  &.active{
    background: linear-gradient(0deg, rgba(58, 181, 73, 0.08), rgba(58, 181, 73, 0.08)), #FFFFFF;
    border-bottom: 3.5px solid #3AB549;
    box-shadow: 0 4px 12px rgba(85, 85, 85, 0.15);
  }
  .image-container{
    img{
      width: 60px;
    }
  }
  .info-box {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
      justify-content: flex-end;
      .action-box-title {
        color: #3AB549;
        font-weight: 700;
        font-size: 14px;
        line-height: 24px;
      }
    }
  }
}

.set-box.active  .info-box .action-box .action-box-title {
  display: none;
}

.set-box  .info-box .action-box .action-box-active-title {
  display: none;
}

.set-box.active  .info-box .action-box .action-box-active-title {
  display: block;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  color: #3AB549;
}
@media screen and (max-width: 1479px){
  .set-box  .info-box .title-box{
    padding-right:9px
  }
}
@media screen and (max-width: 1199px){
  .set-box  .info-box .title-box{
    padding-right:30px
  }
}
@media screen and (max-width: 991px){
  .set-box  .info-box .title-box{
    padding-right:0px;
    transform: translateX(calc(20% - 50px));
  }
}
@media screen and (max-width: 767px){
  .set-box  .info-box .title-box{
    transform: translateX(calc(20% - 66px));
  }
}
@media screen and (max-width: 575px){
  .set-box  .info-box .title-box{
    transform: translateX(calc(100% - 110px));
  }
}
</style>
