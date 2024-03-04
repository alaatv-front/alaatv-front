<template>
  <q-card>
    <q-card-section>
      <div>
        <q-select v-model="localAction"
                  :options="actionOptions" />
      </div>
      <div>
        <q-tab-panels v-model="localAction"
                      animated>
          <q-tab-panel name="scroll">
            <q-input v-model="localScrollTo"
                     label="scrollTo" />
          </q-tab-panel>

          <q-tab-panel name="link">
            <q-input v-model="localLink"
                     label="Link" />
          </q-tab-panel>

          <q-tab-panel name="event">
            <q-input v-model="localEventName"
                     label="Event Name" />
            <q-input v-model="localEventArgs"
                     label="Event Args" />
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'ActionOptions',
  props: {
    action: {
      type: String,
      default: null
    },
    scrollTo: {
      type: String,
      default: null
    },
    link: {
      type: String,
      default: null
    },
    eventName: {
      type: String,
      default: null
    },
    eventArgs: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      actionOptions: ['scroll', 'link', 'event']
    }
  },
  computed: {
    localAction: {
      set (newValue) {
        this.$emit('update:action', newValue)
      },
      get () {
        return this.action
      }
    },
    localScrollTo: {
      set (newValue) {
        this.$emit('update:scrollTo', newValue)
      },
      get () {
        return this.action
      }
    },
    localLink: {
      set (newValue) {
        this.$emit('update:link', newValue)
      },
      get () {
        return this.action
      }
    },
    localEventName: {
      set (newValue) {
        this.$emit('update:eventName', newValue)
      },
      get () {
        return this.action
      }
    },
    localEventArgs: {
      set (newValue) {
        this.$emit('update:eventArgs', newValue)
      },
      get () {
        return this.action
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
