<template>
  <div class="loading-indicator" v-bind:style="{height: size + 'em', width: size + 'em'}">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class DeviceConnect extends Vue {
  @Prop() private size!: object;
}
</script>

<style scoped lang="scss">
.loading-indicator {
  margin: 5em auto;
  text-align: center;
  & > div {
    background-color: rgba($color-text, 0.25);
    height: 100%;
    width: 10%;
    margin: 0 2%;
    display: inline-block;
    animation: stretchdelay 1.2s infinite ease-in-out;
    &:nth-child(2) {
      animation-delay: -1.1s;
    }
    &:nth-child(3) {
      animation-delay: -1.0s;
    }
    &:nth-child(4) {
      animation-delay: -0.9s;
    }
    &:nth-child(5) {
      animation-delay: -0.8s;
    }
  }
}
@keyframes stretchdelay {
  0%, 40%, 100% {
    transform: scaleY(0.4);
  }  20% {
    transform: scaleY(1.0);
  }
}
</style>
