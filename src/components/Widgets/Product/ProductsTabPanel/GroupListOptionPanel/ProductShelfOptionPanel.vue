<template>
  <div class="option-panel-container">
    <div class="row q-px-md">
      <div class="col-12">
        <div class="outsideLabel">type</div>
        <q-select v-model="localOptions.options.layout"
                  :options="layoutOptions" />
      </div>
      <div class="col-4">
        <div class="outsideLabel">event name</div>
        <div class="row">
          <q-input v-model="eventName" />
          <q-btn color="positive"
                 icon="check"
                 class="q-mr-sm"
                 @click="addEvent(eventName)" />
        </div>
      </div>
      <div class="col-4">
        <div class="outsideLabel">events</div>
        <q-select v-model="selectedEvent"
                  :options="localOptions.options.events" />
      </div>
      <div class="col-4">
        <div class="outsideLabel">tabName</div>
        <q-input v-model="localOptions.options[selectedEvent]" />
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
