<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <q-expansion-item class="q-py-md"
                          expand-separator
                          label="ویرایش ستون ها">
          <q-card class="custom-card">
            <q-card-section>
              <q-expansion-item v-for="(item, index) in localOptions.header"
                                :key="index"
                                expand-separator>
                <template v-slot:header>
                  <q-btn color="negative"
                         icon="close"
                         size="14px"
                         class="q-mr-sm"
                         @click="removeItem(index)" />
                  <q-input v-model="item.label"
                           label="label" />
                </template>
                <div class="text">
                  <editor v-model:value="item.label" />
                </div>
              </q-expansion-item>
            </q-card-section>

            <div class="row q-gutter-xs justify-center">
              <q-btn color="positive"
                     class="full-width"
                     label="ستون جدید"
                     @click="addItem" />
            </div>
          </q-card>
        </q-expansion-item>
        <div class="table-rows justify-between">
          <q-table flat
                   bordered
                   :rows="localOptions.rows"
                   :columns="columns"
                   :rows-per-page-options="[0]"
                   binary-state-sort>
            <template v-slot:top>
              <q-btn color="positive"
                     :disable="loading"
                     label="اضافه کردن ردیف جدید"
                     @click="addRow" />
              <q-btn class="q-ml-sm"
                     color="negative"
                     :disable="loading"
                     label="حذف ردیف"
                     @click="showDialog = true" />
            </template>
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th v-for="(item, index) in props.cols"
                      :key="'col'+ index"
                      :props="props">
                  <div>
                    {{item.label}}
                  </div>
                </q-th>
              </q-tr>
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="(item, index) in props.cols"
                      :key="'col'+ index"
                      :props="props">
                  <div v-if="props.row[getColName(index)].type === 'text'">
                    {{ item.value }}
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[getColName(index)]">
                      <q-input v-model="scope.value.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.type"
                                class="q-mt-md"
                                :options="typeOptions"
                                @update:model-value="changeType(scope.value, props.rowIndex, index)" />
                    </q-popup-edit>
                  </div>
                  <div v-if="props.row[getColName(index)].type === 'image'">
                    <q-img :src="props.row[getColName(index)].value"
                           width="30px" />
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[getColName(index)]">
                      <q-input v-model="scope.value.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.type"
                                class="q-mt-md"
                                :options="typeOptions"
                                @update:model-value="changeType(scope.value, props.rowIndex, index)" />
                    </q-popup-edit>
                  </div>
                  <div v-if="props.row[getColName(index)].type === 'action'">
                    <q-btn color="primary"
                           :label="props.row[getColName(index)].value.label" />
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[getColName(index)]">
                      <q-input v-model="scope.value.value.label"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-input v-if="props.row[getColName(index)].actionType === 'link'"
                               v-model="scope.value.value.url"
                               dense
                               class="q-my-sm"
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-input v-if="props.row[getColName(index)].actionType === 'scroll'"
                               v-model="scope.value.value.className"
                               dense
                               class="q-my-sm"
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-input v-if="props.row[getColName(index)].actionType === 'event'"
                               v-model="scope.value.value.eventName"
                               dense
                               class="q-my-sm"
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.type"
                                class="q-mt-md"
                                :options="typeOptions"
                                @keyup.enter="scope.set" />
                      <q-select v-model="scope.value.actionType"
                                class="q-mt-md"
                                :options="actionTypeOptions"
                                @update:model-value="changeType(scope.value, props.rowIndex, index)" />
                    </q-popup-edit>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
      <q-dialog v-model="showDialog">
        <q-card class="custom-card q-pa-lg">
          <div class="text">
            کدام ردیف را میخواهید حذف کنید؟
          </div>
          <div class="q-my-md">
            <q-select v-model="rowNumberToDelete"
                      :options="deleteRowOptions" />
          </div>
          <div class="flex">
            <q-btn label="تایید"
                   flat
                   @click="removeRow()" />
            <q-btn label="لغو"
                   flat
                   @click="showDialog = false" />
          </div>
        </q-card>
      </q-dialog>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import Editor from 'components/Utils/Editor.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { Editor, OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false,
      rowNumberToDelete: null,
      showDialog: false,
      deleteRowOptions: [],
      filter: '',
      typeOptions: ['text', 'image', 'action'],
      actionTypeOptions: ['scroll', 'link', 'event'],
      defaultOptions: {
        columns: [],
        header: [],
        rows: [],
        records: [],
        attributes: [],
        title: '',
        color: '',
        flat: false
      }
    }
  },
  computed: {
    columns: {
      get () {
        return this.localOptions.header.map((item, index) => {
          return {
            name: 'col' + index,
            label: item.label,
            format: val => `${val}`,
            field: row => row['col' + index].value,
            align: 'center'
          }
        })
      },
      set (value) {
        this.localOptions.header = value.map((item) => item.label)
      }
    }
  },
  mounted () {
    this.fillDeleteRowOptions()
  },
  methods: {
    fillDeleteRowOptions () {
      this.localOptions.rows.forEach((item, index) => {
        this.deleteRowOptions.push(index + 1)
      })
    },
    getColName (index) {
      return 'col' + index
    },
    changeType (value, rowIndex, colIndex) {
      const row = this.localOptions.rows[rowIndex]
      const col = row[this.getColName(colIndex)]
      col.type = value.type
      if (value.type === 'action') {
        col.value = {
          label: '',
          className: '',
          url: ''
        }
      }
      if (value.type === 'text' || value.type === 'image') {
        col.value = ''
      }
    },
    addRow () {
      this.loading = true
      const
        index = this.localOptions.rows.length + 1,
        row = {
          col0: {
            type: 'text',
            value: 'text'
          },
          col1: {
            type: 'image',
            value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-tick-circle.png'
          },
          col2: {
            type: 'action',
            actionType: 'link',
            value: {
              label: 'button'
            }
          }
        }
      const newRow = { ...row }
      this.localOptions.rows = [...this.localOptions.rows.slice(0, index), newRow, ...this.localOptions.rows.slice(index)]
      this.loading = false
    },

    removeRow () {
      this.localOptions.rows.splice(this.rowNumberToDelete - 1, 1)
      this.showDialog = false
    },
    addItem () {
      this.localOptions.header.push({ label: 'label' })
    },
    removeItem (itemIndex) {
      this.localOptions.header.splice(itemIndex, 1)
    }
  }
})
</script>
