<template>
  <div class="download-section q-mx-sm bg-white shadow-4 rounded-borders">
    <h6 class="text-grey q-pt-md q-pl-md">دانلود از طریق اپلیکیشن آلاء</h6>
    <q-separator class="q-my-md"/>
    <div class="q-py-xl text-center">
      <q-btn class="button bg-green-4"><a href="#">دانلود اپلیکیشن آلاء</a></q-btn>
      <p class="q-mt-md">با نصب اپ اندروید آلا، می توانید این فیلم را دانلود نمایید.</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ContentDownloadSection'
  }
</script>

<style scoped>
  .download-section {
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
