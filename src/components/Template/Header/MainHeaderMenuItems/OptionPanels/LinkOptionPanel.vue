<template>
  <q-card>
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <div class="row q-col-gutter-md">
            <q-checkbox v-model="hasLink"
                        label="لینک" />
          </div>
        </div>
        <div v-if="hasLink"
             class="col-12">
          <div class="row q-col-gutter-md">
            <div class="col-md-4 col-12">
              <div>Route name</div>
              <q-input v-model="localMenuItem.route.name" />
            </div>
            <div class="col-md-4 col-12">
              <div>Route path</div>
              <q-input v-model="localMenuItem.route.path" />
            </div>
            <div class="col-md-4 col-12">
              <div>External link</div>
              <q-input v-model="localMenuItem.externalLink" />
            </div>
            <div class="col-md-12 col-12">
              <div>تگ ها</div>
              <q-select v-model="localMenuItem.route.query['tags[]']"
                        label="Mode: 'add'"
                        filled
                        use-input
                        use-chips
                        multiple
                        hide-dropdown-icon
                        input-debounce="0"
                        new-value-mode="add"
                        @update:model-value="onUpdateQuery" />
              <div>
                در صورت استفاده از تگ فقط به صفحه سرچ محتوا لینک می شود
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: 'LinkOptionPanel',
  props: {
    menuItem: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    hasLink: {
      set (newValue) {
        if (!newValue) {
          this.localMenuItem.route = {
            name: '',
            path: '',
            query: {
              'tags[]': []
            }
          }
        } else {
          delete this.localMenuItem.route
        }
      },
      get () {
        return !!this.localMenuItem.route
      }
    },
    localMenuItem: {
      set (newValue) {
        this.$emit('update:menuItem', newValue)
      },
      get () {
        const result = this.menuItem

        if (!this.menuItem.route) {
          result.route = {
            query: {
              'tags[]': []
            }
          }
        }
        if (!this.menuItem.route.query) {
          result.route.query = {
            'tags[]': []
          }
        }

        return result
      }
    }
  },
  methods: {
    onUpdateQuery (newValue) {
      if (!newValue || newValue.length === 0) {
        return
      }

      this.localMenuItem.route.name = 'Public.Content.Search'
      this.$emit('update:menuItem', this.localMenuItem)
    }
  }
}
</script>
