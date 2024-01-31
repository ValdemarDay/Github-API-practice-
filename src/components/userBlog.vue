<script setup>
import { mapState, mapMutations, mapActions } from "vuex";
import { useRouter } from "@/utils/utils";
const router = useRouter();
const goToRepo = () => router.push({ path: "/Repo" });
</script>

<script>
export default {
    data() {
        return {
            currentPage: 1,
            pageSize: 5,
        };
    },
    name: "userBlog",
    computed: {
        ...mapState(["loading", "user", "repos"]),
        ...mapMutations(["SET_SEARCH_BRANCH"]),
        totalPage() {
            return Math.ceil(this.repos.length / this.pageSize);
        },
        displayedRepos() {
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            return this.repos.slice(start, end);
        },
        pageNumbers() {
            const numbers = [];
            for (let i = 1; i <= this.totalPage; i++) {
                numbers.push(i);
            }
            return numbers;
        },
    },
    methods: {
        ...mapActions([
            "setSearchBranch",
            "searchBranch",
            "searchBranchContent",
        ]),
        changePage(page) {
            this.currentPage = page;
        },
        debouncedSelect(name) {
            this.setSearchBranch(name);
            this.searchBranch();
        },
    },
};
</script>

<template>
    <div class="mainContainer">
        <div class="user">
            <div class="user_info">
                <div class="user_avatar">
                    <img :src="user.avatar_url" />
                </div>
                <span class="user_name">{{ user.login }}</span>
                <span class="user_company">
                    {{ user.company || " - " }}
                </span>
                <span class="user_blog" v-if="user.repos">
                    {{ user.repos }}
                </span>
                <span class="user_social">
                    followers: {{ user.followers || 0 }} following:
                    {{ user.following || 0 }}
                </span>
                <span class="user_location" v-show="user.location">
                    {{ user.location }}
                </span>
            </div>
        </div>
        <div class="repos">
            <span class="repos-count"
                >public repositories: {{ user.public_repos || 0 }}</span
            >
            <ul class="reposList" v-show="user.public_repos">
                <TransitionGroup tag="ul" name="list">
                    <li
                        v-for="repo in displayedRepos"
                        :key="repo.url"
                        class="repos-item"
                        @click="
                            goToRepo();
                            debouncedSelect(repo.name);
                            searchBranchContent();
                        "
                    >
                        <div>
                            <span
                                >{{ repo.name }}:
                                <span
                                    v-if="repo.description"
                                    class="description"
                                    >{{ repo.description }}</span
                                ></span
                            >
                        </div>
                    </li>
                </TransitionGroup>
            </ul>
            <div v-if="user.public_repos">
                <ul class="reposPagination">
                    <li
                        class="pagNumbers"
                        v-for="pageNumber in pageNumbers"
                        :key="pageNumber"
                    >
                        <button
                            @click="changePage(pageNumber)"
                            :disabled="currentPage === pageNumber"
                        >
                            {{ pageNumber }}
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style scoped>
.mainContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.repos {
    width: 850px;
}
.reposPagination {
    display: flex;
}

.reposList {
    margin-top: 20px;
    border: 1px solid #c2c2c2;
    border-radius: 4px;
    padding: 10px;
}

.pagNumbers {
    list-style-type: none;
}

.description {
    margin: 5px;
}
.user {
    display: grid;
    margin-top: 50px;
    margin-right: 15px;
}

.pageItem {
    margin: 10px;
}

.user_name {
    font-size: 25px;
}

.user_info {
    grid-column: 1;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

li {
    width: fit-content;
    padding: 5px;
    margin: 0px 10px 0 10px;
}

li:hover {
    border: 1px solid #a9a9a9;
    border-radius: 4px;
    cursor: pointer;
}

.user_avatar img {
    width: 200px;
    height: 200px;
    border-radius: 10%;
}
</style>
