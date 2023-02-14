class SeoMeta {
  static getMixin (title1, title2, description) {
    return {

      // sets document title
      title: title1,
      // optional; sets final title as "Index Page - My Website", useful for multiple level meta
      titleTemplate: title => `${title} ` + title2,

      // meta tags
      meta: {
        description: { name: 'description', content: description },
        ogTitle: {
          property: 'og:title',
          content: title1,
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template: ogTitle => `${ogTitle} ` + title2
        },
        ogDescription: {
          property: 'og:description',
          content: description
        },
        twitterTitle: {
          property: 'twitter:title',
          content: title1,
          // optional; similar to titleTemplate, but allows templating with other meta properties
          template: twitterTitle => `${twitterTitle} ` + title2
        },
        twitterDescription: {
          property: 'twitter:description',
          content: description
        },
        twitterSite: {
          property: 'twitter:site',
          content: title1
        }
      }
    }
  }
}

export default SeoMeta
