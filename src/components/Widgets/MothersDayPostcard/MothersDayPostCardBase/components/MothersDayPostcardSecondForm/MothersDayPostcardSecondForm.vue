<template>
  <div class="second-form-container">
    <div class="row q-col-gutter-md-md q-col-gutter-lg-lg">
      <div class="col-12 col-md-6">
        <div class="slogan-inner-wrapper">
          <div class="slogan">
            <div class="slogan-message">
              <div class="slogan-message__image">
                <lazy-img :src="sloganImage" width="206px" hight="206px" />
              </div>
              <h6 class="slogan-message__text">
                کارت پستال شما با موفقیت ایجاد شد.
              </h6>
            </div>
            <div class="slogan-action">
              <div class="row q-col-gutter-md">
                <div class="col-6">
                  <q-btn color="primary"
                         class="size-md full-width"
                         icon="ph:eye"
                         label="پیش نمایش"
                         @click="togglePreviewDialog" />
                </div>
                <div class="col-6">
                  <q-btn class="size-md full-width"
                         color="grey"
                         outline
                         icon="ph:pencil-simple"
                         label="ویرایش"
                         @click="editPostcard" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="sharing">
          <div class="sharing-link">
            <div class="sharing-link__title">
              لینک زیر را کپی کنید و برای مادر خود ارسال کنید.
            </div>
            <div class="sharing-link__copy"
                 @click="copyCode()">
              <div class="sharing-link__copy--action">
                <div class="action-icon">
                  <q-icon name="ph:copy-simple"
                          size="sm" />
                </div>
                <div class="action-text">
                  کپی
                </div>
              </div>
              <div class="sharing-link__copy--url">
                {{ url }}
              </div>
            </div>
          </div>
          <div class="sharing-mobile">
            <div class="sharing-mobile__title">
              همچنین میتونید شماره موبایل مورد نظر رو وارد کنید تا در روز مادر، ما لینک کارت تبریک رو براش پیامک کنیم.
            </div>
            <div class="sharing-mobile__input">
              <q-input v-model="mobile"
                       type="text"
                       placeholder="شماره مورد نظر را وارد کنید"
                       label="شماره موبایل" />
            </div>
          </div>
          <div class="sharing-action">
            <q-btn color="primary"
                   class="size-md"
                   label="تایید"
                   :loading="loading"
                   @click="saveNumber" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { copyToClipboard } from 'quasar'
import LazyImg from 'src/components/lazyImg.vue'
import { APIGateway } from 'src/api/APIGateway.js'
import { Contact } from 'src/models/Contact.js'

