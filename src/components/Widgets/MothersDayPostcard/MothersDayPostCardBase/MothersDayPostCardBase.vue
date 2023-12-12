<template>
  <div v-if="!loading"
       class="postcard-base-container">
    <div class="row full-width flex justify-center items-center">
      <div v-if="currentForm === 'first'"
           class="col-12">
        <mothers-day-postcard-first-form />
      </div>
      <div v-if="currentForm === 'second'"
           class="col-12 col-md-10">
        <mothers-day-postcard-second-form @toggle-preview-dialog="togglePreview(this.postcard)"
                                          @invoke-edit-form="toggleForm" />
      </div>
    </div>
    <q-dialog v-model="previewDialog"
              maximized>
      <div class="top-toolbar">
        <q-btn class="close-btn"
               color="grey-1"
               icon="ph:x"
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
    <q-spinner-gears color="primary"
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
      postcardConfig: {
        postcardPoemTitle: null,
        postcardPoemBody: null,
        postcardMessageText: null,
        postcardMessageFrom: null,
        postcardBackgrounds: null,
        patternBackgrounds: null,
        flowerImage: null
      }
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
          postcardPoemTitle: userPostcardConfig.postcardPoemTitle || null,
          postcardPoemBody: userPostcardConfig.postcardPoemBody || null,
          postcardMessageText: userPostcardConfig.postcardMessageText || null,
          postcardMessageFrom: userPostcardConfig.postcardMessageFrom || null,
          postcardBackgrounds: userPostcardConfig.postcardBackgrounds || null,
          patternBackgrounds: userPostcardConfig.patternBackgrounds || null,
          flowerImage: userPostcardConfig.flowerImage || null
        }
      }
      this.previewDialog = !this.previewDialog
    },
    toggleForm () {
      this.currentForm = this.currentForm === 'second' ? 'first' : 'second'
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
  .close-btn {
    z-index: 9999999;
  }
}
</style>
