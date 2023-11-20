<template>
  <q-virtual-scroll type="table"
                    :virtual-scroll-item-size="48"
                    :class="{'bg-transparent': true}"
                    :virtual-scroll-sticky-size-start="48"
                    :virtual-scroll-sticky-size-end="32"
                    :items="rows">
    <template v-slot:before>
      <thead class="thead-sticky text-left">
        <tr>
          <th>#</th>
          <th v-for="col in columns"
              :key="'1--' + col.name">
            {{ col.label }}
          </th>
        </tr>
      </thead>
    </template>

    <template v-slot="{ item: row, index }">
      <tr :key="index">
        <td>{{ index + 1 }}</td>
        <td v-for="col in columns"
            :key="index + '-' + col.name">
          <q-badge v-if="col.name === 'id'"
                   class="q-pa-sm cursor-pointer"
                   color="primary"
                   @click="goToMarker(row, index)">
            {{ row[col.field] }}
          </q-badge>
          <div v-else-if="col.name === 'tags' && row[col.field]">
            <q-badge v-for="(tag, tagIndex) in row[col.field]"
                     :key="tagIndex"
                     class="q-pa-sm"
                     color="blue">
              {{ tag }}
            </q-badge>
          </div>
          <div v-else>
            {{ row[col.field] }}
          </div>
        </td>
      </tr>
    </template>
  </q-virtual-scroll>
</template>

<script>
import MapItemsResponse from 'src/components/Widgets/Map/MapItemsResponse.js'

export default {
  name: 'mapInfo.vue',
  // props: {
  //   data: {
  //     type: Array,
  //     default: () => []
  //   }
  // },
  data () {
    return {
      columns: [
        {
          name: 'id',
          align: 'center',
          label: 'ID',
          field: 'id'
        },
        {
          name: 'enable',
          label: 'enable',
          align: 'center',
          field: 'enable'
        },
        {
          name: 'min_zoom',
          label: 'min_zoom',
          align: 'center',
          field: 'min_zoom'
        },
        {
          name: 'max_zoom',
          label: 'max_zoom',
          align: 'center',
          field: 'max_zoom'
        },
        {
          name: 'tags',
          label: 'tags',
          align: 'center',
          field: 'tags'
        }
      ],
      rows: MapItemsResponse.data
    }
  },
  methods: {
    goToMarker (row, index) {
      this.$emit('go_to_marker', {
        row,
        index
      })
    }
  }
}
</script>

<style scoped lang="scss">
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}
</style>
