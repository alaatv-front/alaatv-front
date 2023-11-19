<template>
  <table class="table table-striped table-hover">
    <thead style="font-size: 0.6rem;">
      <tr>
        <th scope="col">#</th>
        <th scope="col">ID</th>
        <th scope="col">enable</th>
        <th scope="col">min_zoom</th>
        <th scope="col">max_zoom</th>
        <th scope="col">tags</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in mapItems"
          :key="index">
        <th scope="row">{{ index+1 }}</th>
        <td>
          <span class="m-badge m-badge--warning m-badge--wide m-badge--rounded btn"
                @click="selectItem(item)">
            {{ item.id }}
          </span>
        </td>
        <td>{{ item.enable }}</td>
        <td>{{ item.min_zoom }}</td>
        <td>{{ item.max_zoom }}</td>
        <td style="white-space: nowrap;">
          <span v-for="(tagItem, tagIndex) in item.tags"
                :key="tagIndex"
                class="m-badge m-badge--info m-badge--wide m-badge--rounded">
            {{ tagItem }}
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'MapItemsList',
  props: {
    mapItems: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
    }
  },
  methods: {
    selectItem (item) {
      this.$emit('on-select-item', item)
    }
  }
}
</script>
