<template>
  <div class="news-page">
    ff
  </div>
</template>

<script>
export default {
  name: 'ChatreNejatContent',
  components: {},
  data() {
    return {}
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.news-page {
  padding: 0 60px;
  background: white;
  @media screen and (max-width: 1904px) {
    padding: 0 21px;
  }
  @media screen and (max-width: 1264px) {
    padding: 0 11px;
  }
  @media screen and (max-width: 960px) {
    padding: 0 6px;
  }

  .news-part {
    margin-left: 9px;
    @media screen and (max-width: 1904px) {
      margin-left: -4px;
    }
    @media screen and (max-width: 1264px) {
      margin-left: 0;
    }

    .news-top {
      padding-bottom: 0 !important;

      .news-header {
        align-items: center;

        .news-filter {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          @media screen and (max-width: 960px) {
            flex-direction: column !important;
          }

          .news-title {
            font-size: 20px;
            font-weight: 500;
            color: #3e5480;
            @media screen and (max-width: 960px) {
              font-size: 16px !important;
              text-align: center;
            }
          }

          .filter-select {
            display: flex;
            flex-direction: row;
            margin-bottom: 21px;
            @media screen and (max-width: 960px) {
              justify-content: space-between !important;
              margin-bottom: 25px;
            }
            @media screen and (max-width: 575px) {
              margin-bottom: 20px;
            }

            .filter-default {
              width: 119px;
              height: 48px;
              color: #3e5480;
              font-size: 16px;
              font-weight: 500;
              border-radius: 10px;
              margin-right: 16px;
              justify-content: space-between;
              @media screen and (max-width: 1264px) {
                height: 40px !important;
              }
              @media screen and (max-width: 960px) {
                width: 100px !important;
                height: 36px;
                font-size: 14px !important;
              }
              @media screen and (max-width: 768px) {
                width: 100px !important;
              }

              &.filter-button {
                background-color: #eff3ff;
              }

              &.filter-clicked {
                border: solid 4px #eff3ff;
                box-sizing: border-box;
                background-color: #ffffff;
              }

              .fi {
                font-size: 16px;
                font-weight: 500;
              }
            }

            .order-parent {
              width: 165px;
              &:deep(.q-field__native ){
                span{
                  color: var(--abrishamMain);
                }

              }
              @media screen and (max-width: 768px) {
                width: 134px !important;
              }
              @media screen and (max-width: 575px) {
                width: 152px !important;
              }

              .order {
                border-radius: 10px;
              }
            }
          }
        }
      }

      .filter-list {
        display: flex;
        flex-direction: row;
        margin-bottom: 20px;
        @media screen and (max-width: 960px) {
          justify-content: space-between;
          margin-bottom: 16px;
        }

        .lesson-parent {
          width: 55%;
          .lesson {
            margin-right: 16px;
            border-radius: 10px;
          }
        }

        .category-parent {
          width: 245px;

          .category {
            border-radius: 10px;
          }
        }
      }
    }

    .news-bottom {
      padding-top: 0 !important;
      .no-news{
        font-weight: 500;
        font-size: 18px;
        margin-bottom: 20px;
      }
    }
  }

  .banner-col {
    padding-bottom: 0 !important;

    .banner-part {
      display: flex;
      flex-direction: column;
      @media screen and (max-width: 1264px) {
        display: grid;
        grid-template-rows: auto;
        overflow: hidden;
      }

      .banner {
        margin-bottom: 20px;
        @media screen and (max-width: 1264px) {
          margin-bottom: 5px !important;
          overflow-x: scroll;
          overflow-y: hidden;
          display: flex;
          grid-row-start: 2;
        }
        @media screen and (max-width: 960px) {
          margin-bottom: 0 !important;
        }
        @media screen and (max-width: 600px) {
          margin-bottom: 0 !important;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.news-page {
  .news-part {
    .news-header {
      .mdi-chevron-down {
        &:before {
          color: #3e5480;
        }
      }

      .v-select {
        &.v-input--dense {
          .v-select__selection--comma {
            color: #3e5480;
            font-size: 16px;
            font-weight: 500;
          }
        }
      }

      .v-text-field {
        &.v-text-field--solo {
          &.v-input--dense {
            > {
              .v-input__control {
                min-height: 48px !important;
                @media screen and (max-width: 1264px) {
                  min-height: 40px !important;
                }
                @media screen and (max-width: 768px) {
                  min-height: 36px !important;
                }
              }
            }
          }
        }
      }
    }

    .theme--light {
      &.v-label {
        color: #3e5480;
        font-size: 16px;
        font-weight: 500;
        @media screen and (max-width: 768px) {
          font-size: 14px;
        }
      }

      &.v-icon {
        color: #3e5480;
      }
    }
  }
}

.v-menu__content {
  border-radius: 0 0 20px 20px;
}
</style>
