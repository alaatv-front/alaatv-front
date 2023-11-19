<template>
  <div class="row justify-center q-my-md">
    <div class="col-md-9">
      <h2>
        Tooltip
      </h2>
      <div class="row justify-around">
        <q-btn label="bottom tooltip">
          <q-tooltip anchor="bottom middle"
                     self="top middle">
            <template v-slot:default>
              <q-icon name="isax:info-circle4" />
              متن پیش فرض تولتیپ
            </template>
          </q-tooltip>
        </q-btn>
        <q-btn label="bottom tooltip">
          <q-tooltip anchor="top middle"
                     self="bottom middle">
            <q-icon name="isax:info-circle4" />
            متن پیش فرض تولتیپ
          </q-tooltip>
        </q-btn>
        <q-btn label="bottom tooltip">
          <q-tooltip anchor="center right"
                     self="center left">
            <q-icon name="isax:info-circle4" />
            متن پیش فرض تولتیپ
          </q-tooltip>
        </q-btn>
        <q-btn label="bottom tooltip">
          <q-tooltip v-model="tooltip"
                     anchor="center left"
                     self="center right">
            <q-icon name="isax:info-circle4" />
            متن پیش فرض تولتیپ
          </q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToolTip',
  data () {
    return {
      tooltip: true
    }
  }
}
</script>
