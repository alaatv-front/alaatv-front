import { Collection, Model } from 'js-abstract-model'

class PageSeo extends Model {
  constructor (data) {
    super(data, [
      {
        key: 'title',
        default: 'آموزش مجازی آلاء'
      },
      {
        key: 'description',
        default: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.'
      },
      { key: 'url' },
      { key: 'canonical' },
      { key: 'site' },
      { key: 'imageUrl' },
      { key: 'imageWidth' },
      { key: 'imageHeight' },
      { key: 'ogTitle' },
      { key: 'ogUrl' },
      { key: 'ogDescription' },
      { key: 'ogImage' }
    ])
  }

  getFormattedStyle () {
    return {
      title: this.title,
      description: this.description,
      robots: 'index, follow',
      ogTitle: this.title,
      ogUrl: this.url ? this.url : (this.ogUrl ? this.ogUrl : ''),
      ogDescription: this.description,
      ogImage: this.imageUrl ? this.imageUrl : (this.ogImage ? this.ogImage : '')
    }
  }
}

class PageSeoList extends Collection {
  model () {
    return PageSeo
  }
}

export { PageSeo, PageSeoList }
