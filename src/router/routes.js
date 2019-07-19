const routes = [
  {
    path: "/login",
    component: () => import("layouts/GuestLayout.vue"),
    children: [{path: "", component: () => import("pages/Login.vue")}]
  },
  {

    path: "/make",
    component: () => import("layouts/MakerLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
    ]
  },
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/:layout/:referenceId",
        component: () => import("pages/TemplateView.vue")
      },
      {
        path: "/:layout",
        component: () => import("pages/TemplateView.vue")
      }
    ]
  },
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
