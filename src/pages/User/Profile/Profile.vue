<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
export default {
  name: 'PageProfile',
  data() {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ProfileMenu'
                      }
                    ],
                    options: {
                      className: 'col-md-3 q-pr-md'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ProfileCrud',
                        options: {
                          inputs: [
                            {
                              type: 'formBuilder',
                              name: 'accountInfo',
                              col: 'col-md-12 custom-card q-pb-sm',
                              value: [
                                {
                                  type: 'separator',
                                  size: '0',
                                  label: 'مشخصات حساب',
                                  col: 'col-md-12 title'
                                },
                                {
                                  type: 'input',
                                  name: 'id',
                                  responseKey: 'data.id',
                                  label: 'شناسه',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-mb-md'
                                },
                                {
                                  type: 'input',
                                  name: 'mobile',
                                  responseKey: 'data.mobile',
                                  label: 'شماره موبایل',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-pr-md'
                                }
                              ]
                            },
                            {
                              type: 'formBuilder',
                              name: 'formBuilderCol',
                              col: 'col-md-12 custom-card',
                              value: [
                                {
                                  type: 'separator',
                                  size: '0',
                                  label: 'مشخصات فردی',
                                  col: 'col-md-12 title'
                                },

                                {
                                  type: 'input',
                                  name: 'first_name',
                                  responseKey: 'data.first_name',
                                  label: 'نام',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-mb-md'
                                },
                                {
                                  type: 'input',
                                  name: 'last_name',
                                  responseKey: 'data.last_name',
                                  label: 'نام خانوادگی',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-pr-md'
                                },
                                {
                                  type: 'date',
                                  name: 'birthdate',
                                  responseKey: 'data.birthdate',
                                  label: 'تاریخ تولد',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-mb-md'
                                },
                                {
                                  type: 'select',
                                  name: 'gender',
                                  label: 'جنسیت',
                                  responseKey: 'data.gender',
                                  placeholder: 'انتخاب نمایید',
                                  optionLabel: 'name',
                                  outlined: true,
                                  multiple: false,
                                  col: 'col-md-6 q-pr-md'
                                },
                                {
                                  type: 'input',
                                  name: 'national_code',
                                  responseKey: 'data.national_code',
                                  label: 'کد ملی',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-mb-md'
                                }
                              ]
                            },
                            {
                              type: 'formBuilder',
                              name: 'formBuilderCol',
                              col: 'col-md-12 custom-card ',
                              value: [
                                {
                                  type: 'separator',
                                  size: '0',
                                  label: 'مشخصات تحصیلی',
                                  col: 'col-md-12 title'
                                },
                                {
                                  type: 'select',
                                  name: 'grade',
                                  label: 'مقطع تحصیلی',
                                  placeholder: 'انتخاب نمایید',
                                  responseKey: 'data.grade',
                                  optionLabel: 'name',
                                  outlined: true,
                                  multiple: false,
                                  col: 'col-md-6 q-mb-md'
                                },
                                {
                                  type: 'select',
                                  name: 'major',
                                  label: 'رشته تحصیلی',
                                  placeholder: 'انتخاب نمایید',
                                  responseKey: 'data.major',
                                  optionLabel: 'name',
                                  outlined: true,
                                  multiple: false,
                                  col: 'col-md-6 q-pr-md'
                                }
                              ]
                            },
                            {
                              type: 'formBuilder',
                              name: 'formBuilderCol',
                              col: 'col-md-12 custom-card ',
                              value: [
                                {
                                  type: 'separator',
                                  size: '0',
                                  label: 'اطلاعات تماس',
                                  col: 'col-md-12 title'
                                },

                                {
                                  type: 'input',
                                  name: 'postal_code',
                                  responseKey: 'data.postal_code',
                                  label: 'کدپستی',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6q -mb-md'
                                },
                                {
                                  type: 'input',
                                  name: 'email',
                                  responseKey: 'data.email',
                                  label: 'ایمیل',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-6 q-pr-md'
                                },
                                {
                                  type: 'input',
                                  name: 'address',
                                  responseKey: 'data.address',
                                  label: 'آدرس محل سکونت',
                                  outlined: true,
                                  placeholder: 'وارد نمایید',
                                  col: 'col-md-12 q-mb-md'
                                }
                              ]
                            }
                          ],
                          className: ''
                        }
                      },
                      {
                        name: 'RankRecord'
                      }
                    ],
                    options: {
                      className: 'col-md-9 q-pl-md'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362,
                  style: {
                    marginTop: '30px',
                    marginBottom: '30px'
                  }
                }
              }
            ]
          },
          options: {}
        }
      ],
      options: {}
    }
  },
  computed: {
    pageBuilderEditable() {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>
