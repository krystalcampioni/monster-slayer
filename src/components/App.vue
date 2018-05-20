<template lang="pug">
  #app
    transition(name="fade"  mode="out-in")
      Dialog(:action='startGame' :title='dialogTitle' v-if='showDialog')
    .row-fixed-top
      StatusBar(:character='player' :hasMana='true')
      StatusBar(:character='enemy' :hasMana='false')

    Environment
      Character(characterName='viking' :animationName='player.animation')
      Character(characterName='enemy' :animationName='enemy.animation')

    transition(name="bounce"  mode="out-in")
      .controls(v-if="!gameIsRunning" key="startButton")
        button.controls__button.-startGame(@click="startGame" autofocus) START NEW GAME

      .controls(v-else key="gameControls")
        button.controls__button.-attack(@click="attack") ATTACK
        button.controls__button.-specialAttack(
          @click="specialAttack"
          :class='{ "-isDisabled" : player.mana !== 100}'
        ) SPECIAL ATTACK
        button.controls__button(@click="giveUp") GIVE UP
</template>

<script>
import Character from '@/components/Character'
import Environment from '@/components/Environment'
import StatusBar from '@/components/StatusBar'
import Dialog from '@/components/Dialog'

export default {
  name: 'app',

  components: {
    Character,
    Environment,
    StatusBar,
    Dialog,
  },

  data() {
    return {
      player: {
        animation: 'idle',
        imagePath: require(`@/images/viking/profile.jpg`),
        health: 100,
        mana: 0,
      },
      enemy: {
        animation: 'idle',
        imagePath: require(`@/images/enemy/profile.jpg`),
        health: 100,
      },
      gameIsRunning: false,
      animationDelay: 800,
      showDialog: false,
      dialogTitle: '',
    }
  },

  methods: {
      startGame() {
          this.gameIsRunning = true;
          this.player.health = 100;
          this.player.mana = 0;
          this.enemy.health = 100;
          this.showDialog = false;
          this.player.animation = 'idle';
          this.enemy.animation = 'idle';
      },

      attack() {
        this.increaseMana();
        this.updateAnimation(this.player, 'idle', 'attacking');
        var damage = this.calculateDamage(5, 10);
        this.enemy.health -= damage;

        if (this.isGameOver()) {
          return;
        }
        this.enemyAttacks();
      },

      updateAnimation(character, afterAnimation, currentAnimation){
        character.animation = currentAnimation;

        setTimeout(() => {
          character.animation = afterAnimation;
        }, this.animationDelay);
      },

      increaseMana() {
        if (this.player.mana < 100) {
          this.player.mana += 25
        }
      },

      specialAttack() {
        // Only allow specialAttack if player has enough mana
        if (this.player.mana === 100) {
          var damage = this.calculateDamage(10, 20);
          this.updateAnimation(this.player, 'idle', 'specialAttacking');
          this.enemy.health -= damage;

          if (this.isGameOver()) { return; }

          this.enemyAttacks();
          this.player.mana = 0;
        }
      },

      heal() {
        this.updateAnimation(this.player, 'idle', 'heal');

        if (this.player.health <= 90) {
          this.player.health += 10;
        } else {
          this.player.health = 100;
        }

        this.enemyAttacks();
      },

      giveUp() {
        this.gameIsRunning = false;
      },

      enemyAttacks() {
        this.updateAnimation(this.enemy, 'idle', 'attacking');

        var damage = this.calculateDamage(5, 10);
        this.player.health -= damage;
        this.isGameOver();
      },

      calculateDamage(min, max) {
        return Math.max(Math.floor(Math.random() * max) + 1, min);
      },

      isGameOver() {
        if (this.enemy.health <= 0) {
          this.updateAnimation(this.enemy, 'dead', 'dying');
          this.dialogTitle = 'You won!';

          setTimeout(() => {
            this.showDialog = true;
          }, this.animationDelay);

          return true;

        } else if (this.player.health <= 0) {
          this.updateAnimation(this.player, 'dead', 'dying');
          this.dialogTitle = 'You lost!';

          setTimeout(() => {
            this.showDialog = true;
          }, this.animationDelay);

          return true;
        }
        return false;
      }
  },
}
</script>

<style lang='scss'>
@import '../scss/main';
</style>
