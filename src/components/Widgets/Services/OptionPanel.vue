<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container"
           @dragover="onDragOver"
           @dragleave="onDragLeave"
           @drop="onDrop($event, 0, true)">
        <div class="row q-mt-md">
          <div class="col-12 text-center">
            <q-btn label="افزودن به لیست سرویس ها"
                   color="green"
                   @click="addService" />
          </div>
          <div class="col-12">
            <q-list separator>
              <div v-for="(service, serviceIndex) in localOptions.services"
                   :key="'service-'+serviceIndex"
                   draggable="true"
                   @dragstart="onDragStart($event, service, serviceIndex)"
                   @dragover="onDragOver"
                   @dragleave="onDragLeave"
                   @drop="onDrop($event, serviceIndex)">
                <q-item>
                  <q-item-section side>
                    <q-btn icon="close"
                           color="red"
                           @click="removeService(serviceIndex)" />
                  </q-item-section>
                  <q-item-section>
                    <q-item-label>
                      <q-input v-model="service.title"
                               label="title" />
                      <br>
                      <q-input v-model="service.subTitle"
                               label="subTitle" />
                      <br>
                    </q-item-label>
                    <q-item-label caption
                                  lines="2">
                      <q-input v-model="service.icon"
                               label="icon" />
                      <br>
                      <div class="row q-col-gutter-md">
                        <div class="col-md-3">
                          <div class="outsideLabel">action</div>
                          <q-select v-model="service.action"
                                    :options="actionsOptions" />
                        </div>
                        <div class="col-md-9">
                          <div class="outsideLabel">{{service.action}}</div>
                          <q-input v-if="service.action === 'link'"
                                   v-model="service.link"
                                   label="link" />
                          <q-input v-else-if="service.action === 'scrollToId'"
                                   v-model="service.scrollToId"
                                   label="element id" />
                          <q-input v-else-if="service.action === 'scrollToClass'"
                                   v-model="service.scrollToClass"
                                   dir="ltr"
                                   label="element className" />
                        </div>
                      </div>
                    </q-item-label>
                  </q-item-section>
                  <q-item-section avatar
                                  class="cursor-pointer">
                    {{service.title}}
                    <q-img :src="service.icon" />
                  </q-item-section>
                </q-item>
              </div>
            </q-list>
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      actionsOptions: ['scrollToId', 'scrollToClass', 'link'],
      localDraggable: null,
      defaultOptions: {
        className: '',
        style: {},
        services: []
      }
    }
  },
  methods: {
    addService () {
      this.localOptions.services.push({
        title: '',
        subTitle: '',
        icon: '',
        action: '',
        link: '',
        scrollToId: '',
        scrollToClass: ''
      })
    },
    removeService (serviceIndex) {
      this.localOptions.services.splice(serviceIndex, 1)
    },
    onDragStart (event, service, serviceIndex) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ service, serviceIndex }))
      this.localDraggable = event
      // console.log('onDragStart', event.dataTransfer.getData('value'))
    },
    onDragLeave () {
    },
    onDragOver (event) {
      event.preventDefault()
    },
    onDrop (event, newIndex, parent) {
      const valueStringfied = event.dataTransfer.getData('value')
      const value = valueStringfied ? JSON.parse(valueStringfied) : null
      const service = value.service
      const serviceOldIndex = value.serviceIndex
      const serviceNewIndex = newIndex
      if (this.localDraggable) {
        this.updatePosition(this.localOptions.services, serviceOldIndex, serviceNewIndex)
      } else {
        this.addToIndex(this.localOptions.services, service, serviceNewIndex)
      }

      this.localDraggable = null
      event.stopPropagation()
    },
    addToIndex (list, newItem, index) {
      if (list.length > index) {
        list.splice(index, 0, newItem)
      } else {
        list.push(newItem)
      }
    },
    updatePosition (list, oldIndex, newIndex) {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
    }
  }
})
</script>
