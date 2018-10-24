<template>
  <div id="app">
    <header class="siteheader">
      <img class="siteheader__logo" src="./assets/logo.svg" alt="appknox">
      <span class="siteheader__separator"> | </span>
      <span class="siteheader__title">Device Manager</span>
    </header>
    <router-view/>
  </div>
</template>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $color-text;
}
.siteheader {
  display: flex;
  align-items: center;
  justify-content: center;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  height: 3.2em;
  background: $color-bg;
  box-shadow: 1px 0 12px rgba(lighten($color-text, 45%), 0.5);

  &__separator {
    padding: 0 0.3em;
    font-size: 1.8em;
    color: lighten($color-text, 65%);
  }

  &__title {
    font-size: 1.2em;
  }
}
</style>
