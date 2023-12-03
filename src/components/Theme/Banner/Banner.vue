<template>
  <div class="row justify-center q-my-md">
    <div class="col-9">
      <h2>
        Banner
      </h2>
    </div>
    <div class="col-6">
      <div class="row justify-between items-center q-col-gutter-md">
        <div class="q-my-sm col-10">
          <q-banner class="success-banner">
            لورم ایپسوم شما یه بلایی سرش اومد
            <template v-slot:avatar>
              <q-icon name="ph:check-circle"
                      class="size-md" />
            </template>
          </q-banner>
        </div>
        <div class="col-2">
          success-banner
        </div>
        <div class="q-my-sm col-10">
          <q-banner class="error-banner">
            لورم ایپسوم شما یه بلایی سرش اومد
            <template v-slot:avatar>
              <q-icon name="ph:x-circle"
                      class="size-md" />
            </template>
          </q-banner>
        </div>
        <div class="col-2">
          error-banner
        </div>
        <div class="q-my-sm col-10">
          <q-banner class="info-banner">
            لورم ایپسوم شما یه بلایی سرش اومد
            <template v-slot:avatar>
              <q-icon name="ph:info"
                      class="size-md" />
            </template>
          </q-banner>
        </div>
        <div class="col-2">
          info-banner
        </div>
        <div class="q-my-sm col-10">
          <q-banner class="warning-banner">
            لورم ایپسوم شما یه بلایی سرش اومد
            <template v-slot:avatar>
              <q-icon name="ph:warning"
                      class="size-md" />
            </template>
          </q-banner>
        </div>
        <div class="col-2">
          warning-banner
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>
