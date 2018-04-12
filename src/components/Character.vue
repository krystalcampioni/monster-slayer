<template lang="pug">
  .character(:style='inlineStyle' :class='`${characterName} ${animationName}`')
</template>

<script>
export default {
  name: 'Character',

  props: {
    characterName: String,
    animationName: String
  },

  computed: {
    inlineStyle() {
      return `background-image: url(${this.characterImagePath}); animation-name: ${this.animationName}`
    },
    characterImagePath() {
      return require(`@/images/${this.characterName}/animations.png`)
    }
  },
}
</script>


<style lang="scss">
.character {
  position: absolute;
  z-index: 1000;
  width: 530px;
  height: 530px;
  background-size: 5345px;
  animation-duration: .8s;
  animation-timing-function: steps(10);
  animation-iteration-count: infinite;
  transform: scale(.7);
  top: 138px;
  will-change: auto;

  &.enemy {
    transform: scale(-.7, .7);
    left: 170px;
  }

  &.dying {
    animation-iteration-count: 1;
    animation-duration: .8s;
    animation-fill-mode: forwards;
  }

  &.dead {
     background-position: -4228px -2088px;
  }
}

@keyframes idle {
  from { background-position: 0 0; }
  to { background-position: -5345px 0; }
}
@keyframes heal {
  from { background-position: 0 -534px; }
  to { background-position: -5345px -534px; }
}
@keyframes attacking {
  from { background-position: 0 2139px; }
  to { background-position: -5345px 2139px; }
}
@keyframes specialAttacking {
  from { background-position: 0 1602px; }
  to { background-position: -5345px 1602px; }
}
@keyframes dying {
  from { background-position: 0 -2138px; }
  to { background-position: -5345px -2138px; }
}


</style>
