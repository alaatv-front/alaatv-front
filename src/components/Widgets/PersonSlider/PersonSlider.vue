<template>
  <q-virtual-scroll v-slot="{ item, index }"
                    :items="sliderItems"
                    virtual-scroll-horizontal>
    <q-card :key="index"
            class="scroll-item-card">
      <q-img :src="`https://nodes.alaatv.com/upload/landing/110/Rotbeh/${item.code}.png`"
             width="160px"
             height="160px"
             spinner-color="primary"
             spinner-size="82px" />
      <q-card-section>
        <div class="student-name">{{ item.first_name + ' ' + item.last_name }}</div>
      </q-card-section>
      <q-card-section>
        <div class="rank">
          {{ item.rank }}
        </div>
        <div class="region">
          {{ item.distraction === 1 ? 'منطقه یک' : item.distraction === 2 ? 'منطقه دو' : item.distraction === 3 ? 'منطقه سه' : item.distraction}}
        </div>
      </q-card-section>
    </q-card>
  </q-virtual-scroll>
</template>

<script>

export default {
  name: 'PersonSlider',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  date() {
    return {
      sliderItems: []
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.sliderItems = this.options.sliderItems
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-item-card {
  width: 200px;
  height: 280px;
  border-radius: 20px;
  margin: 0 10px 90px;
  padding: 20px 20px 8px;
  box-shadow: 0 20px 20px 0 rgb(0 0 0 / 5%);
  background-color: #fff;
  .student-name {
    font-size: 16px;
    font-weight: 500;
    color: #333;
    text-align: center;
  }
}
</style>
