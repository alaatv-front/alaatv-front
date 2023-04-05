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
                {{ logger(props) }}
                <q-td :key="props.row.name"
                      :props="props">
                  {{ props.row[props.row.name] }}
                  <q-popup-edit v-slot="scope"
                                v-model="props.row.name">
                    <q-input v-model="scope.value"
                             dense
                             autofocus
                             counter
                             @keyup.enter="scope.set" />
                  </q-popup-edit>
                </q-td>
                <!--                <q-td key="col0"-->
                <!--                      :props="props">-->
                <!--                  {{ props.row.col0.value }}-->
                <!--                  <q-popup-edit v-slot="scope"-->
                <!--                                v-model="props.row.col0.value"-->
                <!--                                title="Update calories"-->
                <!--                                buttons>-->
                <!--                    <q-input v-model="scope.value"-->
                <!--                             type="number"-->
                <!--                             dense-->
                <!--                             autofocus />-->
                <!--                  </q-popup-edit>-->
                <!--                </q-td>-->
                <!--                <q-td key="fat"-->
                <!--                      :props="props">-->
                <!--                  <div class="text-pre-wrap">{{ props.row.fat }}</div>-->
                <!--                  <q-popup-edit v-slot="scope"-->
                <!--                                v-model="props.row.fat">-->
                <!--                    <q-input v-model="scope.value"-->
                <!--                             type="textarea"-->
                <!--                             dense-->
                <!--                             autofocus />-->
                <!--                  </q-popup-edit>-->
                <!--                </q-td>-->
                <!--                <q-td key="carbs"-->
                <!--                      :props="props">-->
                <!--                  {{ props.row.carbs }}-->
                <!--                  <q-popup-edit v-slot="scope"-->
                <!--                                v-model="props.row.carbs"-->
                <!--                                title="Update carbs"-->
                <!--                                buttons-->
                <!--                                persistent>-->
                <!--                    <q-input v-model="scope.value"-->
                <!--                             type="number"-->
                <!--                             dense-->
                <!--                             autofocus-->
                <!--                             hint="Use buttons to close" />-->
                <!--                  </q-popup-edit>-->
                <!--                </q-td>-->
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
        // {
        //   name: 'col0'
        // },
        // {
        //   name: 'col1'
        // },
        // {
        //   name: 'col2'
        // }
        {
          col0: 'sdfsdfdfs'

        },
        {
          col1: 'sdfsdsfdfdffdfs'

        }
        // {
        //   name: 'Ice cream sandwich',
        //   calories: 237,
        //   fat: 9.0,
        //   carbs: 37,
        //   protein: 4.3,
        //   sodium: 129,
        //   calcium: '8%',
        //   iron: '1%'
        // },
        // {
        //   name: 'Eclair',
        //   calories: 262,
        //   fat: 16.0,
        //   carbs: 23,
        //   protein: 6.0,
        //   sodium: 337,
        //   calcium: '6%',
        //   iron: '7%'
        // },
        // {
        //   name: 'Cupcake',
        //   calories: 305,
        //   fat: 3.7,
        //   carbs: 67,
        //   protein: 4.3,
        //   sodium: 413,
        //   calcium: '3%',
        //   iron: '8%'
        // }
      ],
      columns: [
        {
          name: 'col0',
          label: 'ویژگی ها',
          format: val => `${val}`,
          field: row => row.value
        },
        { name: 'col1', label: '110', format: val => `${val}`, field: row => row.value },
        { name: 'col2', label: 'راه ابریشم', format: val => `${val}`, field: row => row.value }
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
