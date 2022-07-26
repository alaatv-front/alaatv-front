<template>
  <av-waveform
    audio-src="https://dls.music-fa.com/tagdl/1401/Morteza%20Pashaei%20-%20Saat%20Naro%20Jolo%20(320).mp3"
  ></av-waveform>
  <q-card style="margin-top: 50px;">
    <div dir="ltr">
      <div class="user-img">
        <q-img width="85px"
               height="85px"
               style="border-radius: 50%;"
               :src="data.user.photo" />
      </div>
    </div>
    <q-card-section class="message-user-info d-flex"
                    style="justify-content: end">
      <div class="d-flex"
           style="margin-top: 33px">
        <span v-if="isUserCustumer"
              style="margin-left: 5px;">
          ماه:
        </span>
        <span v-else>
          {{data.user.role}}
        </span>
        {{data.user.first_name}}
        {{data.user.last_name}}
        <q-icon size="16px"
                name="isax:user"
                style="margin-right: 5px; margin-top: 2px" />
      </div>
    </q-card-section>
    <q-card-section class="message-body">
      <div class="body">
        <div v-html="data.body" />

        <q-img v-if="data.files.photo"
               :src="data.files.photo"
               style="margin: 30px 0"
        />
      </div>
      <q-separator class="q-my-md"></q-separator>
      <q-chip color="blue"
              style="color: #FFFFFF; height: 30px;"
              square>
        {{ makeDateShamsi(data.created_at) }}
      </q-chip>
    </q-card-section>
  </q-card>
</template>

<script>
import moment from 'moment-jalaali'
// import AvBars from 'vue-audio-visual/src/components/AvWaveform.js'
import AvWaveform from 'vue-audio-visual/src/components/AvWaveform'
// import AvWaveform from 'vue-audio-visual'

export default {
  name: 'Messages',
  components: {
    'av-waveform': AvWaveform
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  methods: {
    makeDateShamsi (date) {
      return moment(date, 'YYYY-M-D HH:mm:ss').format('jYYYY/jMM/jDD HH:mm:ss')
    }
  },
  computed: {
    isUserCustumer () {
      return this.data.user.role === 'کاربر'
    }
  }
}
</script>

<style scoped>
.user-img {
  position: absolute;
  margin-left: 30px;
  top: -40px;
  border-radius: 50%;
  box-shadow: 0px 1px 15px 1px rgba(69, 65, 78, 0.25);
}
 .d-flex {
   display: flex !important;
 }
 .message-user-info {
 }
 .message-body {
   padding-top: 0;
 }
</style>
