<template>
  <div class="services-widget">
    <div class="services row q-col-gutter-md q-mt-md justify-center">
      <div v-for="(service, index) in options.services"
           :key="index"
           class="col-xs-4 col-sm-3 col-md-1">
        <a v-if="service.action === 'link'"
           class="service"
           :href="service.link"
           :title="service.title"
           target="_self">
          <div class="service-image">
            <q-img :src="service.icon" />
          </div>
          <p class="service-title">{{ service.title }}</p>
          <p class="service-subtitle">{{ service.subTitle }}</p>
        </a>
        <div v-else
             class="service cursor-pointer"
             @click="scrollToElement(service)">
          <div class="service-image">
            <q-img :src="service.icon" />
          </div>
          <p class="service-title">{{ service.title }}</p>
          <p class="service-subtitle">{{ service.subTitle }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'Services',
  mixins: [mixinWidget],
  data () {
    return {
    }
  },
  methods: {
    onDragStart(event, service, serviceIndex) {
      event.dataTransfer.dropEffect = 'move'
      event.dataTransfer.setData('value', JSON.stringify({ service, serviceIndex }))
      this.localDraggable = event
    },
    onDragLeave() {

    },
    onDragOver(event) {
      event.preventDefault()
    },
    onDrop(event, newIndex, parent) {
      const valueStringfied = event.dataTransfer.getData('value')
      const value = valueStringfied ? JSON.parse(valueStringfied) : null
      const widget = value.widget
      const widgetOldIndex = value.widgetIndex
      const widgetNewIndex = newIndex
      if (this.localDraggable) {
        this.updatePosition(this.localOptions.services, widgetOldIndex, widgetNewIndex)
      } else {
        this.addToIndex(this.localOptions.services, widget, widgetNewIndex)
      }

      this.localDraggable = null
      // emit('onDrag', 'Drop')
      event.stopPropagation()
    },
    addToIndex(list, newItem, index) {
      if (list.length > index) {
        list.splice(index, 0, newItem)
      } else {
        list.push(newItem)
      }
    },
    updatePosition(list, oldIndex, newIndex) {
      list.splice(newIndex, 0, list.splice(oldIndex, 1)[0])
    },
    scrollToElement(service) {
      let el = null
      if (service.action === 'scrollToId') {
        el = document.getElementById(service.scrollToId)
      } else if (service.action === 'scrollToClass') {
        el = document.getElementsByClassName(service.scrollToClass)[0]
      }
      const headerOffset = 150
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }

}
</script>

<style lang="scss" scoped>
.services-widget {
  background: white;
  border-radius: 10px;

  .services {
    justify-content: space-around;
    .service {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #000000;
      text-align: center;
      &:hover, &:focus {
        .service-image {
          .q-img {
            transform: scale(.9);
          }
          &:after {
            transform: rotate(135deg);
          }

        }
      }
      .service-image {
        width: 92px;
        height: 92px;
        display: block;
        position: relative;
        margin: 0 auto;

        .q-img {
          margin: 15px;
          transition: transform .4s ease;
          -webkit-transition: transform .4s ease;
          -moz-transition: transform .4s ease;
          width: 52px;
        }

        &:before {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #e4e4e4;
          border-radius: 50%;
        }

        &:after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border: 2px solid #ffc107;
          border-radius: 50%;
          border-bottom-color: transparent;
          border-left-color: transparent;
          transform: rotate(-45deg);
          transition: transform .4s ease;
          -webkit-transition: transform .4s ease;
          -moz-transition: transform .4s ease;
        }

        @media screen and (max-width: 599px) {
          width: 70px;
          height: 70px;
          .q-img {
            width: 40px;
            margin-top: 15px;
          }
        }
      }
      .service-title {
        font-weight: bold;
      }
      .service-subtitle {
        font-size: 12px;
        color: var(--alaa-TextSecondary);
      }
    }
  }
}
</style>
