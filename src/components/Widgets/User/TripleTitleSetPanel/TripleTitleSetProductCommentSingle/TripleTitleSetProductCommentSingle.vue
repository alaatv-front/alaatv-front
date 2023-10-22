<template>
  <div class="product-comment">
    <q-card class="comment-box custom-card">
      <q-card-section class="comment-header">
        <div class="comment-title">{{ comment['set'].short_title + ' > ' + comment.content.title}}</div>
        <div class="comment-action">
          <q-btn color="primary"
                 icon="delete_outline"
                 flat
                 @click="confirmDelete" />
          <q-btn color="primary"
                 icon="content_copy"
                 flat
                 @click="copyComment" />
          <q-btn color="primary"
                 icon="edit"
                 flat
                 @click="toggleEdit" />
        </div>
      </q-card-section>
      <q-separator inset />
      <q-card-section class="comment-main">
        <div v-if="edit"
             class="comment-form">
          <q-editor v-model="comment.comment"
                    min-height="5rem"
                    flat />
          <q-btn color="primary"
                 class="q-mt-md"
                 label="ویرایش"
                 @click="editComment" />
        </div>
        <div v-else
             class="comment-content">
          {{ comment.comment }}
        </div>
      </q-card-section>
      <q-card-section class="comment-footer">
        <div class="comment-time">
          {{ getShamsiDate(comment.created_at) }}
        </div>
        <div class="comment-">
          <q-btn color="primary"
                 flat
                 icon-right="chevron_left"
                 label="مشاهده فیلم این جلسه"
                 :to="{name: 'UserPanel.Asset.TripleTitleSet.Content', params: {productId: $route.params.productId, setId: comment['set'].id, contentId: comment.content.id}}" />
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>
<script>
import moment from 'moment-jalaali'
import { copyToClipboard } from 'quasar'
import { Comment } from 'src/models/Comment.js'
import { mixinTripleTitleSet, mixinAuth } from 'src/mixin/Mixins.js'

moment.loadPersian()
export default {
  name: 'TripleTitleSetProductCommentSingle',
  mixins: [mixinAuth, mixinTripleTitleSet],
  data() {
    return {
      comment: new Comment(),
      edit: false
    }
  },
  mounted () {
    if (this.isUserLogin) {
      this.afterAuthenticate()
    }
  },
  methods: {
    afterAuthenticate() {
      this.getComment()
      this.loadData(this.$route.params.productId)
    },
    getComment() {
      this.$apiGateway.comment.get({ data: { id: this.$route.params.commentId } }).then(res => {
        this.comment = res
      }).catch(() => {})
    },
    toggleEdit() {
      this.edit = !this.edit
    },
    editComment() {
      this.$apiGateway.comment.put({ data: this.comment }).then((res) => {
        this.comment = res
        this.toggleEdit()
      }).catch(() => {})
    },
    deleteComment() {
      this.$apiGateway.comment.delete({ data: { id: this.$route.params.commentId } }).then(() => {
        this.$router.push({ name: 'UserPanel.Asset.TripleTitleSet.ProductComments', params: { productId: this.$route.params.productId } })
      }).catch(() => {})
    },
    loadData(productId) {
      this.$store.dispatch('TripleTitleSet/getSet', productId)
      this.$store.dispatch('TripleTitleSet/getSelectedProduct', productId)
    },
    copyComment() {
      copyToClipboard(this.comment.comment)
        .then(() => {
          this.$q.notify({
            message: 'یادداشت با موفقیت کپی شد',
            color: 'primary'
          })
        })
        .catch(() => {
          this.$q.notify({
            message: 'مشکلی پیش آمده است. لطفا دوباره تلاش کنید',
            color: 'warning'
          })
        })
    },
    confirmDelete () {
      this.$q.dialog({
        dark: false,
        title: 'حذف یادداشت',
        message: 'آیا از حذف این یادداشت اطمینان دارید ؟',
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteComment()
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    },
    getShamsiDate (date) {
      return moment(date, 'YYYY/M/D').locale('fa').format('jD jMMMM jYYYY')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-comment {
  padding: 15px;

  .comment-box {
    width: 100%;
    background: #fff;

    .comment-header {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media screen and (max-width: 1024px) {
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
      }

      .comment-title {
        align-self: flex-start;
      }
    }

    .comment-main {
      min-height: 120px;
    }

    .comment-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
