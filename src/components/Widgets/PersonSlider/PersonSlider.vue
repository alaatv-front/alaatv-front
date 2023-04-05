<template>
  <q-virtual-scroll v-if="sliderItems"
                    ref="virtualScroll"
                    v-slot="{ item, index }"
                    :items="sliderItems"
                    class="student-scroll-bar"
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
        <div class="student-info">
          <div class="rank">
            {{ item.rank }}
          </div>
          <div class="region">
            {{ item.distraction === '1' ? 'منطقه یک' : item.distraction === '2' ? 'منطقه دو' : item.distraction === '3' ? 'منطقه سه' : item.distraction}}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-virtual-scroll>
  <div v-else
       class="loading">
    ...
  </div>
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
  data() {
    return {
      sliderItems: [],
      scrollIndex: 0
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
    this.init()
  },
  methods: {
    loadConfig() {
      this.sliderItems = this.options.sliderItems
    },
    init() {
      setInterval(() => {
        this.scrollIndex += 1
        if (this.scrollIndex > this.sliderItems.length) {
          this.scrollIndex = 0
        }
        this.$refs.virtualScroll.scrollTo(this.scrollIndex)
      }, 2000)
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
.scroll-item-card {
  width: 200px;
  height: 320px;
  max-height: 350px;
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

  .student-info{
    display: flex;
    justify-content: center;
    align-items: center;

    .rank {
      font-size: 28px;
      font-weight: 800;
      color: #35427a;
      text-align: left;
    }

    .region {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: right;
      margin-right: 10px;
    }
  }
}
</style>
