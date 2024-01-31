<template>
    <div class="container">
        <findUserInput />
        <userCard />
    </div>
</template>

<script>
import findUserInput from "@/components/findUserInput.vue";
import userCard from "@/components/userCard.vue";
export default {
    name: "MainPage",
    components: {
        findUserInput,
        userCard,
    },
};
</script>

<style lang="stylus" scoped>
.container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family 'Avenir', Helvetica, Arial, sans-serif
        font-smoothing antialiased
        margin 10px
}
</style>
