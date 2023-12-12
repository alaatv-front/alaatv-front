<template>
  <div class="postcard-base-container">
    <mothers-day-postcard-first-form v-if="currentForm === 'first'" />
    <mothers-day-postcard-second-form v-if="currentForm === 'second'"
                                      @toggle-preview-dialog="togglePreview"
                                      @invoke-edit-form="toggleForm" />
    <q-dialog v-model="previewDialog">
      <postcard-preview />
    </q-dialog>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { PostcardList } from 'src/models/Postcard.js'
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
      currentForm: 'first',
      previewDialog: false
    }
  },
  methods: {
    getPostcards () {
      APIGateway.postcard.getPostcards()
        .then(postcardList => {
          this.postcards = postcardList
          this.currentForm = this.postcards.list.length > 0 ? 'second' : 'first'
        })
    },
    togglePreview () {
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
</style>
