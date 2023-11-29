<template>
  <div class="row justify-center q-my-md">
    <div class="col-9">
      <h2>
        card
      </h2>
    </div>
    <div class="col-12">
      <div class="row justify-between">
        <div class="col-12 cards-container q-mt-md">
          <div class="row q-col-gutter-xl">
            <div class="col-6">
              <div class="row q-col-gutter-md">
                <div class="col-12 text-center">
                  White Card 1
                  Main & Outlined
                </div>
                <div class="col-6">
                  <q-card class="main-card">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content" />
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-6">
                  <q-card class="outline-card">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content" />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row q-col-gutter-md">
                <div class="col-12 text-center">
                  White Card 2 Main & Outlined
                </div>
                <div class="col-6">
                  <q-card class="main-card card-2">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content" />
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-6">
                  <q-card class="outline-card card-2">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content" />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row q-col-gutter-md">
                <div class="col-12 text-center">
                  Grey Card 1
                  Main & Outlined
                </div>
                <div class="col-6">
                  <q-card class="main-card grey-card">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content-white" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content-white" />
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-6">
                  <q-card class="outline-card grey-card">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content-white" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content-white" />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row q-col-gutter-md">
                <div class="col-12 text-center">
                  Grey Card 2 Main & Outlined
                </div>
                <div class="col-6">
                  <q-card class="main-card card-2 grey-card">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content-white" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content-white" />
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-6">
                  <q-card class="outline-card card-2 grey-card">
                    <q-card-section class="q-mb-md">
                      <div class="sample-content-white" />
                    </q-card-section>
                    <q-card-section>
                      <div class="sample-content-white" />
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="row q-col-gutter-md">
                <div class="col-12 text-center">
                  White Scroll Card 1
                  Main & Outlined
                </div>
                <div class="col-6">
                  <q-card class="main-card">
                    <q-scroll-area class="scroll-card">
                      <q-card-section v-for="n in 6"
                                      :key="n"
                                      class="q-mb-md">
                        <div class="sample-content" />
                      </q-card-section>
                    </q-scroll-area>
                  </q-card>
                </div>
                <div class="col-6">
                  <q-card class="outline-card grey-card">
                    <q-scroll-area class="scroll-card">
                      <q-card-section v-for="n in 6"
                                      :key="n"
                                      class="q-mb-md">
                        <div class="sample-content" />
                      </q-card-section>
                    </q-scroll-area>
                  </q-card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card'
}
</script>

<style scoped lang="scss">
.cards-container {
  background-color: $blue-grey-1;
  padding: 30px 60px;
  .sample-content {
    height: 68px;
    background-color: $blue-grey-2;
  }
  .sample-content-white {
    height: 68px;
    background-color: $grey-1;
  }
  .scroll-card {
    height: 200px;
  }
}
</style>
