<template>
  <q-item v-ripple
          class="ProductItem"
          tag="label">
    <q-item-section side
                    top>
      <q-radio v-model="localSelected"
               :val="value" />
    </q-item-section>

    <q-item-section>
      <q-item-label>
        {{ label }}
      </q-item-label>
    </q-item-section>

    <q-item-section class="more-info">
      <div class="items"
           :class="{'has-many': items.length > 1}">
        <div v-for="(item, itemIndex) in items"
             :key="itemIndex"
             class="item"
             :class="{'disable': !item.enable}">
          <div class="caption"
               :class="{'empty': !item.caption}">
            {{ item.caption }}
          </div>
          <div class="price-and-detail">
            <div class="detail">
              {{ item.detail }}
            </div>
            <div class="price">
              <div v-if="item.value"
                   class="value">
                {{ item.value }}
              </div>
              <div v-if="item.unit"
                   class="unit">
                {{ item.unit }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-item-section>
  </q-item>
</template>

<script>
// import { APIGateway } from 'src/api/APIGateway.js'
export default {
  name: 'ProductItem',
  props: {
    selected: {
      type: Number,
      default: null
    },
    value: {
      type: Number,
      default: null
    },
    label: {
      type: String,
      default: ''
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:selected'],
  data () {
    return {

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
    }
  },
  mounted () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.ProductItem {
  border-radius: 10px;
  background: #FFF;
  box-shadow: -2px 2px 3px 0 rgb(16 24 40 / 6%);
  flex-wrap: wrap;
  padding-right: 16px;
  padding-left: 16px;
  padding-bottom: 21px;

  .more-info {
    max-width: 100%;
    min-width: 100%;
    margin: 0;

    .items {
      &.has-many {
        .item {
          position: relative;

          &::after {
            position: absolute;
            content: ' ';
            right: 47px;
            height: 12px;
            bottom: -12px;
            border: dashed 1px #BDBDBD;
          }

          &:last-child {
            &::after {
              display: none;
            }
          }
        }
      }

      .item {
        display: flex;
        flex-flow: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;

        &:last-child {
          margin-bottom: 0;
        }

        &.disable {
          .price-and-detail {
            .price {
              .value {
                color: #9E9E9E;
              }

              .unit {
                color: #9E9E9E;
              }
            }

            .detail {
              color: #9E9E9E;
            }
          }

          .caption {
            color: #9E9E9E;
          }
        }

        .price-and-detail {
          display: flex;
          flex-flow: row;
          justify-content: flex-end;
          align-items: center;

          .price {
            display: flex;
            flex-flow: row;
            justify-content: flex-end;
            align-items: center;
            width: 100px;

            .value {
              font-size: 18px;
              font-style: normal;
              font-weight: 600;
              line-height: normal;
              letter-spacing: -0.36px;
              color: #424242;
            }

            .unit {
              margin-left: 4px;
              font-size: 10px;
              font-style: normal;
              font-weight: 400;
              line-height: normal;
              letter-spacing: -0.2px;
              color: #616161;
            }
          }

          .detail {
            font-size: 10px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
            letter-spacing: -0.2px;
            margin-right: 14px;
            color: #424242;
          }
        }

        .caption {
          padding: 4px;
          border-radius: 6px;
          background: #EEE;
          font-size: 12px;
          font-style: normal;
          font-weight: 400;
          line-height: normal;
          letter-spacing: -0.24px;
          color: #616161;

          &.empty {
            background: transparent;
          }
        }
      }
    }
  }
}
</style>
