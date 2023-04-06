<template>
  <div class="app-bar-container">
    <div class="app-bar">
      <div class="header-section">
        <!--        -----------------------------------------------------Logo Section--------------------------------------------   -->
        <div class="logo-section">
          <div class="drawer-btn hamburger">
            <q-btn v-if="showHamburger"
                   class="toolbar-button"
                   icon="isax:menu-1"
                   color="white"
                   text-color="accent"
                   dense
                   unelevated
                   @click="toggleLeftDrawer" />
          </div>
          <div class="logo-pic">
            <div class="homepage">
              <lazy-img src="https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png"
                        :alt="'logo'"
                        width="40"
                        height="40"
                        class="logo-pic-img"
                        @click="routeTo('Public.Home')" />
            </div>
          </div>
        </div>
        <!--        -----------------------------------------------------Tabs Section--------------------------------------------   -->
        <div class="tab-section">
          <q-list class="flex tabs-list">
            <div v-for="(item , index) in headerItems"
                 :key="index"
                 class="tabs-list-container">
              <div v-if="showMenuItem(/* item */)"
                   class="self-center">
                <template v-if="item.routeName">
                  <item-menu :item="item" />
                </template>
                <template v-if="item.megaMenu">
                  <mega-menu :data="item.megaMenu" />
                </template>
                <template v-if="item.simpleMenu">
                  <simple-menu :menuContent="item.simpleMenu" />
                </template>
              </div>
            </div>
          </q-list>
        </div>
        <!--        -----------------------------------------------------Actions Section--------------------------------------------   -->
        <div class="user-action">
          <div class="action-container">
            <!--            <q-card-section ref="searchInput"-->
            <!--                            class="search-section">-->
            <!--              <q-input v-model="searchInput"-->
            <!--                       filled-->
            <!--                       class="search-input"-->
            <!--                       placeholder="جستجو در آلا...">-->
            <!--                <template v-slot:prepend>-->
            <!--                  <q-btn flat-->
            <!--                         rounded-->
            <!--                         icon="isax:search-normal-1"-->
            <!--                         class="search"-->
            <!--                         @click="filterByStatement" />-->
            <!--                </template>-->
            <!--              </q-input>-->
            <!--            </q-card-section>-->
            <!--            <q-btn-->
            <!--              icon="isax:notification"-->
            <!--              unelevated-->
            <!--              rounded-->
            <!--              size="12px"-->
            <!--              class="action-btn"-->
            <!--            />-->
            <q-btn icon="isax:shopping-cart"
                   unelevated
                   rounded
                   size="12px"
                   class="action-btn"
                   :to="{name: 'Public.Checkout.Review'}">
              <q-menu class="user-card-dropdown"
                      :offset="[170, 10]">
                <div class="dropdown-box">
                  hi
                </div>
              </q-menu>
            </q-btn>
          </div>
          <q-btn v-if="isUserLogin"
                 flat
                 class="btn-user-profile">
            <lazy-img :src="user.photo"
                      :alt="'user photo'"
                      width="48"
                      height="48"
                      class="user-photo" />
            <q-menu class="user-profile-dropdown"
                    :offset="[170, 10]">
              <div class="dropdown-box">
                <div class="header">
                  <div class="profile-box">
                    <div class="profile-detail">
                      <div class="profile-photo-box">
                        <div class="profile-photo-img">
                          <lazy-img :src="user.photo"
                                    :alt="'user photo'"
                                    width="60"
                                    height="60"
                                    class="user-photo" />
                        </div>
                      </div>
                      <div v-if="isUserLogin"
                           class="profile-detail-info">
                        <div class="info-name">{{user.full_name}}</div>
                        <div class="info-phoneNumber">{{user.mobile}}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="body">
                  <div class="user-panel-base-menu">
                    <q-list class="side-menu-list"
                            padding
                            dark>
                      <div v-for="(item , index) in profileTitlesList"
                           :key="index">
                        <div v-if="showMenuItem(/* item */)">
                          <q-item class="item-list"
                                  :class="{ 'alone-item': !(item.children && item.children.length) }"
                                  :to="{ name: item.routeName, params: item.params }">
                            <div class="section-title">
                              <q-item-section class="list-section">
                                {{ item.title }}
                              </q-item-section>
                              <q-item-section class="list-section title-icon"
                                              avatar>
                                <q-avatar :icon="item.icon"
                                          size="30" />
                              </q-item-section>
                              <span class="indicator" />
                            </div>
                          </q-item>
                        </div>
                      </div>
                    </q-list>
                    <div v-if="isUserLogin"
                         class="log-out"
                         @click="logOut">
                      <span>
                        <q-avatar icon="isax:logout"
                                  size="30"
                                  dir="rtl" />
                      </span>
                      <span class="logout-text">خروج </span>
                    </div>
                    <div v-else
                         class="log-out"
                         @click="goToLogin">
                      <span>
                        <q-avatar icon="isax:logout"
                                  size="30"
                                  dir="rtl" />
                      </span>
                      <span class="logout-text">ورود </span>
                    </div>
                  </div>
                </div>
              </div>
            </q-menu>
          </q-btn>
          <div v-else
               class="sub-mit-box">
            <q-btn unelevated
                   class="btn-style"
                   label="ورود"
                   :to="{ name: 'login' }" />
            <q-btn unelevated
                   class="btn-style sign-up"
                   label="ثبت نام"
                   :to="{ name: 'login' }" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { User } from 'src/models/User.js'
