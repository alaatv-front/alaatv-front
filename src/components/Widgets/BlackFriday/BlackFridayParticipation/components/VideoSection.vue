<template>
  <div class="VideoSection">
    <div class="title">
      عنوان فرضی 1
    </div>
    <div class="description">
      لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز
    </div>
    <div class="video-section">
      <q-btn icon="ph:caret-right"
             class="arrow arrow-right" />
      <div class="video-box unlock">
        <div class="state-layer state-unlock">
          <svg xmlns="http://www.w3.org/2000/svg"
               width="64"
               height="64"
               viewBox="0 0 64 64"
               fill="none">
            <g clip-path="url(#clip0_254_2065)">
              <path d="M62 32.0154C62 48.5385 48.5334 62 32 62C15.4666 62 2 48.5385 2 32.0154C2 15.4602 15.4679 2 32 2C48.5322 2 62 15.4602 62 32.0154Z"
                    stroke="#D0CCF4"
                    stroke-width="4" />
              <path d="M44.6666 32.0147C44.6666 32.7785 44.4242 33.5453 43.9393 34.1593C43.8484 34.2797 43.4242 34.7762 43.0908 35.0993L42.909 35.2756C40.3636 37.9519 34.0302 41.9766 30.8181 43.2663C30.8181 43.2957 28.909 44.0625 27.9999 44.0889H27.8787C26.4848 44.0889 25.1817 43.328 24.5151 42.0942C24.1514 41.4155 23.8181 39.4472 23.7878 39.4208C23.5151 37.6552 23.3333 34.9525 23.3333 31.9853C23.3333 28.8742 23.5151 26.051 23.8484 24.3178C23.8484 24.2884 24.1817 22.702 24.3939 22.1732C24.7272 21.4123 25.3333 20.7631 26.0908 20.3518C26.6969 20.0609 27.3333 19.9111 27.9999 19.9111C28.6969 19.9434 29.9999 20.3812 30.5151 20.5868C33.909 21.8794 40.3939 26.1098 42.8787 28.695C43.3029 29.1063 43.7575 29.6087 43.8787 29.7232C44.3939 30.3695 44.6666 31.1627 44.6666 32.0147Z"
                    fill="#D0CCF4" />
            </g>
            <defs>
              <clipPath id="clip0_254_2065">
                <rect width="64"
                      height="64"
                      fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
      <q-btn icon="ph:caret-left"
             class="arrow arrow-left" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VideoSection',
  data () {
    return {

    }
  }
})

</script>

<style scoped lang="scss">
.VideoSection {
  display: flex;
  flex-wrap: wrap;
  flex-flow: column;
  align-items: center;
  .title {
    color: #FFF;
    text-align: center;
    font-family: ModamFaNumWeb,serif;
    font-size: 32px;
    font-style: normal;
    font-weight: 900;
    line-height: normal;
    letter-spacing: -0.96px;
    margin-bottom: 20px;
    width: 100%;
  }
  .description {
    color: #FFF;
    text-align: center;
    font-family: ModamFaNumWeb,serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.54px;
    margin-bottom: 60px;
    width: 711px;
  }
  .video-section {
    position: relative;
    .video-box {
      position: relative;
      width: 668px;
      height: 375px;
      border-radius: 20px;
      background: #19172E;
      box-shadow: 0 0 32px 0 rgba(51, 51, 51, 0.09);
      @media screen and (max-width: 1439px) {
        width: 472px;
        height: 264px;
      }
      @media screen and (max-width: 1023px) {
        width: 540px;
        height: 300px;
      }
      @media screen and (max-width: 599px) {
        width: 320px;
        height: 179px;
      }
      .state-layer {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
        display: flex;
        justify-content: center;
        align-items: center;
        &.state-unlock {
          svg {
            cursor: pointer;
          }
        }
      }
    }
    :deep(.arrow) {
      position: absolute;
      z-index: 3;
      width: 40px;
      height: 40px;
      border-radius: 100px;
      background: #2F2A5B;
      box-shadow: 0 3px 2px 0 rgba(16, 24, 40, 0.06), 0 3px 3px 0 rgba(16, 24, 40, 0.08);
      top: calc( 50% - 20px );
      @media screen and (max-width: 1023px) {
        width: 32.335px;
        height: 32.335px;
      }
      @media screen and (max-width: 599px) {
        width: 32px;
        height: 32px;
      }
      .q-btn__content {
        .q-icon {
          font-size: 20px;
          color: #D0CCF4;
        }
      }
      &.arrow-left {
        right: -20px;
      }
      &.arrow-right {
        left: -20px;
      }
    }
  }
}
</style>
