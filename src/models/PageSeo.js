import { Collection, Model } from 'js-abstract-model'

class PageSeo extends Model {
  constructor (data) {
    super(data, [
      { key: 'title' },
      { key: 'description' },
      { key: 'url' },
      { key: 'canonical' },
      { key: 'site' },
      { key: 'imageUrl' },
      { key: 'imageWidth' },
      { key: 'imageHeight' }
    ])
  }

  getFormattedStyle () {
    const defaultTitle = 'آموزش مجازی آلاء'
    const defaultDescription = 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.'
    return {
      title: this.title ? this.title : defaultTitle,
      description: this.description ? this.description : defaultDescription,
      robots: 'index, follow',
      ogTitle: this.title ? this.title : defaultTitle,
      ogUrl: this.url ? this.url : '',
      ogDescription: this.description ? this.description : defaultDescription,
      ogImage: this.imageUrl ? this.imageUrl : ''
    }
  }
}

class PageSeoList extends Collection {
  model() {
    return PageSeo
  }
}

export { PageSeo, PageSeoList }
