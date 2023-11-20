<template>
  <div class="row flex flex-center q-my-md">
    <div class="col-9">
      <h2>
        Breadcrumb
      </h2>
      <div class="row">
        <q-breadcrumbs class="text-grey-9"
                       active-color="grey-6">
          <template v-slot:separator>
            <q-icon size="xs"
                    name="isax:arrow-right-3"
                    color="grey-6" />
          </template>
          <q-breadcrumbs-el label="صفحه اصلی" />
          <q-breadcrumbs-el label="صفحه اول" />
          <q-breadcrumbs-el label="صفحه دوم" />
          <q-breadcrumbs-el label="صفحه کنونی" />
        </q-breadcrumbs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'BreadCrumbs'
}
</script>
