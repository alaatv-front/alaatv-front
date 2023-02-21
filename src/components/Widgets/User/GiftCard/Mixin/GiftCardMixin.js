const GiftCardMixin = {
  methods: {
    getErrorMessages(data) {
      const messages = []
      if (data.errors) {
        const errors = data.errors
        if (typeof errors === 'object') {
          // for (const err in data.errors) {
          //   if (data.errors.hasOwnProperty(err)) {
          //     messages.push(data.errors[err])
          //   }
          // }
        } else if (Array.isArray(errors)) {
          messages.push(errors)
        } else if (typeof errors === 'string') {
          messages.push(errors)
        }
      } else if (data.message) {
        messages.push(data.message)
      }
      return messages
    },
    showErrorMessages (messages) {
      messages.forEach(message => {
        if (Array.isArray(message)) {
          this.toast(message[0], 'error')
          return
        }
        this.toast(message, 'error')
      })
    },
    toast (message, type = 'success') {
      // types : error , success
      this.$toast(message, {
        type
      })
    }
  }
}

export default GiftCardMixin
