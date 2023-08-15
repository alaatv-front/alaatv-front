<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-expansion-item expand-separator
                          icon="tune"
                          label="Comment Slider Setting"
                          caption="تنظیمات اسلایدر پیام ها">
          <div class="table-rows">
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
                    <template v-else-if="item.name === 'order'">
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
        </q-expansion-item>
        <q-expansion-item expand-separator
                          icon="account_box"
                          label="Comment Item Setting"
                          caption="تنظیمات باکس پیام ها">
          <comment-item-option-panel v-model:options="localOptions.commentOptionPanel" />
        </q-expansion-item>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import CommentItemOptionPanel from 'src/components/Widgets/Comment/CommentItem/OptionPanel.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, CommentItemOptionPanel },
  mixins: [mixinOptionPanel],
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
        { name: 'rank', align: 'center', label: 'رتبه', field: row => row.rank },
        { name: 'message', align: 'center', label: 'پیام', field: row => row.message.substring(0, 15) + ' ...' },
        { name: 'image', label: 'تصویر', align: 'center', field: row => row.image },
        { name: 'actions', align: 'right', label: 'عملیات', field: row => row.id }
      ],
      defaultOptions: {
        sliderItems: [],
        commentOptionPanel: {}
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
        message: '',
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
    width: 100%;
  }
}
</style>
