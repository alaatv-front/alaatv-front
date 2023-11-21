<template>
  <triple-title-set-content-selection v-model:selectedContentList="localContents" />
  <!--  <q-inner-loading v-if="loading"-->
<!--                   :showing="loading" />-->
<!--  <div v-else>-->
<!--    <div>-->
<!--      کد جلسات-->
<!--    </div>-->
<!--    <div class="row">-->
<!--      <q-input v-model="content"-->
<!--               filled-->
<!--               class="col-10"-->
<!--               @keyup.enter="onKeyUp($event)" />-->
<!--      <q-btn class="col q-ml-md"-->
<!--             color="primary"-->
<!--             text-color="grey-9"-->
<!--             icon="add"-->
<!--             @click="showContentDemo" />-->
<!--      <div v-for="(content, index) in localContents"-->
<!--           :key="index"-->
<!--           class="col-12 row q-mt-sm">-->
<!--        <q-icon class="col-1"-->
<!--                name="isax:play-circle" />-->
<!--        <span class="col-10">{{content.id}} - {{content.title}}</span>-->
<!--        <q-icon name="isax:trash"-->
<!--                color="red"-->
<!--                class="col-1 cursor-pointer"-->
<!--                @click="removeContentDemo(index)" />-->
<!--      </div>-->
<!--    </div>-->
<!--  </div>-->
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import TripleTitleSetContentSelection
  from 'components/Widgets/User/TripleTitleSetPanel/TripleTitleSetContentSelection/TripleTitleSetContentSelection.vue'

export default {
  name: 'AddLink',
  components: { TripleTitleSetContentSelection },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      content: null,
      contents: [],
      loading: false
    }
  },
  computed: {
    localContents: {
      get () {
        return this.value
      },
      set (value) {
        // const contentsIds = []
        // value.forEach(content => {
        //   contentsIds.push(content.id)
        // })
        this.$emit('update:value', value)
      }
    }
  },
  watch: {
    value (value) {
      const contentsIds = []
      value.forEach(content => {
        contentsIds.push(content.id)
      })
      this.$emit('update:value', contentsIds)
    }
  },
  mounted () {
    console.log(this.value)
    this.value.forEach(content => {
      this.contents.push(content.id)
    })
  },
  methods: {
    onKeyUp (event) {
      if (event.key === 'Enter') {
        this.showContentDemo()
      }
    },
    removeContentDemo (index) {
      this.localContents.slice(index, 1)
      this.contents.splice(index, 1)
      this.$emit('update:value', this.contents)
    },
    showContentDemo () {
      this.loading = true
      APIGateway.content.show(this.content)
        .then(content => {
          this.content = null
          this.localContents.push(content)
          this.contents.push(content.id)
          this.$emit('update:value', this.contents)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
