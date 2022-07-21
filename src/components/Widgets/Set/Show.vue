<template>
  <div class="set">
    <q-list>
      <q-item>
        <q-item-section>
          <q-item-label header>{{ set.title }}</q-item-label>
        </q-item-section>

        <q-item-section
          side
        >
          <q-item-label caption>فیلم ها/جزوه ها</q-item-label>
        </q-item-section>
      </q-item>
      <div
        v-if="set.contents.list"
        v-for="(content , index) in set.contents.list"
        :key="index"
      >
        <q-item>
          <q-item-section
            top
            class="col-2 gt-sm"
          >
            <q-btn>
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
              >
                دانلود یا تماشای فیلم
              </q-tooltip>
              <img
                class="content-img"
                :src="getContentImage(content.photo)"
              >
            </q-btn>
          </q-item-section>

          <q-item-section top>
            <q-item-label lines="1">
              <span class="text-weight-medium">
                <q-item-label class="q-mt-sm">
                  {{getContentTitle(content.title, index)}}
                </q-item-label>
              </span>
              <q-chip class="content-chip text-grey-8">{{(content.is_free && content.is_free.toString() === '1') ? 'پولی' : 'رایگان'}}</q-chip>
            </q-item-label>
            <q-item-label
              caption
              lines="1"
            >
              @rstoenescu in #3: > Generic type parameter for props
            </q-item-label>
            <q-item-label
              lines="1"
              class="q-mt-xs text-body2 text-weight-bold text-primary text-uppercase"
            >
              <span class="cursor-pointer">Open in GitHub</span>
            </q-item-label>
          </q-item-section>

          <q-item-section
            top
            side
          >
            <div class="text-grey-8 q-gutter-xs">
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
              />
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="done"
              />
              <q-btn
                size="12px"
                flat
                dense
                round
                icon="more_vert"
              />
            </div>
          </q-item-section>
        </q-item>
        <q-separator spaced />
      </div>

    </q-list>
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import { mixinWidget } from 'src/mixin/Mixins'
import { Set } from 'src/models/Set'

export default {
  name: 'SetShowInfo',
  mixins: [mixinWidget],
  props: {
    data: {
      type: [Set, Number, String],
      default () {
        return new Set()
      }
    }
  },
  watch: {
    data () {
      this.loadSet()
    },
    'data.id': function () {
      this.loadSet()
    }
  },
  data () {
    return {
      set: new Set(),
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
  computed: {
    getContentTitle () {
      return (title, index) => {
        return `فیلم جلسه ${index} - ${title} `
      }
    },
    getContentImage () {
      return (img) => {
        return img || 'https://nodes.alaatv.com/loder.jpg'
      }
    }

  },
  created () {
    this.loadSet()
  },
  methods: {
    loadSet () {
      if (typeof this.data === 'object') {
        this.set = this.data
      } else if (typeof this.data === 'number' || typeof this.data === 'string') {
        this.set.id = this.data
        this.getSet()
      }
    },
    getSet () {
      this.set.loading = true
      const url = API_ADDRESS.set.show(this.set.id)
      let promise = null
      if (typeof this.options.getData === 'function') {
        promise = this.options.getData(url)
      } else {
        promise = this.$axios.get(url)
      }

      promise
        .then(response => {
          this.set = new Set(response.data.data)
          this.set.loading = false
        })
        .catch(() => {
          this.set.loading = false
        })
    }
  }
}
</script>

<style scoped lang="scss">
.set {
  background: #F6F8FA;
  border-radius: 40px;
  .content-img {
    width: 100%;
  }
}
</style>
<style lang="scss">
.set {
  .q-btn .q-btn__content {
    margin: 0px;
  }
  .q-btn:not(.q-btn--rounded) {
    border-radius: 0;
  }
  .content-chip {
    background: var(--alaa-Primary);
    color: #f4f5f6 !important;
    .q-chip__content {
      padding-right: 0px;
    }
  }
}
</style>
