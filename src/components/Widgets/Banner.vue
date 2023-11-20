<template>
  <div>
    <div class="row no-gutters ad ad1">
      <div class="col">
        <a href=""
           class="a--gtm-eec-advertisement a--gtm-eec-advertisement-click">
          <!--          data-gtm-eec-promotion-id="{{ $ad['id'] }}"
          data-gtm-eec-promotion-name="{{ $ad['name'] }}"
          data-gtm-eec-promotion-creative="{{ $ad['creative'] }}"
          data-gtm-eec-promotion-position="{{ $ad['position'] }}"-->
          <q-img src="https://nodes.alaatv.com/upload/images/slideShow/1658223196_5187.jpg?w=305&h=428"
                 class="d-md-block d-sm-none d-none" />
          <!--                alt="{{ $ad['name'] }}"
            width="{{ $ad['imgDesktopWidth'] }}"
            height="{{ $ad['imgDesktopHeight'] }}"-->
          <q-img src="https://nodes.alaatv.com/upload/images/slideShow/1658223196_5187.jpg?w=305&h=428"
                 class="d-block d-sm-block d-md-none" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Banner'
}
</script>
