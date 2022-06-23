<template>
  <p>the study plan say hi :)</p>
  <filter-plans
    :majors="majors"
    :selected-major-id="selectedMajorId"
    @changeMajorId="setSelectedMajorId"
  />
  <full-calender-plans
    :daysOfPlan="plansDay"
    :filterdPlans="filterPlan" />
</template>

<script>
import FilterPlans from 'components/StudyPlanAdmin/FilterPlans'
import FullCalenderPlans from 'components/StudyPlanAdmin/FullCalenderPlans'
import StudyPlansData from 'assets/js/StudyPlansData'
// import { StudyPlan, StudyPlanList } from 'src/models/StudyPlan'

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
    majors: [
      {
        title: ' ریاضی',
        id: 1,
        lessons: [
          {
            title: 'ریاضیات',
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
    plansDay: []
  }),
  computed: {
    filterPlan () {
      return []
    }
  },
  created () {
    this.setDates(StudyPlansData)
    console.log('this.plansDay', this.plansDay)
    this.initPageData()
  },
  methods: {
    setDates (days) {
      if (days.length === 0) {
        return
      }
      const currentDate = days[0].date
      this.plansDay.push(currentDate)
      const newDays = days.filter(plan => {
        return plan.date !== currentDate
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
