<template>
  <div v-if="!loading"
       class="show-gift-cart">
    <div id="giftCard"
         class="gift-cart-container">
      <img src="https://nodes.alaatv.com/upload/landing/34/card-2.png"
           alt="background">
      <div class="code-box flex">
        <div class="code">
          {{referralCode.code}}
        </div>
      </div>
    </div>

    <q-btn color="primary"
           class="q-mt-lg"
           label="دانلود"
           @click="PrintDiv" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import html2canvas from 'html2canvas'
import { ReferralCode } from 'src/models/ReferralCode.js'

export default defineComponent({
  name: 'GiftCardDownload',
  data() {
    return {
      referralCode: new ReferralCode(),
      loading: false
    }
  },
  mounted() {
    this.getGiftCard()
  },
  methods: {
    getGiftCard() {
      this.loading = true
      this.$apiGateway.referralCode.getReferralCode({
        'referral-code': this.$route.params.referralCode
      })
        .then(referralCode => {
          this.referralCode = referralCode
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    PrintDiv() {
      const element = document.getElementById('giftCard')
      html2canvas(element, {
        allowTaint: true,
        useCORS: true
      })
        .then((canvas) => {
          this.downloadURI(canvas.toDataURL(), 'gift-card.png')
        })
        .catch(() => {})
    },
    downloadURI(uri, name) {
      const link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
    }
  }
})
</script>

<style lang="scss" scoped>
.show-gift-cart{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.gift-download {
  margin-top: 30px;
  width: 300px;
  height: 50px;
  border-radius: 15px;
  background: #F89003;
  color: #fff;
  border: none;
}

.gift-cart-container {
  width: 320px;
  position: relative;

  .code-box {
    font-style: normal;
    font-weight: 700;
    font-size: 22.4118px;
    line-height: 38px;
    letter-spacing: -0.035em;
    color: #FFF;
    position: absolute;
    top:44%;
    right: 63px;

    .code {
      direction: rtl;
    }

    .pre-code{
      margin-right: 18.41px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    position: relative;
  }
}
</style>
