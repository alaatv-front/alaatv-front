export default class shareSocial {
  constructor (data, socialName) {
    this.data = data
    this.socialName = socialName
  }

  static setLink (socialLink, data) {
    if (!data.link) {
      return null
    }
    return socialLink + data.link
  }

  static getFacebook (data) {
    return this.setLink('https://www.facebook.com/sharer/sharer.php?u=', data)
  }

  static getTelegram (data) {
    let link = this.setLink('https://telegram.me/share/url?url=', data)
    if (!link) {
      return
    }
    if (data.title) {
      link = link + '&text=' + data.title
    }
    return link
  }

  static getWhatsapp (data) {
    let link = this.setLink('https://web.whatsapp.com/send?l=en&text=', data)
    if (!link) {
      return
    }
    if (data.title) {
      link = link + '?text=' + data.text
    }
    return link
  }

  static getGoogleBookmarks (data) {
    let link = this.setLink('https://www.google.com/bookmarks/mark?op=edit&bkmk=', data)
    if (!link) {
      return
    }
    if (data.title) {
      link = link + '&title' + data.title
    }
    if (data.lables) {
      link = link + '&labels=' + data.lables
    }
    // {url}&title={title}&annotation={text}
  }

  static getMail (data) {
    const link = this.setLink('mailto:info@alaatv.com?&subject=', data)
    if (!link) {
      return
    }
    return link + '&body=' + data.title
  }

  static getLinkedin (data) {
    return this.setLink('https://www.linkedin.com/sharing/share-offsite/?url=', data)
  }

  static getTwitter (data) {
    let link = this.setLink('https://twitter.com/home?status=', data)
    if (!link) {
      return
    }
    if (data.title) {
      link = link + '&text=' + data.title
    }
    if (data.hashtags) {
      link = link + '&hashtags=' + data.hashtags
    }
    return link
  }

  static getSocialName () {
    return this.setLink('https://twitter.com/home?status=')
  }

  static getShareLink (sharedData, socialName) {
    const firstChar = socialName[0]
    const functionName = 'get' + socialName.replace(firstChar, firstChar.toUpperCase())
    if (typeof this[functionName] === 'function') {
      return this[functionName](sharedData)
    }
  }
}
