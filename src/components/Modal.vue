<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">

          <div class="modal-header">
            <slot name="header">header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">footer</slot>
          </div>

        </div>
      </div>
    </div>
  </transition>
</template>


<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Modal extends Vue {}
</script>

<style scoped lang="scss">
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba($color-text, 0.7);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 90%;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 3px 8px rgba($color-text, 0.9);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
  @media (min-width: 768px) {
    width: 30em;
  }
}

.modal-header {
  padding: 1.1em 1em 0.3em;
  font-weight: bold;
}

.modal-body {
  padding: 1em;
}

.modal-footer {
  padding: 0.3em 1em 1em;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  transform: scale(0.5);
}
</style>
