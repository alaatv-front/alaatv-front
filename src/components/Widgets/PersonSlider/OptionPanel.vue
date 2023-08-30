<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <q-expansion-item expand-separator
                          icon="tune"
                          label="Slider Settings">
          <div class="row q-mb-sm q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-radio v-model="localOptions.personType"
                       val="student"
                       label="دانش آموز" />
            </div>
            <div class="col-12 col-md-3">
              <q-radio v-model="localOptions.personType"
                       val="teacher"
                       label="استاد" />
            </div>
            <div class="col-12 col-md-3">
              <q-checkbox v-model="localOptions.settings.pauseAutoplayOnHover"
                          label="pauseAutoplayOnHover" />
            </div>
            <div class="col-12 col-md-3">
              <q-checkbox v-model="localOptions.settings.wrapAround"
                          label="wrapAround" />
            </div>
            <div class="col-12 col-md-3">
              <q-checkbox v-model="localOptions.pagination"
                          label="صفحه بندی" />
            </div>
            <div class="col-12 col-md-3">
              <q-checkbox v-model="localOptions.carouselPadding"
                          label="فاصله داخلی اسلایدر" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.settings.dir"
                       type="text"
                       label="direction" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.settings.autoplay"
                       type="number"
                       label="autoplay" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.settings.itemsToScroll"
                       type="number"
                       label="itemsToScroll" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.settings.transition"
                       type="number"
                       label="transition" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.settings.itemsToShow"
                       type="number"
                       label="itemsToShow" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.settings.snapAlign"
                       type="text"
                       label="snapAlign" />
            </div>
          </div>
          <div class="row q-mb-sm q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-select v-model="size"
                        :options="sizeOptions"
                        option-label="label"
                        option-value="value"
                        emit-value
                        map-options
                        label="page size" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.breakpoints[size].itemsToShow"
                       type="text"
                       :label="`itemsToShow-${size}`" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.breakpoints[size].snapAlign"
                       type="text"
                       :label="`snapAlign-${size}`" />
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item expand-separator
                          icon="chevron_right"
                          label="Right Navigation">
          <div class="row q-mb-sm q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToRight.icon"
                       type="text"
                       label="icon" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToRight.color"
                       type="text"
                       label="color" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToRight.textColor"
                       type="text"
                       label="textColor" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToRight.size"
                       type="text"
                       label="size" />
            </div>
            <div class="col-12 col-md-3">
              <q-checkbox v-model="localOptions.navigation.goToRight.rounded"
                          label="rounded" />
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item expand-separator
                          icon="chevron_left"
                          label="Left Navigation">
          <div class="row q-mb-sm q-col-gutter-md">
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToLeft.icon"
                       type="text"
                       label="icon" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToLeft.color"
                       type="text"
                       label="color" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToLeft.textColor"
                       type="text"
                       label="textColor" />
            </div>
            <div class="col-12 col-md-3">
              <q-input v-model="localOptions.navigation.goToLeft.size"
                       type="text"
                       label="size" />
            </div>
            <div class="col-12 col-md-3">
              <q-checkbox v-model="localOptions.navigation.goToLeft.rounded"
                          label="rounded" />
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item expand-separator
                          icon="perm_identity"
                          label="Slider Items">
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
        </q-expansion-item>

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
      size: 350,
      sizeOptions: [
        {
          label: 'xs',
          value: 250
        },
        {
          label: 'sm',
          value: 350
        },
        {
          label: 'md',
          value: 600
        },
        {
          label: 'lg',
          value: 1024
        },
        {
          label: 'xs',
          value: 1440
        }
      ],
      defaultOptions: {
        settings: {
          autoplay: 3500,
          dir: 'rtl',
          itemsToShow: 6,
          snapAlign: 'center',
          transition: 500,
          pauseAutoplayOnHover: false,
          itemsToScroll: 1,
          wrapAround: true
        },
        breakpoints: {
          200: {
            itemsToShow: 1,
            snapAlign: 'center'
          },
          350: {
            itemsToShow: 1,
            snapAlign: 'center'
          },
          600: {
            itemsToShow: 3,
            snapAlign: 'center'
          },
          1024: {
            itemsToShow: 5,
            snapAlign: 'center'
          },
          1440: {
            itemsToShow: 5,
            snapAlign: 'center'
          }
        },
        sliderItems: [],
        personType: 'student',
        pagination: false,
        carouselPadding: '0 25px',
        navigation: {
          goToLeft: {
            icon: 'chevron_left',
            textColor: '#9E9E9E',
            color: '#FFFFFF',
            rounded: true,
            size: 'lg'
          },
          goToRight: {
            icon: 'chevron_right',
            textColor: '#9E9E9E',
            color: '#FFFFFF',
            rounded: true,
            size: 'lg'
          }
        }
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
