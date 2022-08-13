<template>
  <div class="donate bg-white q-pa-sm q-mx-md shadow-4">
    <p>کمک مالی به آلاء</p>
    <q-separator/>
    <div class="row q-my-md">
      <div class="column col-7">
        <div class="donate-wrapper border text-center q-py-sm ">
          <span>
          به آلاء کمک نمیکنم
          </span>
        </div>
        <div class="row text-center q-mt-md ">
          <div v-for="cost in donateCost" :key="cost" class="cost-donate col border q-mx-xs q-pa-sm"><span>{{cost}}</span></div>
        </div>
      </div>
      <div class="col-5"><q-img src="src/assets/3.png"/></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Donate',
    data(){
      return{
        donateCost:['5000','10000','20000']
      }
    }
  }
</script>

<style lang="scss" scoped>
  .donate {
    border-radius: 10px;
  }

  .donate-wrapper:hover {
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
</style>
