<template>
  <div class="my-favorites main-content ">
    <div class="row">
      <div class="col-3 bg-transparent">
        <div class="search-box">
          <q-input
            v-model="searchText"
            outlined
            bg-color="white"
            class="search-input"
            placeholder="جستجو ..."
            dense
            rounded
            item-aligned
            label="" />
        </div>
        <div
          class="favorite-sidebar q-pa-md">
          <q-tabs
            v-model="activePanel"
            vertical
            active-class="bg-grey-2"
            indicator-color="yellow-8"
          >
            <q-tab name="all"
                   label="همه" />
            <q-tab name="product"
                   label="محصولات" />
            <q-tab name="set"
                   label="مجموعه ها" />
            <q-tab name="content"
                   label="فیلم ها" />
          </q-tabs>
        </div>
      </div>
      <div class="col-9 bg-transparent">
        <div>
          <q-tabs
            v-model="activePanel"
            indicator-color="yellow-8"
            align="left"
          >
            <q-tab name="all"
                   label="همه" />
            <q-tab name="product"
                   label="محصولات" />
            <q-tab name="set"
                   label="مجموعه ها" />
            <q-tab name="content"
                   label="فیلم ها" />
          </q-tabs>
        </div>

        <q-tab-panels v-model="activePanel"
                      animated
                      transition-prev="jump-down"
                      transition-next="jump-up "
        >
          <q-tab-panel name="all">
            all
          </q-tab-panel>

          <q-tab-panel name="product">
            product
          </q-tab-panel>

          <q-tab-panel name="set">
            set
          </q-tab-panel>

          <q-tab-panel name="content">
            content
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>

  </div>

</template>

<script>
// import StickySidebar from 'sticky-sidebar'
const StickySidebar = typeof window !== 'undefined' ? require('sticky-sidebar') : null
import { SetList } from 'src/models/Set.js'
import { ProductList } from 'src/models/Product.js'
import { ContentList } from 'src/models/Content.js'

