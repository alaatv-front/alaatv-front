<template>
  <q-editor ref="editor"
            v-model="editorValue"
            min-height="10rem"
            :toolbar="[
              [
                {
                  label: $q.lang.editor.align,
                  icon: $q.iconSet.editor.align,
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['left', 'center', 'right', 'justify']
                }
              ],
              [
                {
                  label: 'فرمت نوشتار',
                  icon: 'isax:firstline',
                  fixedLabel: true,
                  list: 'only-icons',
                  options: ['bold', 'italic', 'strike', 'underline']
                }
              ],
              ['token'],
              [
                {
                  label: 'فهرست بندی',
                  icon: 'isax:document',
                  fixedLabel: true,
                  list: 'only-icons',
                  options: [ 'unordered', 'ordered']
                }
              ],
              [{
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h3', 'h4', 'h5', 'h6', 'code']
              }],
              ['viewsource']
            ]">
    <template v-slot:token>
      <q-btn-dropdown ref="colorPicker"
                      dense
                      unelevated
                      color="white"
                      icon="colorize"
                      text-color="primary"
                      size="sm">
        <q-list dense>
          <q-item tag="label"
                  clickable>
            <q-item-section>
              <q-btn icon="check"
                     @click="color('foreColor', foreColor)" />
              <q-color v-model="foreColor"
                       class="my-picker" />
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </template>
  </q-editor>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      foreColor: '#000000'
    }
  },
  computed: {
    editorValue: {
      get() {
        return this.value
      },
      set(newValue) {
        this.$emit('update:value', newValue)
      }
    }
  },
  methods: {
    color(cmd, name) {
      const edit = this.$refs.editor
      this.$refs.colorPicker.hide()
      edit.caret.restore()
      edit.runCmd(cmd, name)
      edit.focus()
    }
  }
}
</script>

<style scoped>

</style>
