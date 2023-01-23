<template>
  <div class="row justify-center ">
    <div class="col-12"
         style="max-width: 400px">
      <q-tabs v-model="activeMajor"
              class="bg-primary text-white shadow-2 q-ma-lg">
        <q-tab v-for="major in majors"
               :key="major.id"
               :name="major.id"
               :label="major.title"
               @click="changeSelectedMajorId(major)" />
      </q-tabs>
    </div>
    <div class="q-mx-lg col-12">
      <div class="row justify-center">
        <q-btn v-for="(lesson, index) in lessonList"
               :key="index"
               unelevated
               class="lessons"
               :color="lesson.active ? 'deep-purple-4' : 'primary'"
               @click="lessonClicked(lesson)">
          {{lesson.title}}
        </q-btn>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'FilterPlans',
  props: {
    selectedMajorId: {
      type: Number,
      default: 1
    },
    majors: {
      type: Array,
      default: () => []
    },
    lessonList: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    activeMajor: 1,
    activeMajorLesson: []
  }),
  created () {
    this.setSelectedMajorId()
  },
  methods: {
    lessonClicked (lesson) {
      lesson.active = !lesson.active
      if (this.activeMajorLesson.includes(lesson.title)) {
        this.activeMajorLesson = this.activeMajorLesson.filter(item => item !== lesson.title)
      } else {
        this.activeMajorLesson.push(lesson.title)
      }
      this.$emit('changeSelectedLesson', this.activeMajorLesson)
    },
    changeSelectedMajorId (major) {
      const majorId = major.id
      this.activeMajorLesson = []
      this.$emit('changeMajorId', majorId)
    },
    setSelectedMajorId () {
      if (!this.selectedMajorId) {
        this.activeMajor = 1
        return
      }
      this.activeMajor = this.selectedMajorId
    }
  }
}
</script>

<style lang="scss" scoped>
.lessons{
  border-radius: 0;
}
</style>
