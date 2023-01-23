<template>
  <div class="upload-information-wrapper">
    <div class="row">
      <div class="col-6 upload-timestamp-col">
        <q-table title="زمان کوب"
                 :rows="rows"
                 :columns="columns"
                 row-key="name"
                 :hide-selected-banner="true"
                 :hide-pagination="false">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="name"
                    :props="props">
                <q-input v-model="props.row.name"
                         filled
                         type="text" />
              </q-td>
              <q-td key="time"
                    :props="props">
                <q-input v-model="props.row.time"
                         filled
                         mask="fulltime"
                         hide-bottom-space>
                  <template v-slot:append>
                    <q-icon name="access_time"
                            class="cursor-pointer">
                      <q-popup-proxy cover
                                     transition-show="scale"
                                     transition-hide="scale">
                        <q-time v-model="props.row.time"
                                with-seconds
                                format24h>
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup
                                   label="Close"
                                   color="primary"
                                   flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-td>
              <q-td key="fat"
                    :props="props">
                <q-btn color="primary"
                       icon="visibility"
                       flat
                       size="sm"
                       @click="onClick" />
                <q-btn color="primary"
                       icon="edit"
                       flat
                       size="sm"
                       @click="onClick" />
                <q-btn color="primary"
                       icon="delete"
                       flat
                       size="sm"
                       @click="onClick" />
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-6 video-box-col">
        <div class="video-box">
          <div class="video-box-title">
            در حال آپلود ...
          </div>
        </div>
        <div class="link-box">
          <div class="link-title">لینک فیلم</div>
          <div class="link-url">office.alaa.tv.18080/c/createset+1897</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UploadTimestamp',
  components: {
  },
  data() {
    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'name',
          required: true,
          label: 'موارد ثبت شده',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'time', align: 'center', label: '', field: 'calories', sortable: true },
        { name: 'fat', label: '', field: 'fat', sortable: true }
      ],
      rows: [
        {
          name: 'حل تست شماره 45',
          time: '10:56:00',
          fat: 6.0
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-information-wrapper {
  overflow-y: auto;
  max-height: 500px;

  .upload-timestamp-col {
    padding: 10px;
  }
  .video-box-col{
    padding: 10px;
    .video-box {
      width: 580px;
      height: 326.25px;
      background: #E9E9E9;
      display: flex;
      align-items: center;
      justify-content: center;

      .video-box-title {
        font-style: normal;
        font-weight: 600;
        font-size: 16px;
        line-height: 25px;
        color: #333333;
      }
    }
    .link-box {
      width: 580px;
      height: 80px;
      background: #F8F8F8;
      padding: 18px 40px;

      .link-title {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #363636;
      }

      .link-url {
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 22px;
        color: #686868;
        cursor: pointer;
      }
    }
  }
}
</style>
