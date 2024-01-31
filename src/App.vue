<template>
    <div id="app">
        <theHeader />
        <router-view></router-view>
    </div>
</template>

<script>
import theHeader from "@/components/theHeader.vue";

export default {
    name: "App",
    components: {
        theHeader,
    },
};
</script>

<style lang="stylus">
body {
    margin: 0
}
#app {
    width 100%
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family 'Avenir', Helvetica, Arial, sans-serif
  font-smoothing antialiased
}
</style>
