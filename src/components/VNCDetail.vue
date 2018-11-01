<template>
  <div id="vnc-detail">
    <div class="vncdetail" v-bind:class="{
      'vncdetail--success': isRunning && !isRestarting,
      'vncdetail--error': !isRunning && !isRestarting,
      'vncdetail--waiting': isRestarting
    }">
      <div class="vncdetail__container">
        <div class="vncdetail__label">VNC Server</div>
        <div class="vncdetail__state">
          <span v-if="isRestarting">Restarting</span>
          <span v-else-if="isRunning">Running</span>
          <span v-else>Not Running</span>
        </div>
        <div class="vncdetail__action">
          <button class="vncdetail__button" v-show="!isRestarting" v-on:click="restartVNC">Restart</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class VNCDetail extends Vue {

  public isRestarting = false;
  @Prop() private isRunning!: boolean;

  public async restartVNC() {
    this.isRestarting = true;

    try {
      const data = await fetch(`${Vue.prototype.$hostName}/vnc`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${Vue.prototype.$authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
    } catch (err) {
      this.$notify({
        title: 'Restart failed',
        text: JSON.stringify(err),
        type: 'error',
        duration: 5000,
      });
    }
    this.isRestarting = false;
  }

}
</script>

<style scoped lang="scss">
.vncdetail {
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
    .vncdetail__state {
      color: $color-error;
    }
  }
  &--success {
    background: lighten($color-success, 46%);
    border-color: lighten($color-success, 41%);
    .vncdetail__state {
      color: $color-success;
    }
  }
  &--waiting {
    $progress-stripe: lighten($color-waiting, 43%);

    background: lighten($color-waiting, 47%);
    border-color: lighten($color-waiting, 40%);
    transition: width .6s ease;
    background-image: linear-gradient(-45deg, $progress-stripe 25%, transparent 25%, transparent 50%, $progress-stripe 50%, $progress-stripe 75%, transparent 75%, transparent);
    background-size: 20px 20px;
    animation: progress .5s linear infinite;
    .vncdetail__state {
      color: $color-waiting;
    }
  }
  @keyframes progress {
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: 20px 0;
    }
  }

  &__action {
    margin-left: auto;
  }
  &__button {
    background: $btn-secondary-bg;
    color: $btn-secondary-fg;
    border: 1px solid $btn-secondary-border;
    padding: 0.3em 0.8em;
    font-size: 0.9em;
    border-radius: $btn-round-border-radius;
    display: flex;
    align-items: center;
    line-height: 1.3;
    &:hover, &:focus, &:active {
      background: $btn-secondary-bg-hover;
      color: $btn-secondary-fg-hover;
      cursor: pointer;
    }
  }
}
</style>
