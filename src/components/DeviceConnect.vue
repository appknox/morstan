<template>
  <div id="device-connect">
    <section class="deviceconnect">

      <!-- Mobile icon -->
      <svg class="deviceconnect__icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20.1 7.7l-1 1c1.8 1.8 1.8 4.6 0 6.5l1 1c2.5-2.3 2.5-6.1 0-8.5zM18 9.8l-1 1c.5.7.5 1.6 0 2.3l1 1c1.2-1.2 1.2-3 0-4.3zM14 1H4c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-2-2-2zm0 19H4V4h10v16z"/></svg>

      <!-- Connect inputs -->
      <input class="deviceconnect__input" name="url" type="text" v-model="url" placeholder="Device URL">
      <input class="deviceconnect__input" name="token" type="text" v-model="token" placeholder="Token">
      <button class="deviceconnect__button" v-on:click="getStatus" v-bind:disabled="isInvalidRequest || isLoading">Connect</button>

    </section>

    <!-- Response -->
    <LoadingIndicator v-if="isLoading" size="4" />
    <DeviceStatus v-else v-show="statusLoaded" v-bind:status="statusData" />

  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import hostNameValidator from '@/validators/hostName';
import DeviceStatus from '@/components/DeviceStatus.vue';
import LoadingIndicator from '@/components/LoadingIndicator.vue';

@Component({
  components: {
    DeviceStatus,
    LoadingIndicator,
  },
})
export default class DeviceConnect extends Vue {
  private statusLoaded = false;
  private url = localStorage.getItem('url') || '';
  private token = localStorage.getItem('token') || '';
  private statusData = {};
  private isLoading = false;

  private async getStatus() {
    this.isLoading = true;
    localStorage.setItem('token', this.token);
    localStorage.setItem('url', this.url);
    try {
      const data = await fetch(`${this.url}/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Token ${this.token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      this.statusData = await data.json();
      this.isLoading = false;
      this.statusLoaded = true;
    } catch (err) {
      this.isLoading = false;
      this.statusLoaded = false;
      this.$notify({
        title: 'Couldn\'t connect.',
        text: JSON.stringify(err),
        type: 'error',
        duration: 6000,
      });
    }

    Vue.prototype.$hostName = this.url;
    Vue.prototype.$authToken = this.token;
  }

  get isInvalidRequest() {
    return !this.url || !hostNameValidator(this.url) || !this.token;
  }
}
</script>

<style scoped lang="scss">
.deviceconnect {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2em;
  background: rgba(lighten($color-text, 65%), 0.1);
  border-bottom: 1px solid rgba(lighten($color-text, 60%), 0.3);
  @media (min-width: 768px) {
    flex-direction: row;
  }
  & > * {
    margin-left: 0.5em;
    margin-right: 0.5em;
    margin-top: 0.5em;
    @media (min-width: 768px) {
      margin-bottom: 0;
    }
  }

  &__icon {
    display: none;
    @media (min-width: 768px) {
      fill: $color-text;
      display: block;
    }
  }

  &__input {
    font-family: monospace;
    font-size: 1.1em;
    padding: 0.6em 0.7em;
    margin-left: 0.3em;
    color: lighten($color-text, 18%);
    background: $input-default-bg;
    border-radius: $btn-default-border-radius;
    border: none;
    box-shadow: inset 1px 1px 2px darken($input-default-bg, 1%);
  }

  &__button {
    background: $btn-primary-bg;
    color: $btn-primary-fg;
    border: 1px solid $btn-primary-border;
    padding: 0.5em 1em;
    font-size: 1em;
    border-radius: $btn-default-border-radius;
    display: flex;
    align-items: center;
    &:hover, &:focus, &:active {
      background: $btn-primary-bg-hover;
      border-color: $btn-primary-border-hover;
      cursor: pointer;
    }
    &:disabled,
    &[disabled]{
      border: 1px solid $btn-disabled-border;
      background-color: $btn-disabled-bg;
      color: $btn-disabled-fg;
      &:hover {
        cursor: not-allowed;
      }
    }
  }
}
</style>
