<template>
  <div class="CustomSelect"
       :class="customClass">
    <div v-for="(item, index) in items"
         :key="'filter'+index"
         class="CustomSelect-Item"
         :class="{'selected': (type === 'filterBoxSort' && item.value === boxSortSelected) || (type === 'filterBoxCategory' && item.value === categorySelected)}"
         @click="select(item)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterBox',
  props: {
    type: {
      type: String,
      default: ''
    },
    boxSortSelected: {
      type: String,
      default: ''
    },
    categorySelected: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    },
    customClass: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      filterItems: []
    }
  },
  methods: {
    select (item) {
      this.$emit('update:' + this.type, item.value)
    }
  }
}
</script>

<style scoped lang="scss">

.CustomSelect{
  border: 1px black solid;
  border-radius: 10px;
   padding: 5px;
  display: flex;

  .CustomSelect-Item{
    padding: 8px 10px;
    transition: all 0.5s;

    &:hover{
       background: #c6c6c8;
       color: white;
      border-radius: 8px;
  }

    &.selected{
      background: #23232c;
      color: white;
      border-radius: 8px;
    }
  }
}

    //
    //.CustomSelect {
    //    border: solid 1px #a9a9a9;
    //    border-radius: 5px;
    //    padding: 5px;
    //
    //    -webkit-touch-callout: none; /* iOS Safari */
    //    -webkit-user-select: none; /* Safari */
    //    -khtml-user-select: none; /* Konqueror HTML */
    //    -moz-user-select: none; /* Old versions of Firefox */
    //    -ms-user-select: none; /* Internet Explorer/Edge */
    //    user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera and Firefox */
    //}
    //.CustomSelect .CustomSelect-Item {
    //    display: inline-block;
    //    padding: 5px 10px;
    //    border-radius: 5px;
    //    cursor: pointer;
    //    background: transparent;
    //    transition: all 0.5s;
    //}
    //.CustomSelect .CustomSelect-Item:hover {
    //    background: #c6c6c8;
    //    color: white;
    //}
    //.CustomSelect .CustomSelect-Item.selected {
    //    background: #201f2b;
    //    color: white;
    //}
</style>
