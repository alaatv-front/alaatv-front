<template>
  <q-splitter v-model="splitterModel">
    <template v-slot:before>
      <q-tabs v-model="tab"
              dense
              class="text-grey"
              active-color="primary"
              indicator-color="primary"
              align="justify"
              vertical>
        <q-tab v-for="(component, componentIndex) in components"
               :key="componentIndex"
               :name="component.name"
               :label="component.label" />
      </q-tabs>
    </template>

    <template v-slot:after>
      <q-tab-panels v-model="tab"
                    animated>
        <q-tab-panel v-for="(component, componentIndex) in components"
                     :key="componentIndex"
                     :name="component.name">
          <component :is="component.name" />
        </q-tab-panel>
      </q-tab-panels>
    </template>

  </q-splitter>
</template>

<script>
import Color from 'components/Theme/Color/Color.vue'
import Buttons from 'src/components/Theme/Buttons/Buttons.vue'
import Scroll from 'components/Theme/Controls/Scroll/Scroll.vue'
import Checkbox from 'components/Theme/Controls/Checkbox/Checkbox.vue'
import RadioBtn from 'src/components/Theme/Controls/RadioBtn/RadioBtn.vue'
import ToggleTheme from 'components/Theme/Controls/ToggleTheme/ToggleTheme.vue'
import SliderRange from 'components/Theme/Controls/Slider&Range/Slider&Range.vue'
import ProgressTheme from 'components/Theme/Controls/ProgressTheme/ProgressTheme.vue'
import PaginationTheme from 'src/components/Theme/Controls/PaginationTheme/PaginationTheme.vue'
import Typography from 'components/Theme/Typography/Typography.vue'
import Avatar from 'components/Theme/Controls/Avatar/Avatar.vue'
import TextInput from 'components/Theme/TextInput/TextInput.vue'
import Dropdown from 'components/Theme/Controls/Dropdown/Dropdown.vue'
import BreadCrumbs from 'components/Theme/BreadCrumbs/BreadCrumbs.vue'
import Tooltip from 'components/Theme/Tooltip/Tooltip.vue'
import Toast from 'components/Theme/Toast/Toast.vue'
import ExampleTabs from 'components/Theme/Tabs/ExampleTabs.vue'
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import Badge from 'components/Theme/Badge/Badge.vue'
import ExpansionItem from 'components/Theme/ExpansionItem/ExpansionItem.vue'

export default {
  name: 'Controls',
  components: {
    Badge,
    Color,
    Toast,
    Avatar,
    Scroll,
    Tooltip,
    Buttons,
    Checkbox,
    Dropdown,
    RadioBtn,
    TextInput,
    Typography,
    SliderRange,
    ToggleTheme,
    BreadCrumbs,
    ExampleTabs,
    ExampleDialog,
    ProgressTheme,
    PaginationTheme,
    ExpansionItem
  },
  data () {
    return {
      tab: 'buttons',
      splitterModel: 20,
      components: [
        {
          label: 'buttons',
          name: 'buttons'
        },
        {
          label: 'badge',
          name: 'badge'
        },
        {
          label: 'bread-crumbs',
          name: 'bread-crumbs'
        },
        {
          label: 'checkbox',
          name: 'checkbox'
        },
        {
          label: 'example-dialog',
          name: 'example-dialog'
        },
        {
          label: 'color',
          name: 'color'
        },
        {
          label: 'progress-theme',
          name: 'progress-theme'
        },
        {
          label: 'slider-range',
          name: 'slider-range'
        },
        {
          label: 'example-tabs',
          name: 'example-tabs'
        },
        {
          label: 'expansion-item',
          name: 'expansion-item'
        },
        {
          label: 'toggle-theme',
          name: 'toggle-theme'
        },
        {
          label: 'radio-btn',
          name: 'radio-btn'
        },
        {
          label: 'pagination-theme',
          name: 'pagination-theme'
        },
        {
          label: 'scroll',
          name: 'scroll'
        },
        {
          label: 'toast',
          name: 'toast'
        },
        {
          label: 'tooltip',
          name: 'tooltip'
        },
        {
          label: 'typography',
          name: 'typography'
        },
        {
          label: 'avatar',
          name: 'avatar'
        },
        {
          label: 'text-input',
          name: 'text-input'
        },
        {
          label: 'dropdown',
          name: 'dropdown'
        }
      ]
    }
  }
}
</script>
