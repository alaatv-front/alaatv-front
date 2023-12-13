<template>
  <div class="ShowMothersDayPostcard">
    <postcard-preview v-if="!postcard.loading"
                      :postcard-backgrounds="postcardBackgrounds"
                      :postcard-message-from="postcardMessageFrom"
                      :postcard-message-text="postcardMessageText"
                      :postcard-poem-body="postcardPoemBody"
                      :postcard-poem-title="postcardPoemTitle"
                      :pattern-backgrounds="patternBackgrounds"
                      :surprise-banners="surpriseBanners"
                      :surprise-discount-code="surpriseDiscountCode"
                      :flower-image="flowerImage" />
    <div v-else>
      <div v-if="postcardHasError">
        مشکلی رخ داده است.
      </div>
      <q-spinner-cube v-else
                      color="orange"
                      size="5.5em" />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { Postcard } from 'src/models/Postcard.js'
import PostcardPreview from './components/PostcardPreview.vue'

export default defineComponent({
  name: 'ShowMothersDayPostcard',
  components: { PostcardPreview },
  data () {
    return {
      postcardPoemTitle: 'روزت مبارک مادر عزیزم',
      postcardPoemBody: '' +
        '        مادر حضور نام تو در شعر های من\n' +
        '<br>\n' +
        '        لطف خداست شامل حال غزل شده است\n' +
        '<br>\n' +
        '        غیر از تو جای هیچ کسی نیست در دلم\n' +
        '<br>\n' +
        '        این مسأله میان من و عشق حل شده است...',
      postcardMessageText: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطر آنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیا',
      postcardMessageFrom: 'بهزاد',
      postcardBackgrounds: {
        size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/19201702280797.png',
        size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/14401702280833.png',
        size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/10241702280978.png',
        size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/6001702280907.png',
        size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/3601702281026.png'
      },
      patternBackgrounds: {
        size1920: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
        size1440: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back1440-19201702374213.png',
        size1024: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back10241702374341.png',
        size600: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back6001702374421.png',
        size360: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/back3601702374436.png'
      },
      surpriseDiscountCode: 'GFDfgkler0',
      surpriseBanners: [
        {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/11702373602.png',
          link: ''
        },
        {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/21702373813.png',
          link: ''
        },
        {
          src: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/31702373855.png',
          link: ''
        }
      ],
      flowerImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/object1702374033.png',
      postcard: new Postcard(),
      postcardHasError: false
    }
  },
  computed: {
    postcardId () {
      return this.$route.params.id
    }
  },
  mounted () {
    // this.surpriseDiscountCode = null
    this.getPostcard()
  },
  methods: {
    getPostcard () {
      this.postcard.loading = true
      APIGateway.postcard.getPostcard(this.postcardId)
        .then((postcard) => {
          this.postcard = new Postcard(postcard)
          const postcardData = this.postcard.getDecodedValue()
          this.postcardPoemBody = postcardData.postcardPoemBody
          this.postcardMessageText = postcardData.postcardMessageText
          this.postcardBackgrounds = postcardData.postcardBackgrounds
          this.patternBackgrounds = postcardData.patternBackgrounds
          this.flowerImage = postcardData.flowerImage
          // this.postcardMessageFrom = this.postcard.user.first_name + ' ' + this.postcard.user.last_name
          this.postcardMessageFrom = this.postcard.user.first_name
          this.getCoupon(this.postcard.user.id)
        })
        .catch(() => {
          this.postcard.loading = false
          this.postcardHasError = true
        })
    },
    getCoupon (userId) {
      APIGateway.postcard.getData(userId)
        .then((data) => {
          this.surpriseDiscountCode = data.coupon.code
          this.surpriseBanners = data.banners
          this.postcard.loading = false
        })
        .catch(() => {
          this.postcard.loading = false
          this.postcardHasError = true
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.ShowMothersDayPostcard {
  /* page > 1920 */
  display: flex;
  justify-content: center;
  align-items: center;
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {

  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {

  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {

  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {

  }
}
</style>
