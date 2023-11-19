<template>
  <div class="option-panel-container">
    <div class="row q-px-md q-col-gutter-md">
      <div class="col-3">
        <div class="outsideLabel">activeColor</div>
        <q-input v-model="localOptions.options.activeColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">activeBgColor</div>
        <q-input v-model="localOptions.options.activeBgColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">indicatorColor</div>
        <q-input v-model="localOptions.options.indicatorColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">TabColor</div>
        <q-input v-model="localOptions.options.productTabColor" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">TabsBackground</div>
        <q-input v-model="localOptions.options.productTabsBackground" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">TabsBorderRadius</div>
        <q-input v-model="localOptions.options.productTabsBorderRadius" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">TabsPadding</div>
        <q-input v-model="localOptions.options.productTabsPadding" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">type</div>
        <q-select v-model="localOptions.options.layout"
                  :options="layoutOptions" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">event name</div>
        <div class="flex">
          <q-input v-model="eventName">
            <template v-slot:after>
              <q-btn color="positive"
                     icon="check"
                     class="q-mr-sm"
                     @click="addEvent(eventName)" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="col-3">
        <div class="outsideLabel">events</div>
        <q-select v-model="selectedEvent"
                  :options="localOptions.options.events" />
      </div>
      <div class="col-3">
        <div class="outsideLabel">tabName</div>
        <q-input v-model="localOptions.options[selectedEvent]" />
      </div>
    </div>
    <div class="space q-mx-md q-mt-md">
      <q-expansion-item expand-separator
                        label="space">
        <q-card>
          <q-card-section>
            <margin-and-padding v-model:value="localOptions.options.tabsStyle" />
          </q-card-section>
        </q-card>
      </q-expansion-item>
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
            <recursive-component v-model:options="localOptions.data[index]" />
          </q-expansion-item>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import marginAndPadding from 'src/components/Widgets/Product/ProductsTabPanel/marginAndPadding.vue'

export default {
  name: 'groupListTabOptionPanel',
  components: {
    recursiveComponent: defineAsyncComponent(() => import('../recursiveComponent.vue')),
    marginAndPadding
  },
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
      layoutOptions: ['ProductTab', 'ProductShelf'],
      eventName: '',
      selectedEvent: '',
      defaultOptions: {
        options: {
          activeBgColor: '',
          activeColor: '',
          indicatorColor: '',
          events: [],
          layout: 'ProductTab',
          productTabColor: '#424242',
          productTabsBackground: '#F8F4F0',
          productTabsBorderRadius: '16px',
          productTabsPadding: '5px',
          tabsStyle: {
            marginTop: '',
            marginLeft: '',
            marginBottom: '',
            paddingTop: '',
            paddingLeft: '',
            paddingRight: '',
            paddingBottom: ''
          }
        },
        data: [],
        type: 'GroupList'
      }
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
