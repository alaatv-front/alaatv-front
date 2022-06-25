<template>
  <p>the study plan say hi :)</p>
  <filter-plans
    :majors="majors"
    :selected-major-id="selectedMajorId"
    @changeSelectedLesson="updateSelectedLesson"
    @changeMajorId="setSelectedMajorId"
  />
  <full-calender-plans
    :daysOfPlan="plansDay"
    :filterdPlans="filterPlanByLesson" />
</template>

<script>
import FilterPlans from 'components/StudyPlanAdmin/FilterPlans'
import FullCalenderPlans from 'components/StudyPlanAdmin/FullCalenderPlans'
import StudyPlansData from 'assets/js/StudyPlansData'
import { StudyPlanList } from 'src/models/StudyPlan'
import { PlanList } from 'src/models/Plan'

export default {
  name: 'StudyPlan',
  components: {
    FilterPlans,
    FullCalenderPlans
  },
  props: {

  },
  data: () => ({
    selectedMajorId: 1,
    selectedLesson: [],
    majors: [
      {
        title: ' ریاضی',
        id: 1,
        lessons: [
          {
            title: 'ریاضی',
            subLessons: [
              'ریاضیات',
              'حسابان',
              'هندسه',
              'گسسته'
            ]
          },
          {
            title: 'فیزیک',
            subLessons: [
              'فیزیک'
            ]
          },
          {
            title: 'شیمی',
            subLessons: [
              'شیمی'
            ]
          },
          {
            title: 'فارسی',
            subLessons: [
              'فارسی'
            ]
          },
          {
            title: 'دینی',
            subLessons: [
              'دینی'
            ]
          },
          {
            title: 'زبان',
            subLessons: [
              'زبان'
            ]
          },
          {
            title: 'عربی',
            subLessons: [
              'عربی'
            ]
          }
        ]
      },
      {
        title: 'تجربی',
        id: 2,
        lessons: [
          {
            title: 'زیست',
            subLessons: [
              'زیست',
              'زیست شناسی'
            ]
          },
          {
            title: 'فیزیک',
            subLessons: [
              'فیزیک'
            ]
          },
          {
            title: 'شیمی',
            subLessons: [
              'شیمی'
            ]
          },
          {
            title: 'ریاضی (امینی)',
            subLessons: [
              'ریاضی (امینی)'
            ]
          },
          {
            title: 'ریاضی (ثابتی)',
            subLessons: [
              'ریاضی (ثابتی)'
            ]
          },
          {
            title: 'فارسی',
            subLessons: [
              'فارسی'
            ]
          },
          {
            title: 'دینی',
            subLessons: [
              'دینی'
            ]
          },
          {
            title: 'زبان',
            subLessons: [
              'زبان'
            ]
          },
          {
            title: 'عربی',
            subLessons: [
              'عربی'
            ]
          }
        ]
      }, {
        title: 'انسانی',
        id: 3,
        lessons: [
          {
            title: 'علوم و فنون',
            subLessons: [
              'علوم و فنون'
            ]
          },
          {
            title: 'فارسی',
            subLessons: [
              'فارسی'
            ]
          },
          {
            title: 'دینی',
            subLessons: [
              'دینی'
            ]
          },
          {
            title: 'زبان',
            subLessons: [
              'زبان'
            ]
          },
          {
            title: 'عربی',
            subLessons: [
              'عربی'
            ]
          }
        ]
      }],
    windowDays: [
      {
        studyPlan_id: 171,
        id: '2021-07-17',
        date: '2021-07-17',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 172,
        id: '2021-07-18',
        date: '2021-07-18',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 173,
        id: '2021-07-19',
        date: '2021-07-19',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 174,
        id: '2021-07-20',
        date: '2021-07-20',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 175,
        id: '2021-07-21',
        date: '2021-07-21',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 176,
        id: '2021-07-22',
        date: '2021-07-22',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 177,
        id: '2021-07-23',
        date: '2021-07-23',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 178,
        id: '2021-07-24',
        date: '2021-07-24',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 179,
        id: '2021-07-25',
        date: '2021-07-25',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 180,
        id: '2021-07-26',
        date: '2021-07-26',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 181,
        id: '2021-07-27',
        date: '2021-07-27',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 182,
        id: '2021-07-28',
        date: '2021-07-28',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 183,
        id: '2021-07-29',
        date: '2021-07-29',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 184,
        id: '2021-07-30',
        date: '2021-07-30',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 185,
        id: '2021-07-31',
        date: '2021-07-31',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 186,
        id: '2021-08-01',
        date: '2021-08-01',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 187,
        id: '2021-08-02',
        date: '2021-08-02',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 188,
        id: '2021-08-03',
        date: '2021-08-03',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 189,
        id: '2021-08-04',
        date: '2021-08-04',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 190,
        id: '2021-08-05',
        date: '2021-08-05',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 191,
        id: '2021-08-06',
        date: '2021-08-06',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 192,
        id: '2021-08-07',
        date: '2021-08-07',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 193,
        id: '2021-08-08',
        date: '2021-08-08',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 194,
        id: '2021-08-09',
        date: '2021-08-09',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 195,
        id: '2021-08-10',
        date: '2021-08-10',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 196,
        id: '2021-08-11',
        date: '2021-08-11',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 197,
        id: '2021-08-12',
        date: '2021-08-12',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 198,
        id: '2021-08-13',
        date: '2021-08-13',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 199,
        id: '2021-08-14',
        date: '2021-08-14',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 200,
        id: '2021-08-15',
        date: '2021-08-15',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 201,
        id: '2021-08-16',
        date: '2021-08-16',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 202,
        id: '2021-08-17',
        date: '2021-08-17',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 203,
        id: '2021-08-18',
        date: '2021-08-18',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 204,
        id: '2021-08-19',
        date: '2021-08-19',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 205,
        id: '2021-08-20',
        date: '2021-08-20',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 206,
        id: '2021-08-21',
        date: '2021-08-21',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 207,
        id: '2021-08-22',
        date: '2021-08-22',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 208,
        id: '2021-08-23',
        date: '2021-08-23',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 209,
        id: '2021-08-24',
        date: '2021-08-24',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 210,
        id: '2021-08-25',
        date: '2021-08-25',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 211,
        id: '2021-08-26',
        date: '2021-08-26',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      },
      {
        studyPlan_id: 212,
        id: '2021-08-27',
        date: '2021-08-27',
        voice: null,
        body: null,
        title: null,
        plans: [
          {
            tajrobi: {
              major: {
                id: 2,
                name: 'تجربی',
                majortype_id: 1,
                description: 'رشته_تجربی',
                enable: 1,
                order: 0,
                created_at: null,
                updated_at: null,
                deleted_at: null
              },
              lessonName: null,
              sectionName: null,
              offer: null,
              link: null,
              time: null,
              voice: null
            }
          }
        ],
        contents: null
      }
    ],
    plans: [],
    studyPlansData: null,
    plansDay: [],
    riaziPlans: new StudyPlanList(),
    tajrobiPlans: new StudyPlanList(),
    ensaniPlans: new StudyPlanList(),
    studyPlans: new StudyPlanList()
  }),
  computed: {
    filterPlanByMajor () {
      if (this.selectedMajorId === 1) {
        return this.riaziPlans
      } else if (this.selectedMajorId === 2) {
        return this.tajrobiPlans
      }
      return this.ensaniPlans
    },
    filterPlanByLesson () {
      let filterdPlanBySelectedMajor = this.filterPlanByMajor
      if (this.selectedLesson.length > 0) {
        filterdPlanBySelectedMajor = this.filterPlansByLessons(filterdPlanBySelectedMajor)
      }
      return filterdPlanBySelectedMajor
    }
  },
  created () {
    this.setDates(StudyPlansData)
    // StudyPlansData.filter((studyPlan, studyPlanIndex, studyPlansArray) => {
    //   return studyPlansArray.findIndex(item => item.date === studyPlan.date) === studyPlanIndex
    // })
    //   .map(item => item.id)
    this.initPageData()
  },
  methods: {
    filterPlansByLessons (studyPlans) {
      const filterdStudyPlan = new StudyPlanList()
      studyPlans.list.forEach(studyPlan => {
        const planList = this.FilterBySelectedLessons(studyPlan.plans)
        filterdStudyPlan.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: planList
        })
      })
      return filterdStudyPlan
    },
    FilterBySelectedLessons (plans) {
      let planList = []
      this.selectedLesson.forEach(lesson => {
        const filteredPlan = plans.list.filter(plan => {
          console.log(plan.title === lesson, plan.title, lesson)
          return plan.title === lesson
        })
        planList = planList.concat(filteredPlan)
      })
      return new PlanList(planList)
    },
    updateSelectedLesson (lessons) {
      this.selectedLesson = lessons
    },
    setDates (days) {
      if (days.length === 0) {
        return
      }
      const firstDate = days[0].date
      const newDays = days.filter(plan => plan.date !== firstDate)
      const filteredDays = days.filter(plan => plan.date === firstDate)
      this.studyPlans.addItem({
        id: firstDate,
        title: firstDate,
        date: firstDate,
        plans: filteredDays
      })
      this.setDates(newDays)
    },

    initPageData () {
      const userData = this.getUserData()
      if (!userData) {
        this.setSelectedMajorId(1)
        return
      }
      const majorId = userData.major.id
      this.setSelectedMajorId(majorId)
      this.classificationPlans()
      console.log('this.riaziPlans :', this.riaziPlans)
    },
    classificationPlans () {
      // this.studyPlans.list.forEach(studyPlan => {
      //   studyPlan.plans.list.forEach(plan => {
      //     const plansMajorId = plan.major.id
      //     if (plansMajorId === 1) {
      //
      //     } else if (plansMajorId === 2) {
      //       this.tajrobiPlans.list.plans.list.push(plan)
      //     } else {
      //       this.ensaniPlans.list.plans.list.push(plan)
      //     }
      //   })
      // })
      this.studyPlans.list.forEach(studyPlan => {
        this.riaziPlans.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: studyPlan.plans.list.filter(plan => plan.major.id === 1)
        })
        this.tajrobiPlans.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: studyPlan.plans.list.filter(plan => plan.major.id === 2)
        })
        this.ensaniPlans.addItem({
          id: studyPlan.id,
          title: studyPlan.title,
          date: studyPlan.date,
          plans: studyPlan.plans.list.filter(plan => plan.major.id === 3)
        })
      })
    },
    setSelectedMajorId (majorId) {
      this.selectedMajorId = majorId
    },

    // ----------------------------------------- getters  ----------------------------------------------
    getUserData () {
      return this.$store.getters['Auth/user']
    }

    // ----------------------------------------- public ------------------------------------------------
  }
}
</script>

<style scoped>

</style>
