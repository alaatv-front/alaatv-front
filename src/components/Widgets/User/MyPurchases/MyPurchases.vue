<template>
  <div class="row q-pa-md ">
    <!--    ----------------------------------------------------------------------- filter boxes ------------------------------------------------------------------------------- -->
    <div class="col-12">
      <div class="filter-box-container">
        <div class="q-mb-lg filter-box">
          <q-icon name="mdi-tune-vertical-variant q-mr-md"
                  class="">
            <q-tooltip>
              مرتب سازی بر اساس
            </q-tooltip>
          </q-icon>
          <div class="sortingFilter-item date q-mr-md">
            <filter-box v-model:boxSortSelected="selectedFilterBoxValue"
                        :items="filterBoxSort"
                        type="filterBoxSort"
                        :custom-class="'sort'"
                        @update:filterBoxSort="onChangeFilterSortBox" />
          </div>
          <div class="sortingFilter-item subject q-mr-md">
            <filter-box ref="filterBoxCategory"
                        v-model:categorySelected="selectedFilterCategoryValue"
                        type="filterBoxCategory"
                        :items="filterBoxCategory"
                        :custom-class="'filter'"
                        @update:filterBoxCategory="onChangeFilterBoxCategory" />
          </div>
        </div>
      </div>
    </div>
    <!--    ------------------------------------------------------------------------ banner search products ------------------------------------------------------------------------------ -->
    <div class="col-md-4 col-sm-12 productsCol q-pa-sm-sm q-pa-xs-xs">
      <div class="q-px-xs-none q-pa-sm-md">
        <router-link :to="{name: 'UserPanel.Asset.Abrisham.Progress'}">
          <div class="abrishamAssetBanner">
            <img alt="داشبورد ابریشم"
                 src="https://nodes.alaatv.com/upload/banner-dashboard.jpg">
          </div>
        </router-link>
        <div class="q-mb-md m-input-icon m-input-icon--left productsSearch ">
          <q-input v-model="searchTarget"
                   outlined
                   standout
                   type="text"
                   rounded
                   filled
                   class="form-control m-input m-input--air"
                   placeholder="جستجو ...">
            <template v-slot:prepend>
              <q-icon name="mdi-magnify" />
            </template>
          </q-input>
        </div>
        <transition-group v-if="products.list.length > 0"
                          name="list"
                          tag="div">
          <div v-for="product in filteredProduct.list"
               :key="product.id">
            <purchase-item :key="product.id"
                           :product="product"
                           :searchTarget="searchTarget"
                           @setSelected="setSelectedSet" />
          </div>
        </transition-group>
      </div>
      <!--    --------------------------------------------------------------------------- show content box   --------------------------------------------------------------------------- -->
      <div v-if="!currentProduct.title"
           class="m-portlet__body">
        <div class="text-center bg-primary q-pa-lg noContentMessage">
          <div>
            <q-icon size="28px"
                    name="mdi-information-outline" />
            هنوز محصولی نخریده اید.
          </div>
        </div>
      </div>
    </div>
    <!--    ----------------------- content show ------------------------- -->
    <show-contents class="sm-hide"
                   :selectedSet="selectedSet"
                   :selectedTab="selectedTab" />
    <q-dialog v-model="showContentDialog">
      <q-layout view="lHh lpr lFf"
                container
                style="height: 600px"
                class="shadow-2 bg-white rounded-borders">
        <q-header elevated>
          <q-bar class="bg-yellow-8 tex">
            <q-space />
            <q-btn v-close-popup
                   dense
                   flat
                   text-color="grey-10"
                   icon="close" />
          </q-bar>
        </q-header>
        <q-page class="q-pa-md-md q-pa-sm-none ">
          <show-contents :selectedSet="selectedSet"
                         :selectedTab="selectedTab" />
        </q-page>

      </q-layout>
    </q-dialog>
  </div>
</template>

