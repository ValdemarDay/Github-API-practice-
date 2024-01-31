<template>
    <div class="container">
        <span @click.prevent="SET_SEARCH_QUERY()" class="example_name"
            >Enter github username, for example
            <a href="" class="text-emerald-400">torvalds</a></span
        >
        <input
            v-model="query"
            @input="debouncedSearch"
            placeholder="Enter username"
        />
    </div>
</template>

<script>
import { mapActions, mapState, mapMutations } from "vuex";
import debounce from "lodash/debounce";
export default {
    name: "findUserInput",
    props: ["user"],
    // searchField() {
    //     this.query = "torvalds";
    // },
    computed: {
        ...mapState(["searchQuery"]),
        query: {
            get() {
                return this.searchQuery;
            },
            set(val) {
                return this.setSearchQuery(val);
            },
        },
    },
    methods: {
        ...mapActions(["setSearchQuery", "search", "searchRepo"]),
        debouncedSearch: debounce(function () {
            this.search();
            this.searchRepo();
        }, 500),
        ...mapMutations(["SET_SEARCH_QUERY"]),
    },
};
</script>

<style lang="stylus" scoped>
.container {
    display: flex;
    flex-direction: column;
}


input
  width 100%
  font-size 16px
  text-align center
</style>
