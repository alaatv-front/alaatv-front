<template>
  <div class="bg-white shadow-4 q-mb-md q-mx-md">
    <video-player
      v-if="sources.list.length > 0"
      :sources="sources"
      :poster="poster"
    />
    <div class="q-pa-sm flex flex-center">
      <q-pagination
        v-model="contentNumber"
        :to-fn="goToContentPage"
        :max="set.contents.list.length"
        :max-pages="6"
        direction-links
        boundary-links
        icon-first="skip_previous"
        icon-last="skip_next"
        icon-prev="fast_rewind"
        icon-next="fast_forward"
      />
    </div>
  </div>
</template>

<script>
  import API_ADDRESS from "src/api/Addresses";
  import {mixinWidget} from 'src/mixin/Mixins'
  import {Content} from "src/models/Content";
  import VideoPlayer from "components/VideoPlayer";
  import {PlayerSourceList} from "src/models/PlayerSource";
  import {Set} from "src/models/Set";

  export default {
    name: 'ContentVideoPlayer',
    components: {VideoPlayer},
    mixins: [mixinWidget],
    props: {
      data: {
        type: [Content, Number, String],
        default() {
          return new Content()
        },
      }
    },
    watch: {
      data() {
        this.loadContent()
      },
      'data.id': function () {
        this.loadContent()
      },
    },
    data() {
      return {
        content: new Content(),
        set: new Set(),
        sourceItem: [
          {src: "", type: "video/mp4", label: ""},
          {src: "", type: "video/mp4", label: "", selected: true},
          {src: "", type: "video/mp4", label: ""}
        ],
        sources: new PlayerSourceList(),
        poster: "",
        contentNumber: 1,// content order may not be continuously
        sections: [
          {
            data: {
              rows: [
                {
                  cols: [
                    {
                      widgets: []
                    }
                  ],
                  options: {
                    boxed: false
                  }
                }
              ]
            }
          }
        ]
      }
    },
    created() {
      this.loadContent()
    },
    methods: {
      getContentIdByNumberInList(numberInList) {
        return this.set.contents.list[numberInList - 1]?.id
      },
      getContentNumberInListById(contentId) {
        return this.set.contents.list.findIndex(content => parseInt(content.id) === parseInt(contentId)) + 1
      },
      loadContent() {
        if (typeof this.data === 'object') {
          this.content = this.data
        } else if (typeof this.data === 'number' || typeof this.data === 'string') {
          this.content.id = this.data
          this.getContent()
        }
      },
      getContent() {
        this.content.loading = true
        const url = API_ADDRESS.content.show(this.content.id)
        let promise = null
        if (typeof this.options.getData === 'function') {
          promise = this.options.getData(url)
        } else {
          promise = this.$axios.get(url)
        }

        promise
          .then(response => {
            this.content = new Content(response.data.data)
            this.content.loading = false
            this.contentNumber = this.getContentNumberInListById(this.content.id)
            this.poster = this.content.photo
            this.setSources(this.content.file.video)
            this.getSet()
          })
          .catch(() => {
            this.content.loading = false
          })
      },
      getSet() {
        this.set.loading = true
        this.options.getData(API_ADDRESS.set.show(this.content.set.id))
          // this.$axios.get(API_ADDRESS.set.show(this.content.set.id))
          .then(response => {
            this.set = new Set(response.data.data)
            this.contentNumber = this.getContentNumberInListById(this.content.id)
          })
          .catch((er) => {
            this.set = new Set(response.data.data)
            this.set.loading = false
          })
      },
      setSources(sources) {
        this.sources = new PlayerSourceList(sources)
      },
      goToContentPage(number) {
        const id = this.getContentIdByNumberInList(number)
        if (!id) {
          return null
        }
        return {name: 'User.Content.Show', params: {id}}
      }
    },
  }
</script>

<style scoped>
</style>
