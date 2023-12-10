<template>
  <div class="Postcard">
    <div class="action-area testBorer">
      <q-btn label="ddd" />
    </div>
    <div class="poem testBorer">
      poem
    </div>
    <div class="message testBorer">
      message
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'Postcard'
})
</script>

<style lang="scss" scoped>
.testBorer {
  border: solid 1px red;
}
.Postcard {
  position: relative;
  width: 784px;
  height: 784px;
  background-image: url("https://nodes.alaatv.com/upload/alaaPages/2023-12/r1702215439.png");
  background-size: cover;
  .poem {
    position: absolute;
    width: 272px;
    height: 272px;
    top: 64px;
    left: 56px;
  }
  .action-area {
    position: absolute;
    width: 223px;
    height: 79px;
    top: 64px;
    right: 56px;
  }
  .message {
    position: absolute;
    width: 250px;
    height: 180px;
    bottom: 64px;
    left: 56px;
  }
  @include media-max-width('md') {
    width: 540px;
    height: 638px;
    background-image: url("https://nodes.alaatv.com/upload/alaaPages/2023-12/10241702215900.png");
    .poem {
      width: 227px;
      height: 228px;
      top: 48px;
      left: 32px;
    }
    .action-area {
      width: 223px;
      height: 79px;
      top: 48px;
      right: 32px;
    }
    .message {
      width: 190px;
      height: 180px;
      bottom: 48px;
      left: 32px;
      padding-left: 4px;
    }
  }
  @include media-max-width('sm') {
    width: 536px;
    height: 654px;
    background-image: url("https://nodes.alaatv.com/upload/alaaPages/2023-12/6001702216269.png");
    .poem {
      width: 227px;
      height: 192px;
      top: 119px;
      left: 50%;
      transform: translateX(-50%);
    }
    .action-area {
      width: 170px;
      height: 55px;
      top: 40px;
      right: 50%;
      transform: translateX(50%);
    }
    .message {
      width: 190px;
      height: 180px;
      bottom: 48px;
      left: 32px;
      padding-left: 4px;
    }
  }
}
</style>
