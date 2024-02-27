<template>
  <div class="row">
    <div class="col-md-3 q-ma-sm">
      <div class="outsideLabel">responsive size</div>
      <q-select v-model="responsive"
                :options="responsiveOpts"
                label="responsive" />
    </div>
    <div class="col-md-3 offset-1 q-ma-sm">
      <div class="outsideLabel">font style</div>
      <q-select v-model="localOptions[responsive].fontStyle"
                :options="fontStyle"
                label="fontStyle" />
    </div>
    <div class="col-md-3 offset-1 q-ma-sm">
      <div class="outsideLabel">font family</div>
      <q-select v-model="localOptions.fontFamily"
                :options="fontFamilies"
                label="font family" />
    </div>
    <div class="col-md-3 q-ma-sm">
      <div class="outsideLabel">font size</div>
      <q-input v-model="localOptions[responsive].fontSize"
               label="font size" />
    </div>
    <div class="col-md-3 offset-1 q-ma-sm">
      <div class="outsideLabel">font weight</div>
      <q-input v-model="localOptions[responsive].fontWeight"
               label="font weight" />
    </div>
    <div class="col-md-3 offset-1 q-ma-sm">
      <div class="outsideLabel">line height</div>
      <q-input v-model="localOptions[responsive].lineHeight"
               label="line height" />
    </div>
    <div class="col-md-3 q-ma-sm">
      <div class="outsideLabel">Letter Spacing</div>
      <q-input v-model="localOptions[responsive].letterSpacing"
               label="Letter Spacing" />
    </div>
  </div>
</template>

<script>
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'

export default {
  name: 'EditorOptions',
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      fontFamilies: ['Doran', 'IRANSans', 'IRANSansDN', 'IRANSansX', 'iranyekan', 'Plasma', 'Panchang', 'Modam'],
      fontStyle: ['inherit', 'normal', 'italic'],
      responsiveOpts: ['xs', 'sm', 'md', 'lg', 'xl'],
      responsive: 'xs'

    }
  }
}
</script>
