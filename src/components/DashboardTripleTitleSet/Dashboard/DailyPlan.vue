<template>
  <div class="row">
    <div class="col-12">
      <div class="daily-plan-wrapper">
        <div class="daily-plan-header">
          <div v-if="loading"
               class="plan-title">
            <q-skeleton height="35px"
                        width="130px" />
          </div>
          <div v-else
               class="plan-title">
            برنامه امروز
          </div>
          <div class="navigation">
            <q-btn class="navigation-btn"
                   round
                   icon="chevron_right"
                   @click="scrollToIndex('prev')" />
            <q-btn class="navigation-btn"
                   round
                   icon="chevron_left"
                   @click="scrollToIndex('next')" />
          </div>
        </div>
        <div v-if="loading"
             class="flex justify-evenly">
          <q-skeleton v-for="item in 4"
                      :key="item"
                      height="150px"
                      width="300px"
                      class="q-my-md" />
        </div>
        <div v-else
             class="scroll-wrapper">
          <q-virtual-scroll v-slot="{ item, index }"
                            ref="virtualListRef"
                            :items="planList"
                            virtual-scroll-horizontal
                            @virtual-scroll="onVirtualScroll">
            <div :key="index"
                 class="row plan-item-wrapper">
              <plan-item :plan="item" />
            </div>
          </q-virtual-scroll>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinTripleTitleSet } from 'src/mixin/Mixins.js'