export default defineComponent({
  name: 'MothersDayPostcardSecondForm',
  components: {
    LazyImg
  },
  props: {
    eventName: {
      type: String,
      default: 'mother_day_1402'
    }
  },
  emits: ['togglePreviewDialog', 'invokeEditForm'],
  data () {
    return {
      sloganImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/frame201702281012.png',
      url: '',
      mobile: '',
      loading: false,
      contact: new Contact()
    }
  },
  mounted () {
    this.getUrl()
    this.getContact()
  },
  methods: {
    copyCode (code) {
      copyToClipboard(code)
        .then(() => {
          this.$q.notify({
            message: 'کپی شد',
            type: 'positive'
          })
        })
        .catch(() => {
          this.$q.notify({
            type: 'negative',
            message: 'مشکلی در کپی کردن رخ داده است.'
          })
        })
    },
    getUrl () {
      const route = this.$router.resolve({ name: 'Public.Postcard.Show', params: { id: 11 } })
      this.url = new URL(route.href, window.location.origin).href
    },
    getContact () {
      APIGateway.contact.getContacts(
        {
          relative_id: 2,
          name: 'mother_day_1402'
        }
      )
        .then(contactList => {
          this.contact = contactList.list.find(contact => contact.name === this.eventName)
          this.mobile = this.contact.phones.list[0].phone_number
        })
        .catch(() => {})
    },
    saveNumber () {
      if (this.contact.id) {
        this.editContact()
      } else {
        this.saveContact()
      }
    },
    editContact () {
      const data = {
        phone: {
          number: this.mobile,
          phone_id: 1
        },
        contactId: this.contact.id
      }
      this.loading = true
      APIGateway.contact.editContact(data)
        .then(contact => {
          this.contact = new Contact(contact)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    saveContact () {
      const contact = {
        number: this.mobile,
        contacttype_id: 1,
        relative_id: 2,
        name: 'mother_day_1402',
        phonetype_id: 1
      }
      this.loading = true
      APIGateway.contact.saveContact(contact)
        .then(contact => {
          this.contact = new Contact(contact)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    editPostcard () {
      this.$emit('invokeEditForm')
    },
    togglePreviewDialog () {
      this.$emit('togglePreviewDialog')
    }
  }
})
</script>

<style lang="scss" scoped>
.second-form-container {
  padding: $spacing-none;
  background:#FFF;
  border-radius: $radius-4;
  .slogan-inner-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 712px;
    padding: $spacing-none $space-12;
    background:#E1E4EA;
    border-radius:  $radius-4 $radius-none $radius-none $radius-4;

    @include media-max-width('lg') {
      height: 502px;
      padding: $spacing-none $space-9;
    }

    @include media-max-width('md') {
      height: auto;
      padding: $space-7 $space-12;
      border-radius: $radius-3 $radius-3 $radius-none $radius-none !important;
    }
    @include media-max-width('sm') {
      padding: $space-7;
    }

    .slogan {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100%;
      width: 100%;
      padding: $spacing-none $space-8;
      gap: $space-7;

      @include media-max-width('lg') {
        padding: $spacing-none $space-2;
      }
      @include media-max-width('md') {
        padding: $spacing-none $space-6;
      }
      @include media-max-width('md') {
        padding: $spacing-none;
      }

      &-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $space-7;

        @include media-max-width('lg') {
          gap: $space-6;
        }

        &__image {
          width: 206px;
          height: 206px;

          @include media-max-width('md') {
            width: 164px;
            height: 164px;
          }

          :deep(.lazy-img) {
            width: 100%;
          }
        }
        &_text {
          color: $grey-9;
          text-align: center;
        }
      }

      &-action {
        width: 100%;
        padding: $spacing-none $space-7;

        @include media-max-width('lg') {
          padding: $spacing-none;
        }
        @include media-max-width('md') {
          padding: $spacing-none $space-7;
        }
        @include media-max-width('sm') {
          padding: $spacing-none;
        }
      }
    }
  }

  .sharing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 712px;
    border-radius: $radius-none $radius-4 $radius-4 $radius-none;
    padding: $spacing-none $space-12;

    @include media-max-width('lg') {
      height: 502px;
      padding: $spacing-none $space-8;
    }
    @include media-max-width('md') {
      height: auto;
      padding: $space-7;
    }
    @include media-max-width('sm') {
      height: auto;
      padding: $space-7 $space-5;
    }

    &-link {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: $space-4;
      width: 100%;

      &__title {
        color: $grey-9;
        @include body2;
      }

      &__copy {
        width: 100%;
        display: flex;
        height: 48px;
        padding: $space-3 $space-4;
        justify-content: space-between;
        align-items: center;
        gap: $space-2;
        align-self: stretch;
        border-radius: $radius-4;
        background: $blue-grey-1;
        cursor: pointer;

        &--action {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: $space-1;

          .action-text {
            color: $grey-9;
            font-feature-settings: 'clig' off, 'liga' off;
            @include subtitle2;
          }
        }
      }
    }

    &-mobile {
      margin-top: $space-11;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: $space-4;
      align-self: stretch;

      @include media-max-width('md') {
        margin-top: $space-8;
      }

      &__title {
        color: $grey-9;
        @include body2;
      }

      &__input {
        width: 100%;
      }
    }

    &-action {
      width: 100%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-top: $space-6;
    }
  }
}
</style>
