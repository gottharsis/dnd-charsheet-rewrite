import Vue from "vue";
import VueRouter from "vue-router";
// import Home from "../views/Home.vue";
import CreatorPaths from "./creator";
import LandingPage from "../views/LandingPage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: LandingPage
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/creator",
    // name: "Creator",
    component: () => import("../views/creator/Creator.vue"),
    children: CreatorPaths
  }
];

const router = new VueRouter({
  routes
});

export default router;
