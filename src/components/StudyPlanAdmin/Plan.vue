<template>
  <div class="plan-style"
       @mouseover="showMenu = true"
       @mouseleave="showMenu = false">
    <div> {{ planDate.title }}</div>
    <q-icon v-if="showMenu || openMenu"
            class="isax isax-menu plan-menu">
      <q-menu v-model="openMenu">
        <q-list style="min-width: 100px">
          <q-item v-close-popup
                  clickable
                  @click="handelPlanEvent('edit')">
            <q-item-section>ویرایش</q-item-section>
            <q-icon class="isax isax-global-edit2" />
          </q-item>
          <q-separator />
          <q-item v-close-popup
                  clickable
                  @click="handelPlanEvent('delete')">
            <q-item-section> حذف </q-item-section>
            <q-icon class="isax isax-trash" />
          </q-item>
          <q-separator />
          <q-item v-close-popup
                  clickable
                  @click="handelPlanEvent('copy')">
            <q-item-section> کپی </q-item-section>
            <q-icon class="isax isax-trash" />
          </q-item>
        </q-list>
      </q-menu>
    </q-icon>
  </div>
</template>

<script>
import { Plan } from 'src/models/Plan.js'
// import PlanDetail from 'components/StudyPlanAdmin/Plan Detail'
export default {
  name: 'plan',
  props: {
    planDate: {
      type: Plan,
      default: () => new Plan()
    }
  },
  data: () => ({
    showMenu: false,
    openMenu: false
  }),
  mounted () {
    this.setData()
  },
  methods: {
    handelPlanEvent (type) {
      this.$emit('handelPlanEvent', this.planDate, type)
    },
    setData () {
    //  console.log('F :', this.$refs.studyPlanForm)
    }
  }
}
</script>

<style scoped lang="scss">

.plan-style {
  border-radius: 50px;
  text-align: center;
  color: white;
  position: absolute;
}

.plan-menu{
  cursor: pointer;
  position: absolute;
  top: 15%;
  right: 10px;
}
</style>