import LazyImg from 'src/components/lazyImg.vue'
import megaMenu from './magaMenu.vue'
import simpleMenu from './simpleMenu.vue'
import megaMenuData from 'components/Template/Header/megaMenuData.js'
import itemMenu from 'components/Template/Header/itemMenu.vue'

export default {
  name: 'MainHeaderTemplate',
  components: { LazyImg, megaMenu, simpleMenu, itemMenu },
  data() {
    return {
      menuData: megaMenuData,
      conferenceMenu: false,
      showHamburgerConfig: true,
      searchInput: '',
      user: new User(),
      isAdmin: false,
      isUserLogin: false,
      headerItems: [
        {
          selected: 'home',
          title: 'صفحه اصلی',
          routeName: 'Public.Home',
          permission: 'all'
        },
        {
          selected: 'shop',
          title: 'فروشگاه',
          routeName: 'Public.Shop',
          permission: 'all'
        },
        {
          selected: 'basicContents',
          title: 'فیلم های پایه و کنکور آلاء',
          routeName: '',
          permission: 'all',
          megaMenu: {
            menuTitle: 'فیلم های پایه و کنکور آلاء',
            leftSideImage: false,
            megaMenu: {
              categoryItemsCol: [
                {
                  title: 'دوازدهم و کنکور',
                  category: 'davazdahomVaKonkur',
                  href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور',
                  tags: [
                    'نظام_آموزشی_جدید',
                    'دوازدهم',
                    'کنکور'
                  ]
                },
                {
                  title: 'یازدهم',
                  category: 'yazdahom',
                  href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم',
                  tags: [
                    'نظام_آموزشی_جدید',
                    'یازدهم'
                  ]
                },
                {
                  title: 'دهم',
                  category: 'dahom',
                  href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم',
                  tags: [
                    'نظام_آموزشی_جدید',
                    'دهم'
                  ]
                },
                {
                  title: 'کنکور نظام قدیم',
                  category: 'nezameGhadim',
                  href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور',
                  tags: [
                    'نظام_آموزشی_قدیم',
                    'کنکور'
                  ]
                }
              ],
              subCategoryItemsCol: [
                {
                  cols: [
                    {
                      title: {
                        title: 'دروس اختصاصی ریاضی و تجربی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'دوازدهم',
                        'کنکور',
                        'رشته_ریاضی',
                        'رشته_تجربی'
                      ],
                      items: [
                        {
                          title: 'شیمی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=شیمی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'شیمی'
                          ]
                        },
                        {
                          title: 'فیزیک',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=فیزیک',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'فیزیک'
                          ]
                        },
                        {
                          title: 'ریاضیات تجربی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_تجربی&tags[]=ریاضی_تجربی&tags[]=ریاضی_پایه',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_تجربی',
                            'ریاضی_تجربی',
                            'ریاضی_پایه'
                          ]
                        },
                        {
                          title: 'زیست شناسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_تجربی&tags[]=زیست_شناسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_تجربی',
                            'زیست_شناسی'
                          ]
                        },
                        {
                          title: 'هندسه',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=هندسه&tags[]=هندسه_کنکور',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_ریاضی',
                            'هندسه',
                            'هندسه_کنکور'
                          ]
                        },
                        {
                          title: 'ریاضیات گسسته و آمار و احتمال',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=گسسته&tags[]=آمار_و_احتمال',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_ریاضی',
                            'گسسته',
                            'آمار_و_احتمال'
                          ]
                        },
                        {
                          title: 'حسابان و ریاضی پایه',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=حسابان&tags[]=ریاضی_پایه',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_ریاضی',
                            'حسابان',
                            'ریاضی_پایه'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس اختصاصی انسانی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_انسانی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'دوازدهم',
                        'کنکور',
                        'رشته_انسانی'
                      ],
                      items: [
                        {
                          title: 'عربی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_انسانی&tags[]=عربی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_انسانی',
                            'عربی'
                          ]
                        },
                        {
                          title: 'ریاضی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_انسانی&tags[]=ریاضی_انسانی&tags[]=ریاضی_و_آمار',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_انسانی',
                            'ریاضی_انسانی',
                            'ریاضی_و_آمار'
                          ]
                        },
                        {
                          title: 'علوم و فنون ادبی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=رشته_انسانی&tags[]=علوم_و_فنون_ادبی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'رشته_انسانی',
                            'علوم_و_فنون_ادبی'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس عمومی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=زبان_انگلیسی&tags[]=عربی&tags[]=زبان_و_ادبیات_فارسی&tags[]=دین_و_زندگی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'دوازدهم',
                        'کنکور',
                        'زبان_انگلیسی',
                        'عربی',
                        'زبان_و_ادبیات_فارسی',
                        'دین_و_زندگی'
                      ],
                      items: [
                        {
                          title: 'انگلیسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=زبان_انگلیسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'زبان_انگلیسی'
                          ]
                        },
                        {
                          title: 'عربی عمومی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=دوازدهم&tags[]=کنکور&tags[]=عربی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'دوازدهم',
                            'کنکور',
                            'عربی'
                          ]
                        },
                        {
                          title: 'فارسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=زبان_و_ادبیات_فارسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'زبان_و_ادبیات_فارسی'
                          ]
                        },
                        {
                          title: 'دین و زندگی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دوازدهم&tags[]=کنکور&tags[]=دین_و_زندگی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دوازدهم',
                            'کنکور',
                            'دین_و_زندگی'
                          ]
                        },
                        {
                          title: 'مشاوره',
                          href: 'https://alaatv.com/c?tags[]=مشاوره&tags[]=کنکور&tags[]=کنکوری_ها&tags[]=دوازدهم&tags[]=دوازدهم_رشته__ریاضی&tags[]=دوازدهم_رشته__تجربی&tags[]=دوازدهم_رشته__انسانی&tags[]=من_کنکوری&tags[]=مشاوره_کنکور&tags[]=کنکور1400&tags[]=کنکور1401&tags[]=کنکور99&tags[]=نهم&tags[]=دهم&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=رشته_انسانی&tags[]=نظام_آموزشی_جدید&tags[]=نظام_آموزشی_قدیم',
                          tags: [
                            'مشاوره',
                            'کنکور',
                            'کنکوری_ها',
                            'دوازدهم',
                            'دوازدهم_رشته__ریاضی',
                            'دوازدهم_رشته__تجربی',
                            'دوازدهم_رشته__انسانی',
                            'من_کنکوری',
                            'مشاوره_کنکور',
                            'کنکور1400',
                            'کنکور1401',
                            'کنکور99',
                            'نهم',
                            'دهم',
                            'یازدهم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'رشته_انسانی',
                            'نظام_آموزشی_جدید',
                            'نظام_آموزشی_قدیم'
                          ]
                        }
                      ]
                    }
                  ],
                  showData: true,
                  svg: {
                    title: 'دوازدهم و کنکور',
                    pathColor1: '#900C3F',
                    pathColor2: '#AA0F4A'
                  },
                  category: 'davazdahomVaKonkur',
                  bg: '#ffd6e6'
                },
                {
                  cols: [
                    {
                      title: {
                        title: 'دروس اختصاصی ریاضی و تجربی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'یازدهم',
                        'رشته_ریاضی',
                        'رشته_تجربی'
                      ],
                      items: [
                        {
                          title: 'شیمی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=شیمی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'شیمی'
                          ]
                        },
                        {
                          title: 'فیزیک',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=فیزیک',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'فیزیک'
                          ]
                        },
                        {
                          title: 'ریاضی تجربی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_تجربی&tags[]=ریاضی_تجربی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_تجربی',
                            'ریاضی_تجربی'
                          ]
                        },
                        {
                          title: 'زیست شناسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_تجربی&tags[]=زیست_شناسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_تجربی',
                            'زیست_شناسی'
                          ]
                        },
                        {
                          title: 'هندسه',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=هندسه&tags[]=هندسه_پایه',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_ریاضی',
                            'هندسه',
                            'هندسه_پایه'
                          ]
                        },
                        {
                          title: 'آمار و احتمال',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=آمار_و_احتمال',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_ریاضی',
                            'آمار_و_احتمال'
                          ]
                        },
                        {
                          title: 'حسابان',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_ریاضی&tags[]=حسابان',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_ریاضی',
                            'حسابان'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس اختصاصی انسانی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_انسانی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'یازدهم',
                        'رشته_انسانی'
                      ],
                      items: [
                        {
                          title: 'علوم و فنون ادبی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=رشته_انسانی&tags[]=علوم_و_فنون_ادبی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'رشته_انسانی',
                            'علوم_و_فنون_ادبی'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس عمومی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=زبان_انگلیسی&tags[]=عربی&tags[]=زبان_و_ادبیات_فارسی&tags[]=دین_و_زندگی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'یازدهم',
                        'زبان_انگلیسی',
                        'عربی',
                        'زبان_و_ادبیات_فارسی',
                        'دین_و_زندگی'
                      ],
                      items: [
                        {
                          title: 'انگلیسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=زبان_انگلیسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'زبان_انگلیسی'
                          ]
                        },
                        {
                          title: 'عربی عمومی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=یازدهم&tags[]=عربی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'یازدهم',
                            'عربی'
                          ]
                        },
                        {
                          title: 'فارسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=زبان_و_ادبیات_فارسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'زبان_و_ادبیات_فارسی'
                          ]
                        },
                        {
                          title: 'دین و زندگی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=یازدهم&tags[]=دین_و_زندگی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'یازدهم',
                            'دین_و_زندگی'
                          ]
                        }
                      ]
                    }
                  ],
                  category: 'yazdahom',
                  showData: false,
                  bg: '#ffe0e9',
                  svg: {
                    title: 'یازدهم',
                    pathColor1: '#C70039',
                    pathColor2: '#E90849'
                  }
                },
                {
                  cols: [
                    {
                      title: {
                        title: 'دروس اختصاصی ریاضی و تجربی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'دهم',
                        'رشته_ریاضی',
                        'رشته_تجربی'
                      ],
                      items: [
                        {
                          title: 'شیمی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=شیمی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'شیمی'
                          ]
                        },
                        {
                          title: 'فیزیک',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=فیزیک',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'فیزیک'
                          ]
                        },
                        {
                          title: 'زیست شناسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_تجربی&tags[]=زیست_شناسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_تجربی',
                            'زیست_شناسی'
                          ]
                        },
                        {
                          title: 'هندسه',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_تجربی&tags[]=رشته_ریاضی&tags[]=هندسه&tags[]=هندسه_پایه',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_تجربی',
                            'رشته_ریاضی',
                            'هندسه',
                            'هندسه_پایه'
                          ]
                        },
                        {
                          title: 'ریاضی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=ریاضی_پایه',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'ریاضی_پایه'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس اختصاصی انسانی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_انسانی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'دهم',
                        'رشته_انسانی'
                      ],
                      items: [
                        {
                          title: 'ریاضی و آمار',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_انسانی&tags[]=ریاضی_و_آمار',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_انسانی',
                            'ریاضی_و_آمار'
                          ]
                        },
                        {
                          title: 'علوم و فنون ادبی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=رشته_انسانی&tags[]=علوم_و_فنون_ادبی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'رشته_انسانی',
                            'علوم_و_فنون_ادبی'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس عمومی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=زبان_انگلیسی&tags[]=عربی&tags[]=زبان_و_ادبیات_فارسی&tags[]=دین_و_زندگی'
                      },
                      tags: [
                        'نظام_آموزشی_جدید',
                        'دهم',
                        'زبان_انگلیسی',
                        'عربی',
                        'زبان_و_ادبیات_فارسی',
                        'دین_و_زندگی'
                      ],
                      items: [
                        {
                          title: 'انگلیسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=زبان_انگلیسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'زبان_انگلیسی'
                          ]
                        },
                        {
                          title: 'عربی عمومی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=دهم&tags[]=عربی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'دهم',
                            'عربی'
                          ]
                        },
                        {
                          title: 'فارسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=زبان_و_ادبیات_فارسی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'زبان_و_ادبیات_فارسی'
                          ]
                        },
                        {
                          title: 'دین و زندگی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_جدید&tags[]=دهم&tags[]=دین_و_زندگی',
                          tags: [
                            'نظام_آموزشی_جدید',
                            'دهم',
                            'دین_و_زندگی'
                          ]
                        }
                      ]
                    }
                  ],
                  category: 'dahom',
                  showData: false,
                  bg: '#ffe6dd',
                  svg: {
                    title: 'دهم',
                    pathColor1: '#FF5733',
                    pathColor2: '#FF6F51'
                  }
                },
                {
                  cols: [
                    {
                      title: {
                        title: 'دروس اختصاصی ریاضی و تجربی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی'
                      },
                      tags: [
                        'نظام_آموزشی_قدیم',
                        'کنکور',
                        'رشته_ریاضی',
                        'رشته_تجربی'
                      ],
                      items: [
                        {
                          title: 'شیمی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=شیمی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'شیمی'
                          ]
                        },
                        {
                          title: 'فیزیک',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=فیزیک',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'فیزیک'
                          ]
                        },
                        {
                          title: 'ریاضیات تجربی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_تجربی&tags[]=ریاضی_تجربی&tags[]=ریاضی_پایه',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_تجربی',
                            'ریاضی_تجربی',
                            'ریاضی_پایه'
                          ]
                        },
                        {
                          title: 'زیست شناسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_تجربی&tags[]=زیست_شناسی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_تجربی',
                            'زیست_شناسی'
                          ]
                        },
                        {
                          title: 'هندسه تحلیلی و هندسه پایه',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=هندسه_پایه&tags[]=هندسه&tags[]=تحلیلی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'هندسه_پایه',
                            'هندسه',
                            'تحلیلی'
                          ]
                        },
                        {
                          title: 'ریاضیات گسسته و آمار و احتمال',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=گسسته&tags[]=آمار_و_مدلسازی&tags[]=جبر_و_احتمال',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'گسسته',
                            'آمار_و_مدلسازی',
                            'جبر_و_احتمال'
                          ]
                        },
                        {
                          title: 'دیفرانسیل، حسابان و ریاضی پایه',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=حسابان&tags[]=دیفرانسیل&tags[]=ریاضی_پایه',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'حسابان',
                            'دیفرانسیل',
                            'ریاضی_پایه'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس اختصاصی انسانی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_انسانی'
                      },
                      tags: [
                        'نظام_آموزشی_قدیم',
                        'کنکور',
                        'رشته_انسانی'
                      ],
                      items: [
                        {
                          title: 'فلسفه و منطق',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_انسانی&tags[]=منطق',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_انسانی',
                            'منطق'
                          ]
                        },
                        {
                          title: 'ریاضی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_انسانی&tags[]=ریاضی_انسانی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_انسانی',
                            'ریاضی_انسانی'
                          ]
                        },
                        {
                          title: 'ادبیات و زبان فارسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=رشته_انسانی&tags[]=زبان_و_ادبیات_فارسی_انسانی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'رشته_انسانی',
                            'زبان_و_ادبیات_فارسی_انسانی'
                          ]
                        }
                      ]
                    },
                    {
                      title: {
                        title: 'دروس عمومی',
                        href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=زبان_انگلیسی&tags[]=عربی&tags[]=زبان_و_ادبیات_فارسی&tags[]=دین_و_زندگی'
                      },
                      tags: [
                        'نظام_آموزشی_قدیم',
                        'کنکور',
                        'زبان_انگلیسی',
                        'عربی',
                        'زبان_و_ادبیات_فارسی',
                        'دین_و_زندگی'
                      ],
                      items: [
                        {
                          title: 'انگلیسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=زبان_انگلیسی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'زبان_انگلیسی'
                          ]
                        },
                        {
                          title: 'عربی عمومی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=رشته_ریاضی&tags[]=رشته_تجربی&tags[]=کنکور&tags[]=عربی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'رشته_ریاضی',
                            'رشته_تجربی',
                            'کنکور',
                            'عربی'
                          ]
                        },
                        {
                          title: 'ادبیات و زبان فارسی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=زبان_و_ادبیات_فارسی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'زبان_و_ادبیات_فارسی'
                          ]
                        },
                        {
                          title: 'دین و زندگی',
                          href: 'https://alaatv.com/c?tags[]=نظام_آموزشی_قدیم&tags[]=کنکور&tags[]=دین_و_زندگی',
                          tags: [
                            'نظام_آموزشی_قدیم',
                            'کنکور',
                            'دین_و_زندگی'
                          ]
                        }
                      ]
                    }
                  ],
                  category: 'nezameGhadim',
                  showData: false,
                  bg: '#fff2e1',
                  svg: {
                    title: 'کنکور نظام قدیم',
                    pathColor1: '#FF9000',
                    pathColor2: '#FFA229'
                  }
                }
              ]
            },
            simpleMenu: {
              length: 0,
              prevObject: {
                0: {},
                length: 1
              }
            }
          }
        },
        {
          selected: 'konkurConference',
          title: 'همایش کنکوری آلاء',
          routeName: '',
          permission: 'all',
          megaMenu: {
            menuTitle: 'همایش کنکوری آلاء',
            leftSideImage: true,
            megaMenu: {
              categoryItemsCol: [
                {
                  title: 'چتر نجات',
                  category: 'chatrNejat',
                  href: 'https://alaatv.com/landing/37',
                  photo: 'https://nodes.alaatv.com/upload/chtr_menu_menu.jpg',
                  path: 'landing/37'
                },
                {
                  title: 'راه ابریشم',
                  category: 'raheAbrisham',
                  href: 'https://alaatv.com/landing/25',
                  photo: 'https://nodes.alaatv.com/upload/abrisham_mega_menu_1401.jpg',
                  path: 'landing/25'
                },
                {
                  title: 'کارت هدیه آلاء',
                  category: 'giftcard',
                  href: 'https://alaatv.com/landing/34',
                  photo: 'https://nodes.alaatv.com/upload/taftan_mega_menu_1400.jpg',
                  path: 'landing/34'
                }
              ],
              subCategoryItemsCol: [
                {
                  cols: [],
                  showData: true,
                  category: 'chatrNejat',
                  photo: 'https://nodes.alaatv.com/upload/chtr_menu_menu.jpg'
                },
                {
                  cols: [],
                  showData: false,
                  category: 'raheAbrisham',
                  photo: 'https://nodes.alaatv.com/upload/abrisham_mega_menu_1401.jpg'
                },
                {
                  cols: [],
                  showData: false,
                  category: 'giftcard',
                  photo: 'https://nodes.alaatv.com/upload/taftan_mega_menu_1400.jpg'
                }
              ]
            },
            simpleMenu: {
              length: 0,
              prevObject: {
                0: {},
                length: 1
              }
            }
          }
        },
        {
          selected: 'firstMidSchool',
          title: 'متوسطه اول',
          routeName: '',
          permission: 'all',
          simpleMenu: {
            title: 'متوسطه اول',
            children: [
              {
                title: 'هفتم',
                tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'هفتم'],
                category: 'haftom',
                items: [
                  {
                    title: 'ریاضی',
                    tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'هفتم', 'ریاضی']
                  },
                  {
                    title: 'ادبیات',
                    href: '/set/1047'
                  }
                ]
              },
              {
                title: 'هشتم',
                tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'هشتم'],
                category: 'hashtom',
                items: [
                  {
                    title: 'ادبیات',
                    href: '/set/1085'
                  },
                  {
                    title: 'هندسه',
                    tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'هشتم', 'هندسه']
                  },
                  {
                    title: 'ریاضی',
                    tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'هشتم', 'ریاضی']
                  }
                ]
              },
              {
                title: 'نهم',
                tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'نهم', 'ریاضی'],
                category: 'nohom',
                items: [
                  {
                    title: 'ریاضی',
                    tags: ['نظام_آموزشی_جدید', 'متوسطه1', 'نهم', 'ریاضی']
                  }
                ]
              }
            ]
          }
        },
        {
          selected: 'olympiad',
          title: 'المپیاد',
          routeName: 'Public.Content.Search',
          permission: 'all',
          tags: ['المپیاد']
        }
        // {
        //   selected: 'adminPanel',
        //   title: 'پنل ادمین',
        //   routeName: 'Admin.UploadCenter.Contents',
        //   permission: 'all',
        //   children: []
        // }
      ],
      profileTitlesList: [
        {
          title: 'پروفایل',
          icon: 'isax:user',
          routeName: 'UserPanel.Profile',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'فیلم ها و جزوه های من',
          icon: 'isax:task-square',
          routeName: 'UserPanel.MyPurchases',
          params: null,
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'علاقه مندی های من',
          icon: 'isax:heart',
          routeName: 'UserPanel.MyFavorites',
          params: null,
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'سفارش‌ ها',
          icon: 'isax:clipboard-text',
          routeName: 'UserPanel.MyOrders',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'کارت هدیه',
          icon: 'isax:gift',
          routeName: 'UserPanel.Asset.GiftCard.MyGiftCards',
          permission: 'all',
          active: false,
          children: []
        },
        {
          title: 'داشبورد چتر نجات',
          icon: 'isax:document-1',
          routeName: 'UserPanel.Asset.ChatreNejat.Products',
          permission: 'all',
          active: false
        },
        {
          title: 'داشبورد ابریشم',
          icon: 'isax:document-1',
          routeName: 'UserPanel.Asset.Abrisham.Progress',
          permission: 'all',
          active: false
        }
      ]
    }
  },
  computed: {
    showHamburger () {
      return this.$store.getters['AppLayout/showHamburgerBtn'] || this.$q.screen.lt.md
    },
    computedUserId () {
      const user = this.$store.getters['Auth/user']
      if (!user) {
        return null
      }

      return user.id
    },
    layoutLeftDrawerVisible() {
      return this.$store.getters['AppLayout/layoutLeftDrawerVisible']
    },
    showMenuItem () {
      return (/* item */) => {
        return true
        // return (item.permission === 'all' || this.user.hasPermission(item.permission))
      }
    },
    isRouteSelected () {
      return (itemName) => {
        return (this.$route.name === itemName)
      }
    }
  },
  watch: {
    computedUserId () {
      this.loadAuthData()
    }
  },
  mounted () {
    this.loadAuthData()
    if (this.isAdmin) {
      this.headerItems.push({
        selected: 'adminPanel',
        title: 'پنل ادمین',
        routeName: 'Admin.UploadCenter.Contents',
        permission: 'all',
        children: []
      })
    }
  },
  methods: {
    filterByStatement() {
      const param = {
        q: this.searchInput
      }
      this.$router.push({ name: 'Public.Content.Search', query: param })
    },
    loadAuthData () { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
      this.isAdmin = this.$store.getters['Auth/isAdmin']
      this.isUserLogin = this.$store.getters['Auth/isUserLogin']
    },
    ...mapMutations('AppLayout', [
      'updateVisibilityBreadcrumb',
      'updateBreadcrumbs',
      'updateBreadcrumbLoading',
      'updateLayoutLeftDrawerVisible'
    ]),
    logOut() {
      return this.$store.dispatch('Auth/logOut')
    },
    toggleLeftDrawer() {
      this.updateLayoutLeftDrawerVisible(!this.layoutLeftDrawerVisible)
    },
    hasRoute(route) {
      if (!route) {
        return
      }
      return !!(route.name || route.path)
    },
    goToLogin() {
      this.$router.push({ name: 'login' })
    },
    routeTo(name) {
      this.$router.push({ name })
    }
  }
}
</script>

