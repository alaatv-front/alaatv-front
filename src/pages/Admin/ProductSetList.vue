<template>
  <q-inner-loading v-if="loading"
                   showing />
  <div class="sets">
    <div v-for="(set, index) in setList.list"
         :key="index"
         class="set"
         @dragover="onDragOver"
         @drop="onDrop($event, 0, true)">
      <q-card draggable="true"
              class="set-container q-my-sm cursor-pointer"
              @dragstart="onDragStart($event, set, index)"
              @dragover="onDragOver"
              @drop="onDrop($event, index)">
        <q-card-section class="q-mb-xl">
          {{index + 1}} - {{set.short_title}}
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
import { SetList } from 'src/models/Set.js'
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'ProductSetList',
  data () {
    return {
      loading: false,
      setList: new SetList(),
      localDraggable: null
    }
  },
  mounted () {
    this.getProductSets()
  },
  methods: {
    updateSetOrdersWithRequest () {
      this.loading = true
      const payload = []
      this.setList.list.forEach((set, index) => {
        payload.push({ id: set.id, order: index })
      })
      const data = {
        productId: this.$route.params.productId,
        payload
      }
      APIGateway.product.updateSetOrders(data)
        .then(() => {
          this.getProductSets()
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getProductSets () {
      this.loading = true
      APIGateway.product.getAdminSets(this.$route.params.productId)
        .then(setList => {
          this.setList = setList
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    onDragStart (event, set, setIndex) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ set, setIndex }))
      this.localDraggable = event
    },
    onDragOver (event) {
      event.preventDefault()
      if (event.clientY < 100) {
        window.scroll({
          top: 0,
          behavior: 'smooth'
        })
      } else {
        window.scroll({
          top: window.pageYOffset
        })
      }
    },
    onDrop (event, newIndex, parent) {
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
    updatePosition (list, oldIndex, newIndex) {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
      this.updateSetOrdersWithRequest()
    },
    addToIndex (list, newItem, index) {
      if (list.length > index) {
        list.splice(index, 0, newItem)
      } else {
        list.push(newItem)
      }
      this.updateSetOrdersWithRequest()
    }
  }
}
</script>

<style scoped lang="scss">
.set {
  .set-container {
    height: 40px;
  }
}
</style>
