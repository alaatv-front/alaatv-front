<template>
  <div class="row q-pa-lg">
    <!--    ----------------------------------------------------------------------- filter boxes ------------------------------------------------------------------------------- -->
    <div class="col-12">
      <div class="flex justify-center items-center q-mb-lg">
        <q-icon name="mdi-tune-vertical-variant q-mr-md"
                class="fdgsdg">
          <q-tooltip>
            مرتب سازی بر اساس
          </q-tooltip>
        </q-icon>
        <div class="sortingFilter-item date q-mr-md">
          <filter-box
            :items="filterBoxSort"
            v-model:boxSortSelected="selectedFilterBoxValue"
            type="filterBoxSort"
            :custom-class="'sort'"
            @update:filterBoxSort="onChangeFilterSortBox"
          >
          </filter-box>
        </div>
        <div class="sortingFilter-item subject q-mr-md">
          <filter-box
            ref="filterBoxCategory"
            v-model:categorySelected="selectedFilterCategoryValue"
            type="filterBoxCategory"
            :items="filterBoxCategory"
            @update:filterBoxCategory="onChangeFilterBoxCategory"
            :custom-class="'filter'"
          >
          </filter-box>
        </div>
      </div>
    </div>
    <!--    ------------------------------------------------------------------------ banner search products ------------------------------------------------------------------------------ -->
    <div class="col-md-5 productsCol bg-red-8 q-pa-lg ">
      filteredProduct :{{filteredProduct.list.length}}
      <a href="/asset/abrisham"
         target="_blank">
        <div class="abrishamAssetBanner">
          <img src="https://nodes.alaatv.com/upload/banner-dashboard.jpg" />
        </div>
      </a>
      <div class="m-input-icon m-input-icon--left productsSearch">
        <q-input outlined
                 standout
                 type="text"
                 rounded
                 filled
                 class="form-control m-input m-input--air"
                 placeholder="جستجو ..."
                 v-model="searchTarget">
          <template v-slot:prepend>
            <q-icon name="mdi-magnify" />
          </template>
        </q-input>
      </div>
      <transition-group v-if="products.list.length > 0"
                        name="list"
                        tag="div"
                        class="produtItems">
        <div  v-for="product in filteredProduct.list"
              :key="product.id">
          <purchase-item
            :key="product.id"
            :product="product"
            :searchTarget="searchTarget"
            @setSelected="setSelectedSet"
          />
        </div>
      </transition-group>
      <!--    --------------------------------------------------------------------------- show content box   --------------------------------------------------------------------------- -->
      <div class="m-portlet__body"
           v-if="!currentProduct.title">
        <div class="text-center bg-primary q-pa-lg noContentMessage">
          <div>
            <q-icon size="28px"
                    name="mdi-information-outline" />
            هنوز محصولی نخریده اید.
          </div>
        </div>
      </div>
    </div>
    <!--    ------------------------------------------------------------------------ content show ------------------------------------------------------------------------------ -->

    <q-card>
      <q-tabs
        v-model="selectedTab"
        class="text-grey"
        active-color="primary"
        indicator-color="primary"
        align="justify"
        narrow-indicator
      >
        <q-tab name="video"
               v-if="true"
               label="فیلم" />
        <q-tab name="pamphlet"
               label="جزوه" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="selectedTab"
                    animated>
        <q-tab-panel name="video">
          <div class="text-h6">film</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="pamphlet">
          <div class="text-h6">joz</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

  </div>
</template>

<script>
import FilterBox from 'src/components/userPurchases/filterBox'
import PurchaseItem from 'src/components/userPurchases/PurchaseItem'
import { Product, ProductList } from 'src/models/Product'
import { Set } from 'src/models/Set'
import Assist from 'src/plugins/Assist'
import Addresses from 'src/api/Addresses'

