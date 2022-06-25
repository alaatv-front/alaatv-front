<template>
  <p> filter plans say Hi </p>
  <div class="">
    <div style="max-width: 400px">
      <q-tabs
        v-model="activeMajor"
        class="bg-primary text-white shadow-2 q-ma-lg"
      >
        <q-tab
          v-for="major in majors"
          :key="major.id"
          :name="major.id"
          :label="major.title"
          @click="changeSelectedMajorId(major)"
        />
      </q-tabs>
    </div>
    <div class="flex q-mx-lg"
    >
      <q-btn
        v-for="(lesson, index) in majorsLesson"
        :key="index"
        unelevated
        class="lessons"
        :color="lesson.active ? 'deep-purple-4' : 'primary'"
        @click="lessonClicked(lesson)"
      >
        {{lesson.title}}
      </q-btn>
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
    }
  },
  data: () => ({
    activeMajor: 1,
    activeMajorLesson: [],
    group: [],
    contentTypes: [
      {
        id: 1,
        title: 'moshavere_voice',
        display_name: 'ویس مشاوره'
      },
      {
        id: 2,
        title: 'moshavere_video',
        display_name: 'فیلم مشاوره'
      },
      {
        id: 3,
        title: 'moshavere_text',
        display_name: 'متن مشاوره'
      },
      {
        id: 4,
        title: 'lesson_video',
        display_name: 'فیلم تدریس'
      },
      {
        id: 5,
        title: 'tests',
        display_name: 'تست ها'
      }
    ]
  }),
  created () {
    this.setSelectedMajorId()
  },
  computed: {
    majorsLesson () {
      const selectedMajor = this.majors.find(major => major.id === this.selectedMajorId)
      return selectedMajor.lessons
    }
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
  width: 70px;
}
</style>
