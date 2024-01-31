import MainPage from "@/components/mainPage.vue";
import userBlog from "@/components/userBlog.vue";
import repoContent from "@/components/repoContent.vue";
import repoFile from "@/components/repoFile.vue";

export default [
    { path: "/", component: MainPage },
    { path: "/Blog", component: userBlog },
    { path: "/Repo", component: repoContent },
    { path: "/RepoFile", component: repoFile },
];
