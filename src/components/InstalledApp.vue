<template>
  <div id="installed-app">
    <div class="appitem" v-if="isInstalled">
      <div class="appitem__container">
        <div class="appitem__name">{{ name }}</div>
        <div class="appitem__action">
          <button class="appitem__button" title="uninstall" v-on:click="showModal = true">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z" fill="#ffffff" class="trash" /><path fill="none" d="M0 0h24v24H0z"/></svg>
          </button>
          <Modal v-if="showModal" v-on:close="showModal = false">
            <div slot="header">
              <div v-if="!isUninstalling">{{ name }}</div>
            </div>
            <div slot="body">
              <div v-if="isUninstalling" class="appitem__modal__progress">Uninstalling app...</div>
              <div v-else>Do you want to uninstall this app?</div>
            </div>
            <div slot="footer">
              <div v-if="!isUninstalling" class="appitem__modal__footer">
                <button class="appitem__modal__cancel" v-on:click="$emit('close');showModal = false">CANCEL</button>
                <button class="appitem__modal__confirm" v-on:click="uninstallPackage" v-bind:disabled="isUninstalling">OK</button>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Modal from '@/components/Modal.vue';


@Component({
  components: {
    Modal,
  },
})
export default class InstalledApp extends Vue {
  private showModal = false;
  private isUninstalling = false;
  private isInstalled = true;
  @Prop() private name!: string;

  private async uninstallPackage() {
    try {
      this.isUninstalling = true;
      const data = await fetch(`${Vue.prototype.$hostName}/app/${this.name}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${Vue.prototype.$authToken}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        mode: 'cors',
      });
      this.$notify({
        title: 'Success',
        text: "App uninstalled.",
        type: 'success',
        duration: 3000,
      });
      this.isInstalled = false;
    } catch (err) {
      this.$notify({
        title: 'Uninstalling app failed',
        text: JSON.stringify(err),
        type: 'error',
        duration: 5000,
      });
    }
    this.isUninstalling = false;
    this.showModal = false;
  }

}
</script>

<style scoped lang="scss">
.appitem {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0.2em;
  min-height: 1.8em;
  width: 100%;

  &__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 0.6em 0.5em 0.4em 1em;
  }

  &__name {
    font-weight: 500;
  }

  &__button {
    background: transparent;
    color: lighten($color-text, 50%);
    border: 1px solid transparent;
    padding: 0.3em;
    font-size: 0.9em;
    border-radius: $btn-round-border-radius;
    display: flex;
    align-items: center;
    line-height: 1.3;
    .trash {
      fill: rgba($color-text, 0.3);
    }
    &:hover, &:focus, &:active {
      color: $color-error;
      cursor: pointer;
      .trash {
        fill: $color-error;
      }
    }
  }
  &__modal {
    &__progress {
      text-align: center;
    }
    &__footer {
      display: flex;
      justify-content: flex-end;
    }
    &__cancel {
      background: rgba($color-text, 0.1);
      color: $color-text;
      border: 1px solid transparent;
      padding: 0.4em 0.8em;
      font-size: 0.9em;
      border-radius: 0.2em;
      cursor: pointer;
      &:hover, &:focus, &:active {
        background: rgba($color-text, 0.2);
      }
    }

    &__confirm {
      background: $color-primary;
      color: lighten($color-primary, 40%);
      border: 1px solid $color-primary;
      padding: 0.4em 0.8em;
      font-size: 0.9em;
      border-radius: 0.2em;
      margin-left: 0.6em;
      cursor: pointer;
      &:hover, &:focus, &:active {
        background: darken($color-primary, 20%);
        border-color: darken($color-primary, 20%);
      }
    }
  }
}
</style>
