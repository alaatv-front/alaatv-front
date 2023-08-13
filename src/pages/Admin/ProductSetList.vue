<template>
  <div class="sets">
    <div v-for="(set, index) in setList.list"
         :key="index"
         class="set"
         @dragover="onDragOver"
         @drop="onDrop($event, 0, true)">
      <q-card draggable="true"
              class="q-my-sm cursor-pointer"
              @dragstart="onDragStart($event, set, index)"
              @dragover="onDragOver"
              @drop="onDrop($event, index)">
        <q-card-section>
          {{index + 1}} - {{set.short_title}}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway'
import { SetList } from 'src/models/Set'

export default {
  name: 'ProductSetList',
  data() {
    return {
      setList: new SetList(),
      localDraggable: null
    }
  },
  mounted() {
    this.getProductSets()
  },
  methods: {
    updateSetOrders() {
      this.setList.list.forEach((set, index) => {
        set.order = index + 1
      })
    },
    updateSetOrdersWithRequest() {
      const payload = []
      this.setList.list.forEach(set => {
        payload.push({ set: set.id, order: set.order })
      })
      const data = {
        productId: this.$route.params.productId,
        payload
      }
      APIGateway.product.updateSetOrders(data)
        .then(setList => {
          this.setList = setList
        })
        .catch(() => {})
    },
    getProductSets() {
      APIGateway.product.getSets(this.$route.params.productId)
        .then(setList => {
          this.setList = setList
          this.updateSetOrders()
        })
        .catch(() => {})
    },
    onDragStart(event, set, setIndex) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ set, setIndex }))
      this.localDraggable = event
    },
    onDragOver(event) {
      event.preventDefault()
    },
    onDrop(event, newIndex, parent) {
      const valueStringfied = event.dataTransfer.getData('value')
      const value = valueStringfied ? JSON.parse(valueStringfied) : null
      const set = value.set
      const setOldIndex = value.setIndex
      const setNewIndex = newIndex
      if (this.localDraggable) {
        this.updatePosition(this.setList.list, setOldIndex, setNewIndex)
      } else {
        this.addToIndex(this.setList.list, set, setNewIndex)
      }
      this.localDraggable = null
      event.stopPropagation()
    },
    updatePosition(list, oldIndex, newIndex) {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
      this.updateSetOrders()
    }
  }
}
</script>

<style scoped>

</style>
