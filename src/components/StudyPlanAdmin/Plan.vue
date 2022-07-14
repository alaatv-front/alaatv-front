<template>
  <div @mouseover="showMenu = true"
       @mouseleave="showMenu = false"
       class="plan-style"
  >
    <div> {{ planDate.title }}</div>
    <q-icon v-if="showMenu || openMenu"
            class="isax isax-menu plan-menu"
    >
      <q-menu v-model="openMenu">
        <q-list style="min-width: 100px">
          <q-item clickable
                  v-close-popup>
            <q-item-section @click="editPlan">ویرایش</q-item-section>
            <q-icon class="isax isax-global-edit2" />
          </q-item>
          <q-separator />
          <q-item clickable
                  v-close-popup>
            <q-item-section @click="deletePlan"> حذف </q-item-section>
            <q-icon class="isax isax-trash" />
          </q-item>
          <q-separator />
          <q-item clickable
                  v-close-popup>
            <q-item-section @click="copyPlan"> کپی </q-item-section>
            <q-icon class="isax isax-trash" />
          </q-item>
        </q-list>
      </q-menu>
    </q-icon>
  </div>
</template>

<script>
import { Plan } from 'src/models/Plan'
// import PlanDetail from 'components/StudyPlanAdmin/Plan Detail'
export default {
  name: 'plan',
  components: {
  },
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
      this.$emit('editPlanData', this.planDate)
    },
    deletePlan () {
      this.$emit('deletePlan', this.planDate, 'test')
    },
    copyPlan () {
      this.$emit('copyPlan', this.planDate)
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
