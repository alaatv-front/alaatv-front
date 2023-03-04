<template>
  <q-card class="download-section custom-card q-mx-md bg-white rounded-borders">
    <h6 class="text-grey q-pt-md q-pl-md">دانلود از طریق اپلیکیشن آلاء</h6>
    <q-separator class="q-ma-md" />
    <div class="q-py-xl text-center">
      <q-btn class="button bg-green-4"><a :href="options.link">دانلود اپلیکیشن آلاء</a></q-btn>
      <p class="q-mt-md">با نصب اپ اندروید آلا، می توانید این فیلم را دانلود نمایید.</p>
    </div>
  </q-card>
</template>

<script>
export default {
  name: 'ContentDownloadSection',
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
  .download-section {
    /*box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.03);*/
    /*border-radius: 10px;*/
    height: 100%
  }

  .button {
    border-radius: 25px;
  }

  h6 {
    margin: 0 !important;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
</style>