export default {
  name: 'Purchases',
  components: {
    FilterBox,
    PurchaseItem
  },
  watch: {
    searchTarget (value) {
      console.log('filterName watch :', value)
      this.filterProductBySearchInput()
      this.products.list = this.products.list.splice(0, this.products.list.length)
    }
  },
  computed: {
    currentProduct () {
      if (this.filteredProduct.list.length > 0) {
        return this.filteredProduct.list[0]
      }
      return new Product()
    },
    selectedSetVideos () {
      return this.selectedSet.contents.videos('des')
    },
    selectedSetPamphlets () {
      return this.selectedSet.contents.pamphlets('des')
    },
    userAssetsCollection () {
      return {
        data: {
          id: 0,
          title: 'محصولات من',
          offer: false,
          url: null,
          order: 0,
          contents: null,
          sets: null,
          products: [{
            id: 717,
            redirect_url: null,
            title: 'بسته امتحان نهایی 1401 آلا(0)',
            category: 'همایش/امتحان نهایی',
            price: { base: 0, discount: 0, final: 0 },
            url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
            photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
            sets: [{
              id: 1542,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی عربی دوازدهم_ابراهیم غلامی نژاد',
              short_title: 'شبیه ساز امتحان نهایی عربی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652952167_7887.jpg',
              url: { web: 'http://127.0.0.1/set/1542', api: 'http://127.0.0.1/api/v2/set/1542' },
              pamphlets_count: 0,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2022-05-19 04:52:47',
              updated_at: '2022-05-19 04:52:47',
              redirect_code: null
            }, {
              id: 1519,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
              short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
              url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
              pamphlets_count: 0,
              videos_count: 11,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:39:20',
              updated_at: '2022-05-26 07:16:46',
              redirect_code: null
            }, {
              id: 1518,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
              short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
              url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
              pamphlets_count: 1,
              videos_count: 7,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:38:31',
              updated_at: '2022-05-21 10:21:44',
              redirect_code: null
            }, {
              id: 1517,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
              short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
              url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
              pamphlets_count: 1,
              videos_count: 16,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:37:36',
              updated_at: '2022-05-21 10:20:19',
              redirect_code: null
            }, {
              id: 1516,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
              short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
              url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
              pamphlets_count: 1,
              videos_count: 15,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:36:36',
              updated_at: '2022-05-21 10:19:52',
              redirect_code: null
            }, {
              id: 1514,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
              short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
              url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
              pamphlets_count: 1,
              videos_count: 17,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:22:00',
              updated_at: '2022-05-22 03:12:33',
              redirect_code: null
            }, {
              id: 1513,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
              short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
              url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
              pamphlets_count: 1,
              videos_count: 6,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:18:42',
              updated_at: '2022-05-20 06:37:27',
              redirect_code: null
            }, {
              id: 1512,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی ادبیات دوازدهم - میثم حسین خانی',
              short_title: 'شبیه ساز امتحان نهایی ادبیات دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687820_7028.jpg',
              url: { web: 'http://127.0.0.1/set/1512', api: 'http://127.0.0.1/api/v2/set/1512' },
              pamphlets_count: 1,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:16:06',
              updated_at: '2022-05-21 03:23:57',
              redirect_code: null
            }, {
              id: 1511,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی ریاضی انسانی دوازدهم - محسن زبده کار',
              short_title: 'شبیه ساز امتحان نهایی ریاضی انسانی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687831_6220.jpg',
              url: { web: 'http://127.0.0.1/set/1511', api: 'http://127.0.0.1/api/v2/set/1511' },
              pamphlets_count: 3,
              videos_count: 15,
              author: null,
              contents: null,
              created_at: '2022-05-05 04:47:49',
              updated_at: '2022-05-21 08:06:01',
              redirect_code: null
            }, {
              id: 1520,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی حسابان دوازدهم - محمد امین نباخته',
              short_title: 'شبیه ساز امتحان نهایی حسابان دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687690_6619.jpg',
              url: { web: 'http://127.0.0.1/set/1520', api: 'http://127.0.0.1/api/v2/set/1520' },
              pamphlets_count: 1,
              videos_count: 6,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:40:14',
              updated_at: '2022-05-21 10:22:57',
              redirect_code: null
            }, {
              id: 1521,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی حسابان دوازدهم - مجید صداقت',
              short_title: 'شبیه ساز امتحان نهایی حسابان دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687682_5728.jpg',
              url: { web: 'http://127.0.0.1/set/1521', api: 'http://127.0.0.1/api/v2/set/1521' },
              pamphlets_count: 2,
              videos_count: 10,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:41:48',
              updated_at: '2022-05-21 10:23:19',
              redirect_code: null
            }, {
              id: 1536,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی تاریخ دوازدهم - حسن رعنایی',
              short_title: 'شبیه ساز امتحان نهایی تاریخ دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687519_1820.jpg',
              url: { web: 'http://127.0.0.1/set/1536', api: 'http://127.0.0.1/api/v2/set/1536' },
              pamphlets_count: 0,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2022-05-12 06:45:38',
              updated_at: '2022-05-20 06:37:43',
              redirect_code: null
            }, {
              id: 1533,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی جغرافی دوازدهم - حسن رعنایی',
              short_title: 'شبیه ساز امتحان نهایی جغرافی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687558_8777.jpg',
              url: { web: 'http://127.0.0.1/set/1533', api: 'http://127.0.0.1/api/v2/set/1533' },
              pamphlets_count: 0,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2022-05-12 06:42:13',
              updated_at: '2022-05-20 08:41:09',
              redirect_code: null
            }, {
              id: 1531,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی گسسته دوازدهم - سوگند روشنی',
              short_title: 'شبیه ساز امتحان نهایی گسسته دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687578_5586.jpg',
              url: { web: 'http://127.0.0.1/set/1531', api: 'http://127.0.0.1/api/v2/set/1531' },
              pamphlets_count: 0,
              videos_count: 16,
              author: null,
              contents: null,
              created_at: '2022-05-12 05:43:24',
              updated_at: '2022-05-21 08:07:49',
              redirect_code: null
            }, {
              id: 1530,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی گسسته دوازدهم - محمدصادق ثابتی',
              short_title: 'شبیه ساز امتحان نهایی گسسته دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687587_7830.jpg',
              url: { web: 'http://127.0.0.1/set/1530', api: 'http://127.0.0.1/api/v2/set/1530' },
              pamphlets_count: 1,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2022-05-12 05:42:50',
              updated_at: '2022-05-22 04:06:29',
              redirect_code: null
            }, {
              id: 1528,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی زبان  دوازدهم - مهدی چیذری',
              short_title: 'شبیه ساز امتحان نهایی زبان  دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687607_6643.jpg',
              url: { web: 'http://127.0.0.1/set/1528', api: 'http://127.0.0.1/api/v2/set/1528' },
              pamphlets_count: 0,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:51:04',
              updated_at: '2022-05-22 07:49:13',
              redirect_code: null
            }, {
              id: 1527,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی زیست شناسی دوازدهم - مرضیه فتحی',
              short_title: 'شبیه ساز امتحان نهایی زیست شناسی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687615_8459.jpg',
              url: { web: 'http://127.0.0.1/set/1527', api: 'http://127.0.0.1/api/v2/set/1527' },
              pamphlets_count: 2,
              videos_count: 12,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:50:09',
              updated_at: '2022-05-21 10:27:36',
              redirect_code: null
            }, {
              id: 1526,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی زیست شناسی دوازدهم - حسین ذبحی تفت',
              short_title: 'شبیه ساز امتحان نهایی زیست شناسی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687629_3868.jpg',
              url: { web: 'http://127.0.0.1/set/1526', api: 'http://127.0.0.1/api/v2/set/1526' },
              pamphlets_count: 1,
              videos_count: 8,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:48:08',
              updated_at: '2022-05-21 10:25:45',
              redirect_code: null
            }, {
              id: 1525,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی هندسه دوازدهم - محمد رضا حسینی فرد',
              short_title: 'شبیه ساز امتحان نهایی هندسه دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687640_8696.jpg',
              url: { web: 'http://127.0.0.1/set/1525', api: 'http://127.0.0.1/api/v2/set/1525' },
              pamphlets_count: 2,
              videos_count: 8,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:46:48',
              updated_at: '2022-05-20 06:38:22',
              redirect_code: null
            }, {
              id: 1524,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی هندسه دوازدهم - علی ایمانی',
              short_title: 'شبیه ساز امتحان نهایی هندسه دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687650_7577.jpg',
              url: { web: 'http://127.0.0.1/set/1524', api: 'http://127.0.0.1/api/v2/set/1524' },
              pamphlets_count: 1,
              videos_count: 6,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:45:45',
              updated_at: '2022-05-20 06:38:30',
              redirect_code: null
            }, {
              id: 1523,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی ریاضی تجربی دوازدهم - محمد رضا لکستانی',
              short_title: 'شبیه ساز امتحان نهایی ریاضی تجربی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687664_8138.jpg',
              url: { web: 'http://127.0.0.1/set/1523', api: 'http://127.0.0.1/api/v2/set/1523' },
              pamphlets_count: 0,
              videos_count: 40,
              author: null,
              contents: null,
              created_at: '2022-05-05 05:44:31',
              updated_at: '2022-05-19 13:27:26',
              redirect_code: null
            }, {
              id: 1086,
              redirect_url: null,
              title: 'امتحان نهایی زیست شناسی دوازدهم-(نظام آموزشی جدید) - جلال موقاری',
              short_title: 'امتحان نهایی زیست شناسی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zist_20210508084205.jpg',
              url: { web: 'http://127.0.0.1/set/1086', api: 'http://127.0.0.1/api/v2/set/1086' },
              pamphlets_count: 3,
              videos_count: 3,
              author: null,
              contents: null,
              created_at: '2021-04-24 11:49:14',
              updated_at: '2022-01-26 05:43:22',
              redirect_code: null
            }, {
              id: 828,
              redirect_url: null,
              title: 'امتحان نهایی دین و زندگی سال دوازدهم انسانی (نظام آموزشی جدید) (99-1398) هادی ناصری',
              short_title: 'امتحان نهایی دین و زندگی سال دوازدهم انسانی',
              photo: null,
              url: { web: 'http://127.0.0.1/set/828', api: 'http://127.0.0.1/api/v2/set/828' },
              pamphlets_count: 1,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2020-05-21 06:19:18',
              updated_at: '2021-08-07 12:18:30',
              redirect_code: null
            }, {
              id: 827,
              redirect_url: null,
              title: 'امتحان نهایی دین و زندگی سال دوازدهم ریاضی و تجربی (نظام آموزشی جدید) - هادی ناصری',
              short_title: 'امتحان نهایی دین و زندگی سال دوازدهم ریاضی و تجربی',
              photo: null,
              url: { web: 'http://127.0.0.1/set/827', api: 'http://127.0.0.1/api/v2/set/827' },
              pamphlets_count: 3,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2020-05-21 06:18:34',
              updated_at: '2022-01-26 04:55:39',
              redirect_code: null
            }, {
              id: 824,
              redirect_url: null,
              title: 'امتحان نهایی فیزیک تجربی سال دوازدهم (نظام آموزشی جدید) - پرویز کازرانیان',
              short_title: 'امتحان نهایی فیزیک تجربی سال دوازدهم',
              photo: null,
              url: { web: 'http://127.0.0.1/set/824', api: 'http://127.0.0.1/api/v2/set/824' },
              pamphlets_count: 3,
              videos_count: 3,
              author: null,
              contents: null,
              created_at: '2020-05-19 05:28:31',
              updated_at: '2022-01-26 04:55:10',
              redirect_code: null
            }, {
              id: 823,
              redirect_url: null,
              title: 'امتحان نهایی فارسی 3 (نظام آموزشی جدید) - محمد صادقی',
              short_title: 'امتحان نهایی فارسی 3',
              photo: null,
              url: { web: 'http://127.0.0.1/set/823', api: 'http://127.0.0.1/api/v2/set/823' },
              pamphlets_count: 4,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2020-05-19 05:23:13',
              updated_at: '2022-01-26 04:54:56',
              redirect_code: null
            }, {
              id: 820,
              redirect_url: null,
              title: 'امتحان نهایی ریاضی انسانی دوازدهم (نظام آموزشی جدید) - مهدی امینی راد',
              short_title: 'امتحان نهایی ریاضی انسانی',
              photo: null,
              url: { web: 'http://127.0.0.1/set/820', api: 'http://127.0.0.1/api/v2/set/820' },
              pamphlets_count: 3,
              videos_count: 3,
              author: null,
              contents: null,
              created_at: '2020-05-17 06:17:15',
              updated_at: '2022-01-26 04:54:27',
              redirect_code: null
            }, {
              id: 814,
              redirect_url: null,
              title: 'امتحان نهایی ریاضی تجربی دوازدهم (نظام آموزشی جدید) - محمد صادق ثابتی',
              short_title: 'امتحان نهایی ریاضی تجربی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/RayazeiSvaH_20200620155453.jpg',
              url: { web: 'http://127.0.0.1/set/814', api: 'http://127.0.0.1/api/v2/set/814' },
              pamphlets_count: 6,
              videos_count: 15,
              author: null,
              contents: null,
              created_at: '2020-05-14 06:07:22',
              updated_at: '2022-01-26 04:52:23',
              redirect_code: null
            }, {
              id: 811,
              redirect_url: null,
              title: 'امتحانات نهایی زبان انگلیسی سال دوازدهم (نظام آموزشی جدید) - علی اکبر عزتی',
              short_title: 'امتحانات نهایی زبان انگلیسی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zaban t2_20200620142428.jpg',
              url: { web: 'http://127.0.0.1/set/811', api: 'http://127.0.0.1/api/v2/set/811' },
              pamphlets_count: 3,
              videos_count: 6,
              author: null,
              contents: null,
              created_at: '2020-05-07 00:24:16',
              updated_at: '2022-01-26 04:51:24',
              redirect_code: null
            }, {
              id: 807,
              redirect_url: null,
              title: 'امتحانات نهایی عربی (نظام آموزشی جدید) - پدرام علیمرادی',
              short_title: 'امتحانات نهایی عربی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/arabit2_20200620142522.jpg',
              url: { web: 'http://127.0.0.1/set/807', api: 'http://127.0.0.1/api/v2/set/807' },
              pamphlets_count: 3,
              videos_count: 2,
              author: null,
              contents: null,
              created_at: '2020-05-04 02:18:52',
              updated_at: '2022-01-26 04:51:03',
              redirect_code: null
            }, {
              id: 799,
              redirect_url: null,
              title: 'امتحان نهایی ریاضی تجربی سال دوازدهم (نظام آموزشی جدید) - مهدی امینی راد',
              short_title: 'امتحان نهایی ریاضی تجربی سال دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/rayazeiA_20200620155001.jpg',
              url: { web: 'http://127.0.0.1/set/799', api: 'http://127.0.0.1/api/v2/set/799' },
              pamphlets_count: 3,
              videos_count: 8,
              author: null,
              contents: null,
              created_at: '2020-04-18 03:59:29',
              updated_at: '2022-01-26 04:49:45',
              redirect_code: null
            }, {
              id: 789,
              redirect_url: null,
              title: 'امتحان نهایی شیمی سال دوازدهم (نظام آموزشی جدید) - حامد پویان نظر',
              short_title: 'امتحان نهایی شیمی سال دوازدهم',
              photo: null,
              url: { web: 'http://127.0.0.1/set/789', api: 'http://127.0.0.1/api/v2/set/789' },
              pamphlets_count: 5,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2020-04-09 07:49:17',
              updated_at: '2022-01-26 04:48:44',
              redirect_code: null
            }, {
              id: 784,
              redirect_url: null,
              title: 'امتحان نهایی فیزیک سال دوازدهم (نظام آموزشی جدید) - پرویز کازرانیان',
              short_title: 'امتحان نهایی فیزیک سال دوازدهم',
              photo: null,
              url: { web: 'http://127.0.0.1/set/784', api: 'http://127.0.0.1/api/v2/set/784' },
              pamphlets_count: 3,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2020-03-30 05:09:05',
              updated_at: '2022-01-26 04:47:30',
              redirect_code: null
            }, {
              id: 1087,
              redirect_url: null,
              title: 'امتحان نهایی فیزیک تجربی دوازدهم-(نظام آموزشی جدید) - پرویز کازرانیان',
              short_title: 'امتحان نهایی فیزیک تجربی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik_t_20210508084243.jpg',
              url: { web: 'http://127.0.0.1/set/1087', api: 'http://127.0.0.1/api/v2/set/1087' },
              pamphlets_count: 3,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2021-04-24 11:51:45',
              updated_at: '2022-01-26 05:43:37',
              redirect_code: null
            }, {
              id: 1102,
              redirect_url: null,
              title: 'امتحان نهایی زبان دوازدهم-(نظام آموزشی جدید) - علی اکبر عزتی',
              short_title: 'امتحان نهایی زبان انگلیسی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zaban_20210508084412.jpg',
              url: { web: 'http://127.0.0.1/set/1102', api: 'http://127.0.0.1/api/v2/set/1102' },
              pamphlets_count: 3,
              videos_count: 11,
              author: null,
              contents: null,
              created_at: '2021-05-05 11:49:22',
              updated_at: '2022-01-26 05:46:31',
              redirect_code: null
            }, {
              id: 1103,
              redirect_url: null,
              title: 'امتحان نهایی دین و زندگی دوازدهم-(نظام آموزشی جدید) (00-99)',
              short_title: 'امتحان نهایی دین و زندگی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/dini_20210508084441.jpg',
              url: { web: 'http://127.0.0.1/set/1103', api: 'http://127.0.0.1/api/v2/set/1103' },
              pamphlets_count: 3,
              videos_count: 4,
              author: null,
              contents: null,
              created_at: '2021-05-05 11:50:06',
              updated_at: '2021-08-07 12:18:32',
              redirect_code: null
            }, {
              id: 1495,
              redirect_url: null,
              title: 'شبیه ساز امتحان نهایی ریاضی تجربی دوازدهم - علی صدری',
              short_title: 'شبیه ساز امتحان نهایی ریاضی تجربی دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652688078_9638.jpg',
              url: { web: 'http://127.0.0.1/set/1495', api: 'http://127.0.0.1/api/v2/set/1495' },
              pamphlets_count: 1,
              videos_count: 6,
              author: null,
              contents: null,
              created_at: '2022-04-20 04:56:53',
              updated_at: '2022-05-20 06:38:11',
              redirect_code: null
            }, {
              id: 1121,
              redirect_url: null,
              title: 'امتحان نهایی دینی انسانی دوازدهم-(نظام آموزشی جدید) (00-99)-هادی ناصری',
              short_title: 'امتحان نهایی دینی انسانی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/dini_e_20210515125409.jpg',
              url: { web: 'http://127.0.0.1/set/1121', api: 'http://127.0.0.1/api/v2/set/1121' },
              pamphlets_count: 3,
              videos_count: 3,
              author: null,
              contents: null,
              created_at: '2021-05-15 12:38:27',
              updated_at: '2021-08-07 12:18:33',
              redirect_code: null
            }, {
              id: 1120,
              redirect_url: null,
              title: 'امتحان نهایی ادبیات فارسی انسانی دوازدهم-(نظام آموزشی جدید) (00-99)-عبدالرضا مرادی',
              short_title: 'امتحان نهایی ادبیات فارسی انسانی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/farsi_ensani_20210515125143.jpg',
              url: { web: 'http://127.0.0.1/set/1120', api: 'http://127.0.0.1/api/v2/set/1120' },
              pamphlets_count: 1,
              videos_count: 2,
              author: null,
              contents: null,
              created_at: '2021-05-15 11:08:38',
              updated_at: '2021-08-07 12:18:33',
              redirect_code: null
            }, {
              id: 1115,
              redirect_url: null,
              title: 'امتحان نهایی ریاضی تجربی دوازدهم-(نظام آموزشی جدید) (00-99)- محمد رضا لکستانی',
              short_title: 'امتحان نهایی ریاضی تجربی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi t_20210510073323.jpg',
              url: { web: 'http://127.0.0.1/set/1115', api: 'http://127.0.0.1/api/v2/set/1115' },
              pamphlets_count: 3,
              videos_count: 6,
              author: null,
              contents: null,
              created_at: '2021-05-10 07:12:57',
              updated_at: '2021-08-07 12:18:33',
              redirect_code: null
            }, {
              id: 1111,
              redirect_url: null,
              title: 'امتحان نهایی فیزیک ریاضی دوازدهم-(نظام آموزشی جدید) (00-99)- پرویز کازرانیان',
              short_title: 'امتحان نهایی فیزیک ریاضی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/fizik_r_20210516061819.jpg',
              url: { web: 'http://127.0.0.1/set/1111', api: 'http://127.0.0.1/api/v2/set/1111' },
              pamphlets_count: 3,
              videos_count: 15,
              author: null,
              contents: null,
              created_at: '2021-05-08 09:06:09',
              updated_at: '2021-08-07 12:18:33',
              redirect_code: null
            }, {
              id: 1109,
              redirect_url: null,
              title: 'امتحان نهایی ادبیات فارسی دوازدهم-(نظام آموزشی جدید) (00-99)-عبدالرضا مرادی',
              short_title: 'امتحان نهایی ادبیات فارسی',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/adabiat_20210508085031.jpg',
              url: { web: 'http://127.0.0.1/set/1109', api: 'http://127.0.0.1/api/v2/set/1109' },
              pamphlets_count: 3,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2021-05-08 08:48:27',
              updated_at: '2021-08-07 12:18:33',
              redirect_code: null
            }, {
              id: 1108,
              redirect_url: null,
              title: 'امتحان نهایی هندسه دوازدهم-(نظام آموزشی جدید) (00-99)-سید محمد رضا حسینی فرد',
              short_title: 'امتحان نهایی هندسه',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/hendese_20210518131100.jpg',
              url: { web: 'http://127.0.0.1/set/1108', api: 'http://127.0.0.1/api/v2/set/1108' },
              pamphlets_count: 0,
              videos_count: 5,
              author: null,
              contents: null,
              created_at: '2021-05-08 08:47:01',
              updated_at: '2021-08-07 12:18:32',
              redirect_code: null
            }, {
              id: 1107,
              redirect_url: null,
              title: 'امتحان نهایی حسابان دوازدهم-(نظام آموزشی جدید) (00-99)-صادق ثابتی',
              short_title: 'امتحان نهایی حسابان',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi_r_hesaban_20210508084410.jpg',
              url: { web: 'http://127.0.0.1/set/1107', api: 'http://127.0.0.1/api/v2/set/1107' },
              pamphlets_count: 3,
              videos_count: 10,
              author: null,
              contents: null,
              created_at: '2021-05-08 08:41:31',
              updated_at: '2021-08-07 12:18:32',
              redirect_code: null
            }, {
              id: 1106,
              redirect_url: null,
              title: 'امتحان نهایی گسسته دوازدهم-(نظام آموزشی جدید) (00-99) - صادق ثابتی، محمد رضا حسینی فرد',
              short_title: 'امتحان نهایی گسسته',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/riazi r g_20210510073408.jpg',
              url: { web: 'http://127.0.0.1/set/1106', api: 'http://127.0.0.1/api/v2/set/1106' },
              pamphlets_count: 3,
              videos_count: 9,
              author: null,
              contents: null,
              created_at: '2021-05-08 08:41:19',
              updated_at: '2022-01-26 05:49:06',
              redirect_code: null
            }, {
              id: 777,
              redirect_url: null,
              title: 'امتحان نهایی زیست شناسی سال دوازدهم (نظام آموزشی جدید) - محمدعلی امینی راد',
              short_title: 'امتحان نهایی زیست شناسی سال دوازدهم',
              photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/zist_20200620143224.jpg',
              url: { web: 'http://127.0.0.1/set/777', api: 'http://127.0.0.1/api/v2/set/777' },
              pamphlets_count: 3,
              videos_count: 25,
              author: null,
              contents: null,
              created_at: '2020-03-09 09:10:55',
              updated_at: '2022-01-26 04:46:20',
              redirect_code: null
            }],
            redirect_code: null
          }],
          banners: null,
          updated_at: null
        }
      }
    },
    products () {
      return new ProductList([
        {
          id: 717,
          redirect_url: null,
          title: 'بسته امتحان نهایی 1401 آلا(0)',
          category: 'همایش/امتحان نهایی',
          price: { base: 0, discount: 0, final: 0 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: [{
            id: 1542,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی عربی دوازدهم_ابراهیم غلامی نژاد',
            short_title: 'شبیه ساز امتحان نهایی عربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652952167_7887.jpg',
            url: { web: 'http://127.0.0.1/set/1542', api: 'http://127.0.0.1/api/v2/set/1542' },
            pamphlets_count: 10,
            videos_count: 0,
            author: null,
            contents: null,
            created_at: '2022-05-19 04:52:47',
            updated_at: '2022-05-19 04:52:47',
            redirect_code: null
          },
          {
            id: 1519,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
            url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
            pamphlets_count: 10,
            videos_count: 11,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:39:20',
            updated_at: '2022-05-26 07:16:46',
            redirect_code: null
          },
          {
            id: 1518,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
            url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
            pamphlets_count: 8,
            videos_count: 7,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:38:31',
            updated_at: '2022-05-21 10:21:44',
            redirect_code: null
          },
          {
            id: 1517,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
            url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
            pamphlets_count: 80,
            videos_count: 16,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:37:36',
            updated_at: '2022-05-21 10:20:19',
            redirect_code: null
          },
          {
            id: 1516,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
            url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
            pamphlets_count: 1,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:36:36',
            updated_at: '2022-05-21 10:19:52',
            redirect_code: null
          },
          {
            id: 1514,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
            url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
            pamphlets_count: 1,
            videos_count: 17,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:22:00',
            updated_at: '2022-05-22 03:12:33',
            redirect_code: null
          },
          {
            id: 1513,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
            short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
            url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:18:42',
            updated_at: '2022-05-20 06:37:27',
            redirect_code: null
          },
          {
            id: 1512,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی ادبیات دوازدهم - میثم حسین خانی',
            short_title: 'شبیه ساز امتحان نهایی ادبیات دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687820_7028.jpg',
            url: { web: 'http://127.0.0.1/set/1512', api: 'http://127.0.0.1/api/v2/set/1512' },
            pamphlets_count: 1,
            videos_count: 4,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:16:06',
            updated_at: '2022-05-21 03:23:57',
            redirect_code: null
          },
          {
            id: 1511,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی ریاضی انسانی دوازدهم - محسن زبده کار',
            short_title: 'شبیه ساز امتحان نهایی ریاضی انسانی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687831_6220.jpg',
            url: { web: 'http://127.0.0.1/set/1511', api: 'http://127.0.0.1/api/v2/set/1511' },
            pamphlets_count: 3,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 04:47:49',
            updated_at: '2022-05-21 08:06:01',
            redirect_code: null
          },
          {
            id: 1520,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی حسابان دوازدهم - محمد امین نباخته',
            short_title: 'شبیه ساز امتحان نهایی حسابان دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687690_6619.jpg',
            url: { web: 'http://127.0.0.1/set/1520', api: 'http://127.0.0.1/api/v2/set/1520' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:40:14',
            updated_at: '2022-05-21 10:22:57',
            redirect_code: null
          },
          {
            id: 1521,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی حسابان دوازدهم - مجید صداقت',
            short_title: 'شبیه ساز امتحان نهایی حسابان دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687682_5728.jpg',
            url: { web: 'http://127.0.0.1/set/1521', api: 'http://127.0.0.1/api/v2/set/1521' },
            pamphlets_count: 2,
            videos_count: 10,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:41:48',
            updated_at: '2022-05-21 10:23:19',
            redirect_code: null
          },
          {
            id: 1536,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی تاریخ دوازدهم - حسن رعنایی',
            short_title: 'شبیه ساز امتحان نهایی تاریخ دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687519_1820.jpg',
            url: { web: 'http://127.0.0.1/set/1536', api: 'http://127.0.0.1/api/v2/set/1536' },
            pamphlets_count: 0,
            videos_count: 5,
            author: null,
            contents: null,
            created_at: '2022-05-12 06:45:38',
            updated_at: '2022-05-20 06:37:43',
            redirect_code: null
          },
          {
            id: 1533,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی جغرافی دوازدهم - حسن رعنایی',
            short_title: 'شبیه ساز امتحان نهایی جغرافی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687558_8777.jpg',
            url: { web: 'http://127.0.0.1/set/1533', api: 'http://127.0.0.1/api/v2/set/1533' },
            pamphlets_count: 0,
            videos_count: 5,
            author: null,
            contents: null,
            created_at: '2022-05-12 06:42:13',
            updated_at: '2022-05-20 08:41:09',
            redirect_code: null
          }
          ],
          redirect_code: null
        }, {
          id: 718,
          redirect_url: null,
          title: 'بسته امتحان نهایی 1403 آلا(02)',
          category: 'کنکور',
          price: { base: 1400000, discount: 15000, final: 130000 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: []
        }, {
          id: 719,
          redirect_url: null,
          title: 'همایش آرش',
          category: 'همایش/آرش',
          price: { base: 1400000, discount: 15000, final: 130000 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: [{
            id: 1519,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
            url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
            pamphlets_count: 0,
            videos_count: 11,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:39:20',
            updated_at: '2022-05-26 07:16:46',
            redirect_code: null
          },
          {
            id: 1518,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
            url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
            pamphlets_count: 1,
            videos_count: 7,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:38:31',
            updated_at: '2022-05-21 10:21:44',
            redirect_code: null
          },
          {
            id: 1517,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
            url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
            pamphlets_count: 1,
            videos_count: 16,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:37:36',
            updated_at: '2022-05-21 10:20:19',
            redirect_code: null
          },
          {
            id: 1516,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
            url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
            pamphlets_count: 1,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:36:36',
            updated_at: '2022-05-21 10:19:52',
            redirect_code: null
          },
          {
            id: 1514,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
            url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
            pamphlets_count: 1,
            videos_count: 17,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:22:00',
            updated_at: '2022-05-22 03:12:33',
            redirect_code: null
          },
          {
            id: 1513,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
            short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
            url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:18:42',
            updated_at: '2022-05-20 06:37:27',
            redirect_code: null
          }]
        }, {
          id: 720,
          redirect_url: null,
          title: 'بهمایش   لربیل تایتان',
          category: 'همایش/تایتان',
          price: { base: 1400000, discount: 15000, final: 130000 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: [{
            id: 1519,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
            url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
            pamphlets_count: 0,
            videos_count: 11,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:39:20',
            updated_at: '2022-05-26 07:16:46',
            redirect_code: null
          },
          {
            id: 1518,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
            url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
            pamphlets_count: 1,
            videos_count: 7,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:38:31',
            updated_at: '2022-05-21 10:21:44',
            redirect_code: null
          },
          {
            id: 1517,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
            url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
            pamphlets_count: 1,
            videos_count: 16,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:37:36',
            updated_at: '2022-05-21 10:20:19',
            redirect_code: null
          },
          {
            id: 1516,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
            url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
            pamphlets_count: 1,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:36:36',
            updated_at: '2022-05-21 10:19:52',
            redirect_code: null
          },
          {
            id: 1514,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
            url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
            pamphlets_count: 1,
            videos_count: 17,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:22:00',
            updated_at: '2022-05-22 03:12:33',
            redirect_code: null
          },
          {
            id: 1513,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
            short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
            url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:18:42',
            updated_at: '2022-05-20 06:37:27',
            redirect_code: null
          }]
        }, {
          id: 721,
          redirect_url: null,
          title: 'همایش   تفتان',
          category: 'همایش/تفتان',
          price: { base: 1400000, discount: 15000, final: 130000 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: [{
            id: 1519,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
            url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
            pamphlets_count: 0,
            videos_count: 11,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:39:20',
            updated_at: '2022-05-26 07:16:46',
            redirect_code: null
          },
          {
            id: 1518,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
            url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
            pamphlets_count: 1,
            videos_count: 7,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:38:31',
            updated_at: '2022-05-21 10:21:44',
            redirect_code: null
          },
          {
            id: 1517,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
            url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
            pamphlets_count: 1,
            videos_count: 16,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:37:36',
            updated_at: '2022-05-21 10:20:19',
            redirect_code: null
          },
          {
            id: 1516,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
            url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
            pamphlets_count: 1,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:36:36',
            updated_at: '2022-05-21 10:19:52',
            redirect_code: null
          },
          {
            id: 1514,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
            url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
            pamphlets_count: 1,
            videos_count: 17,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:22:00',
            updated_at: '2022-05-22 03:12:33',
            redirect_code: null
          },
          {
            id: 1513,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
            short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
            url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:18:42',
            updated_at: '2022-05-20 06:37:27',
            redirect_code: null
          }]
        }, {
          id: 722,
          redirect_url: null,
          title: 'نظام قدیم',
          category: 'قدیم',
          price: { base: 1400000, discount: 15000, final: 130000 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: [{
            id: 1519,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
            url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
            pamphlets_count: 0,
            videos_count: 11,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:39:20',
            updated_at: '2022-05-26 07:16:46',
            redirect_code: null
          },
          {
            id: 1518,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
            url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
            pamphlets_count: 1,
            videos_count: 7,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:38:31',
            updated_at: '2022-05-21 10:21:44',
            redirect_code: null
          },
          {
            id: 1517,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
            url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
            pamphlets_count: 1,
            videos_count: 16,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:37:36',
            updated_at: '2022-05-21 10:20:19',
            redirect_code: null
          },
          {
            id: 1516,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
            url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
            pamphlets_count: 1,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:36:36',
            updated_at: '2022-05-21 10:19:52',
            redirect_code: null
          },
          {
            id: 1514,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
            url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
            pamphlets_count: 1,
            videos_count: 17,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:22:00',
            updated_at: '2022-05-22 03:12:33',
            redirect_code: null
          },
          {
            id: 1513,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
            short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
            url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:18:42',
            updated_at: '2022-05-20 06:37:27',
            redirect_code: null
          }]
        }, {
          id: 723,
          redirect_url: null,
          title: 'جزوه',
          category: 'جزوه',
          price: { base: 1400000, discount: 15000, final: 130000 },
          url: { web: 'http://127.0.0.1/product/717', api: 'http://127.0.0.1/api/v2/product/717' },
          photo: 'https://nodes.alaatv.com/upload/images/product/16-2_20220516075141.jpg',
          sets: [{
            id: 1519,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - فرزاد نجفی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687715_3800.jpg',
            url: { web: 'http://127.0.0.1/set/1519', api: 'http://127.0.0.1/api/v2/set/1519' },
            pamphlets_count: 0,
            videos_count: 11,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:39:20',
            updated_at: '2022-05-26 07:16:46',
            redirect_code: null
          },
          {
            id: 1518,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی شیمی دوازدهم - محسن معینی',
            short_title: 'شبیه ساز امتحان نهایی شیمی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687723_6909.jpg',
            url: { web: 'http://127.0.0.1/set/1518', api: 'http://127.0.0.1/api/v2/set/1518' },
            pamphlets_count: 1,
            videos_count: 7,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:38:31',
            updated_at: '2022-05-21 10:21:44',
            redirect_code: null
          },
          {
            id: 1517,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - پرویز کازرانیان',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687767_9909.jpg',
            url: { web: 'http://127.0.0.1/set/1517', api: 'http://127.0.0.1/api/v2/set/1517' },
            pamphlets_count: 1,
            videos_count: 16,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:37:36',
            updated_at: '2022-05-21 10:20:19',
            redirect_code: null
          },
          {
            id: 1516,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک تجربی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687778_6693.jpg',
            url: { web: 'http://127.0.0.1/set/1516', api: 'http://127.0.0.1/api/v2/set/1516' },
            pamphlets_count: 1,
            videos_count: 15,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:36:36',
            updated_at: '2022-05-21 10:19:52',
            redirect_code: null
          },
          {
            id: 1514,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم - محمدرضا زارع',
            short_title: 'شبیه ساز امتحان نهایی فیزیک ریاضی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687795_8049.jpg',
            url: { web: 'http://127.0.0.1/set/1514', api: 'http://127.0.0.1/api/v2/set/1514' },
            pamphlets_count: 1,
            videos_count: 17,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:22:00',
            updated_at: '2022-05-22 03:12:33',
            redirect_code: null
          },
          {
            id: 1513,
            redirect_url: null,
            title: 'شبیه ساز امتحان نهایی دینی دوازدهم - ابوالفضل احدزاده',
            short_title: 'شبیه ساز امتحان نهایی دینی دوازدهم',
            photo: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/1652687803_2872.jpg',
            url: { web: 'http://127.0.0.1/set/1513', api: 'http://127.0.0.1/api/v2/set/1513' },
            pamphlets_count: 1,
            videos_count: 6,
            author: null,
            contents: null,
            created_at: '2022-05-05 05:18:42',
            updated_at: '2022-05-20 06:37:27',
            redirect_code: null
          }]
        }])
    }
  },
  data () {
    return {
      selectedTab: 'pamphlet',
      searchTarget: '',
      selectedFilterBoxValue: null,
      selectedFilterCategoryValue: null,
      filterBoxCategory: [{ name: 'همه', value: 'all', selected: true },
        { name: 'راه ابریشم', value: 'VIP', selected: false },
        {
          name: 'آرش',
          value: 'همایش/آرش',
          selected: false
        },
        {
          name: 'تایتان',
          value:
            'همایش/تایتان',
          selected: false
        },
        {
          name: 'تفتان',
          value:
            'همایش/تفتان',
          selected: false
        },
        { name: 'گدار', value: 'همایش/گدار', selected: false },
        {
          name: 'نظام قدیم',
          value:
            'قدیم',
          selected: false
        },
        {
          name: 'جزوه',
          value: 'جزوه',
          selected: false
        },
        {
          name: 'آزمون',
          value:
            'آزمون/سه آ',
          selected: false
        }],
      filteredProduct: new ProductList(),
      showModalStatus: false,
      filterBoxSort: [
        {
          name: 'جدید ترین ها',
          value: 'data-sort1',
          selected: true
        },
        {
          name: 'قدیمی ترین ها',
          value: 'data-sort2',
          selected: false
        }],
      selectedProduct: new Product(),
      selectedSet: new Set(),
      visibledTabName: 'myProductsRow'
    }
  },
  created: function () {
    this.initPageData()
    let purchases = new ProductList()
    if (this.userAssetsCollection) {
      for (let i = 0; typeof this.userAssetsCollection.data[i] !== 'undefined'; i++) {
        const item = this.userAssetsCollection.data[i]
        if (item.title === 'محصولات من') {
          purchases = new ProductList(item.products)
        }
      }
    }
    this.updateProducts(purchases)
  },
  mounted () {
    this.filterProduct()
    if (this.products.list.length > 0) {
      this.setSelectedSet({
        product: this.products.list[0],
        set: this.products.list[0].sets.list[0]
      })
    }
    this.showModalStatus = false
  },
  methods: {
    filterProduct () {
      this.filterProductByCategory()
      this.sortProducts()
    },
    filterProductBySearchInput () {
      if (!this.searchTarget) {
        return
      }
      this.filteredProduct.list = this.filteredProduct.list.filter(this.hasSearchTarget)
    },
    hasSearchTarget (data) {
      return Assist.stringContain(this.searchTarget, data.title) || data.sets.list.filter(set => (Assist.stringContain(this.searchTarget, set.title))).length > 0
    },
    filterProductByCategory () {
      const newList = this.products.list.filter(product => product.category === this.selectedFilterCategoryValue || this.selectedFilterCategoryValue === 'all')
      this.filteredProduct = new ProductList(newList)
    },
    sortProducts () {
      if (this.selectedFilterBoxValue === 'data-sort1') {
        this.filteredProduct.sortByKey('category', 'asc')
        return
      }
      this.filteredProduct.sortByKey('category', 'des')
    },
    onChangeFilterSortBox (val) {
      this.selectedFilterBoxValue = val
      this.sortProducts()
      this.filterProductBySearchInput()
    },
    onChangeFilterBoxCategory (val) {
      this.selectedFilterCategoryValue = val
      this.filterProductByCategory()
      this.filterProductBySearchInput()
    },
    initPageData () {
      this.setFilterBoxSelected()
      this.setFilterCategorySelected()
    },
    canShowModalForMobileView () {
      return window.screen.width < 768
    },
    setFilterBoxSelected () {
      this.selectedFilterBoxValue = this.filterBoxSort[0].value
      console.log(this.selectedFilterBoxValue)
    },
    setFilterCategorySelected () {
      this.selectedFilterCategoryValue = this.filterBoxCategory[0].value
      console.log('categorySelected', this.selectedFilterCategoryValue)
    },
    async setSelectedSet (data) {
      this.selectedSet = data.set
      this.selectedProduct = data.product
      this.selectedSet.loading = true
      this.selectedSet.contents.clear()
      this.handlesTabs(data.contentType)
      try {
        const contentResponse = await this.getSelectedSetContents()
        this.selectedSet.loading = false
        console.log('contentResponse :', contentResponse)
      } catch (e) {
        this.selectedSet.loading = false
        console.log('err ', e)
      }
    },
    handlesTabs (contentType) {
      this.selectedTab = contentType === 'pamphlet'
        ? 'pamphlet'
        : 'video'
    },
    getSelectedSetContents () {
      return this.$axios.get(Addresses.set.show(this.selectedSet.id), { params: { withContents: true } })
    },
    updateProducts (products) {
      // this.$store.commit('updateAppProps', function (appProps) {
      //   appProps.purchases = products
      // })
    }

  }

}
</script>

<style scoped>
.noContentMessage{
  font-size: 18px;
  font-weight: 500;
  color: white;
  border-radius: 15px;
}

.abrishamAssetBanner {
  /*background: #fec107;*/
  /*padding: 10px;*/
  /*text-align: center;*/
  /*color: white;*/
}

.abrishamAssetBanner img {
  width: 100%;
}

.nav-fill .nav-item {
  cursor: pointer;
}

.productsCol .productsSearch input {
  border-radius: 35px;
  margin-bottom: 15px;
  margin-top: 10px;
}

.list-item {
  display: inline-block;
  margin-right: 10px;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
{
  opacity: 0;
  transform: translateY(30px);
}

.fade-enter-active > *,
.fade-leave-active > * {
  transition-duration: 200ms;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.6, 0.15, 0.35, 0.8);
}

.fade-enter > *,
.fade-leave-to > * {
  opacity: 0;
  transform: translateX(40px);
}

.fade-enter-active > *:nth-child(2) {
  transition-delay: 100ms;
}

.fade-enter-active > *:nth-child(3) {
  transition-delay: 200ms;
}

.fade-leave-active > *:nth-child(1) {
  transition-delay: 200ms;
}

.fade-leave-active > *:nth-child(2) {
  transition-delay: 100ms;
}
</style>
