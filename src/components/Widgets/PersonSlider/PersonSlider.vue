<template>
  <q-virtual-scroll v-if="localOptions.sliderItems"
                    ref="virtualScroll"
                    v-slot="{ item, index }"
                    :items="localOptions.sliderItems"
                    class="student-scroll-bar"
                    virtual-scroll-horizontal>
    <q-card :key="index"
            class="scroll-item-card">
      <q-img :src="`https://nodes.alaatv.com/upload/landing/110/Rotbeh/${item.code}.png`"
             width="160px"
             height="160px"
             spinner-color="primary"
             class="student-img"
             spinner-size="82px">
        <div class="student-major"
             :class="{'riazi': item.major === 'ریاضی', 'tajrobi': item.major === 'تجربی'}">
          {{ item.major }}
        </div>
      </q-img>
      <q-card-section class="person-name-card-section">
        <div class="student-name ellipsis-2-lines">{{ item.first_name + ' ' + item.last_name }}</div>
      </q-card-section>
      <q-card-section class="person-info-card-section">
        <div class="student-info">
          <div class="rank">
            {{ item.rank }}
          </div>
          <div class="region">
            {{ item.distraction === '1' ? 'منطقه یک' : item.distraction === '2' ? 'منطقه دو' : item.distraction === '3' ? 'منطقه سه' : item.distraction}}
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-virtual-scroll>
  <div v-else
       class="loading">
    ...
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'PersonSlider',
  mixins: [mixinWidget],
  data() {
    return {
      rows: [
        {
          id: 1,
          code: 'S0',
          rank: '1',
          first_name: 'کیارش',
          last_name: 'شیخی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: 'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S0.png'
        }, {
          id: 2,
          code: 'S1',
          rank: 3,
          first_name: 'فریدون',
          last_name: 'صلح جو',
          major: 'ریاضی',
          distraction: 'سهمیه',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: 'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S1.png'
        }, {
          id: 3,
          code: 'S2',
          rank: 4,
          first_name: 'امیر محمد',
          last_name: 'رشیدی احمد آبادی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: 'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S2.png'
        }, {
          id: 4,
          code: 'S3',
          rank: 5,
          first_name: 'فاطمه',
          last_name: 'قهاری',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: 'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S3.png'
        }, {
          id: 5,
          code: 'S4',
          rank: 7,
          first_name: 'سید علی',
          last_name: 'الشریعتی',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: 'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S4.png'
        }, {
          id: 6,
          code: 'S5',
          rank: 11,
          first_name: 'سعید ',
          last_name: 'قربعلی',
          major: 'ریاضی',
          distraction: 'سهمیه ',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 7,
          code: 'S6',
          rank: 16,
          first_name: 'محمد مهدی',
          last_name: 'حاجی رحیم کاشی',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 8,
          code: 'S7',
          rank: 16,
          first_name: 'محمد مهدی',
          last_name: 'صالحی مورکانی',
          major: 'انسانی',
          distraction: 'سهمیه',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 9,
          code: 'S8',
          rank: 28,
          first_name: 'امیررضا',
          last_name: 'سعیدی',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 10,
          code: 'S9',
          rank: 30,
          first_name: 'محمد مهدی',
          last_name: 'زارعی',
          major: 'انسانی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 11,
          code: 'S10',
          rank: 34,
          first_name: 'مهیار',
          last_name: 'اسماعیلی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 12,
          code: 'S11',
          rank: 36,
          first_name: 'یگانه',
          last_name: 'حاتم پورجزی',
          major: 'ریاضی',
          distraction: 'سهمیه',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 13,
          code: 'S12',
          rank: 37,
          first_name: 'صهیب',
          last_name: 'جوهری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 14,
          code: 'S13',
          rank: 40,
          first_name: 'کسری',
          last_name: 'کاظمی',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 15,
          code: 'S14',
          rank: 44,
          first_name: 'آریا',
          last_name: 'مختاری ورنوسفادرانی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 16,
          code: 'S15',
          rank: 45,
          first_name: 'پریسا ',
          last_name: 'یحیی پور فتیده',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 17,
          code: 'S16',
          rank: 54,
          first_name: 'محمد',
          last_name: 'اسکندری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 18,
          code: 'S17',
          rank: 56,
          first_name: 'یوسف',
          last_name: 'سدیدی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 19,
          code: 'S18',
          rank: 58,
          first_name: 'صبا',
          last_name: 'عفتی داریانی',
          major: 'ریاضی',
          distraction: 'سهمیه ',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 20,
          code: 'S19',
          rank: 69,
          first_name: 'علیرضا',
          last_name: 'رجائی نجف آبادی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 21,
          code: 'S20',
          rank: 70,
          first_name: 'علیرضا',
          last_name: 'مختاری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 22,
          code: 'S21',
          rank: 77,
          first_name: 'سعید ',
          last_name: 'ملائی یلی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 23,
          code: 'S22',
          rank: 79,
          first_name: 'فاطمه ',
          last_name: 'خواجه وند کاجی',
          major: 'انسانی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: ''
        }, {
          id: 24,
          code: 'S23',
          rank: 97,
          first_name: 'بنیامین',
          last_name: 'کاربخش',
          major: 'انسانی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 25,
          code: 'S24',
          rank: 123,
          first_name: 'آرین',
          last_name: 'شعبانی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 26,
          code: 'S25',
          rank: 125,
          first_name: 'فاطمه',
          last_name: 'میرزایی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 27,
          code: 'S26',
          rank: 128,
          first_name: 'محمد حسین',
          last_name: 'جعفری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 28,
          code: 'S27',
          rank: 179,
          first_name: 'آرش',
          last_name: 'اسلامی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 29,
          code: 'S28',
          rank: 188,
          first_name: 'حسن ',
          last_name: 'کشتکار',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 30,
          code: 'S29',
          rank: 192,
          first_name: 'فاطمه السادات',
          last_name: 'میر ابوطالبی',
          major: 'انسانی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 31,
          code: 'S30',
          rank: 209,
          first_name: 'محمد عرفان',
          last_name: 'کلماتیان',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 32,
          code: 'S31',
          rank: 209,
          first_name: 'آرش',
          last_name: 'زمانی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 33,
          code: 'S32',
          rank: 217,
          first_name: 'نگار',
          last_name: 'خزائلی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 34,
          code: 'S33',
          rank: 234,
          first_name: 'محسن',
          last_name: 'اسماعیلی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 35,
          code: 'S34',
          rank: 263,
          first_name: 'علی',
          last_name: 'امانی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 36,
          code: 'S35',
          rank: 273,
          first_name: 'محمد رضا',
          last_name: 'رضایی تفتی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 37,
          code: 'S36',
          rank: 280,
          first_name: 'حسین',
          last_name: 'حسین زاده',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 38,
          code: 'S37',
          rank: 281,
          first_name: 'طاها',
          last_name: 'صحرایی دمیرچی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 39,
          code: 'S38',
          rank: 281,
          first_name: 'امیررضا',
          last_name: 'سلیمانی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 40,
          code: 'S39',
          rank: 285,
          first_name: 'مهدی',
          last_name: 'چشم براه',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 41,
          code: 'S40',
          rank: 305,
          first_name: 'مریم',
          last_name: 'تقی پور کازرونی',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 42,
          code: 'S41',
          rank: 308,
          first_name: 'محمد حسین',
          last_name: 'حسینیان اصفهانی',
          major: 'انسانی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 43,
          code: 'S42',
          rank: 325,
          first_name: 'امیر رضا',
          last_name: 'شهرکی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 44,
          code: 'S43',
          rank: 328,
          first_name: 'امیر',
          last_name: 'همایون زاده',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 45,
          code: 'S44',
          rank: 332,
          first_name: 'سجاد',
          last_name: 'یعقوبی',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 46,
          code: 'S45',
          rank: 346,
          first_name: 'محمد رضا',
          last_name: 'محمد لو',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 47,
          code: 'S46',
          rank: 368,
          first_name: 'محمد سعید',
          last_name: 'یاری',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 48,
          code: 'S47',
          rank: 368,
          first_name: 'رضا',
          last_name: 'مرادی راد',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 49,
          code: 'S48',
          rank: 370,
          first_name: 'امید',
          last_name: 'خدادادی',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 50,
          code: 'S49',
          rank: 371,
          first_name: 'حامد',
          last_name: 'فرجی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 51,
          code: 'S50',
          rank: 373,
          first_name: 'محمد رضا',
          last_name: 'نشاطی پیربرج',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 52,
          code: 'S51',
          rank: 378,
          first_name: 'فاطمه',
          last_name: 'مهدی چهلخانه',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 53,
          code: 'S52',
          rank: 385,
          first_name: 'امیررضا',
          last_name: 'محمد باقری',
          major: 'تجربی',
          distraction: 'سهمیه',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 54,
          code: 'S53',
          rank: 400,
          first_name: 'آرین',
          last_name: 'سلیمی',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 55,
          code: 'S54',
          rank: 409,
          first_name: 'فاطمه',
          last_name: 'نوروزی چم یوسفعلی',
          major: 'انسانی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 56,
          code: 'S55',
          rank: 419,
          first_name: 'علی',
          last_name: 'بوغنیمه',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 57,
          code: 'S56',
          rank: 437,
          first_name: 'سارینا',
          last_name: 'کریمی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 58,
          code: 'S57',
          rank: 450,
          first_name: 'محسن',
          last_name: 'زارع زاده',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 59,
          code: 'S58',
          rank: 464,
          first_name: 'کیان',
          last_name: 'غلام زاده',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 60,
          code: 'S59',
          rank: 469,
          first_name: 'علیرضا',
          last_name: 'سعیدی نجات',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 61,
          code: 'S60',
          rank: 479,
          first_name: 'امیر محمد',
          last_name: 'عبدالملکی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 62,
          code: 'S61',
          rank: 483,
          first_name: 'محسن',
          last_name: 'تفک',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 63,
          code: 'S62',
          rank: 495,
          first_name: 'مهرانه',
          last_name: 'خسروی',
          major: 'انسانی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 64,
          code: 'S63',
          rank: 499,
          first_name: 'امیر حسین',
          last_name: 'رجبی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 66,
          code: 'S65',
          rank: 534,
          first_name: 'مهدی',
          last_name: 'عبدالملکی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 67,
          code: 'S66',
          rank: 535,
          first_name: 'حسین',
          last_name: 'قمی',
          major: 'ریاضی',
          distraction: 'سهمیه ',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 68,
          code: 'S67',
          rank: 538,
          first_name: 'محمد',
          last_name: 'پیرزاده',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 69,
          code: 'S68',
          rank: 553,
          first_name: 'مهدی',
          last_name: 'خیبری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 70,
          code: 'S69',
          rank: 558,
          first_name: 'عرفان',
          last_name: 'فاضلی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 71,
          code: 'S70',
          rank: 563,
          first_name: 'مدیا',
          last_name: 'وکیلباشی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 73,
          code: 'S72',
          rank: 629,
          first_name: 'زهرا',
          last_name: 'عادل پور',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 74,
          code: 'S73',
          rank: 672,
          first_name: 'محمد امین',
          last_name: 'غلامی علم',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 75,
          code: 'S74',
          rank: 677,
          first_name: 'عرفان',
          last_name: 'قاسمی',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 76,
          code: 'S75',
          rank: 699,
          first_name: 'امیرحسین',
          last_name: 'صالحی',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 77,
          code: 'S76',
          rank: 714,
          first_name: 'حامد',
          last_name: 'یحیائیان',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 78,
          code: 'S77',
          rank: 717,
          first_name: 'علی',
          last_name: 'فرشباف محجوب',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 79,
          code: 'S78',
          rank: 727,
          first_name: 'کسری',
          last_name: 'عطایی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 80,
          code: 'S79',
          rank: 736,
          first_name: 'محمد حسین',
          last_name: 'آقاپور خوئی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 81,
          code: 'S80',
          rank: 740,
          first_name: 'محمد امین',
          last_name: 'محمدیون شبستری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 82,
          code: 'S81',
          rank: 747,
          first_name: 'امید رضا',
          last_name: 'صادقی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 83,
          code: 'S82',
          rank: 757,
          first_name: 'سارا',
          last_name: 'غضنفری',
          major: 'تجربی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 84,
          code: 'S83',
          rank: 760,
          first_name: 'آرمان',
          last_name: 'بهزاد',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 85,
          code: 'S84',
          rank: 792,
          first_name: 'امیر محمد',
          last_name: 'خالقی فر',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 86,
          code: 'S85',
          rank: 794,
          first_name: 'علی اصغر',
          last_name: 'اصغرپور',
          major: 'ریاضی',
          distraction: 'سهمیه',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 87,
          code: 'S86',
          rank: 802,
          first_name: 'محمد صالح',
          last_name: 'صدیقی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 88,
          code: 'S87',
          rank: 814,
          first_name: 'سید علی',
          last_name: 'طاهری پور',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 89,
          code: 'S88',
          rank: 828,
          first_name: 'علی',
          last_name: 'توکلی',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null,
          image: ''
        }, {
          id: 90,
          code: 'S89',
          rank: 841,
          first_name: 'علی',
          last_name: 'اشکوری',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 91,
          code: 'S90',
          rank: 855,
          first_name: 'امیر حسین',
          last_name: 'حاجی هاشمی ورنوسفادرانی',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 92,
          code: 'S91',
          rank: 855,
          first_name: 'احمد',
          last_name: 'سوری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 93,
          code: 'S92',
          rank: 876,
          first_name: 'علی',
          last_name: 'اصلانی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 94,
          code: 'S93',
          rank: 876,
          first_name: 'مهدی',
          last_name: 'قربانی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 95,
          code: 'S94',
          rank: 879,
          first_name: 'فاطمه',
          last_name: 'ندافی قهنویه',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 96,
          code: 'S95',
          rank: 894,
          first_name: 'رویا ',
          last_name: 'گرزالدین',
          major: 'انسانی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 97,
          code: 'S96',
          rank: 898,
          first_name: 'علیرضا',
          last_name: 'ناصری بازیاری',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 98,
          code: 'S97',
          rank: 902,
          first_name: 'عرفان',
          last_name: 'حدیدی',
          major: 'انسانی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 99,
          code: 'S98',
          rank: 914,
          first_name: 'مبینا',
          last_name: 'کوسه غراوی',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 100,
          code: 'S99',
          rank: 928,
          first_name: 'امیرحسین',
          last_name: 'کدیور جلیانی',
          major: 'ریاضی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 101,
          code: 'S100',
          rank: 938,
          first_name: 'امیررضا',
          last_name: 'اصغرزاده',
          major: 'ریاضی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 102,
          code: 'S101',
          rank: 951,
          first_name: 'علیرضا',
          last_name: 'عباس زاده',
          major: 'تجربی',
          distraction: '3',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 103,
          code: 'S102',
          rank: 971,
          first_name: 'امیر علی ',
          last_name: 'فتاح پسند',
          major: 'ریاضی',
          distraction: '2',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }, {
          id: 104,
          code: 'S103',
          rank: 999,
          first_name: 'صادق',
          last_name: 'پروانه',
          major: 'تجربی',
          distraction: '1',
          created_at: '2022-09-07 17:16:59',
          updated_at: null,
          deleted_at: null
        }],
      defaultOptions: {
        sliderItems: []
      },
      scrollIndex: 0
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.$refs.virtualScroll) {
        setInterval(() => {
          this.scrollIndex += 1
          if (this.scrollIndex > this.localOptions.sliderItems.length) {
            this.scrollIndex = 0
          }
          this.$refs.virtualScroll?.scrollTo(this.scrollIndex)
        }, 2000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::-webkit-scrollbar {
  display: none;
}
::-webkit-scrollbar {
  width: 0px;
}
::-webkit-scrollbar-thumb {
  background: transparent;
}
.scroll-item-card {
  width: 200px;
  height: 320px;
  max-height: 350px;
  border-radius: 20px;
  margin: 0 10px 90px;
  padding: 20px 20px 8px;
  box-shadow: 0 20px 20px 0 rgb(0 0 0 / 5%);
  background-color: #fff;

  .student-img {
    position: relative;
    border-radius: 10px;

    .student-major {
      position: absolute;
      bottom: 0;
      width: 100%;
      z-index: 2;
      color: white;
      font-size: 16px;
      font-weight: bold;
      height: 26px;
      display: flex;
      justify-content: center;
      align-items: center;

      &.riazi {
        background: rgba($color: #75b9ea, $alpha: .5);
      }
      &.tajrobi {
        background: rgba($color: #63a869, $alpha: .5);
      }
    }
  }

  .person-name-card-section {
    padding-bottom: 0;
    .student-name {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
      min-height: 40px;
    }
  }

 .person-info-card-section{
  padding-top: 0;
  .student-info{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .rank {
      font-size: 28px;
      font-weight: 800;
      color: #35427a;
      text-align: center;
    }

    .region {
      font-size: 16px;
      font-weight: 500;
      color: #333;
      text-align: center;
    }
  }
 }
}
</style>
