<template>
  <div class="row justify-center items-center q-pa-lg new-theme ">
    <div v-for="size in sizes"
         :key="size"
         class="col-12 col-md-2 flex column flex-center">
      <q-avatar :class="size.className"
                class="q-mb-md"
                color="primary"
                text-color="white"
                icon="directions" />
      <div>{{ size.className }}</div>
    </div>
  </div>
  <div class="row justify-center items-center new-theme">
    <div class="col-12 col-md-2 flex flex-center">
      <avatar-groupe :avatars="avatars"
                     :size="'xs'" />
    </div>
    <div class="col-12 col-md-2 flex flex-center">
      <avatar-groupe :avatars="avatars"
                     :size="'sm'" />
    </div>
    <div class="col-12 col-md-2 flex flex-center">
      <avatar-groupe :avatars="avatars"
                     :size="'md'" />
    </div>
    <div class="col-12 col-md-2 flex flex-center">
      <avatar-groupe :avatars="avatars"
                     :size="'lg'" />
    </div>
    <div class="col-12 col-md-2 flex flex-center">
      <avatar-groupe :avatars="avatars"
                     :size="'xl'" />
    </div>
  </div>
</template>

<script>
import AvatarGroupe from './AvatarGroupe.vue'
export default {
  name: 'Avatar',
  components: {
    AvatarGroupe
  },
  data () {
    return {
      avatars: [
        'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S56.png',
        'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S9.png',
        'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S11.png',
        'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S16.png',
        'https://nodes.alaatv.com/upload/landing/110/Rotbeh/S18.png'
      ],
      sizes: [
        {
          size: 'xs',
          className: 'avatar-xs'
        },
        {
          size: 'sm',
          className: 'avatar-sm'
        },
        {
          size: 'md',
          className: 'avatar-md'
        },
        {
          size: 'lg',
          className: 'avatar-lg'
        },
        {
          size: 'xl',
          className: 'avatar-xl'
        }
      ]
    }
  }
}
</script>
