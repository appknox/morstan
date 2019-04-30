<template>
  <div id="device-status">
    <div class="devicestatus">
      <h3 class="devicestatus__title">Device Information</h3>

      <table class="devicestatus__info devicestatus__section">
        <tbody>
          <tr>
            <td>Platform</td>
            <td>{{ status.platform }}</td>
          </tr>
          <tr>
            <td>Platform Version</td>
            <td>{{ status.platform_version }}</td>
          </tr>
          <tr>
            <td>Device Type</td>
            <td>
              <span v-if="status.IsTablet">Tablet</span>
              <span v-else>Phone</span>
            </td>
          </tr>
          <tr>
            <td>Model</td>
            <td>{{ status.model }}</td>
          </tr>
          <tr>
            <td>CPU Architecture</td>
            <td>{{ status.cpu_architecture }}</td>
          </tr>
          <tr>
            <td>UUID</td>
            <td>{{ status.uuid }}</td>
          </tr>
          <tr>
            <td>Agent Version</td>
            <td>{{ status.agent.version }}</td>
          </tr>
        </tbody>
      </table>


      <div class="devicestatus__config devicestatus__section">
        <h4 class="devicestatus__subtitle">Agent Config</h4>
        <ul class="devicestatus__config__list">
          <li v-for="(value, key) in status.config" v-bind:key=key>
            <span class="devicestatus__config__key">{{key}}:</span>
            <span class="devicestatus__config__value">{{value}}</span>
          </li>
        </ul>
      </div>

      <div class="devicestatus__services devicestatus__section">
        <h4 class="devicestatus__subtitle">Services</h4>
        <VNCDetail
          class="devicestatus__vnc"
          v-if="status.vnc"
          v-bind:is-running="status.vnc.is_running"
          v-bind:port="status.vnc.port"
        />
        <ProxyDetail
          class="devicestatus__proxy"
          v-if="status.proxy"
          v-bind:is-running="status.proxy.is_running"
          v-bind:port="status.proxy.port"
        />
      </div>

      <div class="devicestatus__packages devicestatus__section">
        <h4 class="devicestatus__subtitle">Installed Packages</h4>
        <div class="devicestatus__packages__list">
          <InstalledApp class="devicestatus__packages__item" v-for="pkg in status.installed_packages" v-bind:key=pkg.name v-bind:name="pkg.name" />
          <!-- <li v-for="pkg in status.installed_packages" v-bind:key=pkg>{{ pkg.name }}</li> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VNCDetail from '@/components/VNCDetail.vue';
import ProxyDetail from '@/components/ProxyDetail.vue';
import InstalledApp from '@/components/InstalledApp.vue';

@Component({
  components: {
    VNCDetail,
    ProxyDetail,
    InstalledApp,
  },
})
export default class DeviceStatus extends Vue {
  @Prop() private status!: object;
}
</script>

<style scoped lang="scss">
.devicestatus {
  $color-fill-gray: lighten($color-text, 73%);

  width: 90%;
  margin: auto;
  margin-bottom: 5em;
  @media (min-width: 768px) {
    width: 36em;
  }

  &__title {
    text-align: center;
  }

  &__subtitle {
    text-align: center;
    margin-bottom: 0.7em;
  }

  &__section {
    margin-bottom: 3em;
  }

  &__info {
    width: 100%;
    background: $color-fill-gray;
    padding: 0.7em;
    border-radius: $border-radius;

    tr > td:first-child {
      // width: 35%;
      text-align: right;
      font-weight: 500;
      padding-right: 0.5em;
    }
  }
  &__vnc {
    margin-bottom: 0.5em;
  }

  &__packages {
    &__list {
      margin-top: 0;
      background: $color-fill-gray;
      border-radius: $border-radius;
      overflow-x: scroll;
    }
    &__item:not(:last-child) {
      border-bottom: 1px solid rgba(lighten($color-text, 10%), 0.1);
    }
  }

  &__config {
    &__list {
      margin-top: 0;
      font-family: monospace;
      font-size: 1.1em;
      background: $color-text;
      padding: 2em;
      list-style-type: none;
      line-height: 1.3;
      border-radius: $border-radius;
      overflow-x: scroll;
    }
    &__key {
      font-weight: 500;
      color: lighten($color-success, 10%);
      margin-right: 0.5em;
    }
    &__value {
      color: lighten($color-text, 50%);
    }
  }
}
</style>
