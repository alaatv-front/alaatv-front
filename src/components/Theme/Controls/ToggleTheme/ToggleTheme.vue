<template>
  <div class="toggle-container">
    <div class="row flex flex-center">
      <div class="col-md-9">
        <div class="toggle-title">
          toggle
        </div>
      </div>
    </div>
    <div class="row flex flex-center">
      <!--      <div class="col-md-2 flex flex-center">XS</div>-->
      <div class="col-md-2 flex flex-center">sm</div>
      <div class="col-md-2 flex flex-center">MD</div>
      <div class="col-md-2 flex flex-center">LG</div>
      <!--      <div class="col-md-2 flex flex-center">XL</div>-->
    </div>
    <div class="row flex flex-center">
      <!--      <div class="col-md-2 flex flex-center">-->
      <!--        <q-toggle v-model="value1"-->
      <!--                  class="toggle-xs"-->
      <!--                  size="xs"-->
      <!--                  color="teal" />-->
      <!--      </div>-->
      <div class="col-md-2 flex flex-center">
        <q-toggle v-model="value1"
                  class="toggle-sm"
                  size="sm"
                  color="teal" />
      </div>
      <div class="col-md-2 flex flex-center">
        <q-toggle v-model="value1"
                  class="toggle-md"
                  size="md"
                  color="teal" />
      </div>
      <div class="col-md-2 flex flex-center">
        <q-toggle v-model="value1"
                  class="toggle-lg"
                  size="lg"
                  color="teal" />
      </div>
      <!--      <div class="col-md-2 flex flex-center">-->
      <!--        <q-toggle v-model="value1"-->
      <!--                  class="toggle-xl"-->
      <!--                  size="xl"-->
      <!--                  color="teal" />-->
      <!--      </div>-->
    </div>
    <div class="row flex flex-center">
      <!--      <div class="col-md-2 flex flex-center">-->
      <!--        <q-toggle v-model="value2"-->
      <!--                  class="toggle-xs"-->
      <!--                  size="xs"-->
      <!--                  color="teal" />-->
      <!--      </div>-->
      <div class="col-md-2 flex flex-center">
        <q-toggle v-model="value2"
                  class="toggle-sm"
                  size="sm"
                  color="teal" />
      </div>
      <div class="col-md-2 flex flex-center">
        <q-toggle v-model="value2"
                  class="toggle-md"
                  size="md"
                  color="teal" />
      </div>
      <div class="col-md-2 flex flex-center">
        <q-toggle v-model="value2"
                  class="toggle-lg"
                  size="lg"
                  color="teal" />
      </div>
      <!--      <div class="col-md-2 flex flex-center">-->
      <!--        <q-toggle v-model="value2"-->
      <!--                  class="toggle-xl"-->
      <!--                  size="xl"-->
      <!--                  color="teal" />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ToggleTheme',
  data() {
    return {
      value1: true,
      value2: false
    }
  }
})
</script>

<style lang="scss" scoped>
.toggle-container {
  padding: 40px 0;

  .toggle-title {
    font-size: 28px;
  }
}
</style>