<style lang="scss" scoped>
.app-bar-container {
  background-color: #fff;
  height: 72px;
  width: 100%;
  color: #333333;
  @media screen and (max-width: 1023px) {
    height: 64px;
  }
  @media screen and (max-width: 599px) {
    background-color: #F4F6F9;
  }
  .app-bar {
    max-width: 1360px;
    //min-width: 1360px;
    margin: auto;
    height: 72px;
    @media screen and (max-width: 1919px) {
      width: 100%;
      //padding-left: 40px;
      //padding-right: 40px;
    }
    @media screen and (max-width: 1439px) {
      padding-left: 35px;
      padding-right: 35px;
    }
    @media screen and (max-width: 1023px) {
      padding-left: 30px;
      padding-right: 30px;
      height: 64px;
    }
    @media screen and (max-width: 599px) {
      padding-left: 20px;
      padding-right: 20px;
    }
    .header-section {
      display: grid;
      grid-template-columns: 86px auto 156px;
      height: 100%;
      @media screen and (max-width: 1023px) {
        grid-template-columns: auto auto;
      }
      @media screen and (max-width: 599px) {
        grid-template-columns: 1fr;
      }
      .logo-section {
        align-items: center;
        display: flex;
        justify-content: space-between;
        @media screen and (max-width: 1023px) {
          justify-self: start;
        }
        @media screen and (max-width: 599px) {
          justify-self: center;
          justify-content: space-between;
          width: 100%;
        }
        .logo-pic {
          cursor: pointer;
          display: flex;
          height: 72px;
          align-items: center;
          @media screen and (max-width: 1023px) {
            height: 64px;
          }
          :deep(.homepage) {
            .logo-pic-img {
              height: 40px;
              width: 40px;
              @media screen and (max-width: 1023px) {
                height: 48px;
                width: 48px;
              }
            }
          }
          //img {
          //
          //}
        }
        .hamburger {
          //display: none;
          @media screen and (max-width: 1023px) {
            //display: block;
            margin-right: 20px;
            margin-left: -8px;
          }
          @media screen and (max-width: 599px) {
            margin-left: 0;
          }
        }
        .drawer-btn {
          :deep(.q-btn) {
            flex-direction: row !important;
          }
        }
      }
      .tab-section {
        height: 72px;
        margin-left: 24px;
        .tabs-list {
          height: 72px;
          .tab-title {
            font-style: normal;
            font-weight: 400;
            font-size: 16px;
            line-height: 25px;
          }
          .tabs-list-container{
            display: grid;
          }
        }
        @media screen and (max-width: 1023px) {
          height: 64px;
          display: none;
        }
      }
      .active-item {
        color: #FFC107;
      }
      .user-action {
        .action-container {
          display: flex;
          height: 42px;
          .search-section {
            height: 40px;
            .search-input {
              width: 300px;
              height: 40px;
              background: #F1F3F4;
              //border-radius: 10px;

              &:deep(.q-field__append) {
                padding-right: 8px !important;

                .q-icon {
                  color: #6D708B;
                  cursor: pointer;
                }
              }

              &:deep(.q-field__control) {
                background: #F1F3F4;
                height: 40px;
              }

              &:deep(.q-field__marginal) {
                height: auto;
                padding: 0;
              }

              .search {
                color: #6D708B;
                height: 40px;
                width: 40px;
                :deep(.q-field__inner .q-field__control .q-field__append .q-icon) {
                  color: #6D708B;
                }
                :deep(.q-btn__content) {
                  margin: 0;
                }
              }
            }
            @media screen and (max-width: 780px) {
              display: none;
            }
          }
          &:deep(.q-card__section) {
            padding: 0;
            margin-right: 18px;

            .q-field--filled .q-field__inner .q-field__control {
              background: #F1F3F4;
            }

            .q-field--filled .q-field__inner .q-field__control .q-field__append, .q-field--filled .q-field__inner .q-field__control .q-field__prepend {
              padding-right: 16px;
              padding-left: 12px;
              height: 40px;
            }

            .q-field__inner {
              //border-radius: 0px;
              .q-field__control {
                color: transparent;
                min-height: 0;
                padding: 0;
                &:before {
                  border-color: transparent;
                }
                &:hover:before {
                  border-color: transparent;
                }
              }
            }
          }
        }
        .sign-up-btn {
          :deep(.q-btn .q-btn__content) {
            margin-left: 10px;
            margin-right: 10px;
          }
        }
        @media screen and (max-width: 1023px) {
          justify-self: end;
          height: 64px;
        }
        @media screen and (max-width: 599px) {
          display: none;
        }
        display: flex;
        //justify-content: flex-end;
        align-items: center;
        height: 72px;
        justify-self: end;
        .btn-user-profile {
          margin-left: 18px;
          width: 48px;
          height: 48px;
          border-radius: 16px;
          :deep(.q-btn__content) {
            width: 100%;
            margin: 0;
            .user-photo {
              width: 100%;
              img {
                border: 2px solid #FFB74D;
                border-radius: 16px;
                max-width: 100%;
                width: 100%;
              }
            }
          }
        }
        .action-btn {
          margin: 4px;
          color: #333;
        }
        .fit-profile-img {
          width: 48px;
          height: 48px;
          border-radius: 16px;
        }
      }
    }
  }
  .sub-mit-box{
    background: #FFFFFF;
    border-radius: 16px;
    display: flex;
    margin-bottom: 0px;
    padding: 0px;

    .btn-style{
      width: 96px;
      //color: #6D708B;
      color: #333333 !important;

      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 22px;
      align-items: center;
      text-align: center;
      letter-spacing: -0.03em;
    }
    .sign-up {
      background: #FFC107;
    }
  }
}
</style>

