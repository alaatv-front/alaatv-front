<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="table-rows flex justify-between">
          <q-table flat
                   bordered
                   :rows="localOptions.sliderItems"
                   :columns="columns"
                   binary-state-sort>
            <template v-slot:top>
              <q-btn color="positive"
                     label="اضافه کردن باکس جدید"
                     @click="addRow" />
            </template>
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td v-for="item in props.cols"
                      :key="item.name"
                      :props="props">
                  <template v-if="item.name === 'image'">
                    <q-img :src="item.value"
                           width="40px"
                           height="40px" />
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[item.name]"
                                  buttons>
                      <q-input v-model="scope.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </template>
                  <template v-else-if="item.name === 'actions'">
                    <q-btn round
                           flat
                           dense
                           size="md"
                           color="negative"
                           icon="delete"
                           class="q-ml-md"
                           @click="removeRow(props.rowIndex)">
                      <q-tooltip>
                        حذف
                      </q-tooltip>
                    </q-btn>
                  </template>
                  <template v-else-if="item.name === 'rank' || item.name === 'order'">
                    {{ item.value }}
                    <q-popup-edit v-slot="scope"
                                  v-model.number="props.row[item.name]">
                      <q-input v-model.number="scope.value"
                               dense
                               autofocus
                               @keyup.enter="reIndexRows(item, props.rowIndex, scope.value)" />
                    </q-popup-edit>
                  </template>
                  <template v-else>
                    {{ item.value }}
                    <q-popup-edit v-slot="scope"
                                  v-model="props.row[item.name]"
                                  buttons>
                      <q-input v-model="scope.value"
                               dense
                               autofocus
                               counter
                               @keyup.enter="scope.set" />
                    </q-popup-edit>
                  </template>
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
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      loading: false,
      rowCount: 0,
      columns: [
        {
          name: 'order',
          label: 'ترتیب',
          align: 'center',
          field: row => row.order,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'first_name', align: 'center', label: 'نام', field: row => row.first_name },
        { name: 'last_name', align: 'center', label: 'نام خانوادگی', field: row => row.last_name },
        { name: 'major', align: 'center', label: 'رشته', field: row => row.major },
        { name: 'rank', align: 'center', label: 'رتبه', field: row => row.rank, sortable: true },
        { name: 'distraction', align: 'center', label: 'منطقه', field: row => row.distraction },
        { name: 'image', label: 'تصویر', align: 'center', field: row => row.image },
        { name: 'actions', align: 'right', label: 'عملیات', field: row => row.id }
      ],
      defaultOptions: {
        sliderItems: []
      }
    }
  },
  methods: {
    reIndexRows(item, index, value) {
      if (value > this.localOptions.sliderItems[index][item.name]) {
        this.localOptions.sliderItems[index][item.name] = Number(value + 1)
      } else {
        this.localOptions.sliderItems[index][item.name] = Number(value - 1)
      }
      this.localOptions.sliderItems.sort((a, b) => a[item.name] - b[item.name])
      this.localOptions.sliderItems.forEach((row, index) => {
        row.order = Number(index + 1)
      })
    },
    addRow () {
      const newRow = {
        order: this.localOptions.sliderItems.length + 1,
        rank: 0,
        first_name: '',
        last_name: '',
        major: '',
        distraction: '',
        image: ''
      }
      this.localOptions.sliderItems.unshift(newRow)
    },
    removeRow(index) {
      this.localOptions.sliderItems.splice(index, 1)
    }
  }
})
</script>

<style lang="scss" scoped>
.option-panel-container{
  .table-rows{
    place-content: center;
  }
}
</style>
