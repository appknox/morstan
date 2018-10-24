<template>
  <div class="home">
    <DeviceConnect />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import DeviceConnect from '@/components/DeviceConnect.vue';

@Component({
  components: {
    DeviceConnect,
  },
})
export default class Home extends Vue {}
</script>