<style lang="scss">
.user-profile-dropdown {
  width: 280px;
  //height: 300px;
  background: #FFFFFF;
  border: 1px solid #F2F5F9;
  border-radius: 0 16px 16px 16px #{"/* rtl:ignore */"};
  .header {

    box-shadow: 0 6px 10px rgba(49, 46, 87, 0.04) #{"/* rtl:ignore */"};
    border-radius: 0 15px 0 0 #{"/* rtl:ignore */"};
  }
  .profile-box {
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 22px;
    text-align: left;
    color: #6D708B;
    border-radius: 20px;
    padding: 16px;
    margin-bottom: 16px;
    .profile-detail {
      display: grid;
      grid-template-columns: 70px auto;
      align-items: center;
      .profile-photo-box {
        //background: #FFB74D;

        width: 60px;
        height: 60px;
        border: 3px solid #FFFFFF;
        border-radius: 16px;
        position: relative;
        .profile-photo-img {
          .q-img {
            border-radius: 16px;
            height: 100%;
          }
          width: 60px;
          height: 60px;
          border-radius: 16px;
          .user-photo {
            img {
              border: 2px solid #FFB74D;
              border-radius: 16px;
              max-width: 100%;
              width: 100%;
            }
          }
        }
        .profile-photo-badge {
          position: absolute;
          bottom: -15px;
          left: -7px;
        }
      }
      .profile-detail-info {
        .info-name {
          font-weight: 600;
          font-size: 16px;
          line-height: 25px;
          color: #434765;
        }
        .info-phoneNumber {}
      }
    }
  }
  .user-panel-base-menu {
    display: flex;
    flex-direction: column;
    color: #6D708B;

    .q-list {
      color: #6D708B;
      padding: 0;

      &.side-menu-list {
        .top-separator {
          margin: 0 40px 32px 40px;
        }

        .q-item {
          padding: 0;
          min-height: 0;

          &.item-list {
            display: flex;
            flex-direction: column;
            justify-content: center;
            font-weight: 400;
            font-size: 14px;
            line-height: 22px;
            cursor: pointer;
            padding: 0 14px 0 10px;
            border-radius: 14px;
            &.alone-item {
              height: 40px;

              &.active-route-side-mode {
                .indicator {
                  height: 8px;
                  width: 8px;
                  background-color: white;
                  border-radius: 50%;
                  margin: auto;
                }
              }
            }
            &.alone-item-mode-drawer {
              &.active-route-side-mode {
                .indicator {
                  background-color: #6D708B6B !important;
                }
              }
            }

            .section-title {
              height: 30px;
              display: flex;
              flex-direction: row;
              align-items: center;

              .title-icon {
                margin-left: 12px;
              }

              .q-item__section--side {
                padding: 0;
              }
            }

            .list-section {
              display: flex;
              flex-direction: row;
              justify-content: flex-start;

              .q-avatar {
                height: 22px;
                width: 22px;
              }
            }
          }
        }

        .side-expansion-list {
          &.top-expansion {
            margin-bottom: 10px;
          }

          .expansion-body {
            display: flex;
            margin-left: 8px;
          }

          .q-expansion-item__content {
            .vertical-separator {
              margin: 6px 9px 9px 9px;
            }
          }

          .q-list {
            &.list-expansion {
              margin-bottom: 0;

              .item-list-expansion {
                height: 30px;
                margin: 5px;

                .item-list-expansion-title {
                  justify-content: start;
                }
              }

              .top-expansion-separator {
              }

              .list-child-item {
                height: 30px;
                justify-content: right;
                margin-bottom: 8px;
                width: 157px;
                border-radius: 10px;
                padding: 0 14px;

                &:last-child {
                  margin-bottom: 0;
                }

                .list-child-section {
                  font-size: 14px !important;
                  justify-content: center;
                }
              }
            }
          }
        }

        .active-route-side-mode {

          background-color: #8075DC;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
          }
        }
        .item-mode-drawer {
          background: #F6F9FF;
          .indicator {
            height: 6px;
            width: 6px;
            border-radius: 50%;
            margin: auto;
            background-color: #6D708B6B ;
          }
        }

      }

      .q-item__section--avatar {
        min-width: 0 !important;
      }

      a {
        text-decoration: none;
        padding: 0;
      }
    }

    &.list-side-mode {
      color: white;
      .q-list {
        a {
          color: white;
        }
      }
    }

    &.list-drawer-mode {
      color: #6D708B;
      .q-list {
        a {
          color: #6D708B;
        }
      }
    }

    .log-out {
      font-weight: 400;
      font-size: 14px;
      line-height: 22px;
      cursor: pointer;
      height: 40px !important;
      padding: 0 6px;
      //width: 232px;
      border-radius: 14px;
      display: flex;
      align-items: center;
      margin-top: 15px;
      //@media screen and (max-width: 1439px) {
      //  margin: 0 31px 33px 31px;
      //}
      //@media screen and (max-width: 599px) {
      //  margin: 0 30px 30px 30px;
      //  //padding: 0 0 0 10px;
      //}

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }

      .q-avatar {
        height: 22px;
        width: 22px;
        margin-right: 12px;
        transform: matrix(-1, 0, 0, 1, 0, 0);
      }
    }
  }
  .body {
    padding-right: 16px;
    padding-left: 16px;
  }
}
</style>
