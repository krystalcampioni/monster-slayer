<template lang="pug">
  .dialog__overlay
    .dialog__box
      h1 {{ title }}
      button.controls__button.-startGame(@click="action" autofocus) START NEW GAME
</template>

<script>
export default {
  name: 'Dialog',

  props: {
    action: {
      type: Function,
    },
    title: {
      type: String
    },
  }

}
</script>

<style lang="scss">
.dialog {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(98, 9, 117, 0.79);
    padding: 20vh;
    z-index: 900;
  }

  &__box {
    background: #f7f6ef;
    padding: 20px;
    width: 300px;
    margin: 0 auto;
    text-align: center;
  }
}
</style>
