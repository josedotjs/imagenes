import Vue from "vue";
import VueRouter from "vue-router";
import IndexPage from "../views/IndexPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "index",
    component: IndexPage
  },
  {
    path: "/resize",
    name: "resize",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ResizePage.vue")
  },
  {
    path: "/composition",
    name: "composition",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/CompositionPage.vue")
  },
  {
    path: "/gifs",
    name: "gifs",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AnimatedGif.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
