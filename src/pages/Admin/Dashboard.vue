<template>
  <div class="row">
    <div class="col-12 q-pa-xl">
      <q-list bordered
              padding
              separator
              class="rounded-borders">
        <q-item v-ripple
                :to="{ name: 'Admin.UploadCenter.Contents' }"
                clickable>
          <q-item-section>
            آپلود سنتر
          </q-item-section>
        </q-item>
        <q-item v-ripple
                :to="{ name: 'Admin.Ticket.Index' }"
                clickable>
          <q-item-section>
            تیکت
          </q-item-section>
        </q-item>
        <q-item v-ripple
                :to="{ name: 'Admin.StudyPlan' }"
                clickable>
          <q-item-section>
            برنامه مطالعاتی
          </q-item-section>
        </q-item>
        <q-item v-ripple
                :to="{ name: 'Admin.Settings' }"
                clickable>
          <q-item-section>
            چیدمان صفحه
          </q-item-section>
        </q-item>
        <q-item v-ripple
                :to="{ name: 'Admin.Product.Index' }"
                clickable>
          <q-item-section>
            مدیریت محصولات
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>

export default {
  name: 'AdminDashboard'
}
</script>
