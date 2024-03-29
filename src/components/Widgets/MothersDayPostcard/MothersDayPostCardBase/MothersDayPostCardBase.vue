<template>
  <div v-if="!loading"
       class="postcard-base-container">
    <div class="row full-width flex justify-center items-center">
      <div v-if="currentForm === 'first'"
           class="col-12">
        <mothers-day-postcard-first-form :postcard="computedPostcard"
                                         @postcard-completed="onPostcardCompleted"
                                         @toggle-preview-dialog="showPreview"
                                         @toggle-form="toggleForm" />
      </div>
      <div v-if="currentForm === 'second'"
           class="col-12 col-md-10">
        <mothers-day-postcard-second-form :postcard="computedPostcard"
                                          @toggle-preview-dialog="showPreview(this.postcard)"
                                          @invoke-edit-form="toggleForm" />
      </div>
    </div>
    <q-dialog v-model="previewDialog"
              maximized>
      <div class="top-toolbar">
        <q-btn v-close-popup
               class="close-btn"
               color="grey-1"
               icon="ph:x"
               square
               flat />
      </div>
      <postcard-preview :postcard-poem-title="postcardConfig.postcardPoemTitle"
                        :postcard-poem-body="postcardConfig.postcardPoemBody"
                        :postcard-message-text="postcardConfig.postcardMessageText"
                        :postcard-message-from="postcardConfig.postcardMessageFrom"
                        :postcard-backgrounds="postcardConfig.postcardBackgrounds"
                        :pattern-backgrounds="postcardConfig.patternBackgrounds"
                        :flower-image="postcardConfig.flowerImage"
                        :audio-source="postcardConfig.audioSource"
                        :entrance-body-movin="postcardConfig.entranceBodyMovin" />
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
import { mixinAuth } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { Postcard, PostcardList } from 'src/models/Postcard.js'
import MothersDayPostcardFirstForm from './components/MothersDayPostcardFirstForm/MothersDayPostcardFirstForm.vue'
import MothersDayPostcardSecondForm from './components/MothersDayPostcardSecondForm/MothersDayPostcardSecondForm.vue'
import PostcardPreview from '../ShowMothersDayPostcard/components/PostcardPreview.vue'

export default defineComponent({
  name: 'MothersDayPostCardBase',
  components: {
    PostcardPreview,
    MothersDayPostcardFirstForm,
    MothersDayPostcardSecondForm
  },
  mixins: [mixinAuth],
  data () {
    return {
      postcards: new PostcardList(),
      postcard: new Postcard(),
      currentForm: 'first',
      loading: false,
      previewDialog: false,
      audioSource: 'https://nodes.alaatv.com/upload/landing/motherday1402/mother-postalcard-music.mp3',
      postcardConfig: {
        postcardPoemTitle: null,
        postcardPoemBody: null,
        postcardMessageText: null,
        postcardMessageFrom: null,
        patternBackgrounds: null,
        surpriseDiscountCode: null,
        surpriseBanners: null,
        flowerImage: null
      }
    }
  },
  computed: {
    computedPostcard () {
      return this.postcard
    },
    headerSize () {
      return this.$store.getters['AppLayout/headerSize']
    },
    headerHeight () {
      return this.headerSize.height + 'px'
    }
  },
  mounted () {
    if (this.isUserLogin) {
      this.getPostcards()
    }
  },
  methods: {
    getPostcards () {
      return new Promise((resolve, reject) => {
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
            resolve()
          })
          .catch(() => {
            this.loading = false
            reject()
          })
      })
    },
    showPreview (postcard) {
      if (!postcard || !postcard.value) {
        return
      }
      const userPostcardConfig = postcard.value
      userPostcardConfig.audioSource = this.audioSource
      const user = this.$store.getters['Auth/user']
      this.postcardConfig = {
        postcardPoemTitle: userPostcardConfig.postcardPoemTitle,
        postcardPoemBody: userPostcardConfig.postcardPoemBody,
        postcardMessageText: userPostcardConfig.postcardMessageText,
        postcardMessageFrom: user.first_name,
        postcardBackgrounds: userPostcardConfig.postcardBackgrounds,
        patternBackgrounds: userPostcardConfig.patternBackgrounds,
        flowerImage: userPostcardConfig.flowerImage,
        audioSource: userPostcardConfig.audioSource,
        entranceBodyMovin: userPostcardConfig.entranceBodyMovin
      }
      this.previewDialog = true
    },
    toggleForm () {
      if (this.currentForm === 'second') {
        this.currentForm = 'first'
      } else {
        this.getPostcards()
      }
    },
    onPostcardCompleted (reqData) {
      this.getPostcards()
        .then(() => {
          this.postcardRequest(reqData)
        })
        .catch(() => {})
    },
    getApiMethod (postcardData, postcardId) {
      if (this.postcard.id) {
        return APIGateway.postcard.editPostalCard(postcardData, postcardId)
      } else {
        return APIGateway.postcard.savePostalCardData(postcardData)
      }
    },
    postcardRequest (reqData) {
      this.getApiMethod(reqData, this.postcard.id)
        .then((postcard) => {
          this.postcard = postcard
          this.currentForm = 'second'
        })
        .catch(() => {
          this.currentForm = 'first'
        })
    }
  }
})
</script>

<style lang="scss" scoped>
$headerHeight: v-bind('headerHeight');
.postcard-base-container {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - $headerHeight);

  @include media-max-width('md') {
    min-height: auto;
  }
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: calc(100vh - 60px);

  @include media-max-width('md') {
    min-height: auto;
  }
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
