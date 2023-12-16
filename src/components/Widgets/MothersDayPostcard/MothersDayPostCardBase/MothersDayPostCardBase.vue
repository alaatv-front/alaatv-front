<template>
  <div v-if="!loading"
       class="postcard-base-container">
    <div class="row full-width flex justify-center items-center">
      <div v-if="currentForm === 'first'"
           class="col-12">
        <mothers-day-postcard-first-form :postcard="postcard"
                                         @toggle-preview-dialog="togglePreview"
                                         @toggle-form="toggleForm" />
      </div>
      <div v-if="currentForm === 'second'"
           class="col-12 col-md-10">
        <mothers-day-postcard-second-form :postcard="postcard"
                                          @toggle-preview-dialog="togglePreview(this.postcard)"
                                          @invoke-edit-form="toggleForm" />
      </div>
    </div>
    <q-dialog v-model="previewDialog"
              maximized>
      <div class="top-toolbar">
        <q-btn class="close-btn"
               color="grey-1"
               icon="ph:x"
               square
               flat
               @click="togglePreview" />
      </div>
      <postcard-preview :postcard-poem-title="postcardConfig.postcardPoemTitle"
                        :postcard-poem-body="postcardConfig.postcardPoemBody"
                        :postcard-message-text="postcardConfig.postcardMessageText"
                        :postcard-message-from="postcardConfig.postcardMessageFrom"
                        :postcard-backgrounds="postcardConfig.postcardBackgrounds"
                        :pattern-backgrounds="postcardConfig.patternBackgrounds"
                        :flower-image="postcardConfig.flowerImage" />
    </q-dialog>
  </div>
  <div v-else
       class="loading">
    <q-spinner-grid color="primary"
                    size="3rem"
                    :thickness="5" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { Postcard, PostcardList } from 'src/models/Postcard.js'
import MothersDayPostcardFirstForm from './components/MothersDayPostcardFirstForm/MothersDayPostcardFirstForm.vue'
import MothersDayPostcardSecondForm from './components/MothersDayPostcardSecondForm/MothersDayPostcardSecondForm.vue'
import PostcardPreview from 'src/components/Widgets/MothersDayPostcard/ShowMothersDayPostcard/components/PostcardPreview.vue'

const defaultConfig = {
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
  flowerImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/object1702374033.png'
}

export default defineComponent({
  name: 'MothersDayPostCardBase',
  components: {
    PostcardPreview,
    MothersDayPostcardFirstForm,
    MothersDayPostcardSecondForm
  },
  data () {
    return {
      postcards: new PostcardList(),
      postcard: new Postcard(),
      currentForm: 'first',
      loading: false,
      previewDialog: false,
      postcardConfig: defaultConfig
    }
  },
  mounted () {
    this.getPostcards()
  },
  methods: {
    getPostcards () {
      this.loading = true
      APIGateway.postcard.getPostcards({
        study_event_id: 28
      })
        .then(postcardList => {
          this.postcards = postcardList
          this.currentForm = this.postcards.list.length > 0 ? 'second' : 'first'
          if (this.postcards.list.length > 0) {
            this.postcard = this.postcards.list[0]
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    togglePreview (postcard) {
      if (postcard && postcard.value) {
        const userPostcardConfig = JSON.parse(postcard.value)
        this.postcardConfig = {
          postcardPoemTitle: userPostcardConfig.postcardPoemTitle,
          postcardPoemBody: userPostcardConfig.postcardPoemBody,
          postcardMessageText: userPostcardConfig.postcardMessageText,
          postcardMessageFrom: userPostcardConfig.postcardMessageFrom,
          postcardBackgrounds: userPostcardConfig.postcardBackgrounds,
          patternBackgrounds: userPostcardConfig.patternBackgrounds,
          flowerImage: userPostcardConfig.flowerImage
        }
      }
      this.previewDialog = !this.previewDialog
    },
    toggleForm () {
      if (this.currentForm === 'second') {
        this.currentForm = 'first'
      } else {
        this.getPostcards()
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.postcard-base-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.top-toolbar {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  z-index: 2;
  justify-content: flex-start;
  align-items: center;
  height: 56px;
  padding: $spacing-none $space-8;
  background: rgba(0, 0, 0, 0.40);

  @include media-max-width('md') {
    height: 40px;
    padding: $spacing-none $space-7;
  }
  @include media-max-width('sm') {
    padding: $spacing-none $space-5;
  }
}
</style>
