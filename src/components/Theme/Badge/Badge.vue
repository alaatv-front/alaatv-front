<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>
        Badge
      </h2>
      <div class="row q-my-md">
        <q-badge label="25%"
                 class="q-mx-md badge-xs"
                 color="negative" />
        <q-badge label="25%"
                 class="q-mx-md badge-sm"
                 color="negative" />
        <q-badge class="q-mx-md badge-md"
                 color="negative">
          <div class="row text-center">
            <div class="col-12">
              <h4>
                6
              </h4>
            </div>
            <div class="col-12">
              <div class="caption1">
                قسط
              </div>
            </div>
          </div>
        </q-badge>
        <q-badge rounded
                 label="5"
                 class="q-mx-md badge-xs"
                 color="negative" />
        <q-badge rounded
                 label="5"
                 class="q-mx-md badge-sm"
                 color="negative" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Badge'
}
</script>
