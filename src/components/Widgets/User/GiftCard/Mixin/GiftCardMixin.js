const GiftCardMixin = {
  methods: {
    getErrorMessages (data) {
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
          this.$q.notify({
            type: 'negative',
            message: message[0]
          })
          return
        }
        this.$q.notify({
          type: 'negative',
          message
        })
      })
    }
  }
}

export default GiftCardMixin
