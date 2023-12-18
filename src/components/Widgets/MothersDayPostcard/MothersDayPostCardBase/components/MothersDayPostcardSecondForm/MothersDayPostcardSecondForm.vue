<template>
  <div class="second-form-container">
    <div class="row q-col-gutter-x-lg-lg">
      <div class="col-12 col-md-6">
        <div class="slogan-inner-wrapper">
          <div class="slogan">
            <div class="slogan-message">
              <div class="slogan-message__image">
                <lazy-img :src="sloganImage"
                          width="212px"
                          hight="212px" />
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
        <div class="sharing-outer-wrapper">
          <div class="sharing">
            <div class="sharing-link">
              <div class="sharing-link__title">
                لینک زیر را کپی کنید و برای مادر خود ارسال کنید.
              </div>
              <div class="sharing-link__copy"
                   @click="copyCode(url)">
                <div class="sharing-link__copy--action">
                  <div class="action-icon">
                    <q-icon name="ph:copy-simple"
                            size="sm" />
                  </div>
                  <div class="action-text">
                    کپی
                  </div>
                </div>
                <div class="sharing-link__copy--url ellipsis">
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
              <q-dialog v-model="confirm"
                        persistent>
                <q-card>
                  <q-card-section class="dialog-header-section">
                    <div class="row items-center justify-between">
                      <div>
                        <q-icon class="dialog-avatar"
                                size="md"
                                color="positive"
                                name="check" />
                        تایید
                      </div>
                      <q-btn flat
                             square
                             icon="ph:x"
                             color="grey-6"
                             @click="toggleConfirm" />
                    </div>
                  </q-card-section>
                  <q-separator class="grey1" />
                  <q-card-section class="dialog-body-section">
                    <div class="body2">لینک کارت تبریک برای شماره وارد شده ارسال خواهد شد.</div>
                  </q-card-section>
                  <q-card-section class="dialog-action-section">
                    <div class="row items-center justify-end">

                      <div class="dialog-action-btn-box">

                        <q-btn class="size-md"
                               color="grey"
                               outline
                               @click="toggleConfirm">
                          متوجه شدم
                        </q-btn>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
              </q-dialog>
            </div>
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
import { Postcard } from 'src/models/Postcard.js'

export default defineComponent({
  name: 'MothersDayPostcardSecondForm',
  components: {
    LazyImg
  },
  props: {
    eventName: {
      type: String,
      default: 'mother_day_1402'
    },
    postcard: {
      type: Postcard,
      default: new Postcard()
    }
  },
  emits: ['togglePreviewDialog', 'invokeEditForm'],
  data () {
    return {
      sloganImage: 'https://nodes.alaatv.com/upload/alaaPages/2023-12/frame201702281012.png',
      url: '',
      mobile: '',
      confirm: false,
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
      const route = this.$router.resolve({ name: 'Public.Postcard.Show', params: { id: this.postcard.uuid } })
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
          this.contact = new Contact(contactList.list.find(contact => contact.name === this.eventName))
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
          phone_id: this.contact.phones.list[0].id
        },
        contactId: this.contact.id
      }
      this.loading = true
      APIGateway.contact.editContact(data)
        .then(contact => {
          this.contact = new Contact(contact)
          this.loading = false
          this.confirm = true
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
          this.confirm = true
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
    },
    toggleConfirm () {
      this.confirm = !this.confirm
    }
  }
})
</script>

<style lang="scss" scoped>
.second-form-container {
  padding: $spacing-none;
  background:#FFF;
  border-radius: $radius-4;
  margin-top: $space-12;

  @include media-max-width('lg') {
    margin-top: $space-8;
  }
  @include media-max-width('md') {
    margin-top: $space-6;
  }
  @include media-max-width('sm') {
    margin-top: $space-4;
  }

  .slogan-inner-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: $space-13 $space-12;
    background:#E1E4EA;
    border-radius:  $radius-4 $radius-none $radius-none $radius-4;

    @include media-max-width('lg') {
      padding: $space-9;
    }

    @include media-max-width('md') {
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
      padding: $space-13 $space-8;
      gap: $space-7;

      @include media-max-width('lg') {
        padding: $space-8 $spacing-none ;
      }
      @include media-max-width('md') {
        padding: $spacing-none  $space-8 ;
      }
      @include media-max-width('sm') {
        padding: $spacing-none;
      }

      &-message {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: $space-7;
        width: 100%;

        @include media-max-width('lg') {
          gap: $space-4;
        }

        &__image {
          padding: $spacing-none $space-12;
          width: 100%;
          height: 100%;

          @include media-max-width('lg') {
            padding: $spacing-none $space-8;
          }
          @include media-max-width('md') {
            padding: $spacing-none $space-12;
          }
          @include media-max-width('sm') {
            padding: $spacing-none $space-9;
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
          padding: $spacing-none $space-2;
        }
        @include media-max-width('md') {
          padding: $spacing-none $space-4;
        }
        @include media-max-width('sm') {
          padding: $spacing-none;
        }
      }
    }
  }

  .sharing-outer-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: $radius-none $radius-4 $radius-4 $radius-none;
    padding: $space-13 $space-12;

    @include media-max-width('lg') {
      padding: $space-9 $space-8;
    }
    @include media-max-width('md') {
      padding: $space-7 $space-11;
    }
    @include media-max-width('sm') {
      padding: $space-7 $space-5;
    }

    .sharing {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: $space-13 $spacing-none $space-9;
      max-width: 100%;

      @include media-max-width('lg') {
        padding: $space-8 $spacing-none $space-6;
      }
      @include media-max-width('md') {
        padding: $spacing-none
      }
      @include media-max-width('sm') {
        padding: $spacing-none;
      }

      &-link {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: $space-4;
        max-width: 100%;

        &__title {
          color: $grey-9;
          @include body2;
        }

        &__copy {
          width: 100%;
          max-width: 100%;
          display: flex;
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

          &--url {
            @include body1;
            color: $grey-9;
            direction: rtl;
            width: 100%;
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
        margin-top: $space-7;

        @include media-max-width('lg') {
          margin-top: $space-6;
        }
      }
    }
  }
}
</style>
