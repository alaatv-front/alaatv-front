const list = [
  {
    title: 'آپلود سنتر',
    icon: 'ph:cloud-arrow-up',
    routeName: 'Admin.UploadCenter.Contents',
    active: false,
    show: true,
    open: false
  },
  {
    title: 'تیکت پشتیبانی',
    icon: 'ph:ticket',
    routeName: 'Admin.Ticket.Index',
    active: false,
    show: true,
    open: false
  },
  {
    title: 'برنامه مطالعاتی',
    icon: 'ph:calendar',
    routeName: 'Admin.StudyPlan',
    active: false,
    show: true,
    open: false
  },
  {
    title: 'مدیریت درخت های برچسب',
    icon: 'ph:tree-structure',
    routeName: 'Admin.Forrest.Index',
    active: false,
    show: true,
    open: false
  },
  {
    title: 'مدیریت مجموعه محتوا ها',
    icon: 'ph:bounding-box',
    routeName: 'Admin.Set.Index',
    active: false,
    show: true,
    open: false
  },
  {
    title: 'چیدمان صفحه',
    icon: 'ph:layout',
    routeName: 'Admin.Settings',
    show: true,
    active: false,
    children: []
  },
  {
    title: 'مدیریت محصولات',
    icon: 'ph:codesandbox-logo',
    routeName: 'Admin.Product.Index',
    show: true,
    active: false
  }

  // {
  //   title: 'پنل ادمین',
  //   icon: 'isax:user',
  //   routeName: null,
  //   active: false,
  //   show: true,
  //   open: false,
  //   children: [
  //     {
  //       title: 'خالی کردن کش',
  //       routeName: 'none',
  //       active: false,
  //       show: true,
  //       open: false,
  //       children: [
  //         {
  //           title: 'خالی کردن کل کش',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش محصول',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش سفارش',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش آیتم سبد',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش کاربر',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش تراکنش',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش کانتنت',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'خالی کردن کش ست',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'کاربران',
  //       routeName: 'none',
  //       show: true,
  //       active: false,
  //       children: [
  //         {
  //           title: 'پنل مدیریت کاربران',
  //           routeName: 'Admin.UserManagement.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'مدیریت دسترسی ها',
  //           routeName: 'Admin.Permission.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'مدیریت نقش ها',
  //           routeName: 'Admin.Roles.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'مدیریت ساعت کاری',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'شیفت کارمندان',
  //           routeName: 'Admin.ScheduleManagement.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'پیامک',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'دفترچه تلفن',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'ارسال پیامک',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'لاگ های پیامک',
  //           routeName: 'Admin.SMSAdmin.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'سفارش ها',
  //       routeName: 'none',
  //       show: true,
  //       active: false,
  //       children: [
  //         {
  //           title: 'انتقال سفارش های کاربر',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'مدیریت سفارش ها',
  //           routeName: 'Admin.Orders.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'مدیریت تراکنش ها',
  //           routeName: 'Admin.Transaction.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'مدیریت بن کاربران',
  //           routeName: 'Admin.UserBon.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'گزارش ها',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'گزارش فروش',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'گزارش خاص',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'بلوک ها',
  //       routeName: 'Admin.BlockManagement.Index',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'محصولات',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'مدیریت محصولات',
  //           routeName: 'none',
  //           show: true,
  //           active: false,
  //           children: [
  //             {
  //               title: 'مدیریت محصولات',
  //               routeName: 'none',
  //               show: true,
  //               active: false
  //             },
  //             {
  //               title: 'مدیریت کپن ها',
  //               routeName: 'Admin.Coupons.Index',
  //               show: true,
  //               active: false
  //             },
  //             {
  //               title: 'مدیریت صفت ها',
  //               routeName: 'Admin.AttributeManagement.Index',
  //               show: true,
  //               active: false
  //             },
  //             {
  //               title: 'مدیریت دسته صفت ها',
  //               routeName: 'Admin.AttributeSetManagement.Index',
  //               show: true,
  //               active: false
  //             }
  //           ]
  //         },
  //         {
  //           title: 'توضیحات لحظه ای',
  //           routeName: 'Admin.LiveDescription.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'مدیریت ووچرها',
  //           routeName: 'Admin.Vouchers.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'مدیریت محتوا',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'منبع',
  //           routeName: 'Admin.SourceManagement.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'محتوا',
  //           routeName: 'Admin.Content.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'دسته محتوا',
  //           routeName: 'Admin.Sets.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'سکشن محتوا',
  //           routeName: 'Admin.Section.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'پنل لیست ها',
  //       routeName: 'Admin.RegistrationManagement.Index',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'پنل کیف پول',
  //       routeName: 'none',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'پنل بات ها',
  //       routeName: 'none',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'قرعه کشی ها',
  //       routeName: 'none',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'گروه تیکت',
  //       routeName: 'Admin.TicketDepartment.Index',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'تگ ها',
  //       routeName: 'Admin.Tags.Index',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'پیکربندی سایت',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'ویدئوهای وست',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'تنظیمات سایت',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'سوالات متداول',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'اسلاید شو',
  //           routeName: 'Admin.SlideShowManagement.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     },
  //     {
  //       title: 'درگاه پرداخت',
  //       routeName: 'Admin.Gateway.Index',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'لاگ فعالیت ها',
  //       routeName: 'Admin.ActivityLog.Index',
  //       show: true,
  //       active: false
  //     },
  //     {
  //       title: 'پنل های خاص',
  //       routeName: 'none',
  //       show: true,
  //       open: false,
  //       active: false,
  //       children: [
  //         {
  //           title: 'تله مارکتینگ',
  //           routeName: 'Admin.TeleMarketing.Index',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'درج کاربر با سفارش',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'تولید کوپن تصادفی',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'ثبت نام عمومی کاربران',
  //           routeName: 'none',
  //           show: true,
  //           active: false
  //         },
  //         {
  //           title: 'اصلاح شهر و استان کاربران',
  //           routeName: 'Admin.FixUnknownUsersCity.Index',
  //           show: true,
  //           active: false
  //         }
  //       ]
  //     }
  //   ]
  // },
  // {
  //   title: 'سوالات متداول',
  //   icon: 'isax:message-question',
  //   routeName: 'faq',
  //   active: false,
  //   children: []
  // }
]
export default list