import PlanItem from 'src/components/DashboardTripleTitleSet/Dashboard/PlanItem.vue'
export default defineComponent({
  name: 'DailyPlan',
  components: {
    PlanItem
  },
  mixins: [mixinTripleTitleSet],
  props: {
    studyPlanId: {
      type: Number,
      default: null
    }
  },
  data() {
    return {
      studyPlanList: [],
      planList: [],
      targetIndex: 0,
      virtualListIndex: 0,
      baseIndex: 3,
      lastScroll: 'next',
      loading: false
    }
  },
  watch: {
    studyPlanId() {
      this.getPlans()
    }
  },
  mounted() {
    this.getPlans()
  },
  methods: {
    getPlans() {
      const fakeplans = [
        {
          id: 3483,
          title: 'زیست',
          description: 'جلسه 1 و 2',
          long_description: '<p dir="auto"></p>',
          start: '09:00:00',
          end: '09:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33894,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - دستگاه گوارش ، مقدمات لوله گوارش',
              url: {
                web: 'http://office.alaa.tv:700/c/33894',
                api: 'http://office.alaa.tv:700/api/v2/c/33894'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ii9ORlZVNkVyMmxuajByWTg3K0oyTXc9PSIsInZhbHVlIjoiWHYzVjVyNlRyUnhuRXpZS3l0dHhhSEh2Z2hRRGxmT052NVFpZFVSS3l6a0lIYjBuTnJpN09OSWFpK0VXRXV2eCtlZlprUXVGZXZodXBkczFsNUl0eFI0WFg1V1hSL2NBNDlHK01DU1JrSWpsQmVFTUZuaGwxVXNZck8yd0dGeEIyK3JnazJUWVpZT2pYNzdEREIwYXhwYlRvR3ptdmROWlo0dWI5UmhyaW92TTJhdXI3WmxZTENOa0xrYXVleXAyIiwibWFjIjoiOTY0OTlkNjZmOTNkZmYxYjljNDNlOWEzNWRmZTdiYTdjN2UxYzdhMjQxMzNiYzNkOGJmM2RmOWU4YTMxZWFiNCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '431.06 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Im1ZRlJwY21UeEVDam9sa1NZQllwdEE9PSIsInZhbHVlIjoiWHZpSE91TjJuNHl2dCtNTlc4WndaVzYxWlIyV2twRWdFMEVtSkl3VHJmUWpOVEFSTzRQMnhTNXdPMFdUSnZzMkg3MUIrSGlvQXZnVVpLSWcyb0lBNWk5NW96NnU2RkprT25MdG5aVEpNRFpBaFNDYkVpSG5wMkc1a1hWcGVubkRsREwxT2FIb0Y4ZjRpckEydEFhSkE1Z0IxTm1PbXJpNWx1dkYxUWFGNE9NPSIsIm1hYyI6ImU3NzZiNGY5MjY2MTNkODFkYzdiZmRlMGFiM2JmNDMxMTAwYTIzMjNjOTVmYzExMGNjZWRjYWRjZDdjYzI0NTkiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '88.51 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImN4NHlSRDV1NWxCaTB1SGtKRCtCV3c9PSIsInZhbHVlIjoiQU40aFB2SkJ0WWNFS3lDU09JRnhFdmhBQUp0dTB0MUN5cGlGSVdjTGxkZ1g2ZEVhcitVWmt5Z0owVVRiUG8wb2J4c3RMMW93VUtZOGd4b042ZHFyTjNvcUZKNkRTTGN6LzI4SktGZG9vbHpxQUJ5cjJqTEZnNzZRRldsRzlCcFB5QWJZUG5xOXNFRHJpQXdJbzh5R2wwRW5wNTh4TWp6NlpUaFlGY0ZKNFY4PSIsIm1hYyI6ImU2MmZmMTllMjM5NTFkMmMyYWVlYWQxZjAxMDVjODdkZTE2OGM1OWQzNzFkZDQyM2VjYTNlNTVlODRmMmFjODgiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '38.4 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439001jghf.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1439,
                redirect_url: null,
                title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1439',
                  api: 'http://office.alaa.tv:700/api/v2/set/1439'
                },
                redirect_code: null
              }
            },
            {
              id: 33895,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - دستگاه گوارش ، دهان و معده',
              url: {
                web: 'http://office.alaa.tv:700/c/33895',
                api: 'http://office.alaa.tv:700/api/v2/c/33895'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImhiZ29obHZUOTJTY01xbGxnOGVTVUE9PSIsInZhbHVlIjoiRG5tWjVQTXdzSkdVWVZQYUk4WWEvbEJ5SGtjZ2F5UVdSMDVEcXgxUS9hK2hzbFhtanNxVVdSRWJ2V0xFNDlXeVpGYWNFSGJld0tPcEhscFlBbmVZRnIrMGZMNFFrZHEvcEhEem1hOXB4YXAwZXNPS0pvZEkvTHoxTWdZVVZWS3IvOFdyeUFteXR0Y2xpYVR0NG5POGxXUkpBNHoyL25kM1VkUVNqaWtvWHFwWEVmS2txckcrbjlPOG1VeTdXTW85IiwibWFjIjoiMDBjYmQyNDk3ZjMyYTM2MDhiNDhjYjM1MTRkMGMxNmVjZjJkMGRiYmUyMjA0YmI5MzM3ZGYxODZkOGYzNzVlZCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '446.98 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlZycmN6RzFQSkFXbUhUclpySnRrYUE9PSIsInZhbHVlIjoiakpjUDNGdEtOQmY2ejNmWExxeDlIdHR2OE5yZ1FCb3pRU1Z5eW1WR2FHT2l2V0xIK21XYXpoTzN4cjBZblJiWUlBNXdla3BQenZoRy9MbHlYZGtNNEJIZ1ZjbkV6MzIrcTVWbldUUDMyVzNUZDF0SU5MWVQxRlF4RFNtRG9TTmRJUTJpNVl5a0U0clA3TUdmWWF2UXZ0Ly9iRS8zQUpLRVo5WkVWY05MYWlZPSIsIm1hYyI6ImIzYTA1OGE3NTkzOGFhZTkyMjhhMjhlNjVhMWI0OTJiMDUzZDUxZWZjZmNiOTQ3ZjIwMDdiMTRkNmQ4YzYxZTIiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '92.92 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImpnbHkrd0k4MmJhSzdMZXhJVTJZWXc9PSIsInZhbHVlIjoiZSs5U01JR0RjWDdWbXlobTBnSjFqOVZnQm1OS1J2eElBOHhlZHgvdnBWc0hiMWwwWS9oWmppbm04ZnFCTnM4VHlDRHo0N0xnUlBhYk1MUmZPZ3pFMG1CRlJDd2x0RW5ydUFvaUJlSVRIVlo0ajlKQkJLb3BKNkpUYldzdiszRlQ2UXZKRllrdnRjNXJzMWN0VUNNWlAwK09NUkl2NmVRWFNnYlR2ajVla2JVPSIsIm1hYyI6ImMxYzllMjIxMTJiNjJhODc4MzkwNmI1OWZjOWI2NjA2NGJhNzNkYjkzMGY1Mzc5M2UwZWY5MzZmNmVhYWVmMjAiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '40.13 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439002yhui.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1439,
                redirect_url: null,
                title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1439',
                  api: 'http://office.alaa.tv:700/api/v2/set/1439'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 657,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3484,
          title: 'زیست',
          description: 'جلسه 3 و 4',
          long_description: '<p dir="[object Object]"></p>',
          start: '10:00:00',
          end: '10:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33896,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'تست - دستگاه گوارش،  تست جلسات 1 و 2',
              url: {
                web: 'http://office.alaa.tv:700/c/33896',
                api: 'http://office.alaa.tv:700/api/v2/c/33896'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InFoY3h1VzhnbVBmbXNReGtHZ1Vmcnc9PSIsInZhbHVlIjoickhnOXV0Z2l5MnNvRzk0bloxTEdKcXY4c3V2NFhNekNFYzNvd2JlUG1uZ2tXd2doR1liU2RiY3AwdVJoWVFMZVd4dERNRnl3cHFSRFdCWi9sWnlKbUNnYzNGNCtObWx5OWJ1UDJqQllpUkdNUlpnZ1hOcytRTDVnRE1GVkFqUVF6N0pUM3VwdEl6S0ZIcjZUQmxZSzloVStYbDU1VHFIOVAxUzM4N0NlajZxTitaeDU5Ky9tUDNOb2JEK0RyeitKIiwibWFjIjoiMzZlMWYzZmVkMWM2YjdhNzQ2ZmE3NGQ4OGQzYWY3MGMwYzY0MzAyMzI5YzczMzAzYTFlNzIxZjk0MDM5YTQ2OCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '407.14 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImdVNGJKM1E3NUQzdHpiNFJheFFiTEE9PSIsInZhbHVlIjoiRXF6R3U3UDdzZngwQStKY1ZaZzRoRjBkNTZ1Wkpkc2RVQVZyMlFBVTFqMThiN25lZ2VEWmZqZTNEUVNDWjFCOE1QRFhVVFhmbk9yTTR5cmRjWW9oelNZMzJkNkpDeDBwSEtjRmw1MDJ1eG5zZSt1SVNyOGo0OXpiZjdqVlU3aFIwVW4vc0R6ZTNSTEtWRjF1QXA5VUxqdVZMeWhlVm92WU5wM2FFaEpoR0Z3PSIsIm1hYyI6ImZkNTVhNzcxNTcxNTJjYTk1ZjljYjg2ZGE4MjAwYzIwZjM4MGY4ZDQ3YTE4ODBkMjM1Y2ViMjc1YTc3Mzc1ODMiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '79.09 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImFrRVlaTWtycWpTcHk1U0ljUUdxSHc9PSIsInZhbHVlIjoiSjVWYmVKVE5STmVmcEtMYVFvTFVmYTFHc1pnanNvclFTRGJXc0MyODVKMUowN05rYjlUZUNOTHRMOS80Tmc1d0VlcERiVWFrQWtvWGQ1d0hCWXdBOFdvUThvNkI0VTk4RFl3aUVPT2RPaEU0ZVVuV25ZMCtTai9pQTFFMzVKM3Z1K0o0ek5XL2h4V29YcmJETHVENTVhUWVXc0tTcXA0aGpFc0IzdytyN0VFPSIsIm1hYyI6IjkwZmU4NTc2YmQ3ZDllYjczNDY5YTJkZmY1N2VmMjJmOGUxYWZmMThmZTA3NWUxNGEzMzI1ZWVkZWJlZTM4MGUiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '33.02 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439003edsr.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1439,
                redirect_url: null,
                title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1439',
                  api: 'http://office.alaa.tv:700/api/v2/set/1439'
                },
                redirect_code: null
              }
            },
            {
              id: 33897,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - دستگاه گوارش ، روده باریک - قسمت اول',
              url: {
                web: 'http://office.alaa.tv:700/c/33897',
                api: 'http://office.alaa.tv:700/api/v2/c/33897'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImxzbEkwQks0SzF2aEsyUHYvRm4waVE9PSIsInZhbHVlIjoicmZXSXNxTE53ME5Yc3pKVVUrVUc0WnBGTnZXV3UyQ2tUOWVFcjNnSStkdEwrS25wRmJSQXd3UUtwWXhyeXJ0bVRTaGRyakNrbmFEUHY2OUxlcUlpSWpvYjAyUTJZSWs0NXFkaE91Q3ErYXFsMEdOQjlUMDJmemROa0R5RmZzZmxDTzc2MXZwUEp2aS9HajZhUlVUQVlPN09xckZUL2h3SklTSTNpRFRtQlVoeklJR3RTRWdTb3RTWTBaRUdiVEhoIiwibWFjIjoiZjhmZjQ4ZGIwODg4ZjEwZjA1OTA2ZTg1NGU3OGRiOTA2Y2I5M2E2OWMyNDhkZDZhMTJhNGE2OTE3MzgxZGMyYiIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '330.77 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjNTSWxjZXNKNnlvN0lIdmFGM3VZemc9PSIsInZhbHVlIjoiaTJCRDhYUUoyTzJWQzdzbmNLdmRzMksybmlKcTdNUkZINnhuQ015ak5sYXk5N24vN0lNdXprSDVVMXRBKyttSjJVQjVvZnREM2cxNWZscWVEZHJNVzd2UUVTeWVCbTFBRmZWUUtSOXprdS9MeDRVcCtZU285aHVxUEY2Ny81UFFoZ1hNT1dZMlY2R2xoV0paUVNPcjNPMG4vVnR0cDZZNHFSY1QwcG9HN0Q4PSIsIm1hYyI6IjM5MDE4MDliMDlkYzQ0ZTQzODIyYWExNDNhZmQzNGE3MjQ3ZWM4YTBlMjkxNWNkNmJkNWMxOTI4ZDFmODc1ZWQiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '69.31 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ik1SWHdpNXkyTEhjbFV1NXZZT0YyR1E9PSIsInZhbHVlIjoiZWRIUlp2WU1wTlE2WmFVdnpmejBqOE93c2tkNUZXQmpZRWpzSlZPd0FGdW0rVTBMTUZjcEhKSmlrbWluY2FUbThsclZpK1k4VnFUVnd2SGlVTWVjNGJPaEY3cnBLSkpab21vR2c0ZmpEdE4wN1B5VHMyU2pUSFFnWE52VDh0MGdHSjNRRHhkdVNZTndGMzRpTVk5ekN4cForaDdheW9Ic3JUcXJlQy9tbmFrPSIsIm1hYyI6IjQzMjgzMDMyZGU4ZGQ5MDFjNDI3MmQ2ZjllODViMzYwZDMxYmExZTZjOTRjZThlODM4MjFhMjRlZjhiZDIxM2MiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '29.85 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439004hgyu.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1439,
                redirect_url: null,
                title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1439',
                  api: 'http://office.alaa.tv:700/api/v2/set/1439'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 657,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3485,
          title: 'زیست',
          description: 'جلسه 5 و 6',
          long_description: '<p dir="[object Object]"></p>',
          start: '11:00:00',
          end: '11:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33898,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - دستگاه گوارش ، روده باریک - قسمت دوم',
              url: {
                web: 'http://office.alaa.tv:700/c/33898',
                api: 'http://office.alaa.tv:700/api/v2/c/33898'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImFnamJHMVRxRVQyc1czOGd6RGx5cVE9PSIsInZhbHVlIjoiSjVCTE9mVHpsamJqTzI5aE9ET0tLNjdueVVzRU5GZmtWWFViWWp0ZDZ6Z1NFZlR1ZUg2Z1UvTnFjbjVmRDVjU2JyVWhrVTVId0N4bUhoZHlxdzRqNjlMSHExODRBZVFEbHhvajY4Y2lQQ2IyVXdMQWJHeCtvczJpNVRKQThINlhkd3lSQStiK2FTN0NmQ2RQN3pJWHE5WWEzdXluWkRtRmlDb04zcjNJR1FVWVBxWkxTM2k1RFZaczFTc3plSkE3IiwibWFjIjoiOTc0YWExZjQ4M2ZjMTU5YWNmMGFkOWM3MjRjYzhhZWQ5ZmVhMTJkN2U5NGM0NGUzMGNhM2Q1YjY5ODJjZDRlZCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '335.39 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImtmeWdXQlBvemdtaHA0RE5UWFljekE9PSIsInZhbHVlIjoib0ZIRmpiMFdZODBobWFDYTNHbWRsamJiNjVOV01ncHRxUXZRbG1pcGNwc3pQeFNSbEVZb3VzYUFZaWMyUWlDNHNFSnM4R2JsWWhyazBQeU9OakxXTGtIRjhGRk5jT2syZXJJMFRRZzBmMVptUjR2SWE1RXJKemFVV1RvKzMzWEYwME9hS2dJUEVSS05EVTkvcnJITFI2R1IxZExwaTVtOEJDclN3RC9iRVNNPSIsIm1hYyI6IjQ2MGEyMWNjMTU0OGNkYmU5MGQ3YmQ1MWRmYjY4YmVlZGIyYTc1YTI2MDAyMDMzYTg2ZjA1M2Q3MzgzNjdhOGEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '67.09 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ikh0WU4xWk9NQ1luMi9VLzEzc3U1b3c9PSIsInZhbHVlIjoia2UwbUlueTRSaGRiSVZvajIyTHljTWhTSEZudmxJOXJzaHpmT0RhSm5Qajl5aTU4M1VPQXYrQmpqZTlHQ1N6TTE4QzIwdThkVC84ZWZQcXV6OEJzMm9iRHZUTUh1Um5Dd0lxa2tnTVZnNlp6djBBeXExaE91cTdFVW1XamEyZHdmVVhwUXNFZVVWZ1BBaVNRKzQ0bk9ka24xVVJxaG1LSm9lVmhPZmdwZmpjPSIsIm1hYyI6IjZjNTYyMmQ5YmNiMmYyZjliNzc5MWM0Yjg1MDk5YzBjODBmYjg3OGYyNGU2OTQwOTJhMzcwMjBjZWFiMmJhZmUiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '29 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439005kjhg.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1439,
                redirect_url: null,
                title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1439',
                  api: 'http://office.alaa.tv:700/api/v2/set/1439'
                },
                redirect_code: null
              }
            },
            {
              id: 33899,
              redirect_url: null,
              type: {
                id: 5,
                title: 'tests',
                display_name: 'تستها'
              },
              title: 'تست - دستگاه گوارش ، تست جلسات 4 و 5',
              url: {
                web: 'http://office.alaa.tv:700/c/33899',
                api: 'http://office.alaa.tv:700/api/v2/c/33899'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjVyb2NLNUk3RDZPdEs2WUFJWm9IUHc9PSIsInZhbHVlIjoiUWtvRU1ya2Nhdk9ob09QcFJxWmpPWlVSSG84YVRFY0V4TUtpdmxlMUN4V0tYRzkxeDhzWG9pcWdva3pPdnBxVVhob3dEWHdKV0F0b0Z6UUs5N3pSSTF1VkhIektYVk8xeDZKTUN2eDl3aUZ0d1grL0I5ODhOaGdONGR5NUNXVjA0bW1ZamwvWmErY295S3FBbmZGSU9BRldQOWpDNE54eVVlOEtTV3IyTGpOM3c2aTRPT25pTy90d24yNkZRMGJOIiwibWFjIjoiYTYyZjRiZWQ1Y2FlZDM1OTlmODE5ZTQwNGUzMzE5ZDFjYzMxOTQzMjU5OTRhNGY4ZTcwYjgxZTA5YjAwNDZhOSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '336.02 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InBJNUlHSEI0anVOa0dJcUc3TUduT0E9PSIsInZhbHVlIjoidmJlOHhuU1NpZjkvU3NLS21kUnNSTlRpY256Zk5lclpYQjVkK1Q3K2M1dDVvRnNzb0pPWGtWZ1ladUw2SXJla20xbEg5NWtKVm5qckxGV2QrRjBvSFNrNHdocUw2aWRsRVRSZ2IvMFN1S0pXQ0pXOEVoTy96MElsdGJDazRwTVEwVVlOd3hoM1pyZ1U2alEzZWZMSXRNOUVNMEdxWHMvSVdoVHRMTXFkYzJFPSIsIm1hYyI6ImNhOTBjODFjODQ3MDA1MDY1ZGNmZDNhNDMxNmZlZTcyMGFlNmFlOWQ1YWFhMDA1ZWI4ZmFiODNmY2Q0MjM4MTYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '67.08 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Iis1bFdBdGp6RktDVkFJSm9QZkM4aEE9PSIsInZhbHVlIjoid1J2cVlpZ1UvdklXZkZkNDR4UGJhOGd5UmdtU1M2Yk9ONGhiTjVNK1dWblNSZ2JoTGxuZ0pGTmRod09mYTdveCtZSXIwM2U2OXc0QXhJSWQ0R25rbnVUMWQ2RGZDYUwvdVp6UE9oK3hwQVAzRWYvZVdHaElkUUlQUGw1UmZlTWJtUUdhYzVlSU5nRGE0ckc0SGF5Ti9seHdRNTNQNUxNbHVPdEFHOW83N2RZPSIsIm1hYyI6IjA4YjMwMzg4OTlkMzExNzI5ZTE3N2Y4N2FlMjFjZWM4N2I1ZTM2MGI2ZjdjZWZmMjdmZDNhMDFkMmE3YjI3YTgiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '27.79 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1439/1439006gfza.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1439,
                redirect_url: null,
                title: 'جمع بندی زیست پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زیست شناسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1439',
                  api: 'http://office.alaa.tv:700/api/v2/set/1439'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 657,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3504,
          title: 'ادبیات',
          description: 'جلسه 1 تا 3',
          long_description: '<p dir="[object Object]"></p>',
          start: '12:00:00',
          end: '12:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33690,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - آرایه ، استعاره - قسمت اول',
              url: {
                web: 'http://office.alaa.tv:700/c/33690',
                api: 'http://office.alaa.tv:700/api/v2/c/33690'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlRXYlUxUmkyMDduQ3RTODZCWXkwcnc9PSIsInZhbHVlIjoiMjEzZDJhY05UUEpEc3pRKy9sclphbXFBK2R2a2MvaGtBRmtoQldlaVo4SmxPR0RXTkswZnc3U0Y0U1RxdWFERStDS2tmOFBBU002c05pWG1oUTVuRFZqcnluNW1hK1VTWWg3bTF5eFZISUNlbit1bDhCYTdyb0FsbzNTVjh5Znl0NnF4YjNmSGJ0a1FBNys3TThUTzJsa3NQcDRQRktqTW1ONjlPWUpSaHU3T3RsR3VnbGNTSTc3RnhrV1lOTGloIiwibWFjIjoiMmY3ZGQ5NDg1Y2M0MDFmNDdmMTUyNjIwYWM1NDgxNWU5ZTlhMzdkYTAwMWI2YTYzYjFhYTNkZDhjMzc4NTgyZCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '269.46 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImprSVZtYUxTTFBvbXY2VzN4bUh4VFE9PSIsInZhbHVlIjoiY1NPbXpQNThSN1hqMG0zenp6ZTFOQ21LNmVBRmNCdGxhUTVSaHdtZEZYTHhXL1c1aDRINk8rNGNESHJLR3RWVFN1UDZ3SFVRcmUza2s2VE9XMm1xYTg0R0xtYkVGMytvMVBCbmtWUkdwb2FoKzZDUDNKUDRwQ3JYY3h1Q1l3K1ZvVzlsYy8zdUZzR3dmeWlueVdRcUFyKzBFSlZxaFNyUzJyT0NmRS9uLy9FPSIsIm1hYyI6ImMzMmNhZjZmY2RkNzkwMjE5MjE5NjljMDE4MWQ2OWNjNjk0NmZlYTcxMjY1YjFmMzExZjA5YzA1Zjk5YzcwMTYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '42.17 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InJGVm51VjBXTU52MjVYNnhlbG81S0E9PSIsInZhbHVlIjoic1RLM0RGOGl0WURUS21pVk8vQ1FjejNHcGFFNFQxWFBrd2lwYkJEaXNWSmNDRnNTWHZqemZDN2VwVVdxbXVUNFliZ2IvdzRjSGZnS1loT0NTdk5PeXk5U2o5U0tCaS9lVzFCZ3czalp6NGNPeFY0UER5SFNqNWdqNHljS0VMZVFCUHVXQTJZaCtyRWRTR0RDTVd6Ymttb3BXZTdUVlNzLzhZbEFaaytLTVpRPSIsIm1hYyI6ImI4YzQ1YmU0NjZiYjAwNGFjMWM0YTU0ZDJkNjc0ZTkzMGUwZWUwNjAxOGFmZjliNDQzNzY0NzM0YjgwNGIxMWIiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '18.73 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430001utyr.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1430,
                redirect_url: null,
                title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1430',
                  api: 'http://office.alaa.tv:700/api/v2/set/1430'
                },
                redirect_code: null
              }
            },
            {
              id: 33691,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - آرایه ، استعاره - قسمت دوم',
              url: {
                web: 'http://office.alaa.tv:700/c/33691',
                api: 'http://office.alaa.tv:700/api/v2/c/33691'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImI0VVhMWWpXTnZ0TkhDWFlETlFvc2c9PSIsInZhbHVlIjoiQnVKd3RUTlpLNFlMdmMraXk4bTk5U256UnhmYlZJUTNxOU1BV2VjdFlLaU1OajlGUC9CYmZNSWJuQko4b0VJS25pL1hVdTQwQ3VPTWhObEx3b2NkYm55elp4QVk5Y2QrZTZMNlBaVEN1Ri9vK24wdWgrQU8rMG1yL2ljUHhsOThJWlg4VWV4RkwveE5ZTkVHTk1kVDN0WDNWZnp2QlVKQi9tRWZSUmJVRnplUlY3VDNLajhqRXZXZ3pqT3lvc0R3IiwibWFjIjoiZTNiODVlODY1ZWRhNDdmYmNlNTUxZWQ2YmQwZjQyYzY1MWI5MzZhMTQyNTZkZDc3ZGI2OTE3NWJiODAxMDAwMSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '268.42 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImxJcU1sK3RVdkJCUWU4ZS82ZEhpamc9PSIsInZhbHVlIjoiNVVnL1RGWkh4MUJHYUtZa3lzUEl1dmRhUHN4ODJaelkyQ25mckN6QzNUWWZlWDh1VGRBUk9SdStiN2FPdlNQeStya1FVZEJERGJzRmxMdGNsandDdnNqTXh5T1I0eTN4TXN6eGVQS0QwVEJ3WVJtdDlLa1A2Q3U4bzZodXc3bTY4U0FlNVc3SGIrSTNMUVJDUk5aSHFFL25BZ1VFb1BjOVhTRFNGSDliVTBjPSIsIm1hYyI6IjQxZjk0MjUzNTg4ZjFlM2MyMTc0ZWMzYzcyMTlhMjI5MmU5MDExMTUwYWY3ZjZhOWU4YjY0ZDc5MmFiYmFiOGYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '42.32 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IityRndCLzFDQVBxTmRLR045UzAzL1E9PSIsInZhbHVlIjoiK2VSaysvR3RuRCtkM1pjSVJhL1NxYjVvZkZDc2tkK09vNjVtNEFlTVNMUGdFT3RUSllwTC9YcXBkYjA0Y09XbW5TM0tXeEM5RUVKU1Foampkekt6TnlkYXhVVE1sNGRyUnNkUnV1bkdHUENGcG45RVNuWTJpeXBQVGljVUxKd09NNWpWbW5kbllFMjlrVmwyQ1dhWVh0dGpjYU51eUFWVW5McHRDcitnTG5jPSIsIm1hYyI6ImI0Y2QxNDFlY2JjNWQwYTIxZjNlM2E2MzczYmU2OGZiNzIzYTc3N2ZlZTRlOTgyNzQzYTczODI5OWY5Y2E0NTMiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '18.65 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430002irjf.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1430,
                redirect_url: null,
                title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1430',
                  api: 'http://office.alaa.tv:700/api/v2/set/1430'
                },
                redirect_code: null
              }
            },
            {
              id: 33692,
              redirect_url: null,
              type: {
                id: 5,
                title: 'tests',
                display_name: 'تستها'
              },
              title: 'تست - آرایه ، استعاره - قسمت سوم',
              url: {
                web: 'http://office.alaa.tv:700/c/33692',
                api: 'http://office.alaa.tv:700/api/v2/c/33692'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ik1OSXY4Um1hVUVmTzBCNExiQVdrTUE9PSIsInZhbHVlIjoiSUk5bys3RlRxKzd1M2JVdFk5SkJjUTF5VFEzNkk1VE92QTREaXZueVJLd0RyWFJuYjk0OFBab0dCaEhNRHJFdmwvVkNET2R5U2dyRzdhS2k3eHY5NjVKT3lCRWU0clE1S0k4dnd2V2NJdFVicVV3Nk5ZUU5rR2YyRExkeHNQbmVTamJIOVFOZHNxeWFxVm0rSTNFT2RzdklQeEd6Qkg2emZVRGJucEFmQVZLc3I2Z1lZKzB3d0dYTEY4TSszdW9xIiwibWFjIjoiYWJhY2RmMmQzMDQxYjUwNWNkMTAxN2QyOTU2MmE2MzZhMTQzYjRlYmUyYzZiNjg4ZDY5YjdjNjU3YWZlMGZiNiIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '266.67 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImNDVjJFK0RJUVk0b0srbGt0dENzM3c9PSIsInZhbHVlIjoiQkVLblNBZjRVMFVoRVdOcGNySDJHd1FzWG13dzhGbWYraVBtZUVVVnYzc3AxVFo4a1pRK2lKWjl4U0JqdHY2OTNUbk01YTNYSklnNXpic3oyTkNKUU9kR1VqSHpSMzhxT2syeVF5TDVSZ0gvaGNTbzRueml4Z2IzbHAzM2UzZ29WL3JtV1NxQ01LVC81d2wrMDV6RU1rVEx3WjZpbXlVK1I0RjdnbUlRaHlnPSIsIm1hYyI6ImRmMDM0OGIyYjZmZmNjNWU0ZDUxM2M0YTYyMGM3Mjg4ODgzMjQ5NDQ3ZWFjNGYwMDdjMzkxNzc5Njc5OWE2MWYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '42.07 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlVLYkVuN0lUSnlwM0cxTG8wcmF2NlE9PSIsInZhbHVlIjoidTVmOUs3RWVQTG9wampLNjZHbTNUaTltYVFhQk1zSEhwWVJ2b1NKcXVVSHYvWTU2cUFDdTRRS3BqeHdmcEgxdEFxdVdzVnYrQzZ6TWtycW45QTc0SWJ4b05Ia0RmTXZ6QjJlWXlpMkFKaWhZNTc2Z3BMQTVNdVpuTWhBK0s1bFFoVEFqei81TnBUMXRHV0lZWThFZk9aOXJJdW10Q3BBc1dkVGU5amNUM0lFPSIsIm1hYyI6Ijc0MmM0YzcxMjc0YjAwZWYzNjJmYzg3ODliNzQ4NzVjMzQwNjkwNjdhYTI3NjRiMjk3OWNlZDA4MTU1YmFjZDEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '18.37 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430003ploq.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1430,
                redirect_url: null,
                title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1430',
                  api: 'http://office.alaa.tv:700/api/v2/set/1430'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 648,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3505,
          title: 'ادبیات',
          description: 'جلسه 4 تا 6',
          long_description: '<p dir="[object Object]"></p>',
          start: '19:00:00',
          end: '19:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33693,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - حفظیات ، املا و لغت - قسمت اول',
              url: {
                web: 'http://office.alaa.tv:700/c/33693',
                api: 'http://office.alaa.tv:700/api/v2/c/33693'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InhqOENHdEpTZjhaaURFSi9pTzk2V0E9PSIsInZhbHVlIjoicWx4aTdza3gycWxLck5Ic3dYYTlDdGR0WTQwczBHUUE2UVZkVGlxbTU1c2FScGwyY1VVS3BmbWE4OEk4b2t2R3lUYmhweWVDU1hSd1I4aG5zeEMxOVFHRjQvOGxUS3l6VGlSRDg3TVNNR1hrd3pkNGF4c3JsODBEWGZBS1g3V1BhRmFRWU5GaG5OQTVIOTFZeXd0L045SzZSTEZNdW1iaVBjQWt1QWoxNmg5QkM0QkJTYTFrNFBCd2U5cE1hK051IiwibWFjIjoiZGU2NTE1YTE5YjZiOGJlYmYyMmZkOWFlOTZhOGEwZmZmNmI1MDA1Y2VkYzdiMjYzY2UzN2RjOTBkODg1ZTFiNiIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '277.41 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjNuSjBnTElVcWFMeFZvMEFVakpBMVE9PSIsInZhbHVlIjoia2JtMlcxTERrbzVtcnkvODI4OGZYOWJHbmxmbEVwWVZPQkVaODhzcDhpQnRRYVdwK256ZTg2dE02TnhDNE85NzZhQ1FzVDFGRkNNdE40YzRHTEp1NktwLzNJdUt5Z1lrTzkzV1YvRFJyMHlJbXpodTdhZUR5ZlFReGVTWXU0M2c3Wm44TmhMOVFqK0tPQ2dldzBsMFNDc2pwMnBQcmE1aDJaelZnSURXaSs4PSIsIm1hYyI6ImRjMWNmMTAzYmM1N2M5OTIxYmZlZTZjMTU2NWI0NTQzZjYyYWE1YjE0YWFiYTkxYzk5MDU4MDU5ZWI3YWIxODUiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '41.7 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ik5STmhhdmhvNFlZNktlZUhmV29UMHc9PSIsInZhbHVlIjoiSjJZNmVNTU1Yd0NsUUl5R1haOEFIQ2VHSGtwRkl1K3BubmQwK3JPaTNrVDEwV2RXcFVML2R2ck02cGQ4WGNLZmtSQlF6OUJ3eW5tT00xMDA1TWZtbkNzMWJvNDg2UHZpRE4zQzJmaVEwM0xWZFRNU1JFZk9YcXNGL0NsaVMxMnBMNnNUSmZxT0l3dmQ4Q2p2TGRCQkV4TzB0bHhWNWxIWEZoMi9IblFEcTg4PSIsIm1hYyI6ImJlNjFhNjcyMDA5ZjAyOTJiYzY5ZTdiZjc1ZjM5ZTZmYjQ3ZDdkZDFmODEwNDE0MzNjOTM5YzRlYzAwZmJmMzIiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '18.53 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430004nvbc.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1430,
                redirect_url: null,
                title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1430',
                  api: 'http://office.alaa.tv:700/api/v2/set/1430'
                },
                redirect_code: null
              }
            },
            {
              id: 33694,
              redirect_url: null,
              type: {
                id: 5,
                title: 'tests',
                display_name: 'تستها'
              },
              title: 'تست - حفظیات ، املا و لغت - قسمت دوم',
              url: {
                web: 'http://office.alaa.tv:700/c/33694',
                api: 'http://office.alaa.tv:700/api/v2/c/33694'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IktrTjFRTThqQ0JhckdaUnlhMnVxZFE9PSIsInZhbHVlIjoiZkNjNCs4SkVVQkpna3ZkenRQRk9GMjRGcXVBbDRQSjdnUjA0TWk1QjBoWDRsU1Q3K3MyQkdvK0ZoR0Z1YkpOOGdGUkdGQ2k5RHFwa0tvY05UZ0R0YmpLbXptaHFUdUNJV3dKTnBoeTlLWU85U0tIbmR0SWJqSit6WDI0NDlzMmwzT2NOUEdjNzdBNEs0YkFBc2FqcFBSRkF0cFVvWDRUSDdWdGovTXZDQW9hMnB3RmxTeklSSzJvSlJCdXBYMVZYIiwibWFjIjoiMjk5MDI1NTdhNzFjMDljYmEzMTMxOTIxNDVmYTk5NTcyMThkMzM1ZTA4ODRkMjI3OWM4ZWU5YjFkMTc0NzNkNCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '203.22 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjV2RUthNDV1aGtIZEZ6RmRKVDBPTkE9PSIsInZhbHVlIjoiQTE1ZE5mNHY2RTArV0t4ZkI4Vld4d2I1VjNBVWM4Um5VVVJtZGlTNWNDMUEvZmtBRjdxU0xiTGcvOUN0T25UZGhDc3Y2MWxZZEp2bHVLNVdEM0ptRVZlcmRva2pVN3BicWQ1Q1hFbVU1ZzRuYmVSdXlCM2pkbm1YdExTNzdLRzJzZWx3WXRtelRuYzVJV05WaDBjTFluVXZGakE1b002MmN4NUk5OVpaZFRzPSIsIm1hYyI6IjM5OTllOWI5MjM1NDFjZmI2OTVhYjZlNDljMWVlZTI0NzhiZTIxYTkxOGU3MmFhODU1ZDM4NzQyYzFmNDU0NDYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '31.68 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkQ3OWFFeEsxanJiUkdzWXdZYVlza2c9PSIsInZhbHVlIjoiMEhxeGVFYWtrN2hRdFIybUhHY3d5YmZaQ1g4dTJwVHBjS3RyenFqSzNNbmF0Q29ROHlQNjA1UFZBenhpY2xlaGhYdkg4bGVseWhjcUpNdlQrdGk4TjJPWmI0N1RNL0dwenFHUFZSTFE5Mk1ZK0FnNGJqN0h0a29XZG9IejZxMmhuaXZjdXA3ZDg5bVE5ZUt6dU5YWHZ6YSt3NGtJaWhTNm9aWDNmNHJrMEFJPSIsIm1hYyI6IjY4YjUwNDQ4ZjRmYmQ2NWMwNGNlMjY1ZGYyNjRlODdhMjEzMTlhZWI2ZmM4NTZhN2U4M2I5NTU2MTliOWRmN2UiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '13.85 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430005moia.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1430,
                redirect_url: null,
                title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1430',
                  api: 'http://office.alaa.tv:700/api/v2/set/1430'
                },
                redirect_code: null
              }
            },
            {
              id: 33695,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - دستور زبان ، زمان فعل',
              url: {
                web: 'http://office.alaa.tv:700/c/33695',
                api: 'http://office.alaa.tv:700/api/v2/c/33695'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InFGQ3QvRkhzWUZvSmhzWTZWcDJsNlE9PSIsInZhbHVlIjoiT2l5ajJiNTZJVjJsa3Q4bC93elRHZU90U0Q2ZHdsOTBjbnhVcWJWYUZRbTRXUnJkSlZCeDhSaThSK0NOb2hOTHNkOWE3aGplWlVqQWpKVGJyd2RKMFptbkFoQUVXaFZJMy9oWmFSdkV6VFpHRGVidGVMbE1QN3V3WmdpRHkyRmpQeERadlN6Vk9Ld2MwOGs2Y2hoYUhieHpZcEQvUFkwUVRnWm1HbDJXVXNoa1RJcDlveXpNbTVUWVhYUnZubzIwIiwibWFjIjoiZGUwZTgxMzZhZDJjYTMxODIwNjkzYTY0YzFhNjY2Y2FjZDRiZmFkZmRkNDcwMGFjOGUxZDE5NGI5YjA4M2EyYSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '280.34 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImxxTE1DYTBPMEhEN0ZXbi8wams5OHc9PSIsInZhbHVlIjoiQjZETmFidXMyano0ZFZ0Sm1MdTI4SW1NNjZLQlpjamNNV2dKaGdPSW9XRkptSE9qQlJvdC96MXlMaTZ6OGgxTlVacUFSZ1Z4ZXNCbWwxN09tOVp5VDZPZ25aT3VkSXZTNHpzY3p0USs1MWZZaFVLQjYwaTBVMS9uUDM2Tkg0aDNidU9ldElEWm9rK2w0bGtYemVrMHAybnFwNFoxWHdqcWM0ZGdZRDU2NFVZPSIsIm1hYyI6ImUxNTRiMjdiZGYxZjIxYWNkMzFiODhlMjcyYzU4YzMwYjRkZWM1MDc3NDdjZjcxNzdhOWRlMmIwMjEzNWZlNjkiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '43.88 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InFiVjY3TDJXYitWcU1VQVdwd2JkTmc9PSIsInZhbHVlIjoid29JMEczdktpajFGcGpqTzk2WXYxaDd5Ym96WWtMVFc3aWlXY3NNWUg1Zk5DUitGbUVpVFF3Tmk5am9hWDFRejBFZENiOUhpK0RUWnA4VkRQSVRuTytpY3RVQ2FtM3Z1ckpaOEVZSnVkWFl5N3FtRDhmSk5MZW9GK3ZZeGJtTWZ4L1ZuU2ZFUHV3cWp1RGxtb3gzN0pIOFU2ZHI4d0RucTZaZUNsYVRKVXdZPSIsIm1hYyI6ImYwZGQwZGMyMjliN2MxZjJjZGNmMmNjY2Q3N2I1MDlhNjMyMWJmYmI3NzhlYTIxMmEzOWRlYzg4OTBjM2IwOTkiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '19.34 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1430/1430006iran.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1430,
                redirect_url: null,
                title: 'جمع بندی ادبیات پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی ادبیات پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1430',
                  api: 'http://office.alaa.tv:700/api/v2/set/1430'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 648,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3528,
          title: 'زبان انگلیسی',
          description: 'جلسه 1 تا 3',
          long_description: '<p dir="[object Object]"></p>',
          start: '20:00:00',
          end: '20:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33880,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - پایه دهم ، گرامر درس 1',
              url: {
                web: 'http://office.alaa.tv:700/c/33880',
                api: 'http://office.alaa.tv:700/api/v2/c/33880'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlBXY3MzRm1tdW9ZK2ZQNnZlajFYYVE9PSIsInZhbHVlIjoieTI1Q0t4QU5BVTNiY0ZRbzNoWTRDYlVvaHY4bWJaSmdOK2Z6bFExNThCNTd5c01HTnVjZlpMVkkwbWdFdWUrYUF2REgrMDhRYmE4WmlWU0pyQ3BackNVMHZXcEhhMXllVDFMNFlMZm85dldIQ0hnMk5FS0taZVhCOCtCWlo5ODdIdmhOQVpUMWpqV1dFRWptYU1VZXkweFhZV0JyWVdkYk1JVittZzZXU3ZBUUhIanphY0g3dS9NL3ZiRCtvb1pUIiwibWFjIjoiZTA5NDg2MWE0YmViZmFlYWMyNWQxMjI0OTZhMGQ2ZDdhY2E5ODg0ZDU3ZDMxZWFkZDM5NDFiMDIzOWVjMGI2NyIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '275.57 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlY0RWU5bVlqRnh4WkYvZmtPL2tTZUE9PSIsInZhbHVlIjoiV3ZyOVBwZ3BldktpMFRZVkVEMjViclhTQXA4dFd1MG9SWi93V2ZPYm5iV2M0aGlVME10QVJYcFFnNGpkMjZCNHRia2huemc3V0NTbS9sZWJnam12NzNBUVdsZzdHV2xzdFJTQ3l4RThVQ204TTNKVytRNmVQbkRleUl6b0ZKTVQxcG1jd3pGQll4NlBGRkF6TGFDMEVwN0VJUlZKZlJkMVYrOWZmek9xQkhBPSIsIm1hYyI6ImFlMTI2ZWZmODllYzNhNWE5MzdiOGFhOWYzMjM5NWIwYWZkMGRlNzk4ZmJiMDEwZDVkYTA3NTdjZDM0NDU2NTAiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '46.2 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjZQa2h5S3lGRkhQMEp0RHI4a3hnZUE9PSIsInZhbHVlIjoiUFZFMnlQV2VONnBHSFBZOEdQclV5UEEwMmNwbnlVZHVScVVkRmNQVUFZQTZFWUU5S1luTHUxOFMvWmdTYkQ1NFVXbW5KMDFMYVd3c0RweXJScnBWVXk5UDh3Z2lCcXNNNlNuRXFwb3J5cmdaQWtKendaVHdOaG45T21WQ29HSEhQZjhZRzNqbkE3RlpDMis5SjE3L2ZNekNMWXhDMEtGVWxVZThGOEsyUGpjPSIsIm1hYyI6IjhmMmMxMmQxZDE3MTRlMGE1ZDZmZGFlZTk4ODE4YzVlOTAwMGQ0NTg0YWQ3OTYyN2Y3MDExYzFlOGJjNmJhNDEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '20.25 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1433/1433001mbnv.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1433,
                redirect_url: null,
                title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1433',
                  api: 'http://office.alaa.tv:700/api/v2/set/1433'
                },
                redirect_code: null
              }
            },
            {
              id: 33881,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - پایه دهم ، گرامر درس 2',
              url: {
                web: 'http://office.alaa.tv:700/c/33881',
                api: 'http://office.alaa.tv:700/api/v2/c/33881'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ik5XQ1lmYVRydW1DQzRSZVRnUDZHR1E9PSIsInZhbHVlIjoiVXRZbVFKSHZzaXFiWTRyQ2k2SjYzaUh2NS9wM3Q0MGQzZEE2RFdRczh1SDA4VDk3QnFsOHM5ZUk5OU1USGNFMjJlMUg4NjJJaEZXWk1XZS9FRncyd3VLMml2SVNsN3pXK1FnNXZlMktNRmtUWURKTHJTUWpwemJsWURDMUNVSVVPcmYxNjUzZC9ZZGZWbnh5UVBGZWE2a1pHbnBRRjhPc1JHYmFSSnEwaXZ0Wng5eUpNUzF1ZjQ4ek03UGJiTEN0IiwibWFjIjoiYjc1NzRmNDI0ZWM2ODc4M2I2NGMzNmI4MWQ0YjFjMDZhZWI1NTk1MjkwZTk4MzlmNmU2MzA1MzIwZjE1ODNiMCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '278.6 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkowNjFTbXNkSkhtbUdjQXdJaUhyblE9PSIsInZhbHVlIjoiK2c4NFJGczJUendaL09VbTZhbE03a3V3cmlBSTh0aW9tdXF1YTRoWHNoSzR0aWJucW5WVU9SSWFRdlc3b3BFTFlMTytyamg3Y3VDU241QnhsZTdwNnRRK3lUMFJFaWxmcXo1SUpnd0Q0alZiT2dvNnBEMTNvaHRNQWpCOTczMkhpdUJMMGVPNlpGbmpsMEpMWkxIZEM0ZVl5NTVLSFdaeVMvY25KYW5mUzI0PSIsIm1hYyI6ImE4OTk4MTIzMjE2Mjk3MTg3Y2M4MmJjNzkwZmMzYmIwMGU2MDlhOWNmYTI3ODFjZThjN2I0NWUwMWZjMDQ5NGEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '47.17 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IisydFJFNVNKSEFPa0RDd2dka1ErU0E9PSIsInZhbHVlIjoiZFd2MFdGcHlGcVoxYm8yWGRHTlBwMWxxd1pLMmJvWUdLamNCeExIVDBIL2kwMkNwbHBGb3JZNEFXRkl1bUxSZkxyTXFEL2djRTRnL2RkL1dDcmRBWU5kUzBMNzd1M1BOMjhHQkJPM3o0bWk2VWRSRTBlKzRVZEtML05hR2RCOE1WQ09XMXZhVXdtbjU4QjI0UlV1UGFiVHNMM296QkQ0WEVjTHIzNVJkWU1nPSIsIm1hYyI6ImI1MGQ4ZWE3MjBmMWVmM2RlM2JiNzgxM2RlMDkyMjg4MzQwNThlYTY3ZGQ5ZjFlOTcyYTJlMTg3M2FhYzI0ZDMiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '20.81 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1433/1433002ythg.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1433,
                redirect_url: null,
                title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1433',
                  api: 'http://office.alaa.tv:700/api/v2/set/1433'
                },
                redirect_code: null
              }
            },
            {
              id: 33882,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - پایه دهم ، گرامر درس 3',
              url: {
                web: 'http://office.alaa.tv:700/c/33882',
                api: 'http://office.alaa.tv:700/api/v2/c/33882'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImsrTWNLTVlIMXUzY29RTXhEYUdNekE9PSIsInZhbHVlIjoiakhmbGV4cFcrdzl4Y0RhSlYxVDJ6YjBuaWNGYzI4NVRQSjFobHV2eTdPeHZLL3RuUWdsZGN2ZUExbGJDU1dhWkZuL1l4TDM5U1pRck42dkFyNHVMVjA5dGRqR1lxUEY4SW1iVTZVRlEwVnVPRHd6L0crZElHSFZ3anluaFlibFU3bEFJcXd1cVV3S0YydXNpUkZMMm1lcWx2TjBTWUFhTEg5WER1TS9qZWRpWVF0UmhoR3RIeStBdEk1SG55SVhQIiwibWFjIjoiM2U2ZjdjMGY2MGI2Yzk0ZTlmMzhmNjI2YWYxNDFiODEzZGZhNWUyOGNlNjMyZWU3YTBmZGQzOTM4NjU2YTgxOSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '282.85 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ii95WWZyVU1mZHZnM0xuYVN4L1dnNXc9PSIsInZhbHVlIjoiT3JoQ2JlbVh1WklvT2MwelZCeGl6ZVVYelhKeUpoVXhwQ0pBU3huOEJ6c0t4dTE0dzFwZjJ3amN4SE1PdlhUTllqM2J4MUlTRkFOYkcxN25oZUwwZCtleGg2YWxObS93cjhwYVdySERNN1M3TzFJU1I5bWY3RFZuSjJoTFJRU0lIdUZycFNRUE80Z3J2cG5WMkVTdzRBVHRIRmZ4ZFVNNE5EK3gycktmdlZJPSIsIm1hYyI6IjcyOTQwODgyODMyNWU2YjBiZDVhMzI5YzRkNGE4YzgwZTM0OWY0OTQ4N2NlYzgzYjg5ZGRiMmNmM2QwMzIxZmEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '48.41 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkNGRm9Bd0pNQzg2ZVdZdGhmU1Y4ckE9PSIsInZhbHVlIjoicWYzK2NaNXFHcWVyN2VCQ25RbkZ2bTB3VGp5QzBhcVRpUm5sVjdLdmZyb3pyTUNmbi9ESWdJREI2OU8yMTdxRTZJbkcxMHVFUUVDNUtxVGQzdGE5WFFFYi9YMS9aSW5FVHFOTUFNMXBvMUhveE0zTjJ0TzQvRG9NUHFaQ3VNeDFmOXNBdjhSWktrSGU5Q1l0NlhKcDFuQzNNSDdvT1pyM3ZkeExiSnFiWW9JPSIsIm1hYyI6IjNmZDAyNTY3MTg4ZDMzZjczYjliZWUwZTk3MWY3MjE1ZTYxZjVkZTAwYWNkNTc4OWVhMTQ3Y2M1ZjUwY2FlNjQiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '21.38 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1433/1433003kjhg.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1433,
                redirect_url: null,
                title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی زبان انگلیسی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1433',
                  api: 'http://office.alaa.tv:700/api/v2/set/1433'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 651,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3534,
          title: 'استراحت',
          description: 'جبرانی',
          long_description: '<p dir="[object Object]"></p>',
          start: '14:00:00',
          end: '14:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3557,
          title: 'شیمی',
          description: 'جلسه 1 و 2',
          long_description: '<p dir="[object Object]"></p>',
          start: '15:00:00',
          end: '15:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33718,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - جدول تناوبی ، ذره های زیر اتمی - (قسمت اول)',
              url: {
                web: 'http://office.alaa.tv:700/c/33718',
                api: 'http://office.alaa.tv:700/api/v2/c/33718'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImRMQ2U2Y1lQZzBIVmR4ZzF3QW16Y0E9PSIsInZhbHVlIjoic1RCN0pibEtVdUlXdmxKdXhnVzFMQmN5U1RDcGEvcDB6TWlLNkNTaXpOSEtqVnI0cm5HS2RZTUpGZDJTQTM2dTBEazVOUythTHFWejdCc2k0Z0dpRVIrUkhNRVV0Z3RiT1hNN3JkWnpqMGxUcVBlVUV3dWQwTXV2UllBRlBWaUhQcjZVZjBSWG9pbzNyajkzNExneHRYWnVmVi9uM1NVVDBhM0x1bTkrUXEwMDl1eHRZWm5LSENJbDhXK1VtOHRhIiwibWFjIjoiMTkzZmFkOTMyMTYzNGQ5ODlkNzI3ZTVlNmMyNmYxNmM2ZmM5YjFmM2UyOTUwMDdlN2VhOWI1NjM2NTc3MGNhMSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '296.76 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlFvdUFEKzJlWnVCUld1dGV3SFJtOVE9PSIsInZhbHVlIjoid3UxaHE3K096bnJ0VVdWSDJzRXdCa1J2cVREWlRDMkJKYU9jalhVOWNOM21kMVFBMEU0aTkydURBOEozazdHS0ZjbDB1b0VaSS81TkZmU0F1QVgzUlRNV0tmZTRMWG5hcVpzVlJvdElNQXR2U3h1cTBUSTR6c0ttZVpZbUFvdjRyOTFyMXk4Uy9BSU5Nb2liWmMvcXJTM2ZOMHJJY1lPdWU3S2hLTVFPOTBFPSIsIm1hYyI6ImZmNDU0ZWUzZGI0YjEzNDg0YWFlNGQyOTVhMWVhY2ExNjc4ZjVhYTU3NTZiNzg1NjQ1Njk4YjRhN2MwNTYyZjAiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '61.07 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlMzQUJhaW53bndIdUtNTitsaXUranc9PSIsInZhbHVlIjoiMnNLRmxhS1NKaTE1SERaOTBZQlcyM0t1azlSVkVRZDAreDZzRHNOM2JONWM3OFN2MFVUbDRueUl3QUE1ajJLcE5CODRENFFodk02QytnRVdHaFBFSHZwSGs1Ty9pQ2UwQTFpdDFZUGhtem5Oa0JpeVRoRzE0d0RXWElYRjFVZkQ2VDVtSjRBREFEakp4RHQ4WFdYaUZoaG84Z0ZPRTJLdHFnKzJ1dE9Ma0M0PSIsIm1hYyI6IjMwY2Q4MjQyMmQ3MjkwNjZlYmUwYjdmYzM2NTgzNTI1MGI5NGJjZTE1MTA3NTBkODg2YjUzZGE4MGJmZGQ4MGEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '24.8 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441001qwer.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1441,
                redirect_url: null,
                title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1441',
                  api: 'http://office.alaa.tv:700/api/v2/set/1441'
                },
                redirect_code: null
              }
            },
            {
              id: 33719,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - جدول تناوبی ، ذره های زیر اتمی  و ایزوتوپ - (قسمت دوم)',
              url: {
                web: 'http://office.alaa.tv:700/c/33719',
                api: 'http://office.alaa.tv:700/api/v2/c/33719'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlR0RW5nZDNQMThXSEtaZkJBWncydXc9PSIsInZhbHVlIjoiSE4rZVdUd0Y1c0FZbWpYbWxBdzZOSlowSVd6S2NJT1ZSZWVHcDVwRkZXVHpQaUNLZFRxZ05yWW1KMnhndWtKZURuaUhQWlpVak1OcUd4QTROUzZKRVA2NFJlVC9SbllXUEVVVVBMSUFBZTRUN0p3NFNBM04wMUpUdlNXWDM3YWlVSnRkbEFIVVVBQ1dKK1BJUkYwdVU5cFhQcEF0TmVKYkhPMFduYTBJSTc0WWpFREVMSHg5dnBnelY4SW9IL0l3IiwibWFjIjoiZTdmNGM4OTEyNTg1MDk5MGNkNTIzZTgzY2RkNDZhNTBkZjNmYTJkOWUwNDA0YTU4OWFhZTBlOGFmODAwYTkyMiIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '280.11 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkpnMjg3YzlnUTBRejhlWnkxcEl3RHc9PSIsInZhbHVlIjoiN09MREwva0dQR2pDVWRCYkM5NVZYK3ZxclY4UVBVY29vNEU2Z2VpUk1jeGxrZlIyOGY0ZDhnMDhmU0s3eHBsUm82N2lSa0UzOFlNLzBhanlKWFQ5U0hlVnAwNUVrZHFRc0xaR0RFUm11NVZYUW9sMFdodGxzQ29WcG14TFlCODdBZlpqT1FYVzFNWmJnS1NMTURoQ01RNW9EeVRjcXJUSm42WERBeXlQUUtZPSIsIm1hYyI6ImU1NGI1OGIxNDFmODg3YTJkZTk1NGNiYWI1ODViMDc3YTEwZmNiYjliMWJhYWFiZmI4Mjk5Y2U5NDVmOWUxZGEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '53.74 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InpuUjVNVXhNc3NDcUVtZUZBcVdqT3c9PSIsInZhbHVlIjoibmN2VmkrWTU4WHdzOGR4WnRYWEgySlpkTWtTMjVGV1NQN2tzN3ZFSEJHNDNqbmhReEs5OTNmTVdMSnIvbWxwNXJUWmk4VXk1OGg0WTBReFBuTGYrZk16M3JnNm5HdUtYSEVxYmJjMzd2dDhNUXVSYUYxaXZrOXc0OE1TM0Q3SXJvbzV3NVl3WE5kQm5aUjYwWmd2OVg1bFl0a2hDZVFYOUtVNmZXYTIzbjlZPSIsIm1hYyI6IjYxYTY0NGMwNTBiODczMGMwNjFjZGU3OGQxMjI5ODZjMDY3NDE4YThhNjFmOTM4YjE5OWFmNWQxNzllYjk3YzMiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '22.22 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441002rtgy.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1441,
                redirect_url: null,
                title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1441',
                  api: 'http://office.alaa.tv:700/api/v2/set/1441'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 656,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3558,
          title: 'شیمی',
          description: 'جلسه 3 و 4',
          long_description: '<p dir="[object Object]"></p>',
          start: '16:00:00',
          end: '16:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33720,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'تست - جدول تناوبی ، ذره های زیر اتمی  و ایزوتوپ - (قسمت سوم)',
              url: {
                web: 'http://office.alaa.tv:700/c/33720',
                api: 'http://office.alaa.tv:700/api/v2/c/33720'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InhobzFUUDNEbktCck9ORnRtUE5rNXc9PSIsInZhbHVlIjoiQ2tBQ1lDbm84L245MTM0eGFSSGdmMkhjOEhsRDlCczEvU2F6Yy9yQWpkNEJ3QklCTHN1MlNOOE5OS1BKczJKallZc0pyS01BMkVnQnZPSDZmVWM5Zjd1WUw0TGJrVnNMVkFGaFUycWJiL1VQRTFjbGg4djhEMG9NV2ZKSTZlOG9Vb0dtOWVZbDVXSmNmMTIyNjJuVUFXeVd6c0YxZ1ZHbFlGMGV6WHk2b29nUFhTVFpvcEx0RXhDOHJwbzNJUVlBIiwibWFjIjoiM2FmMDE1MzFiZjUyMDRlODIwZDVkMzU3OTEyZmYxMmUxOGZlMDM0MjhmMmRmYjU2Zjg3OTVhNTI5MjNiYWU3ZSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '286.64 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjJITnU3ZmVrWWtRaC9ES1VmR0czYXc9PSIsInZhbHVlIjoiZTlseFd6S1Vpa0RLUVQxd3AyY0Zpdkt1WElhVUlQSUo0L1grQjZWQURCZTcxdlhUL0JOUGJWdGZkVzNqRWZ2Z05SeVR0UHdzK0FZVzV5TENseVJ4Yy8rTndBVitPVHJBZEdVcU4xd2VXckhyRFZmZWI5ZkYyNG1YR2Ftalh3RHVaYnE4RGwvL0JENG5Ea3JGZFhPSjRYOTdsOXlsWFYxR1VhU2RlVEVDTXNRPSIsIm1hYyI6ImZlMWU1MmFjMGMyNmUyMTUyM2QxNjc1MjM0MGI5ZWMwMzA1NTM0MThiOTEyNTZjYTczMjkxNDBmNTVmNDk3NjIiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '52.32 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ijg3RS9EVGxGYzdmNmkvdVY0d0FTWVE9PSIsInZhbHVlIjoiZ0dRTHVRUFdqK1lhbmRLS0VReU4wK3ZWYWc1TldmVjE5RDNnWXl2S3RQSk94aW1UbFI3eEdPcjFMdDBQSHhlOUlNWTJxaFpzYytseDFDaldlTzdyTU4zRC9JOTBCeFppZ29CaXJoNk4xS2F4NkdrTEV4NnZ4VXpET3A2SWM1eGxaNHRHcTQrWmZiYlFneFcxdVhUVlFXOXoyN0RIR0JWbi9WaVkrV1kyZTRRPSIsIm1hYyI6IjkxMzg4NDkyNmZkOWUxZDg4Y2JhYzQ0MTUzN2ZkMzE0NmMyYTFmYTlhZTQwMjQwMDk3Y2YyMGY4MDk5MWQ0NWEiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '21.66 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441003juik.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1441,
                redirect_url: null,
                title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1441',
                  api: 'http://office.alaa.tv:700/api/v2/set/1441'
                },
                redirect_code: null
              }
            },
            {
              id: 33988,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - جدول تناوبی ، ایزوتوپ(محاسبات) - (قسمت اول)',
              url: {
                web: 'http://office.alaa.tv:700/c/33988',
                api: 'http://office.alaa.tv:700/api/v2/c/33988'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Im02Z0JEbmpZZmRJVVR0d3VyLytEbkE9PSIsInZhbHVlIjoiSVBXb1ZqR3ppakpkcjdVc0hhbkNPMzB2dC9BK0Y4R3lWYy9zMjA5U1JDbGlkbk9sMWl0a2VrWVRtRHZ0SXkydXZna1pITjJCVlF0SWRPeTRCMnZPaXR4T2p3Yy9TWU5SVDJDM2dXdDRYRjFWL2RpK0JpSXgwbzl4ZFloMWNHSnpBUm1SZzZiSk5pc1VkTEFGamtLNTNTQzVEcXdXWk1YNjhjT0Mvb2pvOEZKaUNwWkVLYWtCSWhsZ0k1RWIvaTE1IiwibWFjIjoiZTBlNTY4NTgzM2Q2YjMxZTdjYzFmY2IxM2ZlOGE4NGE0MjMwMTBlZmFiMzY5NzQ2MjFjZDQ3NzUzZWRlODUwNCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '275.86 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlAycnl1SXE1ckNIM0NLYlNZWWJmYVE9PSIsInZhbHVlIjoiQ0ttVVZtUjd4TTFKL3pTRDBWU3VmZG5WUzh2MUNlK1djZWJqaEpqRlBZRFlzbmZlYW1LUlpobTVPRlJBQnhnb3gvbXJGYzJVMVNGSER2UUhVdS83c08ydnZwZ29nZUtBdE1wM0txT3RTOVhXc1dPcHY4YUlFYUV1c01TVmhzakx5SG5jeHkzVTIyb3pBWGNiRnUxQnN3QkRJNTI2TXlEeDhlMkQxVDducUE4PSIsIm1hYyI6ImIxMGRjZGY4NGYyNjEzNzZkZjA3ZWQ0ZDU5OWQwZTUwOGZjNTIwNDQxMzljYjRiYjgxNjEzMzIzODQ0NGUxYjAiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '53.06 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InJ4cFNuQkJCVU1JZDZVUlhLUGUvRUE9PSIsInZhbHVlIjoib21OUnU5RmlsYXVqV285QWo2TUgzTGVQRlRsaFFKbk9VMFNiRFJzNWJyZkI4ZDN5a1lFVWhsSjFGSVZna3J4dVpKUTczbUY4QUVHVlYrWTRLYWMrcXhMcDc4VTBlTURiUGZHZDBJNkpYS3o2SGpIczhweDFQV1YxWi9aNjljY1BDWXJNTW82QjQxc2J5dkFTOFIzbm11bG9La1V5SVVQWmlaYVF4RVJiWXlnPSIsIm1hYyI6IjRlMTRmZTJlNzkxODNhMDQ4M2RhNTRkMDExZTBhM2Q4YmYyZGIxYjRmMzc1OWRmYmYxYWY1MTYwN2JjYjFmODkiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '22.11 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441004jghu.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1441,
                redirect_url: null,
                title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1441',
                  api: 'http://office.alaa.tv:700/api/v2/set/1441'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 656,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3559,
          title: 'شیمی',
          description: 'جلسه 5 و 6',
          long_description: '<p dir="[object Object]"></p>',
          start: '17:00:00',
          end: '17:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33990,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'تست - جدول تناوبی ، ایزوتوپ (محاسبات) - (قسمت دوم)',
              url: {
                web: 'http://office.alaa.tv:700/c/33990',
                api: 'http://office.alaa.tv:700/api/v2/c/33990'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InE5VHU4cUsyZitBUmlaUXZwTGxKc3c9PSIsInZhbHVlIjoiWlFBS25TMmtJMmprMm5hTlh5V2R2TWxEbmVWbGl5YVJwQnNvN05tQ1JWNlVaTFQrZjFVb0M4Q2JZWnBrY0xXK0gxc21zaEF6aTdvbitjRm5pM2tLOUFBVXVjQVpoNVNlY0VwTVpZcmZoTEtRNmFycmNET1RYMDdEUzdON2hRRE5Td1lERkFLR3BnVVpNclJWTlAzeGxEb0VTVmRERm5VNUQ3UEx5MkRObW9sWEZSS0x5RHRueVdQTnFpYVhpV2ZSIiwibWFjIjoiYWFjMzZkNWRkMmRlMGUxZjg1MzhhMGJmOTkwYWRjZTI5N2RkMDFmYTc3MThhMzUxOThkNzMxNmQ5YmQ2YTI5ZiIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '266.87 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImYydUZORjAyRW5wUjg0UzNiYkFpVEE9PSIsInZhbHVlIjoiNnIxem5ieTlEVWlDQWl3eGQyU3IvaXRvMHJMZW5Tcmg5cEpPM0UxWVZMQzFBdS9BM3Zta01mZVZ3QS8rS0srdXJWYU9ITWdRdlJYRFBhblYyYVFkZ2dTWko5MEZYYlRJSkpuYWJJWEhhc1g5STA5anNSTzdYcTYzRDRmczZwaldkclhRNk5ERGs4eU95MzByYXJtV0dRZEF2RmR2RWpDRVYvS0tDcEtHbi9NPSIsIm1hYyI6IjU3OWMxNDJkODlhOTJmNTBhNzY1MTg0ZGMzMzBjYWI1Njg1M2QwZDMyYmE1ZjdhYjAxN2MxZjhkMWIyMGE4YmMiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '45.58 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImRXREs2RmEwWjhyRHFFN2pTaE9MRmc9PSIsInZhbHVlIjoiZ2IycU1kRUNBT1FFc3lOVnlHd1A2bE54U1VWMWFVN3BoZnlmS004aUcwdjlqdFhPNC9tSThiRmVVY2FjakJvMXF5MmQ0VVd0d09pWFdUdElmMU84Mzd1MnE1aHhJb2UyWDZvejdqN3dtMERZN1Ixc1hoYU5YNTJmZlFQWnFOaTZBY3NZMW80ZmpaOU12WHpoa1AxcHkzdjhnc1hkcUtBditDMDFZSGZtWVlNPSIsIm1hYyI6ImIzZWM2ZTkyOWQ3NzUwNDNjY2EwNzlhNmFmMTg4MDZjOTdmZmNlYzFmMDU5NTdjY2MxZjkwZDY4MjgyMGI0OGYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '19.35 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441005kiub.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1441,
                redirect_url: null,
                title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1441',
                  api: 'http://office.alaa.tv:700/api/v2/set/1441'
                },
                redirect_code: null
              }
            },
            {
              id: 33722,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - جدول تناوبی ، آرایش الکترونی(بور) - (قسمت اول)',
              url: {
                web: 'http://office.alaa.tv:700/c/33722',
                api: 'http://office.alaa.tv:700/api/v2/c/33722'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkVjUVZ1bXhtY0ozVVo5b3c3OEZpdWc9PSIsInZhbHVlIjoiZTBkdFBPM1J3aitwcmhiRmZXR0M2L1VVOUJmL05BeGkxUS9ZeEw3ZitTQ2UrRTlKTEFZOGo4eWJWeHBCT290Mm9vM1dEK3dXTlVUdXlpbXNaWU9tYU9CK0s3dHJCaGx0YlZFbGhtd2RNemg1TitLdzNHOXE3UlA5OUNMS0kwZUloWDh0WDQ4b2R5bTM3VlpSN1NtNVBndXZnN2xZbjhkZHBHdDFaT2Y1ejFnU2ZmYkJoVUp5bEZWVkZvcHRISm5YIiwibWFjIjoiMjYxMDMxNjQwZmY3YmMzOTE4ODBlZGQ5ZDQ5ZDhmZWI0ZTMyZTgxZmY1NzQxNzk2OGEzMjE5ZTFmYjU4MWQzZSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '316.65 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjVVS2Q0aVc3WFBFb21QRytaQlpCOVE9PSIsInZhbHVlIjoiQXJTTW96MW5uT0w4SjRiN0NReGJ5T1lsQWwvR214VHpGWnRrczI1bEJleTh3aHlqVE1Jejkza0ZuYTdwR2Ftd21HZHBuaWpzRUw5SzF6cHA1L1pWWVkrQkMrWE5NK3F5WEZpbmNaOVdYSGhjd2poTUl0UlVMdWs5WkVGcFprWk9heG9tKzAzMDZ0Qmlnb3pSbzF6cnkwUFJqZXZkRmd3cW5GMlA2L29HaDBjPSIsIm1hYyI6IjE0NmNlYTAyZTg0NTEyOTVhMDJmNDdkMzI5YWYzYmNjZmRkOTJhYzU3ZTI0ZmE3ZjJlOWNjMDhmMmFlOTJlN2MiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '64.73 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InQxWFdrVldsVmt2T3llMFpRRkRUc0E9PSIsInZhbHVlIjoibnYrQ2wrdGQ1bW44eHdzSjdscGoxbElWeGpMdHpVNWx3OGhTUHlVcHdPK2lvYXlRZzN2OW5PRzdiNXM5OWRsbUphRWFNTy9OWkhBa1FTNTg3VnJPSlVvMWQ2UDdUcVI3c3FLNXJHZkdoVVE3OWRKSzdsVkhlOHFEY2xyMGNFTjl5L0lXaGJYcGV2c0Mzb3JueVFZVWFVOEo1Qzd5eFRHZDdmeHRSWXpJWWZvPSIsIm1hYyI6IjNlYWU3NzM2NTEzZTg5N2M0ODNhNjA0Y2U0YTI0MjYyODBkZjhmNTQwMTE0ZDdiMDY0ZmNlNDE5MjUzMzEwZGIiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '26.87 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1441/1441006yubn.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1441,
                redirect_url: null,
                title: 'جمع بندی شیمی پایه (دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی شیمی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1441',
                  api: 'http://office.alaa.tv:700/api/v2/set/1441'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 656,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3560,
          title: 'شیمی',
          description: 'جبرانی',
          long_description: '<p dir="[object Object]"></p>',
          start: '18:00:00',
          end: '18:50:00',
          major: {
            id: 2,
            name: 'تجربی',
            title: 'تجربی',
            selected: false
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3631,
          title: 'ریاضی',
          description: 'جلسه 1 و 2',
          long_description: '<p dir="[object Object]"></p>',
          start: '09:00:00',
          end: '09:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33902,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - توان گویا و عبارات جبری ، ریشه توان و ریشه n ام',
              url: {
                web: 'http://office.alaa.tv:700/c/33902',
                api: 'http://office.alaa.tv:700/api/v2/c/33902'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IlJFZnBpL2FTNlRhZThkWTZseEN2VGc9PSIsInZhbHVlIjoiekc2eVpIUmVVaVdDRWh4MGtHa2c4VTV6UHRPb0toT0gvRzFxZmhvbStNdk5sZ3puVnpsVnNCRmFUaGdRTjZlLzYvVy9WbENSUUE4dzd2b1poSFZjb24yS004Zlk0aTArQjd0U0kyMTBsOUdkU1MrV1NkVUltOXBmQUhTZWZYTlFWVjRXVzI0aWNSNzVGQTJYYWlsMVlyY2Z0RHZncUF3TnpEWGhYZ2tDRzRjdHJGM21DVEg2T0RTelluUzJhWTI1IiwibWFjIjoiNjUxYTlhMmZjYWFkZGNjNWI2ZGVkMjYzOWU0ZmFhNjk5MzcxMTNiZjZkYjg0NzY5ZWMyMzU2YjQ2ZWU4YTNkMyIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '336.16 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjZaeHJocVcwRlVnbjBod2F0T0xNYlE9PSIsInZhbHVlIjoiaDFyTzhVVGtNSVZlell4UjFaY0FqK01oMyttSk85Zi81c1JGdUhZdEZ2emJZSDB2bFRmb2YrbFkxeG9vb01LWVB1NDRhSjlJUmgvbHo2dEhmL2tUODNPWDB4KzVjYjVSTHB0aUZPb0wwR1B5WEFOZ3ozblFYZ3dBakdSYlRZeGZ2WlQ5S0JBeWVPekNWMERqUjRoV29VZ2h5MzhyRktLSWd4VnMrcnJRVE5NPSIsIm1hYyI6ImU5YjRmMDBlY2Q2ZWNlMjE5ZWI3YTcwYzlmYjgxNDE1NDgyYmI4OGZiOWMwYmI5NzhjMjM1ODMwNzVmMmU4MDQiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '53.39 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IjRWNm5GVVgvRlRKaHEvclVENHpyeWc9PSIsInZhbHVlIjoiejN2OFpRQWZsTFVKTXZDT0lpSkJlUllVN2VQb0tyM3dhdFVXYkZiaTBjY0tqMnV1aURmWnJsOTM5SFB4S2VoeGFoaXhOTXNldmJzbVdnRk1VNkNBRDJLTEhCUzM2YzFrYjNCaTdGZEo0dFdwcktFVU1udEViWXZSUDhkcmhMZkZRVmI0QjFVZFVHd0o4WXdUNU0rOWQzV09QSlIwc1V6TU1WelpLQlZqOWZFPSIsIm1hYyI6IjI3OGRiZGRkMjdiOTk5NjFhODM1YWVhNThhMzYxYTRmZTdjNzUxZTI2ZjY3OTRlNWFlYmU1N2FhY2Q3ZGVjNjUiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '23.7 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434001jghu.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1434,
                redirect_url: null,
                title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1434',
                  api: 'http://office.alaa.tv:700/api/v2/set/1434'
                },
                redirect_code: null
              }
            },
            {
              id: 33903,
              redirect_url: null,
              type: {
                id: 5,
                title: 'tests',
                display_name: 'تستها'
              },
              title: 'تست - توان گویا و عبارات جبری ، ریشه و توان',
              url: {
                web: 'http://office.alaa.tv:700/c/33903',
                api: 'http://office.alaa.tv:700/api/v2/c/33903'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IitYekRHdFk1QWxXMktHYm9tYUhFRXc9PSIsInZhbHVlIjoiVU1MRVBLdmN6UXZ3dldieWpuTzF2WWxoTy9EMEFFd0FjMEtDeGdPL2ZFdzRUMkJKSW9hMHk3ZUJLMFdka1N0OFFJUzA0MGNCZnY5ZGZ4QmxxQ3NHNCtaazRGd2poa3hjbkVhdWQ3Z0ppYmRLTEtIS08xNEczcENISGd6Q1BlS1FQbm5VQlJzdnFDaHRYWUZhWXRjQXhpOXA1elZQUzNzaFpra09kYjlMbklMWHBBSEhlYXpxU0V3VmdYQTUxV295IiwibWFjIjoiZTM5MTdhMzI0ZjNjY2JhOTNiYzRhMDM2NzI4MWM4M2Q5YWE3MjQ3YTUyZDA3ZjdiZTA5OTUwYWVjNjhkZWVlMiIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '265.57 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImU4ZENvM05NRnhOTlRXMGY0U2s5dEE9PSIsInZhbHVlIjoiWnovRjdWZHFPcVZLY1dmT0tyNnh5WGRnVUVVcE1nM1QwMkpBZ0x0ejZZc2hTSmx2OW4xYmlUaWwrVXY4aklXRmJoaUhBdUhaWEpQRTNqYkNSa3dVUzVaT3Fubk1rNU1EUWdpWFVDaTlNUHgxajJnZ0JEK1dZRlVlL21YODlLSjhOV1ZZR2pXVlRMN21kZXphV3RDWGFNUGd3NDgwZlVJaDRiaDNHTUYrUDNJPSIsIm1hYyI6ImMxY2UyNDI0M2NjNGI1MjY4MDQwZjZiYzk0YWE0ZGNjNzlhZWYzMzVhNGVjMTM1ODkzODE2NDc2OTA5N2E3MjQiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '40.53 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IklENCtmL0JxcmRGWFBmZ3ZEOTlHK1E9PSIsInZhbHVlIjoiYjRleHBYS25xbk1iNmRWR0grR3lpc2RXNFMzZExmYjlUczdwcXRNTlBMSWQrWXlEdkRuL29CYUVoSFprWUtRekg3bHp6ZUQ5Umd2OTVmWnY4RWR5dkRIRGExc0NURjdPR2swRG1LVU5hZnBXK3NKL0dFdXdtVWg0TEpmSWNEU0FLUUxIRi9UZHgyV3Ywbm9qZ3BaT1ZkR1h5cHB3Y3llTGpEVnFBaWtlVm84PSIsIm1hYyI6ImEzYjIzMTAyYTJhZGFlMDY1ZGZmYTUxMGI2ZmQzZDcyYmU5NGYxMmIwN2EyYTQxNTY1Yjg2OGI5MmZjYTU0MzgiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '18.04 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434002mhjo.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1434,
                redirect_url: null,
                title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1434',
                  api: 'http://office.alaa.tv:700/api/v2/set/1434'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 652,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3632,
          title: 'ریاضی',
          description: 'جلسه 3 و 4',
          long_description: '<p dir="[object Object]"></p>',
          start: '10:00:00',
          end: '10:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33904,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - توان گویا و عبارات جبری ، عبارات جبری',
              url: {
                web: 'http://office.alaa.tv:700/c/33904',
                api: 'http://office.alaa.tv:700/api/v2/c/33904'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImR2V1U3QzM1MC9hWVhUMXB1U1dQcnc9PSIsInZhbHVlIjoiMnVJd1Y3eGpCajZRSzMwWHRiTHc3dTIzbkZ1cUVqMWthVStwQTZFQ3lKbzhuNDNtVVJSQ1V1TEFLb3JmL0ViL0p6dm1sQjlTWlRpNUZPZS9xWStpRWNpMDRMTzZQcWhMMTNUWm9LVzcycEo0WERJaW5rQmtsWGRQYWU4ZTZVRXovdHZpN010UDBPUU9aY2VnVWd5MEJnTmpIT0ZoeXJGUWlnQm00bm5oQ0NVU1ZyVDc4Zjg3blhIajBSNys3VWxJIiwibWFjIjoiMGFhYmY3OTNkYzJkMjExNDk5YmI4YmE4MDY5MTkyYTc2NDEzMTQwMmM0ZjU5ZGQ5MGFkYmY4NTVjNDdkNTEzZSIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '384.38 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IldDb1U1anBDVlRPZjhOK0M4Q1hxa1E9PSIsInZhbHVlIjoicHVVZTdmUW1tbEN3MUJtdUlhOHhqekF1cEtLeTZJTjV3OE1GWVhGbWs4VS95eEVyK1NNeVdDTVpnQkgyTFpJQUxBUHBkbWpJZHI5ZVlYN1JwUUlrcFJrbUlzaU8rUFBzSHVZNUw4WEtRWlRJbzIzbnNGUEpOdnFYWC93K1JuUjBQYkdZUUFpalZqbjM3VkI5ZkNvbTNkYk1qY2gxZ0k5b2dzb2pidFYzWVRnPSIsIm1hYyI6ImQ5YzVhYWQyMjM0Zjc0MWVmMjhiMzFjMWExNmJmOGNjYTg5N2FjODY4MTg3YzZhZmVhMjMwMTFiYjgzMWVlMzUiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '58.74 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImQzcVlMd1pwV0RuSVZzY0xRdVAzOUE9PSIsInZhbHVlIjoiRklwNktRZWx0MkVFbTdPQzQrRkx5VUdvcVlZamtpaXRiNHVNRUtEejE3RFNubmRkaWRYZXdzL1k4K0tQUEFtUkZsaHczaFkzU0NjZ1J0VURKZ01lVzN2ZW5Pa2Vndm9zZVEzekNPc3lVbUZEK2VKN3l4c2dOdEQyL0wzVGtPSlRWS0hJOVo2MDAxQ0UzUjJ6ZVgrVW9JUS95YW5BTnMwdldiRVNrTlM3TVdNPSIsIm1hYyI6ImEyMDkzNDMzMjM2YWQ5NGRhNmQ5ZjE3YzUzN2FiMDZiNmMxYzM4Y2RkYjhhOTNhN2U2MDUzZWU2NzZlMTQ0NGYiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '26.08 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434003lkjo.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1434,
                redirect_url: null,
                title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1434',
                  api: 'http://office.alaa.tv:700/api/v2/set/1434'
                },
                redirect_code: null
              }
            },
            {
              id: 33905,
              redirect_url: null,
              type: {
                id: 5,
                title: 'tests',
                display_name: 'تستها'
              },
              title: 'تست - توان گویا و عبارات جبری ، عبارات جبری',
              url: {
                web: 'http://office.alaa.tv:700/c/33905',
                api: 'http://office.alaa.tv:700/api/v2/c/33905'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IllWOW1QYksxMUhJYXk3dlhxT3ZobkE9PSIsInZhbHVlIjoiWmZTSEIzb3VhcktVT1U2Q20wWWRNWXIwL1RqMXR3cWJiVllyUFgzYTlNV0NOeW1WQ0JKaDFOWVQzYVgybHFXOEZwWG5QNHdIdjlRTTBUbFVBR1hsRlV0QmRMcXEvL01ZRytldGQvVWlXUW1YOThLODdJRk9zNlFrZG5DMkdDZyt2QkI3eVE3Mi8zTllGYWx2Z2FIdHhEVTFaeDZMUkNISmkxTG90bU9IS0JuQ3FkWXhMNDNzSURxVm9lQ1lzQkpOIiwibWFjIjoiYmE5MGFhZTUzODkzZjY2MGEwZmNkMDFiNzE0YTczZmVjZTQzNDk1MTQ3OTMwYjJlMjNjNTJmY2I4ODJkMWI0MCIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '213.79 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImNKcWI2N1VXTjJoOTI1SUhLRkZ5YlE9PSIsInZhbHVlIjoiUWRtUFpsTkRBWWdYSFE3bjZGOUxlbDBFVGlXODhkZU4wWFIzK1ZoNmtOem5CYmZYWktRTWNYYkUwTW1ybWc4anhwd3k3djArZ0M0Ui9YQ2NKT0FyeTRnRmdhQzhhb1IwNE1rcExYelR5Mi8yR1VRcEZ5NUJ1NVJDSm1oWG8rYTZScDRkYmd1RkxLNG91cnhiSnJ2bXdMY3RnZVROZFdVU2dMMkZPN0IzaW93PSIsIm1hYyI6IjQ0YTcwYzU4ZjM4NzQ0NDMyNDEwZjg5OWFlNjJkNzRiYTNlYjA1NGQ5ZTYyNGYyY2IyNjNjYTk1ZWQ5ODQ0MGMiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '32.14 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Im1tV3R3OXFQeE43V3o0bGVqVVNUdUE9PSIsInZhbHVlIjoiTEdBRmxYbjVRSzE3dUF5REtxUVFKZXhkYmErdXBHN3RBeWY2dDdUYitVVVdKSUFaWlE2YWtCK2RYY05IbS9QaXNmQ0FDQVZlejZMWjNqT3FXR21DY0YyNEFRVjNkNHdnQkNVZVltR0VtUWkrWUM1dlBPMXQ0WVJzT2ZPeWx4eTZqdjZmTmxrRW94bm5zcGQrazNTS3I2OUYzUW5GdlFXaU5zalp6a1M3V0VRPSIsIm1hYyI6IjA4MzE1YWY0NjhkMmNkNzk0YzhhZjZkNzIxYWMxMGQ3NDc1ZGI1OGI1NjIyYmYzMjk2M2FkNjE3NmNjMjU2ZjIiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '14.35 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434004nbdt.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1434,
                redirect_url: null,
                title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1434',
                  api: 'http://office.alaa.tv:700/api/v2/set/1434'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 652,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3633,
          title: 'ریاضی',
          description: 'جلسه 5 و 6',
          long_description: '<p dir="[object Object]"></p>',
          start: '11:00:00',
          end: '11:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [
            {
              id: 33906,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - معادله و نامعادله ، معادله درجه دو',
              url: {
                web: 'http://office.alaa.tv:700/c/33906',
                api: 'http://office.alaa.tv:700/api/v2/c/33906'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6ImdCd0lSMjFXc3J0bVpoUDY0cElvRUE9PSIsInZhbHVlIjoiYS8vZGFMVlZhWlFpUEhXWlhpdExNVUNtSm1QcUx5Q29BU0VVbWxUZ1VKQzBIQWhFVE5YNTBkN2FxcksyZ1FCbmtIcnAzK1NUQ3BVaFVLVEhlbzJMYWlUTHY2SDgzVDYrQmlSTWlFRUZrRnZqZFZldVVSN3lDRkJKMmU1VWNTS3NDTUhpVU9RbFQ0M3ZCOXZqQ3NkVE4vNUgwNk5SZjd3aUFmT3ZHNE1XdGZRcUpoUjVLSVBhU0RXOW1LT3ZNYzd6IiwibWFjIjoiYTAyOGE1ZmNjYzg4MjM2ODQ3N2JmNGIwYWQ5MTg0NmYxMDdlYTQxMWQ3MmI2OTM3ZjI4YzZkZTQ2NzEyOTg1NyIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '184.83 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkRYT3VCSGR1U2Fod2R2eFdEdlRxWlE9PSIsInZhbHVlIjoiUFozb1dKK1Z3endQZ25yTS9yYVl0MVRKeGJXVENkT0lzanBFaHk1Y1RqV0ZJajdxaFBRT0I1WmxranlZWkt6SEFtS09RUWtsNGUzRnpaQnVxK0RoZTlGa0pCeFhXOTRTRlZmdXljRVVtTmd0TlFJVjJUeUJveXVkKy9iajFpc3pEbVgyVVR3Q1pYaXRzRERuZm1KeUJhblhhR1ZsVWJiK2NJdkhDWWxOUlJRPSIsIm1hYyI6IjhlNjNkMGRiYmNhNDQ2ZGZjMDBhNjY0ZGY0NmU2YzE3Y2IyZmU4NTg0ZmI3MGRlNGUzMTEyNDRkYTYxOGFhMGUiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '28.59 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6InNtNzFFRDFnaGgwNC9scks5UWhDT3c9PSIsInZhbHVlIjoibnhwbDBmTkVZTGkxSHB3RWZoUkJGSzY0ellXMzBjT1dKa1ViZStHMzhiSmhadEtKeE5yM2JnYndPSDhFcVJUQ3FaQ3dnUEVjTWxvblgvNmFBODdmOW51RGJCbWFXaUNwQms4bXZWUnNyeEhCa0JGNUk4bGVxcnhGT0c3ZHQ0M0Z3amR5bTNVSjAvRUw3ckdjZjJaK01NQ2Fmd2RlZURlR0Z1TmV2VERvbFVVPSIsIm1hYyI6ImUyOTJiMTUwYmZmOWYwYmYwYTdlYzdiZTM1NWY1M2UzMzdlZWIxOWZmNGJkNjc2ZTU5ZDNhMjViZTc3ZTA1ZGQiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '12.68 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434005hytr.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1434,
                redirect_url: null,
                title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1434',
                  api: 'http://office.alaa.tv:700/api/v2/set/1434'
                },
                redirect_code: null
              }
            },
            {
              id: 33907,
              redirect_url: null,
              type: {
                id: 4,
                title: 'lesson_video',
                display_name: 'فیلم درس'
              },
              title: 'درسنامه - معادله و نامعادله ، سهمی',
              url: {
                web: 'http://office.alaa.tv:700/c/33907',
                api: 'http://office.alaa.tv:700/api/v2/c/33907'
              },
              file: {
                video: [
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ik84REVNRG53ZjZyV3htdnJJeVdtU2c9PSIsInZhbHVlIjoiMmQ3ZHYrSEVQbTFXVG5sT3U4Y1RuK0JNZDFYMGtSUzQzMmxJMGxKc21BbmVuS2lxbkk3UVdINkFlNFk1RXFCbXhmUTJYVjZNUkZDVDRySHMzVDBNQ0pjWnJwazRWbktTcXdINE1FSmNjZ0dQY3ZCY1AxNFhMQ1RFUzVnWmY3MDVpSFZqRnRBRldKSzBhcGZ0ekdGZEVuT0p6S1JQWjA1L0Zqd0NLU3lLS3RLTkxiUnY5Ly90OVoxZyt3YWJFcERwIiwibWFjIjoiMGE0NGY5YzY3OWMwNDZiNjFlNjkxZTllZDM3ZTFkYjBjMGJmYzNkZmZlZTQwODE1MjAxNTVhZWJkMGQzM2E3NyIsInRhZyI6IiJ9',
                    ext: 'mp4',
                    size: '284.08 MB',
                    caption: 'کیفیت عالی',
                    res: '720p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6IkRRaG92VnB4dGFLMkRGbndybk1VWkE9PSIsInZhbHVlIjoiZXlzalJZc0NZSlFrYm81Q1F4TEdEUjdDbndhY3NKYVlCaS9OLzduYlRacjdPb1IvMzVBTHhQWVg0VmwyR09PYklLQndyT0VDbW5BVE53Mkg0bk0wQVdzdWxEYmtCMXBtWWVLL1lSQ1gvZy9jUnRJcVF5QW03QlRZTnZ0WUFXQnJ5QWU4NzZoblliZzVla1hTL3JjVGxFdUpXcS92RFVpcVdlSDBxV1NzUnprPSIsIm1hYyI6ImI4NWQwZmM3MjA0OTUwOThmMjgxMzA5M2RkNmZlYTFlZGZmYjY5YzI2ZDU0MTFjYTE4ZDdlZmNmZmZmNTUzMDQiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '42.88 MB',
                    caption: 'کیفیت بالا',
                    res: '480p'
                  },
                  {
                    link: 'http://office.alaa.tv:700/d/eyJpdiI6Ik4vd29iSmdWdXVXVkY4MEo3ZHNZa1E9PSIsInZhbHVlIjoibUlXZVMzbUtRNm1PckFJUE9HeExoaXREZmVkR0RMNXZ1ZHRndlpLTG81UWFCSEtVTEs3NzBVVkc1UXUxSHNuUjA2dDBIR2xRdUNSTFBLclNkbEV4cXNFVjlPTXJMWUlHN2dxSkxuRE1hSkZVeWVaaUZsTC9IOHVqY2ZoZUVyQkxUY3N3WFJBWTRmcGExL1pMWU1VZzdjRWdHV3lxcTFFV0w0NFRBOTZSYkRBPSIsIm1hYyI6ImM3ZmQ4ZmY5ZTk5NWEwMDhkNTcyNTFhZjMyNjdkZTk4YTVkMmNiMWM0NDRiM2QyMDVkNzhmMzhjNWJiODc4Y2QiLCJ0YWciOiIifQ==',
                    ext: 'mp4',
                    size: '19.09 MB',
                    caption: 'کیفیت متوسط',
                    res: '240p'
                  }
                ],
                pamphlet: null,
                voice: null
              },
              photo: 'https://nodes.alaatv.com/media/thumbnails/1434/1434006loiu.jpg',
              can_see: 1,
              has_watched: false,
              set: {
                id: 1434,
                redirect_url: null,
                title: 'جمع بندی حسابان1  و ریاضی پایه(دهم و یازدهم) - همایش جمع بندی تفتان | آلا',
                short_title: 'جمع بندی حسابان یک و ریاضی پایه (دهم و یازدهم) همایش تفتان',
                photo: null,
                url: {
                  web: 'http://office.alaa.tv:700/set/1434',
                  api: 'http://office.alaa.tv:700/api/v2/set/1434'
                },
                redirect_code: null
              }
            }
          ],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: 652,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3634,
          title: 'ادبیات',
          description: 'جلسه 1 تا 3',
          long_description: '<p dir="[object Object]"></p>',
          start: '12:00:00',
          end: '12:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3635,
          title: 'ادبیات',
          description: 'جلسه 4 تا 6',
          long_description: '<p dir="[object Object]"></p>',
          start: '19:00:00',
          end: '19:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3636,
          title: 'زبان انگلیسی',
          description: 'جلسه 1 تا 3',
          long_description: '<p dir="[object Object]"></p>',
          start: '20:00:00',
          end: '20:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3637,
          title: 'استراحت',
          description: 'جبرانی',
          long_description: '<p dir="[object Object]"></p>',
          start: '14:00:00',
          end: '14:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3638,
          title: 'شیمی',
          description: 'جلسه 1 و 2',
          long_description: '<p dir="[object Object]"></p>',
          start: '15:00:00',
          end: '15:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3639,
          title: 'شیمی',
          description: 'جلسه 3 و 4',
          long_description: '<p dir="[object Object]"></p>',
          start: '16:00:00',
          end: '16:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3640,
          title: 'شیمی',
          description: 'جلسه 5 و 6',
          long_description: '<p dir="[object Object]"></p>',
          start: '17:00:00',
          end: '17:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        },
        {
          id: 3641,
          title: 'شیمی',
          description: 'جبرانی',
          long_description: '<p dir="[object Object]"></p>',
          start: '18:00:00',
          end: '18:50:00',
          major: {
            id: 1,
            name: 'ریاضی',
            title: 'ریاضی',
            selected: true
          },
          backgroundColor: null,
          borderColor: null,
          textColor: null,
          url: null,
          voice: null,
          video: null,
          contents: [],
          grade: {
            id: 8,
            name: 'davazdahom',
            title: 'دوازدهم'
          },
          exam: {
            id: 1,
            title: 'قلمچی'
          },
          product: {
            id: null,
            title: null,
            lesson_name: null
          },
          date: '2022-03-12'
        }
      ]
      const today = this.getToday()
      this.loading = true
      this.$apiGateway.studyPlan.getStudyPlanData({
        study_event: this.studyPlanId,
        since_date: today,
        till_date: today
      })
        .then(studyPlanList => {
          this.studyPlanList = studyPlanList
          // this.planList = this.studyPlanList.list?.find(x => x.id === this.studyPlanId).plans.list
          this.planList = fakeplans
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    getToday() {
      const date = new Date()
      const year = {
        year: 'numeric'
      }
      const month = {
        month: '2-digit'
      }
      const day = {
        day: '2-digit'
      }

      return `${date.toLocaleDateString(undefined, year)}-${date.toLocaleDateString(undefined, month)}-${date.toLocaleDateString(undefined, day)}`
    },
    onVirtualScroll ({ index }) {
      if (this.targetIndex === index) {
        this.virtualListIndex = index
      }
    },
    scrollToIndex(dir) {
      this.targetIndex = 0
      if (dir === 'next' && this.virtualListIndex < this.planList.length - 1) {
        this.targetIndex = this.virtualListIndex + 1
      } else if (dir === 'prev' && this.virtualListIndex > 0) {
        this.targetIndex = this.virtualListIndex - 1
      }
      this.$refs.virtualListRef.scrollTo(this.targetIndex, 'start-force')
    }
  }
})
</script>

<style lang="scss" scoped>
.daily-plan-wrapper {
  height: 280px;
  width: 100%;
  margin: 40px 0px 20px;

  @media only screen and (max-width: 600px) {
    margin: 30px 0px 0px;
  }

  .daily-plan-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;

    .plan-title {
      color: #424242;
      font-size: 20px;
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.4px;
    }

    .navigation-btn {
      color: #757575;
      background: #FFF;
      margin: 0 6px;
      width: 32px;
      height: 32px;
      min-width: 32px;
      min-height: 32px;
      border-radius: 50%;
    }
  }

  .scroll-wrapper {
    ::-webkit-scrollbar{
      width: 0 ;
      height: 0;
      border-radius: 0 ;
      background-color: transparent;
    }

    ::-webkit-scrollbar-track{
      border-radius: 0 ;
      background-color: transparent ;
    }

    ::-webkit-scrollbar-thumb{
      border-radius: 0 ;
      background-color: transparent;
    }

    .plan-item-wrapper {
      display: flex;
      justify-content: flex-end;
      align-items: center;

      &:not(:first-child) {
        margin-left: 30px;

        @media only screen and (max-width: 600px) {
          margin-left: 15px;
        }
      }
    }
  }
}
</style>
