<script>
import { mapState, mapActions } from "vuex";
export default {
    name: "repoContent",
    data() {
        return {
            selected: "master",
        };
    },
    computed: {
        ...mapState(["user", "branches", "searchBranch", "content"]),
    },
    methods: {
        ...mapActions([
            "setSearchOneBranch",
            "searchCorrentBranch",
            "setSearchContent",
            "searchBranchCurrentContent",
        ]),
        Select(name) {
            this.setSearchOneBranch(name);
        },
        Click(name) {
            this.setSearchContent(name);
            this.searchBranchCurrentContent();
        },
    },
};
</script>

<script setup>
import { useRouter } from "@/utils/utils";
const router = useRouter();
const goToFile = () => router.push({ path: "/RepoFile" })
</script>


<template>
    <div class="container">
        <span>{{ user.name }}/{{ searchBranch }}</span>
        <select
            v-model="selected"
            class="select"
            @change="$emit('change', Select($event.target.value))"
        >
            <option v-for="branch in branches" :key="branch.index">
                {{ branch.name }}
            </option>
        </select>
        <li
            v-for="item in content"
            :key="item.index"
            class="file"
            @click="Click(item.name); goToFile();"
        >
            {{ item.name }}
        </li>
    </div>
</template>

<style>
.container {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
}
.file:hover {
    cursor: pointer;
    text-decoration: underline;
}
.select {
    width: 500px;
    border-radius: 5px;
    margin-top: 15px;
}
</style>
