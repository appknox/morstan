<template>
  <div id="device-status">
    <div class="devicestatus">
      <h3 class="devicestatus__title">Device Information</h3>
      <table class="devicestatus__table">
        <tbody>
          <tr>
            <td>Platform</td>
            <td>{{ platform }}</td>
          </tr>
          <tr>
            <td>Version</td>
            <td>{{ platformVersion }}</td>
          </tr>
        </tbody>
      </table>
      <VNCDetail class="devicestatus__vnc" v-if="vnc" v-bind:is-running="vnc.is_running" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import VNCDetail from '@/components/VNCDetail.vue';

@Component({
  components: {
    VNCDetail,
  },
})
export default class DeviceStatus extends Vue {
  @Prop() private platform!: string;
  @Prop() private platformVersion!: string;
  @Prop() private vnc!: object;
}
</script>

<style scoped lang="scss">
.devicestatus {
  width: 90%;
  margin: auto;
  @media (min-width: 768px) {
    width: 36em;
  }

  &__title {
    text-align: center;
  }

  &__table {
    width: 100%;
    background: lighten($color-text, 73%);
    margin-bottom: 1.5em;
    padding: 0.7em;
    td {
      width: 50%;
    }
    tr > td:first-child {
      text-align: right;
      font-weight: 500;
      padding-right: 0.5em;
    }
  }
}
</style>
