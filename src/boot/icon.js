import { boot } from 'quasar/wrappers'

export default boot(({ app, store, router }) => {
  app.config.globalProperties.$q.iconMapFn = (iconName) => {
    if (iconName.startsWith('isax:') === true) {
      const name = iconName.substring(5)
      return {
        cls: 'isax isax-' + name
      }
    } else if (iconName.startsWith('isax-svg:') === true) {
      const name = iconName.substring(9)
      return {
        // iconName: 'img:/assets/icons/Iconsax/svg/linear/3d-cube-scan.svg',
        icon: 'img:/iconsax-svg/svg/linear/' + name + '.svg'
        // cls: 'img:/iconsax-svg/svg/linear/3d-cube-scan.svg',
        // img: true
        // src: '/assets/icons/Iconsax/svg/linear/3d-cube-scan.svg'
        // content: '<img src="img:/iconsax-svg/svg/linear/3d-cube-scan.svg" />'
      }
    }
  }
})
