<template lang="pug">
  .background
    ul.clouds
      li(v-for='n in 5')
        img.clouds__cloud( src='@/images/background/cloud.png')
    .ocean
      .ocean__back-wave(v-for='n in 3')
    .ship
      slot
      .ocean__front-wave
</template>

<script>
export default {
  name: 'Environment'
}
</script>
