<template>
  <div class="container"
       dir="rtl">

    <div class="slider-ui color2"
         dir="ltr">
      <input type="range"
             value="0"
             min="0"
             max="200"
             data-labels="0,10,20,35,50,80,100,150,200"
             data-positions="0,5,10,17.5,25,40,50,75,100">
      <ul class="slider-labels" />
      <div class="bar">
        <span class="min" />
        <span class="max" />
      </div>
      <div class="track">
        <div class="value" />
      </div>
    </div>

    <!--    <div id="slider-container" style="&#45;&#45;value:0.51;"><input type="range" id="slider" min="0" max="100" step="1"><div id="value">51</div><div id="slider-track"></div></div>-->

  </div>

</template>

<script>
export default {
  name: 'Slider',
  mounted () {
    const sliders = document.querySelectorAll('.slider-ui')

    sliders.forEach(slider => {
      const input = slider.querySelector('input[type=range]')
      const min = input.getAttribute('min')
      const max = input.getAttribute('max')
      const valueElem = slider.querySelector('.value')
      const positions = input.getAttribute('data-positions').split(',')
      const labels = input.getAttribute('data-labels').split(',')
      const sliderLabels = slider.querySelector('.slider-labels')
      positions.forEach((value, index) => {
        const li = document.createElement('li')
        li.innerHTML = labels[index]
        li.style.left = 'calc( ' + value + '% - 12px)'
        sliderLabels.appendChild(li)
      })
      slider.querySelector('.min').innerText = min
      slider.querySelector('.max').innerText = max

      function setValueElem () {
        valueElem.innerText = input.value
        const percent = (input.value - min) / (max - min) * 100
        valueElem.style.left = percent + '%'
      }

      // function setSliderOnStep () {
      //   if (input.value < 10) {
      //     input.value = 0
      //   } else if (input.value > 10 && input.value < 20) {
      //     input.value = 20
      //   } else if (input.value > 20 && input.value < 35) {
      //     input.value = 35
      //   } else if (input.value > 35 && input.value < 50) {
      //     input.value = 50
      //   } else if (input.value > 50 && input.value < 80) {
      //     input.value = 80
      //   } else if (input.value > 80 && input.value < 100) {
      //     input.value = 100
      //   } else if (input.value > 100 && input.value < 150) {
      //     input.value = 150
      //   } else if (input.value > 150 && input.value < 200) {
      //     input.value = 200
      //   }
      //   setValueElem()
      // }
      setValueElem()

      input.addEventListener('input', setValueElem)
      input.addEventListener('mousedown', () => {
        valueElem.classList.add('up')
      })
      input.addEventListener('mouseup', () => {
        // setSliderOnStep()
        valueElem.classList.remove('up')
      })
    })
  }
}
</script>

<style>
#slider-container {
  --value : 0 ;
  --slider-track-color : #B0EFEF45 ;
  --slider-thumb-color : #fff ;
  --slider-fill-color  : #31D3C6 ;
  --slider-fill2-color : #00A2BB ;

  width : 100% ;
  height: 1rem ;
  display: flex ;
  align-items: center ;
  justify-content: center ;
  padding: 0 ;
  margin: 0 ;
  animation: color-cycle 1s infinite alternate linear;
}

@keyframes color-cycle {
  0% {
    --slider-fill-color  : #31D3C6 ;
  }

  100% {
    --slider-fill-color : #00A2BB ;
  }
}

#slider {
  appearance: none;
  height: 1rem ;
  width: 100% ;
  margin : 0 ;
  padding: 0 ;
  background-color: #0000 ;
  outline: none ;
  z-index: 99 ;
}

#slider-track {
  position: absolute ;
  top: calc(50% - 0.25rem);
  left: 0 ;
  width: 100% ;
  height: 0.5rem ;
  border-radius: 0.25rem ;
  background-color: var(--slider-track-color) ;
  overflow: hidden ;
}

#slider-track::before {
  position: absolute ;
  content: "" ;
  left: calc(-100% + 1.5rem) ;
  top : 0 ;
  width : calc(100% - 1rem) ;
  height: 100% ;
  background-color: var(--slider-fill-color) ;
  transition: background-color 300ms ease-out ;
  transform-origin: 100% 0%;
  transform: translateX(calc( var(--value) * 100% )) scaleX(1.2);
}

#slider::-webkit-slider-thumb {
  appearance: none;
  width : 1rem ;
  height: 1rem ;
  border-radius: 50% ;
  background-color: var(--slider-thumb-color) ;
  cursor: pointer ;
  z-index: 99 ;
  border: 2px solid var(--slider-fill-color) ;
  transition: border-color 300ms ease-out ;
}

#value {
  position: absolute ;
  bottom: calc(100% + 0.5rem) ;
  left: calc( var(--value) * calc(100% - 1rem) - 0.8rem) ;
  min-width: 3ch ;
  border-radius: 4px ;
  pointer-events: none ;
  padding: 0.5rem ;
  display: flex ;
  align-items: center ;
  justify-content: center ;
  color: #FFF ;
  background-color: var(--slider-fill-color);
  opacity: 0 ;
  transition: left 300ms ease-out , opacity 300ms 300ms ease-out , background-color 300ms ease-out ;
}

#value::before {
  position: absolute ;
  content: "" ;
  top: 100% ;
  left: 50% ;
  width: 1rem ;
  height: 1rem ;
  border-radius: 2px ;
  background-color: inherit ;
  transform: translate(-50%,-80%) rotate(45deg);
  z-index: -1 ;
}

#slider-container:hover  #value {
  opacity: 1 ;
}
</style>

<style>
.slider-labels {
  list-style: none;
  position: absolute;
  left: 15px;
  right: 15px;
  top: 0;
}

.slider-labels li {
  position: absolute;
  width: 30px;
  top: 15px;
  text-align: center;
}

.slider-ui {
  position: relative;
  width: 100%;
  height: 8px;
  margin: 70px 0;
}

.slider-ui input {
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  width: 100%;
  cursor: pointer;
  opacity: 0;
}

.slider-ui .bar {
  position: absolute;
  z-index: 1;
  inset: 0;
  background-color: #000;
  border-radius: 50px;
  box-shadow: 0 5px 0 rgb(0 0 0 / 10%);
}

.slider-ui .min,
.slider-ui .max {
  position: absolute;
  z-index: 2;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  font-weight: 800;
  color: #fff;
  display: none;
}

.slider-ui .min {
  left: 2%;
}

.slider-ui .max {
  right: 2%;
}

.slider-ui .track {
  position: absolute;
  z-index: 3;
  inset: 0 15px;
}

.slider-ui .value {
  position: absolute;
  left: 50%;
  top: -17px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: 800;
  color: inherit;
  background-color: #fff;
  border: 4px solid #000;
  border-radius: 100%;
  box-sizing: border-box;
  transform: translateX(-50%);
  transition: top .3s ease-in-out, color .3s ease-in-out;
}

.slider-ui .value.up {
  top: -50px;
  color: #000;
  width: 50px;
  height: 50px;
}

.slider-ui.color1 .bar {
  background-color: #00b894;
}

.slider-ui.color1 .value {
  border-color: #00b894;
}

.slider-ui.color2 .bar {
  background-color: #00cec9;
}

.slider-ui.color2 .value {
  border-color: #00cec9;
}

.slider-ui.color3 .bar {
  background-color: #0984e3;
}

.slider-ui.color3 .value {
  border-color: #0984e3;
}

.youtube-link {
  position: fixed;
  left: 20px;
  bottom: 20px;
  color: #000;
  text-decoration: none;
  font-size: 12px;
}
</style>
