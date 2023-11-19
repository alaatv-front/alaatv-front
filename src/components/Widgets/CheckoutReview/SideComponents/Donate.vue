<template>
  <div class="donate bg-white">
    <p>کمک مالی به آلاء</p>
    <q-separator />
    <div class="row q-my-md text-center reverse-wrap">
      <div class="row col-md-8 col-sm-9 col-xs-12 items-center"
           style="font-size: 14px">
        <div :class="{activeHelp:!helpAlaa}"
             class="donate-help col-md-12 col-xs-6 border text-center q-py-sm"
             @click="helpAlaa=false,activeDonateCost()">
          <span>
            به آلاء کمک نمیکنم
          </span>
        </div>
        <div class="cost row text-center q-mt-md col-md-12 col-xs-6">
          <div v-for="(cost,idx) in donateCost"
               :key="idx"
               :class="{activeDonate:cost.isActive}"
               class="cost-donate col border q-mx-xs q-pa-sm"
               @click="activeDonateCost(idx), helpAlaa=true">
            <span>{{ cost.cost }}</span>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-sm-3 col-xs-12">
        <q-img width="100px"
               height="100px"
               :src="src" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donate',
  data() {
    return {
      helpAlaa: false,
      donateCost: [{ cost: 5000, isActive: false }, { cost: 10000, isActive: false }, {
        cost: 20000,
        isActive: false
      }],
      src: 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
    }
  },
  methods: {
    activeDonateCost(idx) {
      if (!this.helpAlaa) {
        this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-sad.png'
      }
      this.donateCost.forEach(e => {
        e.isActive = false
      })
      if (typeof idx === 'number') {
        this.donateCost[idx].isActive = true
        if (idx === 0 || idx === 1) {
          this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-happy.png'
        } else {
          this.src = 'https://nodes.alaatv.com/upload/landing/yalda1400/yalda-landing-modal-emoji-veryHappy.png'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.donate {
  border-radius: 10px;
  box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
  padding:16px 30px;
  color: #575962;
}

.donate-help:hover {
  border-color: #FF9000;
  color: #FF9000;
}

.cost-donate:hover {
  border-color: #4CAF50;
  color: #4CAF50
}

.border {
  border: 2px solid #575962;
  border-radius: 8px;
}

.activeHelp {
  border-color: #FF9000;
  color: #FF9000;
}

.activeDonate {
  border-color: #4CAF50;
  color: #4CAF50
}

@media (width <= 1024px) {
  .cost {
    margin-top: 0;
  }
}
</style>
