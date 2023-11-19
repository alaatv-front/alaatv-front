<template>
  <q-card class="SelectShahrWithOrderCard">
    <q-card-section class="header-section">
      <div class="title">
        <q-icon name="check_circle_outline"
                size="24px" />
        <span class="title-string" />
        انتخاب شهر و استان
      </div>
      <div>
        <q-btn v-close-popup
               flat
               icon="close" />
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section v-if="loading"
                    class="body-section">
      <q-skeleton type="rect"
                  width="100%"
                  height="50px" />
    </q-card-section>
    <q-card-section v-else
                    class="body-section">
      <div class="shahr-selector">
        <div class="field ostan-column">
          <div class="title">
            استان
          </div>
          <q-select v-model="selectedOstan"
                    :options="ostanOptions"
                    emit-value
                    map-options
                    option-label="title"
                    option-value="id" />
        </div>
        <div class="field shahr-column">
          <div class="title">
            شهر
          </div>
          <q-select v-model="selectedShahr"
                    :options="shahrOptions"
                    emit-value
                    map-options
                    option-label="title"
                    option-value="id" />
        </div>
        <div class="field btn-column">
          <div class="title" />
          <q-btn icon="add"
                 color="primary"
                 @click="onAddItem" />
        </div>
      </div>
      <div class="selected-preview q-mb-xl">
        <div class="header-title">
          انتخاب شده ها (به ترتیب اولویت)
        </div>
        <div class="selected-items">
          <div v-for="(item, itemIndex) in selectedItems"
               :key="itemIndex"
               class="selected-item">
            <div class="selected-item-reorder-action">
              <q-btn v-if="itemIndex > 0"
                     icon="keyboard_arrow_up"
                     rounded
                     flat
                     @click="addOrder(itemIndex)" />
              <q-btn v-if="itemIndex < selectedItems.length - 1"
                     icon="keyboard_arrow_down"
                     rounded
                     flat
                     @click="downgradeOrder(itemIndex)" />
            </div>
            <div class="selected-item-order">
              {{ itemIndex + 1 }}
            </div>
            <div class="selected-item-title">
              <template v-if="item.ostan">
                {{ item.ostan.title }}
              </template>
              -
              <template v-if="item.shahr">
                {{ item.shahr.title }}
              </template>
            </div>
            <div class="selected-item-delete-action">
              <q-btn icon="isax:trash"
                     rounded
                     flat
                     @click="removeItem(itemIndex)" />
            </div>
          </div>
        </div>
      </div>
      <div class="action-section">
        <q-btn v-close-popup
               class="cancel-btn"
               outline
               @click="onCancel">
          انصراف
        </q-btn>
        <q-btn v-close-popup
               class="accept-btn"
               @click="onAccept">
          تایید
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { APIGateway } from 'src/api/APIGateway.js'

