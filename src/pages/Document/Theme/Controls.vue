<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>Buttons</h2>
      <div class="row q-col-gutter-md">
        <div class="col-md-1" />
        <div class="col-md-2">
          button (default)
        </div>
        <div class="col-md-2">
          button (disable)
        </div>
        <div class="col-md-2">
          icon button (default)
        </div>
        <div class="col-md-2">
          icon button (disable)
        </div>
        <div class="col-md-3" />
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-md-1">
          Extra Small
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs btn-primary"
                 label="متن دکمه"
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs btn-primary"
                 disable
                 label="متن دکمه"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs btn-primary"
                 square
                 icon="search"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xs btn-primary"
                 color="primary "
                 square
                 disable
                 icon="search" />
        </div>
        <div class="col-md-3">
          Standard
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-md">
        <div class="col-md-1">
          Small
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 label="متن دکمه"
                 outline
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 label="متن دکمه"
                 outline
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 label="متن دکمه"
                 outline
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-sm"
                 label="متن دکمه"
                 outline
                 disable
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
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
          <q-btn class="q-btn-md"
                 flat
                 label="متن دکمه"
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-md"
                 flat
                 label="متن دکمه"
                 disable
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-md"
                 square
                 flat
                 icon="search" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-md"
                 square
                 flat
                 disable
                 icon="search" />
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
          <q-btn class="q-btn-lg btn-primary"
                 label="متن دکمه"
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-lg btn-primary"
                 disable
                 label="متن دکمه"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-lg btn-primary"
                 square
                 icon="search"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-lg btn-primary"
                 color="primary "
                 square
                 disable
                 icon="search" />
        </div>
        <div class="col-md-3">
          Rounded
        </div>
      </div>
      <div class="row q-col-gutter-md q-mt-lg">
        <div class="col-md-1">
          Extra Large
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xl btn-primary"
                 label="متن دکمه"
                 text-color="grey-9"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xl btn-primary"
                 disable
                 label="متن دکمه"
                 icon="copyright"
                 icon-right="isax:arrow-left"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xl btn-primary"
                 square
                 icon="search"
                 color="primary" />
        </div>
        <div class="col-md-2">
          <q-btn class="q-btn-xl btn-primary"
                 color="primary "
                 square
                 disable
                 icon="search" />
        </div>
        <div class="col-md-3">
          Square
        </div>
      </div>

    </div>
  </div>
  <badge />
  <bread-crumbs />
  <checkbox />
  <example-dialog />
  <color />
  <progress-theme />
  <slider-range />
  <example-tabs />
  <toggle-theme />
  <radio-btn />
  <pagination-theme />
  <scroll />
  <toast />
  <tooltip />
  <typography />
  <avatar />
  <text-input />
  <dropdown />
</template>

<script>
import Checkbox from 'components/Theme/Controls/Checkbox/Checkbox.vue'
import Color from 'components/Theme/Color/Color.vue'
import ProgressTheme from 'components/Theme/Controls/ProgressTheme/ProgressTheme.vue'
import SliderRange from 'components/Theme/Controls/Slider&Range/Slider&Range.vue'
import ToggleTheme from 'components/Theme/Controls/ToggleTheme/ToggleTheme.vue'
import RadioBtn from 'src/components/Theme/Controls/RadioBtn/RadioBtn.vue'
import PaginationTheme from 'src/components/Theme/Controls/PaginationTheme/PaginationTheme.vue'
import Typography from 'components/Theme/Typography/Typography.vue'
import Scroll from 'components/Theme/Controls/Scroll/Scroll.vue'
import Avatar from 'components/Theme/Controls/Avatar/Avatar.vue'
import TextInput from 'components/Theme/TextInput/TextInput.vue'
import Dropdown from 'components/Theme/Controls/Dropdown/Dropdown.vue'
import BreadCrumbs from 'components/Theme/BreadCrumbs/BreadCrumbs.vue'
import Tooltip from 'components/Theme/Tooltip/Tooltip.vue'
import Toast from 'components/Theme/Toast/Toast.vue'
import ExampleTabs from 'components/Theme/Tabs/ExampleTabs.vue'
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import Badge from 'components/Theme/Badge/Badge.vue'

export default {
  name: 'Controls',
  components: {
    Dropdown,
    Avatar,
    Checkbox,
    Color,
    ProgressTheme,
    SliderRange,
    ToggleTheme,
    RadioBtn,
    PaginationTheme,
    Typography,
    Scroll,
    TextInput,
    BreadCrumbs,
    Tooltip,
    Toast,
    ExampleTabs,
    ExampleDialog,
    Badge
  }
}
</script>

<style scoped>

</style>
