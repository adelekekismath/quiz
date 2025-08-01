import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import QuizPage from "../pages/QuizPage.vue";
import ConfigurateQuizPage from "@/pages/ConfigurateQuizPage.vue";
import { useQuizMetaStore } from "@/stores/quizMetaStore";
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from "@/pages/RegisterPage.vue";
import ScoresHistoryPage from "@/pages/ScoresHistoryPage.vue";

const routes = [
   {path: "/", name: "home", component: HomePage},
   {
        path: "/quiz", 
        name: "quiz", 
        component: QuizPage,
        beforeEnter: () => {
            const meta = useQuizMetaStore()
            if (
            !meta.pseudo ||
            !meta.category ||
            !meta.difficulty ||
            !meta.numberOfQuestions
            ) {
                return '/configurate-quiz' 
            }
        }
    },
  {path: "/configurate-quiz", name: "configurate-quiz", component: ConfigurateQuizPage},
  {path: "/:pathMatch(.*)*", name: "not-found", component: () => import("../pages/NotFoundPage.vue")},
  {path: "/login", name: "login", component: LoginPage},
  {path: "/register", name: "register", component: RegisterPage},
  {path: "/scores-history", name: "scores-history", component: ScoresHistoryPage}
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;
export {routes};