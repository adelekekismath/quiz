import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import QuizPage from "../pages/QuizPage.vue";
import ConfigurateQuizPage from "@/pages/ConfigurateQuizPage.vue";
import { useQuizMetaStore } from "@/stores/quizMetaStore";


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

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});




export default router;
export {routes};