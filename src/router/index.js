import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";

import Dashboard from "../views/Dashboard.vue";
import Library from "../views/Library.vue";
import Favorite from "../views/Favorite.vue";
import NotFoud from "../views/NotFoud.vue";
import PrepaOne from "../components/PrepaOne.vue";
import PrepaTwo from "../components/PrepaTwo.vue";
import MasterOne from "../components/MasterOne.vue";
import ViewDoc from "../components/ViewDoc.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },

  /*/dashboard/prepaOne */
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    children: [],
  },
  {
    path: "/library",
    name: "Library",
    component: Library,
    children: [
      {
        path: "prepaOne",
        name: "PrepaOne",
        component: PrepaOne,
      },
      {
        path: "prepaTwo",
        name: "PrepaTwo",
        component: PrepaTwo,
      },
      {
        path: "MasterOne",
        name: "MasterOne",
        component: MasterOne,
      },
    ],
  },
  {
    path: "/:uid/myFavorite",
    name: "Favorite",
    component: Favorite,
  },
  {
    path: "/:doc_level/:doc_id",
    name: "view-doc",
    component: ViewDoc,
  },
  {
    path: "*",
    name: "notFound",
    component: NotFoud,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