<script>
import { Set } from 'src/models/Set.js'
import Assist from 'src/plugins/Assist.js'
import Addresses from 'src/api/Addresses.js'
import { Product, ProductList } from 'src/models/Product.js'
import FilterBox from 'components/userPurchases/filterBox.vue'
import PurchaseItem from 'components/userPurchases/PurchaseItem.vue'
import showContents from 'components/userPurchases/showContents.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'MyPurchases',
  components: {
    FilterBox,
    PurchaseItem,
    showContents
  },
  data () {
    return {
      showContentDialog: false,
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
      selectedSet: new Set()
    }
  },
  computed: {
    videoContents() {
      return this.selectedSet.contents.list.filter(content => content.type === 8)
    },
    pamphletsContents() {
      return this.selectedSet.contents.list.filter(content => content.type === 1)
    },
    currentProduct () {
      if (this.filteredProduct.list.length > 0) {
        return this.filteredProduct.list[0]
      }
      return new Product()
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
  watch: {
    searchTarget (value) {
      this.filterProductBySearchInput()
      this.products.list = this.products.list.splice(0, this.products.list.length)
    }
  },
  created () {
    this.initPageData()
  },
  mounted () {
    this.filterProduct()
    this.getFavored()
    this.getPurchasedProducts()
  },
  methods: {
    initPageData () {
      this.setFilterBoxSelected()
      this.setFilterCategorySelected()
      this.setFirstContentsShow()
    },
    getPurchasedProducts () {
      APIGateway.user.getPurchasedProducts()
    },
    getFavored () {
      APIGateway.user.getFavored()
    },
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

    setFirstContentsShow() {
      if (this.products.list.length === 0) {
        return
      }
      const firstSetId = this.products.list[0].sets.list[0].id
      this.handlesTabs()
      this.getContentsData(firstSetId)
    },

    setFilterBoxSelected () {
      this.selectedFilterBoxValue = this.filterBoxSort[0].value
    },
    setFilterCategorySelected () {
      this.selectedFilterCategoryValue = this.filterBoxCategory[0].value
    },
    async getContentsData (setId) {
      this.selectedSet.loading = true
      this.selectedSet.contents.clear()
      try {
        const contentResponse = await this.getSelectedSetContents(setId)
        const test = {
          video: [
            {
              link: 'https://alaatv.com/d/eyJpdiI6IkJ6dGdWVmxQNFEzSVdncWFpYU9WWkE9PSIsInZhbHVlIjoiVDY3dTBkbGd2a3hpTnRxWEV3bTA2aisyaGE2OFdzNWtNYjc5b1EvdUNNSVpVZlczMHdtY3ZCMm1FcnBFdStWNmZTcFMzcjh3WFJob3Y0c1cwa2M5UnRSV0gxWXh3WVBPdVJkMGV0UXpYZzA0VGQyMzJHZHU3TXBGbFhrWEpaVVA1cEhvNDF3R2ZldHorUSs0dExKR01ra1ZhdDh4S01JcGNVcFBrNWVVV2ZHQmpuUW5vTXdaWlhTSFZ0N0JrZVdnIiwibWFjIjoiYTdkMGEyNmRjZWY4NWI4Yjg5ZmZmNzdkMWJjYzM3MTM0OWY0MzM4ZmI3MTA4YmU4ODI5YjhhMmYyYzkwMjA3YyIsInRhZyI6IiJ9',
              ext: 'mp4',
              size: '1.2 G',
              caption: 'کیفیت عالی',
              res: '720p'
            },
            {
              link: 'https://alaatv.com/d/eyJpdiI6IjJ2MEhsRHdXeFdJcHNock1jbnlNUlE9PSIsInZhbHVlIjoiVjZXMVhyMFZsNUh6QnlJM1Z0cTMzYy9WT1hLUXQwWTNoVXZkbzRRcGtpWEQ5SXNESzlqb3NSS3l4bkxDZDdCd3oybHpzZVg4ZzlkWFZqdkQ3YytnQVM5bnJsMjBIZUVMSFVCMVVZdlhOOE0vZG5xZ1R3ekhNWWx4VXUxQ1RCbng4SFNPQnFCZ1VwV2R0bDRpcmNnMWZWdjNzWGhoSHRTcVN0V3UyUmtrb1l3PSIsIm1hYyI6ImZlNmQwY2QyZmYxNDFmMDdhZjQzYjU3MTljNTFmNThlNmE0MWJjN2U0MWViOTZjOTg4OWQ3YWQ1NTc5MzU3ZGUiLCJ0YWciOiIifQ==',
              ext: 'mp4',
              size: '90 MB',
              caption: 'کیفیت بالا',
              res: '480p'
            },
            {
              link: 'https://alaatv.com/d/eyJpdiI6IkY1WjJnZlJHVko0VjcrSWZ5RGxYL3c9PSIsInZhbHVlIjoiM25ZUEZmQjdWcFNOSGRKcU9nN3VZaThjWjk1bEg2dllpUUg5QmIvZ2Y2NWhJQ01pSUpITnpWeU5Icis1NnRZSDZjY3dNM0Y4UlpaZ1Exb0VxSlhqVDVQRGhkdDFFQzNNRTVISTR4OTBMQTQvbk5vd3Y0YWFLZWwxSit0SVpOOUZCck5KSC9hcGh1YW9ERDF3TXBlYldFZzJxLzd6a2ErY29PQ1Vzb3JNSEVvPSIsIm1hYyI6ImQ3NTZmMDlhNTY5MDM2YWM3NzY5NjA4NzMzM2VhNjQzOTYxMTYzMDllMmQ0Yjg1YTc4ZDU1OTkxNzYzMWNhN2QiLCJ0YWciOiIifQ==',
              ext: 'mp4',
              size: '36 MB',
              caption: 'کیفیت متوسط',
              res: '240p'
            }
          ],
          pamphlet: null,
          voice: null
        }
        contentResponse.data.data.contents.forEach(item => {
          if (item.type === 8) {
            item.file = test
          } else {
            item.file = {
              video: null,
              pamphlet: [
                {
                  link: 'https://alaatv.com/d/eyJpdiI6InR2RExYRXduVmtIZDdoeHpDSm9adHc9PSIsInZhbHVlIjoidkl2ZnJvT1BERzQ1L01TdmRINThNbGZDMmk2eTdveDZHNG9OQml1Y2RmNkNRcEt4K2dCeWJFbytKL3pCTU51KzBZZ29PWlNiSC9Qd3FhSWUrSmxPVHZOaG5DWW0rcldYVER1aWlBVHQwUEYxUlFKaE1aL0Z6NmpqVDQvR2lBY094L0k4azk5ZXVhM0graklINFVFcFFsTmQ0QThoU21LSk5FWm1kVGlxWVVRNEErU04zckVJNXlqa2ZFaDdNSnREIiwibWFjIjoiNmU4NGE5YWM1YzgyMTE3ZmM1YmNhNjY1YzVkZjZhMjAyYTg4ZjBmZDA4MzcyNWUyYzM2Nzg2YmQ2NDAxNWFlNiIsInRhZyI6IiJ9',
                  ext: 'pdf',
                  size: '401 KB',
                  caption: 'جزوه'
                }
              ],
              voice: null
            }
          }
        })
        this.selectedSet = new Set(contentResponse.data.data)
        this.selectedSet.loading = false
        // type 8 video
      } catch (e) {
        this.selectedSet.loading = false
      }
    },
    handleShowModal() {
      this.showContentDialog = this.$store.getters['AppLayout/windowSize'].x < 1024
    },
    setSelectedSet (data) {
      this.handleShowModal()
      this.handlesTabs(data.contentType)
      this.getContentsData(data.setId)
    },
    handlesTabs (contentType) {
      this.selectedTab = contentType === 'pamphlet'
        ? 'pamphlet'
        : 'video'
    },
    getSelectedSetContents (setId) {
      return this.$axios.get(Addresses.set.show(setId), { params: { withContents: true } })
    }

  }

}
</script>

<style scoped lang="scss">
.costume-background-color{
  background: #F6F8FA !important;
}
.test{
  overflow-x: scroll;
}
.filter-box-container{
  overflow-x: scroll;
  .filter-box{
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 820px;
  }

}
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

</style>
