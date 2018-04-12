<template lang="pug">
.statusBar(:class="{ '-hasMana': hasMana }")
  img.statusBar__img(:src='character.imagePath')
  .statusBar__barWrapper.-health(:class="{ '-hasMana': hasMana }")
    .statusBar__bar(:style="{width: character.health + '%'}")
  .statusBar__barWrapper.-mana(v-if='hasMana')
    .statusBar__bar(:style="{width: character.mana + '%'}")
</template>

<script>
export default {
  name: 'StatusBar',

  props: {
    character: Object,
    hasMana: Boolean,
  }
}
</script>