export default {
  name: 'SelectShahrWithOrderCard',
  props: {
    selecteds: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:selected', 'onAccept', 'onCancel'],
  data () {
    return {
      loading: false,
      selectedItems: [],
      selectedOstan: null,
      selectedShahr: null,
      ostanOptions: [],
      cities: []
    }
  },
  computed: {
    localSelected: {
      get () {
        return this.selected
      },
      set (newValue) {
        this.$emit('update:selected', newValue)
      }
    },
    shahrOptions () {
      return this.cities.filter(city => city.province.id === this.selectedOstan)
    }
  },
  watch: {
    selectedOstan () {
      this.selectedShahr = null
    }
  },
  mounted () {
    this.getProvincesAndCities()
  },
  methods: {
    getProvincesAndCities () {
      this.loading = true
      APIGateway.user.formData()
        .then((formData) => {
          this.loading = false
          this.ostanOptions = formData.provinces
          this.cities = formData.cities
          this.loadList()
        })
        .catch(() => {
          this.loading = false
        })
    },
    loadList () {
      this.selecteds.forEach(item => {
        const shahrObject = this.cities.find(city => city.id === item.id)
        if (!shahrObject.id) {
          return
        }
        const ostanObject = shahrObject.province
        this.addItem(ostanObject, shahrObject)
      })
    },
    onAddItem () {
      const ostanObject = this.ostanOptions.find(item => item.id === this.selectedOstan)
      const shahrObject = this.cities.find(item => item.id === this.selectedShahr)
      if (!shahrObject.id) {
        return
      }
      this.addItem(ostanObject, shahrObject)
    },
    addItem (ostanObject, shahrObject) {
      const oldItem = this.selectedItems.find(item => item.shahr.id === shahrObject.id)
      if (oldItem) {
        return
      }
      this.selectedItems.push({
        ostan: ostanObject,
        shahr: shahrObject
      })
      // this.updateSelected()
    },
    removeItem (index) {
      this.selectedItems.splice(index, 1)
      // this.updateSelected()
    },
    addOrder (index) {
      this.selectedItems.splice(index - 1, 0, this.selectedItems.splice(index, 1)[0])
      // this.updateSelected()
    },
    downgradeOrder (index) {
      this.selectedItems.splice(index + 1, 0, this.selectedItems.splice(index, 1)[0])
      // this.updateSelected()
    },
    updateSelected () {
      this.$emit('update:selecteds', this.selectedItems.map((item, itemIndex) => {
        return {
          id: item.shahr.id,
          order: itemIndex + 1
        }
      }))
    },
    onAccept () {
      this.updateSelected()
      this.$emit('onAccept')
    },
    onCancel () {
      this.$emit('onCancel')
    }
  }
}
</script>

<style lang="scss" scoped>
.SelectShahrWithOrderCard {
  .header-section {
    display: flex;
    flex-flow: row;
    justify-content: space-between;
    align-items: center;
    padding: 12px 20px;

    .title {
      .q-icon {
        color: #09AC73;
      }

      .title-string {
        color: #424242;
        font-size: 16px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.32px;
      }
    }
  }

  .body-section {
    padding: 24px 20px 20px;

    .shahr-selector {
      display: flex;
      flex-flow: row;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 32px;

      .ostan-column,
      .shahr-column {
        padding-right: 16px;
        width: calc( 50% - 25px );
      }

      .btn-column {
        width: 50px;
      }
    }

    .field {
      .title {
        color: #424242;
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.32px;
        margin-bottom: 8px;
        height: 27px;
      }

      .q-select {

      }
    }

    .selected-preview {
      .header-title {
        color: #757575;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.28px;
        margin-bottom: 16px;
      }

      .selected-items {
        .selected-item {
          border-radius: 6px;
          background: #F5F5F5;
          padding: 8px;
          height: 32px;
          display: flex;
          flex-flow: row;
          justify-content: flex-start;
          align-items: center;
          margin-bottom: 8px;

          :deep(.q-btn) {
            width: 16px;
            height: 16px;

            .q-icon {
              font-size: 16px;
              color: #9E9E9E;
            }
          }

          .selected-item-reorder-action {
            width: 38px;

            .q-btn:first-child {
              margin-right: 6px;
            }
          }

          .selected-item-order {
            text-align: center;
            width: 56px;
            color: #424242;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.28px;
          }

          .selected-item-title {
            width: calc( 100% - 110px );
            color: #424242;
            font-size: 14px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.28px;
          }

          .selected-item-delete-action {
            width: 16px;
          }
        }
      }
    }

    .action-section {
      display: flex;
      flex-flow: row;
      justify-content: flex-end;

      .q-btn.accept-btn {
        width: 96px;
        background: #09AC73 !important;
        color: white;
      }

      .cancel-btn {
        margin-right: 6px;
        width: 96px;
        color: #424242;
        font-size: 14px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.28px;

        &::before {
          border: 1px solid #E0E0E0;
        }
      }
    }
  }

  .title-text {
    color: #424242;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    letter-spacing: -0.36px;
  }

  .content-text {
    color: #424242;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.28px;
  }

  .caption-text {
    color: #9E9E9E;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.24px;
  }

  .state-photo {
    width: 200px;
    height: 200px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 64px;
  }

  :deep(.q-field) {
    .q-field__inner {
      .q-field__control {
        .q-field__append {
          .q-icon {
            color: #9E9E9E;
          }
        }
      }
    }
  }

  :deep(.q-field) {
    border-radius: 8px;

    .q-field__inner {
      .q-field__control {
        padding: 0;

        &::before {
          border: 1.5px solid #E0E0E0;
        }

        .q-field__control-container {
          .q-field__native {
            padding: 9px 16px 10px;
            font-size: 14px;
          }
        }
      }
    }
  }

  .q-btn:not(.accept-btn) {
    color: #424242 !important;
  }

  .q-radio {
    .q-radio__inner--truthy {
      color: #4DB6AC !important;
    }
  }

  .q-checkbox {
    .q-checkbox__inner {
      .q-checkbox__bg {
        color: #4DB6AC !important;
      }

      &.q-checkbox__inner--truthy {
        .q-checkbox__bg {
          background: #4DB6AC !important;
          border-color: #4DB6AC !important;
        }
      }
    }
  }

  .q-banner {
    border-radius: 6px;
    border-width: 1px;
    border-style: solid;
    color: #424242;

    .q-banner__avatar {
      margin: 8px 4px;
    }

    &.bg-success {
      border-color: #9DDEC7;
      background: #E6F7F1;

      .q-icon {
        color: #09AC73;
      }
    }
  }
}
</style>
