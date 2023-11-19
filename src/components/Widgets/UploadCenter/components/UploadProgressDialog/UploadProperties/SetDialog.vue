<template>
  <q-dialog :model-value="dialog">
    <div class="set-dialog-wrapper">
      <div class="set-dialog-header">
        <div class="set-dialog-header-title">
          نام فایل ویدیو مربوطه
        </div>
        <div class="set-dialog-header-close-btn">
          <q-btn v-close-popup
                 flat
                 icon="close"
                 @click="$emit('toggleDialog')" />
        </div>
      </div>
      <div class="set-dialog-main-content">
        <entity-create ref="setForm"
                       v-model:value="inputs"
                       title="ایجاد ست "
                       :api="$apiGateway.set.APIAdresses.create"
                       :entity-id-key="entityIdKey"
                       :entity-param-key="entityParamKey"
                       :default-layout="false" />
      </div>
      <div class="set-footer-navigation">
        <q-btn color="primary"
               label="ذخیره"
               @click="saveSet()" />
      </div>
    </div>

  </q-dialog>
</template>

<script>
import { EntityCreate } from 'quasar-crud'
import { shallowRef } from 'vue'
import TagsComponent from 'src/components/Utils/Tags.vue'

const Tags = shallowRef(TagsComponent)

export default {
  name: 'SetDialog',
  components: {
    EntityCreate
  },
  props: {
    dialog: {
      type: Boolean,
      default: false
    }
  },
  emits: ['toggleDialog'],
  data () {
    return {
      teacherList: [],
      entityIdKey: 'id',
      entityParamKey: 'id',
      inputs: [
        {
          type: 'input',
          responseKey: 'name',
          name: 'name',
          label: 'عنوان',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'input',
          responseKey: 'small_name',
          name: 'small_name',
          label: 'عنوان کوتاه',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'InputEditor',
          responseKey: 'description',
          name: 'description',
          label: 'توضیحات',
          placeholder: 'وارد کنید',
          col: 'col-md-12'
        },
        {
          type: 'select',
          optionLabel: (item) => item.first_name + ' ' + item.last_name,
          optionValue: item => item.id,
          name: 'author_id',
          label: 'دبیر',
          responseKey: 'author_id',
          col: 'col-md-12'
        },
        {
          type: 'File',
          responseKey: 'photo',
          name: 'cover',
          label: 'کاور',
          placeholder: 'تصویر مورد نظر را آپلود کنید',
          col: 'col-md-12'
        },
        {
          type: Tags,
          name: 'forrest_tree_tags',
          label: 'برچسب',
          responseKey: 'forrest_tree_tags',
          col: 'col-md-12'
        },
        {
          type: 'optionGroupRadio',
          responseKey: 'enable',
          name: 'enable',
          label: 'وضعیت انتشار',
          inline: 'true',
          dense: 'false',
          options: [
            {
              value: '0',
              label: 'فعال'
            },
            {
              value: '1',
              label: 'قابل نمایش برای کاربران'
            }
          ],
          col: 'col-md-12'
        }
      ]
    }
  },
  created () {
    this.getTeachers()
  },
  methods: {
    getTeachers () {
      this.$apiGateway.user.adminIndex({ data: { rollId: this.$enums.Rolls.TEACHER } }).then(res => {
        this.inputs.find(x => x.name === 'author_id').options = res.list
      })
    },
    saveSet () {
      this.$refs.setForm.createEntity().then(res => {
        this.$emit('toggleDialog')
      }).catch(() => {

      })
    }
  }
}
</script>

<style lang="scss" scoped>
.set-dialog-wrapper {
  position: relative;
  width: 1280px;
  height: 990px;
  max-width: 100%;
  background: #FFF;

  .set-dialog-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 40px;
    background: rgb(255 255 255 / 40%);
    border-bottom: 1px solid #D8D8D8;

    .set-dialog-header-title {
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 25px;
      color: #363636;
    }
  }

  .set-dialog-main-content {
    height: calc(100% - 80px);
    padding: 50px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }

  .set-footer-navigation {
    position: absolute;
    bottom: 0;
    right: 50px;
  }
}
</style>
