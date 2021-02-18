const routes = [
  {
    path: "",
    component: () => import("layouts/SimpleLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("pages/TemplateView.vue")
      },
      {
        path: ":layout/:referenceId",
        component: () => import("pages/TemplateView.vue")
      },
      {
        path: ":layout",
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
