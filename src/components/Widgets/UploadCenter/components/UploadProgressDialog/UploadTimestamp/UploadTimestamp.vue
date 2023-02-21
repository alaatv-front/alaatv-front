<template>
  <div class="upload-information-wrapper">
    <div class="row">
      <div class="col-6 upload-timestamp-col">
        <q-table title="زمان کوب"
                 :rows="rows"
                 :columns="columns"
                 row-key="title"
                 flat
                 :hide-selected-banner="true"
                 :hide-pagination="false">
          <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="title"
                    :props="props">
                <q-input v-model="props.row.title"
                         filled
                         placeholder="عنوان"
                         :disable="rows.indexOf(props.row) !== activeIndex"
                         type="text"
                         hide-bottom-space />
              </q-td>
              <q-td key="time"
                    :props="props">
                <q-input v-model="props.row.time"
                         filled
                         type="text"
                         :disable="rows.indexOf(props.row) !== activeIndex"
                         mask="fulltime"
                         placeholder="00:00:00"
                         hide-bottom-space
                         @update:model-value="setTimestamp($event)" />
              </q-td>
              <q-td key="action"
                    :props="props">
                <q-btn v-if="props.row.action !== 'saved'"
                       color="primary"
                       label="تایید"
                       :disable="rows.indexOf(props.row) !== activeIndex || (!props.row.title && !props.row.time)"
                       @click="saveTimestamp(props.row)" />
                <div v-else
                     class="action-box flex justify-around items-center">
                  <q-btn color="primary"
                         icon="visibility"
                         flat
                         size="sm"
                         @click="setTimestamp(props.row.time)" />
                  <q-btn color="primary"
                         icon="edit"
                         flat
                         size="sm"
                         @click="editTimestamp(props.row)" />
                  <q-btn color="primary"
                         icon="delete"
                         flat
                         size="sm"
                         @click="removeTimestamp(props.row)" />
                </div>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </div>
      <div class="col-6 video-box-col">
        <div class="reuse">
          <q-btn color="primary"
                 label="استفاده مجدد مشخصات"
                 flat=""
                 @click="toggleDialog()" />
          <previous-item-dialog v-model:dialog="pervDialog" />
        </div>
        <div class="video-box">
          <div class="video-box-title" />
          <video-player class="video"
                        :source="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'"
                        :current-time="currentTime"
                        @seeked="getTimestamp($event)" />
          <!--          <video-player :source="'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8'" />-->
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
import PreviousItemDialog from '../PreviousItemsDialog/PreviousItemDialog.vue'
import VideoPlayer from 'src/components/ContentVideoPlayer.vue'
import { PlayerSourceList } from 'src/models/PlayerSource.js'

export default {
  name: 'UploadTimestamp',
  components: {
    PreviousItemDialog,
    VideoPlayer
  },
  props: {
    content: Object,
    default: () => {}
  },
  emits: ['refreshContent'],
  data() {
    return {
      pervDialog: false,
      currentTime: null,
      time: {
        hours: '',
        minutes: '',
        seconds: ''
      },
      timestampForm: {
        content_id: 0,
        title: '',
        time: 0
      },
      activeIndex: 0,
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 5
        // rowsNumber: xx if getting data from a server
      },
      columns: [
        {
          name: 'title',
          required: true,
          label: 'موارد ثبت شده',
          align: 'left',
          field: row => row.title,
          format: val => `${val}`,
          sortable: false
        },
        { name: 'time', align: 'center', label: '', field: 'time', sortable: false },
        { name: 'action', label: '', field: 'action', sortable: false }
      ],
      rows: []
    }
  },
  mounted() {
    this.loadTimestamps()
  },
  methods: {
    loadTimestamps() {
      this.content.timepoints.list.forEach(element => {
        this.getTimestamp(element.time, false)
        const timestamp = {
          id: element.id,
          title: element.title,
          time: `${this.time.hours + ':' + this.time.minutes + ':' + this.time.seconds}`,
          action: 'saved'
        }
        this.rows.push(timestamp)
      })
      this.rows.push({
        id: this.rows.length + 1,
        title: '',
        time: '',
        action: 'add'
      })
      this.activeIndex = this.rows.length - 1
    },
    videoSource() {
      return new PlayerSourceList(this.content.file.video)
    },
    removeTimestamp(row) {
      this.rows = this.rows.filter(x => x.id !== row.id)
      this.activeIndex = this.rows.length - 1
    },
    editTimestamp(row) {
      const index = this.rows.indexOf(row)
      this.activeIndex = index
      this.toggleAction(index, 'edit')
    },
    saveTimestamp(row) {
      const index = this.rows.indexOf(row)
      const action = row.action
      this.rows.splice(index, 1, row)
      const timestampForm = {
        content_id: 37920,
        title: row.title,
        time: (Number(this.time.hours) * 3600) + (Number(this.time.minutes) * 60) + Number(this.time.seconds)
      }
      this.$apiGateway.content.SetTimestamp({ data: timestampForm }).then(res => {
        this.rows[index].time = `${this.time.hours + ':' + this.time.minutes + ':' + this.time.seconds}`
        this.toggleAction(index, 'saved')
        this.activeIndex = this.rows.length - 1
        if (action === 'add') {
          const last = {
            id: this.rows.length + 1,
            title: '',
            time: `${this.time.hours + ':' + this.time.minutes + ':' + this.time.seconds}`,
            action: 'add'
          }
          this.rows.push(last)
          this.activeIndex = this.rows.length - 1
          this.$emit('refreshContent')
        }
      }).catch(err => {
        alert(err)
      })
    },
    toggleAction(index, action) {
      this.rows[index].action = action
    },
    getTimestamp(time, setActive = true) {
      const hours = Math.floor(time / 3600)
      const minutes = Math.floor(time / 60)
      const seconds = time % 60
      this.time.hours = hours < 10 ? '0' + hours : hours
      this.time.minutes = minutes < 10 ? '0' + minutes : minutes
      this.time.seconds = seconds < 10 ? '0' + seconds : seconds
      if (setActive) {
        this.rows[this.activeIndex].time = `${this.time.hours + ':' + this.time.minutes + ':' + this.time.seconds}`
      }
    },
    setTimestamp(time) {
      this.currentTime = (Number(time.split(':')[0]) * 3600) + (Number(time.split(':')[1]) * 60) + Number(time.split(':')[2])
    },
    toggleDialog() {
      this.pervDialog = !this.pervDialog
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-information-wrapper {
  overflow-y: auto;
  max-height: 550px;

  .upload-timestamp-col {
    padding: 10px;

    &:deep(.action-box) {
      min-width: 100px;
    }
  }
  .video-box-col{
    padding: 10px;
    .reuse {
      float: right;
    }
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

      .video {
        width: 100%;
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
