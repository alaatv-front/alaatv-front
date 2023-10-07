<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-12">
            <q-input v-model="localOptions.style.padding"
                     label="padding" />
          </div>
        </div>
        <div v-for="(item, index) in localOptions.data"
             :key="index">
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
                                     @update:options="setNewLocalOptions" />
              </q-expansion-item>
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="row q-gutter-xs justify-center">
        <q-btn color="positive"
               class="full-width"
               label="اضافه کردن تب پنل جدید"
               @click="addTabPanel" />
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'
import recursiveComponent from './recursiveComponent.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { Product } from 'src/models/Product'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, recursiveComponent },
  mixins: [PageBuilderOptionPanel],
  data() {
    return {
      defaultOptions: {
        data: [],
        style: {},
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        }
      }
    }
  },
  computed: {
    readableData () {
      // const clonedOptions = this.localOptions
      const clonedOptions = JSON.parse(JSON.stringify(this.localOptions))

      const clonedDataAdapter = function (group) {
        const groupLength = group.length
        for (let index = 0; index < groupLength; index++) {
          if (group[index].type === 'GroupList') {
            clonedDataAdapter(group[index].data)
          } else {
            group[index].data = group[index].data.map(item => isNaN(item) ? (new Product(item)) : (new Product({ id: item })))
          }
        }
      }

      clonedDataAdapter(clonedOptions.data)

      return clonedOptions.data
    },
    localOptions: {
      get() {
        // const clonedOptions = JSON.parse(JSON.stringify(Object.assign(this.defaultOptions, this.options)))
        // return Object.assign(this.defaultOptions, this.options)

        // const clonedOptions = JSON.parse(JSON.stringify(Object.assign(this.defaultOptions, this.options)))
        // const clonedOptions = Object.assign(this.defaultOptions, this.options)
        //
        // const clonedDataAdapter = function (group) {
        //   const groupLength = group.length
        //   for (let index = 0; index < groupLength; index++) {
        //     if (group[index].type === 'GroupList') {
        //       clonedDataAdapter(group[index].data)
        //     } else {
        //       group[index].data = group[index].data.map(item => isNaN(item) ? (new Product(item)) : (new Product({ id: item })))
        //     }
        //   }
        // }
        //
        // clonedDataAdapter(clonedOptions.data)
        //
        // return clonedOptions

        // const newLocalOptions = Object.assign(this.defaultOptions, this.options)
        // const dataAdapter = function (group) {
        //   const groupLength = group.length
        //   for (let index = 0; index < groupLength; index++) {
        //     if (group[index].type === 'GroupList') {
        //       dataAdapter(group[index].data)
        //     } else {
        //       group[index].data = group[index].data.map(item => isNaN(item) ? item.id : item)
        //     }
        //   }
        // }
        // dataAdapter(newLocalOptions.data)
        //
        // return newLocalOptions

        return Object.assign(this.defaultOptions, this.options)
      },
      set (newValue) {
        this.updateNewLocalOptions(newValue)
      }
    }
  },
  methods: {
    setNewLocalOptions () {
      // this.localOptions.flagForEmit = Date.now()
      // const newLocalOptions = JSON.parse(JSON.stringify(this.localOptions))
      // this.updateNewLocalOptions(newLocalOptions)
      this.updateNewLocalOptions(this.localOptions)
    },
    updateNewLocalOptions (newLocalOptions) {
      const dataAdapter = function (group) {
        const groupLength = group.length
        for (let index = 0; index < groupLength; index++) {
          if (group[index].type === 'GroupList') {
            dataAdapter(group[index].data)
          } else {
            group[index].data = group[index].data.map(item => isNaN(item) ? item.id : item)
          }
        }
      }
      dataAdapter(newLocalOptions.data)
      this.$emit('update:options', newLocalOptions)
    },
    removeTabPanel(index) {
      this.localOptions.data.splice(index, 1)
      this.setNewLocalOptions()
    },
    addTabPanel() {
      this.localOptions.data.push({
        options: { layout: 'ProductTab' },
        type: 'GroupList',
        data: []
      })
      this.setNewLocalOptions()
    }
  }
})
</script>
<style lang="scss" scoped>
:deep(.q-card.custom-card) {
  :not([class^=col]) {
    box-shadow: none;
  }
  .custom-card {
    //width: 150px;
  }
}
</style>
