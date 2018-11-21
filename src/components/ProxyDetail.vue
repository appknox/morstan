<template>
  <div id="proxy-detail">
    <div class="proxydetail" v-bind:class="{
      'proxydetail--success': isRunning,
      'proxydetail--error': !isRunning,
    }">
      <div class="proxydetail__container">
        <div class="proxydetail__label">Proxy Server</div>
        <div class="proxydetail__state">
          <span v-if="isRunning">Running</span>
          <span v-else>Not Running</span>
        </div>
        <div>{{ port }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ProxyDetail extends Vue {
  @Prop() private isRunning!: boolean;
  @Prop() private port!: string;
}
</script>

<style scoped lang="scss">
.proxydetail {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.2em;
  min-height: 1.8em;
  border-radius: 2em;
  width: 100%;
  border: 1px solid;

  &__container {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    padding: 0.5em 0.5em 0.5em 1em;
  }

  &__label {
    font-weight: 500;
    width: 30%;
    text-align: left;
  }

  &__state {
    color: $color-error;
    width: 40%;
  }
  &--error {
    background: lighten($color-error, 48%);
    border-color: lighten($color-error, 43%);
    .proxydetail__state {
      color: $color-error;
    }
  }
  &--success {
    background: lighten($color-success, 46%);
    border-color: lighten($color-success, 41%);
    .proxydetail__state {
      color: $color-success;
    }
  }
}
</style>
