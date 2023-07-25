<template>
  <div class="color-palette row justify-center q-my-md">
    <div class="col-md-9">
      <h2>
        Color
      </h2>
      <div class="row">
        <div class="col-md-1 q-mx-md primary">
          <q-card>
            <q-card-section class="primary1">
              primary-1
            </q-card-section>
            <q-card-section class="primary2">
              primary-2
            </q-card-section>
            <q-card-section class="primary3">
              primary-3
            </q-card-section>
            <q-card-section class="primary4">
              primary-4
            </q-card-section>
            <q-card-section class="primary5">
              primary-5
            </q-card-section>
            <q-card-section class="primary6">
              primary-6
            </q-card-section>
            <q-card-section class="primary7">
              primary-7
            </q-card-section>
            <q-card-section class="primary8">
              primary-8
            </q-card-section>
            <q-card-section class="primary9">
              primary-9
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md secondary">
          <q-card>
            <q-card-section class="secondary1">
              secondary-1
            </q-card-section>
            <q-card-section class="secondary2">
              secondary-2
            </q-card-section>
            <q-card-section class="secondary3">
              secondary-3
            </q-card-section>
            <q-card-section class="secondary4">
              secondary-4
            </q-card-section>
            <q-card-section class="secondary5">
              secondary-5
            </q-card-section>
            <q-card-section class="secondary6">
              secondary-6
            </q-card-section>
            <q-card-section class="secondary7">
              secondary-7
            </q-card-section>
            <q-card-section class="secondary8">
              secondary-8
            </q-card-section>
            <q-card-section class="secondary9">
              secondary-9
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md tertiary">
          <q-card>
            <q-card-section class="tertiary1">
              tertiary-1
            </q-card-section>
            <q-card-section class="tertiary2">
              tertiary-2
            </q-card-section>
            <q-card-section class="tertiary3">
              tertiary-3
            </q-card-section>
            <q-card-section class="tertiary4">
              tertiary-4
            </q-card-section>
            <q-card-section class="tertiary5">
              tertiary-5
            </q-card-section>
            <q-card-section class="tertiary6">
              tertiary-6
            </q-card-section>
            <q-card-section class="tertiary7">
              tertiary-7
            </q-card-section>
            <q-card-section class="tertiary8">
              tertiary-8
            </q-card-section>
            <q-card-section class="tertiary9">
              tertiary-9
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md positive">
          <q-card>
            <q-card-section class="positive1">
              positive-1
            </q-card-section>
            <q-card-section class="positive2">
              positive-2
            </q-card-section>
            <q-card-section class="positive3">
              positive-3
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md warning">
          <q-card>
            <q-card-section class="warning1">
              warning-1
            </q-card-section>
            <q-card-section class="warning2">
              warning-2
            </q-card-section>
            <q-card-section class="warning3">
              warning-3
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md negative">
          <q-card>
            <q-card-section class="negative1">
              negative-1
            </q-card-section>
            <q-card-section class="negative2">
              negative-2
            </q-card-section>
            <q-card-section class="negative3">
              negative-3
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md grey">
          <q-card>
            <q-card-section class="grey1">
              grey-1
            </q-card-section>
            <q-card-section class="grey2">
              grey-2
            </q-card-section>
            <q-card-section class="grey3">
              grey-3
            </q-card-section>
            <q-card-section class="grey4">
              grey-4
            </q-card-section>
            <q-card-section class="grey5">
              grey-5
            </q-card-section>
            <q-card-section class="grey6">
              grey-6
            </q-card-section>
            <q-card-section class="grey7">
              grey-7
            </q-card-section>
            <q-card-section class="grey8">
              grey-8
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-1 q-mx-md other">
          <q-card>
            <q-card-section class="other1">
              other-1
            </q-card-section>
            <q-card-section class="other2">
              other-2
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Color'
}
</script>

<style lang="scss" scoped>
.color-palette{
  .primary{
    .primary1{
      background: $primary1;
    }
    .primary2{
      background: $primary2;
    }
    .primary3{
      background: $primary3;
    }
    .primary4{
      background: $primary4;
    }
    .primary5{
      background: $primary5;
    }
    .primary6{
      background: $primary6;
    }
    .primary7{
      background: $primary7;
    }
    .primary8{
      background: $primary8;
    }
    .primary9{
      background: $primary9;
    }
  }
  .secondary{
    .secondary1{
      background: $secondary1;
    }
    .secondary2{
      background: $secondary2;
    }
    .secondary3{
      background: $secondary3;
    }
    .secondary4{
      background: $secondary4;
    }
    .secondary5{
      background: $secondary5;
    }
    .secondary6{
      background: $secondary6;
    }
    .secondary7{
      background: $secondary7;
    }
    .secondary8{
      background: $secondary8;
    }
    .secondary9{
      background: $secondary9;
    }
  }
  .tertiary{
    .tertiary1{
      background: $tertiary1;
    }
    .tertiary2{
      background: $tertiary2;
    }
    .tertiary3{
      background: $tertiary3;
    }
    .tertiary4{
      background: $tertiary4;
    }
    .tertiary5{
      background: $tertiary5;
    }
    .tertiary6{
      background: $tertiary6;
    }
    .tertiary7{
      background: $tertiary7;
    }
    .tertiary8{
      background: $tertiary8;
    }
    .tertiary9{
      background: $tertiary9;
    }
  }
  .positive{
    .positive1{
      background: $positive1;
    }
    .positive2{
      background: $positive2;
    }
    .positive3{
      background: $positive3;
    }
  }
  .warning{
    .warning1{
      background: $warning1;
    }
    .warning2{
      background: $warning2;
    }
    .warning3{
      background: $warning3;
    }
  }
  .negative{
    .negative1{
      background: $negative1;
    }
    .negative2{
      background: $negative2;
    }
    .negative3{
      background: $negative3;
    }
  }
  .grey{
    .grey1{
      background: $grey1;
    }
    .grey2{
      background: $grey2;
    }
    .grey3{
      background: $grey3;
    }
    .grey4{
      background: $grey4;
    }
    .grey5{
      background: #49498c;
    }
    .grey6{
      background: $grey-6;
    }
    .grey7{
      background: $grey7;
    }
    .grey8{
      background: $grey8;
    }
  }
  .other{
    .other1{
      background: $other1;
    }
    .other2{
      background: $other2;
    }
  }

}
</style>
