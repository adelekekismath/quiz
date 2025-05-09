import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import QuizView from "../views/QuizView.vue";
import ConfigurateQuizView from "@/views/ConfigurateQuizView.vue";


const routes = [
  {path: "/", name: "home", component: HomeView},
  {path: "/quiz", name: "quiz", component: QuizView},
  {path: "/configurate-quiz", name: "configurate-quiz", component: ConfigurateQuizView},

];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});


export default router;