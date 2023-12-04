<template>
  <div class="option-panel-container">
    <div class="row q-px-md q-col-gutter-md items-center">
      <div class="col-12">
        <q-select v-model="localOptions.options.layout"
                  label="type"
                  :options="layoutOptions" />
      </div>
      <div class="col-4">
        <div class="row items-center">
          <q-input v-model="eventName"
                   label="event name">
            <template v-slot:after>
              <q-btn color="positive"
                     icon="check"
                     square
                     class="size-sm"
                     @click="addEvent(eventName)" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-4">
        <q-select v-model="selectedEvent"
                  label="events"
                  :options="localOptions.options.events" />
      </div>
      <div class="col-4">
        <q-input v-model="localOptions.options[selectedEvent]"
                 label="tabName" />
      </div>
    </div>

    <div v-for="(item, index) in localOptions.data"
         :key="item">
      <q-card class="custom-card">
        <q-card-section>
          <q-expansion-item expand-separator>
            <template v-slot:header>
              <q-btn color="negative"
                     icon="close"
                     class="q-mr-sm"
                     @click="removeTabPanel(index)" />
              <div class="expansion-label q-mt-sm full-width">
                {{item.type}}
              </div>
            </template>
            <recursive-component v-model:options="localOptions.data[index]"
                                 :layout="'ProductShelf'" />
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default {
  name: 'groupListShelfOptionPanel',
  components: { recursiveComponent: defineAsyncComponent(() => import('../recursiveComponent.vue')) },
  props: {
    options: {
      type: Object,
      default: () => {
      }
    }
  },
  // mixins: [PageBuilderOptionPanel],

  data () {
    return {
      eventName: '',
      selectedEvent: '',
      layoutOptions: ['ProductTab', 'ProductShelf']
    }
  },
  computed: {
    localOptions: {
      get () {
        return this.options
      },
      set (newValue) {
        this.$emit('update:options', newValue)
      }
    }
  },
  methods: {
    addEvent (eventName) {
      if (!this.localOptions.options.events) {
        this.localOptions.options.events = []
      }
      this.localOptions.options.events.push(eventName)
    },
    removeTabPanel (itemIndex) {
      this.localOptions.data.splice(itemIndex, 1)
    }
  }
}
</script>
