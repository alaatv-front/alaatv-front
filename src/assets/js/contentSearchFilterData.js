const filterData = {
  nezam: [{ name: 'نظام جدید', value: 'نظام_آموزشی_جدید', maghtaKey: null }, {
    name: 'نظام قدیم',
    value: 'نظام_آموزشی_قدیم',
    maghtaKey: null
  }],
  allMaghta: [{ name: 'هفتم', value: 'هفتم' }, { name: 'هشتم', value: 'هشتم' }, { name: 'نهم', value: 'نهم' }, {
    name: 'کنکور',
    value: 'کنکور'
  }, { name: 'دهم', value: 'دهم' }, { name: 'یازدهم', value: 'یازدهم' }, {
    name: 'دوازدهم',
    value: 'دوازدهم'
  }, { name: 'المپیاد', value: 'المپیاد' }],
  major: [{ name: 'رشته ریاضی', value: 'رشته_ریاضی', lessonKey: null }, {
    name: 'رشته تجربی',
    value: 'رشته_تجربی',
    lessonKey: null
  }, { name: 'رشته انسانی', value: 'رشته_انسانی', lessonKey: null }, {
    name: 'متوسطه اول',
    value: 'متوسطه1',
    lessonKey: null
  }],
  allLessons: [{ name: 'اخلاق', value: 'اخلاق' }, { name: 'دین و زندگی', value: 'دین_و_زندگی' }, {
    name: 'ریاضی انسانی',
    value: 'ریاضی_انسانی'
  }, { name: 'ریاضی و آمار', value: 'ریاضی_و_آمار' }, { name: 'زبان انگلیسی', value: 'زبان_انگلیسی' }, {
    name: 'مشاوره',
    value: 'مشاوره'
  }, { name: 'منطق', value: 'منطق' }, { name: 'هندسه', value: 'هندسه' }, { name: 'فیزیک', value: 'فیزیک' }, {
    name: 'عربی',
    value: 'عربی'
  }, { name: 'شیمی', value: 'شیمی' }, { name: 'زیست شناسی', value: 'زیست_شناسی' }, {
    name: 'زبان و ادبیات فارسی',
    value: 'زبان_و_ادبیات_فارسی'
  }, { name: 'ریاضی پایه', value: 'ریاضی_پایه' }, { name: 'ریاضی تجربی', value: 'ریاضی_تجربی' }, {
    name: 'المپیاد نجوم',
    value: 'المپیاد_نجوم'
  }, { name: 'المپیاد فیزیک', value: 'المپیاد_فیزیک' }, { name: 'گسسته', value: 'گسسته' }, {
    name: 'هندسه کنکور',
    value: 'هندسه_کنکور'
  }, { name: 'هندسه پایه', value: 'هندسه_پایه' }, { name: 'دیفرانسیل', value: 'دیفرانسیل' }, {
    name: 'حسابان',
    value: 'حسابان'
  }, { name: 'جبر و احتمال', value: 'جبر_و_احتمال' }, { name: 'تحلیلی', value: 'تحلیلی' }, {
    name: 'آمار و احتمال',
    value: 'آمار_و_احتمال'
  }, { name: 'ریاضی', value: 'ریاضی' }, { name: 'آمار و مدلسازی', value: 'آمار_و_مدلسازی' }, {
    name: 'علوم و فنون',
    value: 'علوم_و_فنون_ادبی'
  }],
  lessonTeacher: {
    همه_دروس: [{
      lastName: 'محمد علی امینی راد',
      firstName: 'محمد علی امینی راد',
      value: 'محمد_علی_امینی_راد'
    }, { lastName: 'یاشار بهمند', firstName: 'یاشار بهمند', value: 'یاشار_بهمند' }, {
      lastName: 'مصطفی جعفری نژاد',
      firstName: 'مصطفی جعفری نژاد',
      value: 'مصطفی_جعفری_نژاد'
    }, {
      lastName: 'سید حسام الدین جلالی',
      firstName: 'سید حسام الدین جلالی',
      value: 'سید_حسام_الدین_جلالی'
    }, { lastName: 'رضا آقاجانی', firstName: 'رضا آقاجانی', value: 'رضا_آقاجانی' }, {
      lastName: 'مهدی امینی راد',
      firstName: 'مهدی امینی راد',
      value: 'مهدی_امینی_راد'
    }, { lastName: 'محمد پازوکی', firstName: 'محمد پازوکی', value: 'محمد_پازوکی' }, {
      lastName: 'جلال موقاری',
      firstName: 'جلال موقاری',
      value: 'جلال_موقاری'
    }, { lastName: 'پوریا رحیمی', firstName: 'پوریا رحیمی', value: 'پوریا_رحیمی' }, {
      lastName: 'عباس راستی بروجنی',
      firstName: 'عباس راستی بروجنی',
      value: 'عباس_راستی_بروجنی'
    }, { lastName: 'مسعود حدادی', firstName: 'مسعود حدادی', value: 'مسعود_حدادی' }, {
      lastName: 'ابوالفضل جعفری',
      firstName: 'ابوالفضل جعفری',
      value: 'ابوالفضل_جعفری'
    }, { lastName: 'ارشی', firstName: 'ارشی', value: 'ارشی' }, {
      lastName: 'وحید کبریایی',
      firstName: 'وحید کبریایی',
      value: 'وحید_کبریایی'
    }, { lastName: 'رضا شامیزاده', firstName: 'رضا شامیزاده', value: 'رضا_شامیزاده' }, {
      lastName: 'کاظم کاظمی',
      firstName: 'کاظم کاظمی',
      value: 'کاظم_کاظمی'
    }, { lastName: 'عبدالرضا مرادی', firstName: 'عبدالرضا مرادی', value: 'عبدالرضا_مرادی' }, {
      lastName: 'محمد صادقی',
      firstName: 'محمد صادقی',
      value: 'محمد_صادقی'
    }, { lastName: 'هامون سبطی', firstName: 'هامون سبطی', value: 'هامون_سبطی' }, {
      lastName: 'داریوش راوش',
      firstName: 'داریوش راوش',
      value: 'داریوش_راوش'
    }, {
      lastName: 'میثم  حسین خانی',
      firstName: 'میثم  حسین خانی',
      value: 'میثم__حسین_خانی'
    }, { lastName: 'جعفر رنجبرزاده', firstName: 'جعفر رنجبرزاده', value: 'جعفر_رنجبرزاده' }, {
      lastName: 'مهدی تفتی',
      firstName: 'مهدی تفتی',
      value: 'مهدی_تفتی'
    }, { lastName: 'کیاوش فراهانی', firstName: 'کیاوش فراهانی', value: 'کیاوش_فراهانی' }, {
      lastName: 'علی اکبر عزتی',
      firstName: 'علی اکبر عزتی',
      value: 'علی_اکبر_عزتی'
    }, { lastName: 'درویش', firstName: 'درویش', value: 'درویش' }, {
      lastName: 'کازرانیان',
      firstName: 'کازرانیان',
      value: 'کازرانیان'
    }, { lastName: 'نادریان', firstName: 'نادریان', value: 'نادریان' }, {
      lastName: 'حمید فدایی فرد',
      firstName: 'حمید فدایی فرد',
      value: 'حمید_فدایی_فرد'
    }, { lastName: 'پیمان طلوعی', firstName: 'پیمان طلوعی', value: 'پیمان_طلوعی' }, {
      lastName: 'علیرضا رمضانی',
      firstName: 'علیرضا رمضانی',
      value: 'علیرضا_رمضانی'
    }, { lastName: 'فرشید داداشی', firstName: 'فرشید داداشی', value: 'فرشید_داداشی' }, {
      lastName: 'جهانبخش',
      firstName: 'جهانبخش',
      value: 'جهانبخش'
    }, { lastName: 'حامد پویان نظر', firstName: 'حامد پویان نظر', value: 'حامد_پویان_نظر' }, {
      lastName: 'محسن معینی',
      firstName: 'محسن معینی',
      value: 'محسن_معینی'
    }, {
      lastName: 'مهدی صنیعی طهرانی',
      firstName: 'مهدی صنیعی طهرانی',
      value: 'مهدی_صنیعی_طهرانی'
    }, {
      lastName: 'محمد حسین شکیباییان',
      firstName: 'محمد حسین شکیباییان',
      value: 'محمد_حسین_شکیباییان'
    }, {
      lastName: 'روح الله حاجی سلیمانی',
      firstName: 'روح الله حاجی سلیمانی',
      value: 'روح_الله_حاجی_سلیمانی'
    }, { lastName: 'جعفری', firstName: 'جعفری', value: 'جعفری' }, {
      lastName: 'محمد حسین انوشه',
      firstName: 'محمد حسین انوشه',
      value: 'محمد_حسین_انوشه'
    }, {
      lastName: 'محمد رضا آقاجانی',
      firstName: 'محمد رضا آقاجانی',
      value: 'محمد_رضا_آقاجانی'
    }, {
      lastName: 'مهدی ناصر شریعت',
      firstName: 'مهدی ناصر شریعت',
      value: 'مهدی_ناصر_شریعت'
    }, {
      lastName: 'میلاد ناصح زاده',
      firstName: 'میلاد ناصح زاده',
      value: 'میلاد_ناصح_زاده'
    }, { lastName: 'پدرام علیمرادی', firstName: 'پدرام علیمرادی', value: 'پدرام_علیمرادی' }, {
      lastName: 'ناصر حشمتی',
      firstName: 'ناصر حشمتی',
      value: 'ناصر_حشمتی'
    }, { lastName: 'مهدی جلادتی', firstName: 'مهدی جلادتی', value: 'مهدی_جلادتی' }, {
      lastName: 'عمار تاج بخش',
      firstName: 'عمار تاج بخش',
      value: 'عمار_تاج_بخش'
    }, { lastName: 'محسن آهویی', firstName: 'محسن آهویی', value: 'محسن_آهویی' }, {
      lastName: 'خسرو محمد زاده',
      firstName: 'خسرو محمد زاده',
      value: 'خسرو_محمد_زاده'
    }, { lastName: 'محمدامین نباخته', firstName: 'محمدامین نباخته', value: 'محمدامین_نباخته' }, {
      lastName: 'علی صدری',
      firstName: 'علی صدری',
      value: 'علی_صدری'
    }, {
      lastName: 'محمد رضا حسینی فرد',
      firstName: 'محمد رضا حسینی فرد',
      value: 'محمد_رضا_حسینی_فرد'
    }, {
      lastName: 'محمد صادق ثابتی',
      firstName: 'محمد صادق ثابتی',
      value: 'محمد_صادق_ثابتی'
    }, { lastName: 'جواد نایب کبیر', firstName: 'جواد نایب کبیر', value: 'جواد_نایب_کبیر' }, {
      lastName: 'محمدرضا مقصودی',
      firstName: 'محمدرضا مقصودی',
      value: 'محمدرضا_مقصودی'
    }, { lastName: 'محسن شهریان', firstName: 'محسن شهریان', value: 'محسن_شهریان' }, {
      lastName: 'حسین کرد',
      firstName: 'حسین کرد',
      value: 'حسین_کرد'
    }, { lastName: 'شهروز رحیمی', firstName: 'شهروز رحیمی', value: 'شهروز_رحیمی' }, {
      lastName: 'حسن مرصعی',
      firstName: 'حسن مرصعی',
      value: 'حسن_مرصعی'
    }, { lastName: 'سروش معینی', firstName: 'سروش معینی', value: 'سروش_معینی' }, {
      lastName: 'شاه محمدی',
      firstName: 'شاه محمدی',
      value: 'شاه_محمدی'
    }, { lastName: 'بهمن مؤذنی پور', firstName: 'بهمن مؤذنی پور', value: 'بهمن_مؤذنی_پور' }, {
      lastName: 'سیروس نصیری',
      firstName: 'سیروس نصیری',
      value: 'سیروس_نصیری'
    }, { lastName: 'محمد رضا یاری', firstName: 'محمد رضا یاری', value: 'محمد_رضا_یاری' }, {
      lastName: 'احسان گودرزی',
      firstName: 'احسان گودرزی',
      value: 'احسان_گودرزی'
    }, {
      lastName: 'میثم حسین خانی',
      firstName: 'میثم حسین خانی',
      value: 'میثم_حسین_خانی'
    }, {
      lastName: 'محمد رضا لکستانی',
      firstName: 'محمد رضا لکستانی',
      value: 'محمد_رضا_لکستانی'
    }, { lastName: 'امید زاهدی', firstName: 'امید زاهدی', value: 'امید_زاهدی' }, {
      lastName: 'امیر رضا امیر احمدی',
      firstName: 'امیر رضا امیر احمدی',
      value: 'امیر_رضا_امیر_احمدی'
    }, { lastName: 'حسن رعنایی', firstName: 'حسن رعنایی', value: 'حسن_رعنایی' }, {
      lastName: 'محمد تفقدی',
      firstName: 'محمد تفقدی',
      value: 'محمد_تفقدی'
    }, { lastName: 'مجید صداقت', firstName: 'مجید صداقت', value: 'مجید_صداقت' }, {
      lastName: 'محسن زبده کار',
      firstName: 'محسن زبده کار',
      value: 'محسن_زبده_کار'
    }, { lastName: 'آژنگ نوید', firstName: 'آژنگ نوید', value: 'آژنگ_نوید' }, {
      lastName: 'سید شهرام میررضوی',
      firstName: 'سید شهرام میررضوی',
      value: 'سید_شهرام_میررضوی'
    }, { lastName: 'هادی ناصری', firstName: 'هادی ناصری', value: 'هادی_ناصری' }, {
      lastName: 'حسین ذبحی تفت',
      firstName: 'حسین ذبحی تفت',
      value: 'حسین_ذبحی_تفت'
    }, {
      lastName: 'سید محمد مهدی شریفی',
      firstName: 'سید محمد مهدی شریفی',
      value: 'محمد_مهدی_شریفی'
    }, { lastName: 'امیر بنی جمال', firstName: 'امیر بنی جمال', value: 'امیر_بنی_جمال' }, {
      lastName: 'مرضیه فتحی',
      firstName: 'مرضیه فتحی',
      value: 'مرضیه_فتحی'
    }]
  }
}
export default filterData
