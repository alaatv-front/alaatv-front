<template>
  <q-card>
    <q-card-section>
      <q-list>
        <q-item v-for="(localChildrenItem, localChildrenIndex) in localChildren"
                :key="localChildrenIndex">
          <q-item-section>
            <q-input v-model="localChildren[localChildrenIndex].title">
              <template #after>
                <q-btn icon="delete"
                       flat
                       @click="removeChildren(localChildrenIndex)" />
                <q-btn icon="add"
                       flat
                       @click="createSubChildren(localChildrenIndex)" />
              </template>
            </q-input>
            <div v-if="localChildren[localChildrenIndex].children">
              <option-panel-simple-menu :children="localChildren[localChildrenIndex].children" />
            </div>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-btn icon="add"
                   flat
                   @click="addChildren" />
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>

export default {
  name: 'OptionPanelSimpleMenu',
  props: {
    children: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    localChildren: {
      set (newValue) {
        this.$emit('update:children', newValue)
      },
      get () {
        return this.children
      }
    }
  },
  methods: {
    removeChildren (index) {
      this.localChildren.splice(index, 1)
    },
    createSubChildren (index) {
      this.localChildren[index].children = []
    },
    addChildren () {
      this.localChildren.push({
        title: 'مورد جدید',
        route: null
      })
    }
  }
}
</script>