export default {
  name: 'MyFavorites',
  data: () => ({
    storeData: [{
      contents: [{
        id: 36181,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل و بررسی شیمی کنکور ریاضی 1400 داخل (قسمت اول)، 201 تا 210',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556001amir.jpg',
        is_free: 1,
        is_favored: false,
        order: 1,
        updated_at: '2022-05-31 06:41:53',
        url: { web: 'http://127.0.0.1/c/36181', api: 'http://127.0.0.1/api/v2/c/36181' },
        timepoints: [{
          id: 122460,
          title: 'حل تست 202',
          time: 135,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122460/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122460/unfavored'
        }, {
          id: 122461,
          title: 'حل تست 203',
          time: 219,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122461/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122461/unfavored'
        }, {
          id: 122462,
          title: 'حل تست 204',
          time: 422,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122462/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122462/unfavored'
        }, {
          id: 122463,
          title: 'حل تست 205',
          time: 578,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122463/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122463/unfavored'
        }, {
          id: 122464,
          title: 'حل تست 206',
          time: 793,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122464/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122464/unfavored'
        }, {
          id: 122465,
          title: 'حل تست 207',
          time: 865,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122465/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122465/unfavored'
        }, {
          id: 122466,
          title: 'حل تست 208',
          time: 996,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122466/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122466/unfavored'
        }, {
          id: 122467,
          title: 'حل تست 209',
          time: 1051,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122467/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122467/unfavored'
        }, {
          id: 122468,
          title: 'حل تست 210',
          time: 1296,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/122468/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/122468/unfavored'
        }],
        redirect_code: null
      }, {
        id: 36571,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور 1398 تجربی خارج، شیمی - حل تست 236 تا 248',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556016sdfs.jpg',
        is_free: 1,
        is_favored: false,
        order: 16,
        updated_at: '2022-06-11 01:38:20',
        url: { web: 'http://127.0.0.1/c/36571', api: 'http://127.0.0.1/api/v2/c/36571' },
        timepoints: [{
          id: 124582,
          title: 'حل تست 236',
          time: 26,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124582/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124582/unfavored'
        }, {
          id: 124585,
          title: 'حل تست 239',
          time: 329,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124585/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124585/unfavored'
        }, {
          id: 124587,
          title: 'حل تست 241',
          time: 682,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124587/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124587/unfavored'
        }, {
          id: 124589,
          title: 'حل تست 243',
          time: 1043,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124589/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124589/unfavored'
        }, {
          id: 124590,
          title: 'حل تست 244',
          time: 1230,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124590/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124590/unfavored'
        }, {
          id: 124592,
          title: 'حل تست 246',
          time: 1577,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124592/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124592/unfavored'
        }, {
          id: 124593,
          title: 'حل تست 247',
          time: 1630,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124593/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124593/unfavored'
        }, {
          id: 124594,
          title: 'حل تست 248',
          time: 1859,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/124594/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/124594/unfavored'
        }],
        redirect_code: null
      }, {
        id: 36718,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور 99 ریاضی داخل ، شیمی - حل تست 208 تا 216',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556020rtqe.jpg',
        is_free: 1,
        is_favored: true,
        order: 20,
        updated_at: '2022-06-15 00:27:47',
        url: { web: 'http://127.0.0.1/c/36718', api: 'http://127.0.0.1/api/v2/c/36718' },
        timepoints: [{
          id: 126056,
          title: 'حل تست 208',
          time: 47,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/126056/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/126056/unfavored'
        }, {
          id: 126057,
          title: 'حل تست 209',
          time: 426,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/126057/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/126057/unfavored'
        }, {
          id: 126060,
          title: 'حل تست 212',
          time: 982,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/126060/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/126060/unfavored'
        }, {
          id: 126063,
          title: 'حل تست 215',
          time: 1411,
          isFavored: true,
          favorUrl: 'http://alaatv.test/c/timepoint/126063/favored',
          unfavorUrl: 'http://alaatv.test/c/timepoint/126063/unfavored'
        }],
        redirect_code: null
      }, {
        id: 18570,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'راهنمای استفاده از فیلم های همایش گدار شیمی سال دوازدهم',
        duration: 1466,
        photo: 'https://nodes.alaatv.com/media/thumbnails/727/727000zero.jpg',
        is_free: 0,
        is_favored: true,
        order: 0,
        updated_at: '2021-11-20 11:09:36',
        url: { web: 'http://127.0.0.1/c/18570', api: 'http://127.0.0.1/api/v2/c/18570' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 18353,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'فصل اول: مولکول ها در خدمت تندرستی (قسمت یازدهم)، حل تست های 122 الی 131',
        duration: 1758,
        photo: 'https://nodes.alaatv.com/media/thumbnails/727/727011elev.jpg',
        is_free: 0,
        is_favored: true,
        order: 11,
        updated_at: '2021-11-20 11:09:30',
        url: { web: 'http://127.0.0.1/c/18353', api: 'http://127.0.0.1/api/v2/c/18353' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 30509,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل آزمون گزینه دو 23 مهر (قسمت اول)، حل تست 181 تا 189',
        duration: 1716,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1186/1186001mamal.jpg',
        is_free: 0,
        is_favored: true,
        order: 1,
        updated_at: '2021-11-20 11:14:50',
        url: { web: 'http://127.0.0.1/c/30509', api: 'http://127.0.0.1/api/v2/c/30509' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 32931,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل آزمون گزینه دو 24 دی (قسمت سوم)، حل تست 198 تا 210',
        duration: 2221,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1186/1186013mori.jpg',
        is_free: 1,
        is_favored: true,
        order: 13,
        updated_at: '2022-01-16 04:02:44',
        url: { web: 'http://127.0.0.1/c/32931', api: 'http://127.0.0.1/api/v2/c/32931' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36292,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل آزمون گزینه دو 30 اردیبهشت (قسمت اول)، حل تست 191 تا 201',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1186/1186019amir.jpg',
        is_free: 1,
        is_favored: true,
        order: 19,
        updated_at: '2022-05-30 05:52:51',
        url: { web: 'http://127.0.0.1/c/36292', api: 'http://127.0.0.1/api/v2/c/36292' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37374,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور 1399 تجربی خارج،شیمی - حل تست 256 تا 270',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556038jhdo.jpg',
        is_free: 1,
        is_favored: true,
        order: 38,
        updated_at: '2022-06-27 06:18:39',
        url: { web: 'http://127.0.0.1/c/37374', api: 'http://127.0.0.1/api/v2/c/37374' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37372,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور 1399 تجربی خارج، شیمی - حل تست 236 تا 247',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556036kmsd.jpg',
        is_free: 1,
        is_favored: true,
        order: 36,
        updated_at: '2022-06-27 06:18:32',
        url: { web: 'http://127.0.0.1/c/37372', api: 'http://127.0.0.1/api/v2/c/37372' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37297,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور 1398 ریاضی داخل، شیمی - حل تست 220 تا 235',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556033jhsd.jpg',
        is_free: 1,
        is_favored: true,
        order: 33,
        updated_at: '2022-06-25 03:15:59',
        url: { web: 'http://127.0.0.1/c/37297', api: 'http://127.0.0.1/api/v2/c/37297' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36570,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور 1400 ریاضی خارج، شیمی - حل تست 222 تا 235',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1556/1556015dfaw.jpg',
        is_free: 1,
        is_favored: true,
        order: 15,
        updated_at: '2022-06-11 01:33:16',
        url: { web: 'http://127.0.0.1/c/36570', api: 'http://127.0.0.1/api/v2/c/36570' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36390,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نمونه فیلم اول فیزیک دفترچه سوم',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1565/nemonefizikdk1.jpg',
        is_free: 1,
        is_favored: true,
        order: 1,
        updated_at: '2022-06-03 09:34:58',
        url: { web: 'http://127.0.0.1/c/36390', api: 'http://127.0.0.1/api/v2/c/36390' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36391,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نمونه فیلم دوم فیزیک دفترچه سوم',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1565/nemonefizikdk2.jpg',
        is_free: 1,
        is_favored: true,
        order: 2,
        updated_at: '2022-06-03 09:35:00',
        url: { web: 'http://127.0.0.1/c/36391', api: 'http://127.0.0.1/api/v2/c/36391' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36392,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نمونه فیلم سوم فیزیک دفترچه سوم',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1565/nemonefizikdk3.jpg',
        is_free: 1,
        is_favored: true,
        order: 3,
        updated_at: '2022-06-03 09:35:02',
        url: { web: 'http://127.0.0.1/c/36392', api: 'http://127.0.0.1/api/v2/c/36392' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36394,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نمونه فیلم دوم شیمی دفترچه سوم',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1565/nemoneshimidk2.jpg',
        is_free: 1,
        is_favored: true,
        order: 5,
        updated_at: '2022-06-03 09:35:06',
        url: { web: 'http://127.0.0.1/c/36394', api: 'http://127.0.0.1/api/v2/c/36394' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36395,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نمونه فیلم سوم شیمی دفترچه سوم',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1565/nemoneshimidk3.jpg',
        is_free: 1,
        is_favored: true,
        order: 6,
        updated_at: '2022-06-03 09:35:08',
        url: { web: 'http://127.0.0.1/c/36395', api: 'http://127.0.0.1/api/v2/c/36395' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36393,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نمونه فیلم اول شیمی دفترچه سوم',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1565/nemoneshimidk1.jpg',
        is_free: 1,
        is_favored: true,
        order: 4,
        updated_at: '2022-06-03 09:35:03',
        url: { web: 'http://127.0.0.1/c/36393', api: 'http://127.0.0.1/api/v2/c/36393' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36234,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور تجربی 1400 ، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1560/1560002mkfi.jpg',
        is_free: 1,
        is_favored: true,
        order: 2,
        updated_at: '2022-05-29 05:45:40',
        url: { web: 'http://127.0.0.1/c/36234', api: 'http://127.0.0.1/api/v2/c/36234' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36235,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور عمومی خارج 1400 ، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1560/1560003bgct.jpg',
        is_free: 1,
        is_favored: true,
        order: 3,
        updated_at: '2022-05-31 06:34:42',
        url: { web: 'http://127.0.0.1/c/36235', api: 'http://127.0.0.1/api/v2/c/36235' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36376,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور هنر 1400 ، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1560/1560006hfue.jpg',
        is_free: 1,
        is_favored: true,
        order: 6,
        updated_at: '2022-06-02 08:16:33',
        url: { web: 'http://127.0.0.1/c/36376', api: 'http://127.0.0.1/api/v2/c/36376' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36377,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور زبان 1400 ، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1560/1560007kioe.jpg',
        is_free: 1,
        is_favored: true,
        order: 7,
        updated_at: '2022-06-02 08:20:33',
        url: { web: 'http://127.0.0.1/c/36377', api: 'http://127.0.0.1/api/v2/c/36377' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36178,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل و بررسی زبان انگلیسی کنکور هنر 1400 (قسمت دوم)، حل تست 93 تا 100',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555002mori.jpg',
        is_free: 1,
        is_favored: true,
        order: 2,
        updated_at: '2022-05-29 05:35:00',
        url: { web: 'http://127.0.0.1/c/36178', api: 'http://127.0.0.1/api/v2/c/36178' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36180,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل و بررسی زبان انگلیسی کنکور ریاضی 1400 (قسمت دوم)، حل تست 93  تا 100',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555004koko.jpg',
        is_free: 1,
        is_favored: true,
        order: 4,
        updated_at: '2022-05-29 05:48:43',
        url: { web: 'http://127.0.0.1/c/36180', api: 'http://127.0.0.1/api/v2/c/36180' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36991,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور تجربی داخل 99 (قسمت سوم) ، حل و بررسی تست 97 تا 100',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555008fdpg.jpg',
        is_free: 1,
        is_favored: true,
        order: 8,
        updated_at: '2022-06-16 05:46:15',
        url: { web: 'http://127.0.0.1/c/36991', api: 'http://127.0.0.1/api/v2/c/36991' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36993,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور انسانی خارج 99 (قسمت دوم) ، حل و بررسی تست 88 تا 93',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555010fgbc.jpg',
        is_free: 1,
        is_favored: true,
        order: 10,
        updated_at: '2022-06-16 05:46:22',
        url: { web: 'http://127.0.0.1/c/36993', api: 'http://127.0.0.1/api/v2/c/36993' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36996,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور منحصرا زبان 99 (قسمت دوم) ، حل و بررسی تست 93 تا 96',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555013rfge.jpg',
        is_free: 1,
        is_favored: true,
        order: 13,
        updated_at: '2022-06-16 05:46:34',
        url: { web: 'http://127.0.0.1/c/36996', api: 'http://127.0.0.1/api/v2/c/36996' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36999,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور انسانی داخل 99 (قسمت دوم)، حل و بررسی تست 88 تا 96',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555016tghi.jpg',
        is_free: 1,
        is_favored: true,
        order: 16,
        updated_at: '2022-06-16 05:46:58',
        url: { web: 'http://127.0.0.1/c/36999', api: 'http://127.0.0.1/api/v2/c/36999' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37003,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور ریاضی داخل 99 (قسمت سوم)، حل و بررسی تست 97 تا 100',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1555/1555020frgd.jpg',
        is_free: 1,
        is_favored: true,
        order: 20,
        updated_at: '2022-06-16 05:47:18',
        url: { web: 'http://127.0.0.1/c/37003', api: 'http://127.0.0.1/api/v2/c/37003' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36209,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور انسانی 98، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1558/1558005rfgo.jpg',
        is_free: 1,
        is_favored: true,
        order: 5,
        updated_at: '2022-05-29 06:25:23',
        url: { web: 'http://127.0.0.1/c/36209', api: 'http://127.0.0.1/api/v2/c/36209' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36211,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور زبان 99، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1558/1558007kjfd.jpg',
        is_free: 1,
        is_favored: true,
        order: 7,
        updated_at: '2022-05-29 06:29:27',
        url: { web: 'http://127.0.0.1/c/36211', api: 'http://127.0.0.1/api/v2/c/36211' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 36210,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'تحلیل کنکور خارج 98، حل تست 1 تا 25',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1558/1558006gtrp.jpg',
        is_free: 1,
        is_favored: true,
        order: 6,
        updated_at: '2022-05-29 06:26:00',
        url: { web: 'http://127.0.0.1/c/36210', api: 'http://127.0.0.1/api/v2/c/36210' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37174,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نقشه راه پایانی ، مباحث کنکور ریاضی',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1567/1567002mjur.jpg',
        is_free: 1,
        is_favored: true,
        order: 2,
        updated_at: '2022-06-20 06:22:36',
        url: { web: 'http://127.0.0.1/c/37174', api: 'http://127.0.0.1/api/v2/c/37174' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37217,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نا امید نشو ، ادامه بده و تمومش کن',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1567/1567005gaga.jpg',
        is_free: 1,
        is_favored: true,
        order: 5,
        updated_at: '2022-06-21 09:23:00',
        url: { web: 'http://127.0.0.1/c/37217', api: 'http://127.0.0.1/api/v2/c/37217' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37309,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'کنکور محتوایی چیست؟ اگر کنکور محتوایی شد چه کنیم؟',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1567/1567008dstr.jpg',
        is_free: 1,
        is_favored: true,
        order: 8,
        updated_at: '2022-06-23 07:34:12',
        url: { web: 'http://127.0.0.1/c/37309', api: 'http://127.0.0.1/api/v2/c/37309' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37357,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نقشه راه فیزیک  همراه با استاد رضا محمدی',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1567/1567011hgew.jpg',
        is_free: 1,
        is_favored: true,
        order: 11,
        updated_at: '2022-06-26 10:54:50',
        url: { web: 'http://127.0.0.1/c/37357', api: 'http://127.0.0.1/api/v2/c/37357' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37343,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نقشه راه زیست شناسی همراه با استاد امیر کبیری راد',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1567/1567010kood.jpg',
        is_free: 1,
        is_favored: true,
        order: 10,
        updated_at: '2022-06-25 03:18:04',
        url: { web: 'http://127.0.0.1/c/37343', api: 'http://127.0.0.1/api/v2/c/37343' },
        timepoints: null,
        redirect_code: null
      }, {
        id: 37371,
        redirect_url: null,
        type: 8,
        section: null,
        title: 'نقشه راه ریاضی',
        duration: null,
        photo: 'https://nodes.alaatv.com/media/thumbnails/1567/1567014bvgf.jpg',
        is_free: 1,
        is_favored: true,
        order: 14,
        updated_at: '2022-06-27 03:56:59',
        url: { web: 'http://127.0.0.1/c/37371', api: 'http://127.0.0.1/api/v2/c/37371' },
        timepoints: null,
        redirect_code: null
      }],
      sets: [{
        id: 1567,
        redirect_url: null,
        title: 'مشاوره ده روز طلایی کنکور',
        short_title: 'مشاوره ده روز طلایی کنکور',
        photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1655570620_5359.jpg',
        url: { web: 'http://127.0.0.1/set/1567', api: 'http://127.0.0.1/api/v2/set/1567' },
        contents_count: 19,
        author: null,
        contents: null,
        created_at: '2022-06-18 12:13:40',
        updated_at: '2022-06-18 12:13:40',
        redirect_code: null
      }, {
        id: 1560,
        redirect_url: null,
        title: '8 صبح آلا - تحلیل کنکور دین و زندگی',
        short_title: '8 صبح آلا - تحلیل کنکور دین و زندگی',
        photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1655723682_1511.jpg',
        url: { web: 'http://127.0.0.1/set/1560', api: 'http://127.0.0.1/api/v2/set/1560' },
        contents_count: 7,
        author: null,
        contents: null,
        created_at: '2022-05-28 06:48:27',
        updated_at: '2022-06-20 06:46:27',
        redirect_code: null
      }, {
        id: 1565,
        redirect_url: null,
        title: 'نمونه فیلم محصول دفترچه سوم',
        short_title: null,
        photo: null,
        url: { web: 'http://127.0.0.1/set/1565', api: 'http://127.0.0.1/api/v2/set/1565' },
        contents_count: 6,
        author: null,
        contents: null,
        created_at: '2022-06-03 09:16:00',
        updated_at: '2022-06-03 09:16:00',
        redirect_code: null
      }],
      products: null
    }],
    slider: null,
    searchText: '',
    activePanel: '',
    activeFilterTypes: [
      {
        title: 'همه',
        name: 'all',
        active: false
      },
      {
        title: 'محصولات',
        name: 'product',
        active: false
      },
      {
        title: 'مجموعه ها',
        name: 'set',
        active: false
      },
      {
        title: 'فیلم ها',
        name: 'content',
        active: true
      }
    ]
  }),

  computed: {
    products() {
      const products = this.storeData[0].products
      return new ProductList(products)
    },
    sets() {
      return new SetList(this.storeData[0].sets)
    },
    contents() {
      return new ContentList(this.storeData[0].contents)
    }
  },
  created() {
    this.initPageData()
  },
  mounted() {
    this.closeLayoutSideBar()
  },
  methods: {
    initPageData() {

      // const products = new ProductList(),
      //   sets = new SetList(),
      //   contents = new ContentList()
    },
    closeLayoutSideBar() {
      // this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
      // this.$nextTick(() => {
      //   this.$store.commit('AppLayout/updateLayoutLeftDrawerVisible', false)
      // })
    },
    setSideBarSticky () {
      if (!StickySidebar) {
        return
      }
      this.slider = new StickySidebar('.favorite-sidebar', {
        topSpacing: 100,
        bottomSpacing: 0,
        resizeSensor: true,
        containerSelector: '.main-content'
        // innerWrapperSelector: '.sidebar__inner'
      })
    }

  }
}
</script>

<style lang="scss">
.my-favorites{
  .q-tab__indicator{
    height: 5px;
  }
  .q-tabs--vertical {
    .q-tab__indicator{
      height: 80%;
      width: 5px;
      margin-top: 5px;
    }
  }
}

</style>

<style scoped lang="scss">
.my-favorites{
  .search-box{
    .search-input{
      :deep(.q-field--labeled.q-field--dense){
        :deep(.q-field__suffix){
          padding-top: 0;
        }
      }
    }
  }

background: #f2f3f8;
  padding: 30px 100px;
}
</style>
