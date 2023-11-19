<template>
  <div class="row justify-center q-my-md new-theme">
    <div class="col-md-9">
      <h2>Scroll</h2>
      <div class="row">
        <div class="col-md-4">
          <q-scroll-area style="height: 200px; max-width: 300px;">
            <div v-for="n in 100"
                 :key="n"
                 class="q-py-xs">
              Lorem ipsum dolor sit amet, consectetur adipisicing
              elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </div>
          </q-scroll-area>
        </div>
        <div class="col-md-4">
          <q-scroll-area style="height: 230px; max-width: 300px;">
            <div class="row no-wrap">
              <div v-for="n in 10"
                   :key="n"
                   style="width: 150px"
                   class="q-pa-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto fuga quae veritatis blanditiis sequi id expedita amet esse aspernatur! Iure, doloribus!
              </div>
            </div>
          </q-scroll-area>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Scroll'
}
</script>
