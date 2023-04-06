<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="table-rows flex justify-between">
          <q-table flat
                   bordered
                   title="Treats"
                   :rows="rows"
                   :columns="columns"
                   binary-state-sort>
            <template v-slot:top>
              <q-btn color="primary"
                     :disable="loading"
                     label="Add row"
                     @click="addRow" />
              <q-btn class="q-ml-sm"
                     color="primary"
                     :disable="loading"
                     label="Remove row"
                     @click="removeRow" />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="(item, index) in props.cols"
                      :key="'col'+ index"
                      :props="props">
                  {{ item.value }}
                  <q-popup-edit v-slot="scope"
                                v-model="props.row['col'+ index].value">
                    <q-input v-model="scope.value"
                             dense
                             autofocus
                             counter
                             @keyup.enter="scope.set" />
                  </q-popup-edit>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      rows: [
        {
          col0: {
            value: 'sdfsdfdfs'
          },
          col1: {
            value: '۳۳۳'
          },
          col2: {
            value: '۰۰۰'
          }
        },
        {
          col0: {
            value: 'sdfsdfdfs'
          },
          col1: {
            value: '۳۳۳'
          },
          col2: {
            value: '۰۰۰'
          }
        },
        {
          col0: {
            value: '237'
          },
          col1: {
            value: '۰۰۰۰'
          },
          col2: {
            value: 'شسعاهعشسای'
          }
        },
        {
          col0: {
            value: '237'
          },
          col1: {
            value: '۰۰۰۰'
          },
          col2: {
            value: 'شسعاهعشسای'
          }
        },
        {
          col0: {
            value: '237'
          },
          col1: {
            value: '۰۰۰۰'
          },
          col2: {
            value: 'شسعاهعشسای'
          }
        }
      ],
      columns: [
        {
          name: 'col0',
          label: 'ویژگی ها',
          format: val => `${val}`,
          field: row => row.col0.value
        },
        { name: 'col1', label: '110', format: val => `${val}`, field: row => row.col1.value },
        { name: 'col2', label: 'راه ابریشم', format: val => `${val}`, field: row => row.col2.value }
      ],
      rowCount: 10,
      loading: false,
      filter: ''

    }
  },
  computed: {
    value: {
      get() {
        return this.options
      },
      set(value) {
        this.localOptions = value
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    logger(data) {
      console.log('data', data)
    },
    addRow () {
      this.loading = true
      const
        index = this.rows.length + 1,
        row = this.rows[Math.floor(Math.random() * this.rows.length)]

      if (this.rows.length === 0) {
        debugger
        this.rowCount = 0
      }

      row.id = ++this.rowCount
      const newRow = { ...row }
      this.rows = [...this.rows.slice(0, index), newRow, ...this.rows.slice(index)]
      this.loading = false
    },

    removeRow () {
      this.loading = true
      const index = this.rows.length - 1
      this.rows = [...this.rows.slice(0, index), ...this.rows.slice(index + 1)]
      this.loading = false
    }
  }
})
</script>
