<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>Buttons</h2>
      <div class="row q-col-gutter-md">
        <div class="col-md-1" />
        <div class="col-md-2">
          default
        </div>
        <div class="col-md-2">
          hover / click
        </div>
        <div class="col-md-2">
          focus
        </div>
        <div class="col-md-2">
          focus
        </div>
        <div class="col-md-3" />
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-md-1">
          Extra Small
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs"
                 color="primary">
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs"
                 color="primary">
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs"
                 color="primary">
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs"
                 color="primary"
                 disable>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-3">
          Neutral
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-md-1">
          Small
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 color="secondary"
                 outline>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 color="secondary"
                 outline>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 color="secondary"
                 outline>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 color="secondary"
                 outline
                 disable>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-3">
          Outline
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-md-1">
          Medium
        </div>
        <div class="col-md-2">
          <q-btn color="secondary"
                 flat>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn color="secondary"
                 flat>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn color="secondary"
                 flat>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn color="secondary"
                 flat
                 disable>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-3">
          Flat
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-md-1">
          Large
        </div>
        <div class="col-md-2">
          <q-btn size="lg"
                 color="primary">
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn size="xs"
                 color="primary">
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn size="xs"
                 color="primary">
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-2">
          <q-btn size="xs"
                 color="primary"
                 disable>
            متن دکمه
          </q-btn>
        </div>
        <div class="col-md-3">
          Neutral
        </div>
      </div>
    </div>
  </div>
  <checkbox />

  <toggle-theme />
</template>

<script>
import Checkbox from 'components/Theme/Controls/Checkbox/Checkbox.vue'

import ToggleTheme from 'components/Theme/Controls/ToggleTheme/ToggleTheme.vue'
export default {
  name: 'Controls',
  components: {
    Checkbox,

    ToggleTheme
  }
}
</script>

<style scoped>

</style>
