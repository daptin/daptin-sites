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
        path: 'settings',
        name: "App Settings",
        component: () => import("pages/maker/AppSettings.vue")
      },
      {
        path: 'screens',
        name: "Screens",
        component: () => import("pages/maker/Screens.vue")
      },
      {
        path: 'events',
        name: "Events",
        component: () => import("pages/maker/Events.vue")
      },
      {
        path: 'publish',
        name: "Publish",
        component: () => import("pages/maker/Publish.vue")
      },
      {
        path: 'data/:tableName',
        name: "Data Grid",
        component: () => import("pages/maker/DataGrid.vue")
      },
      {
        path: 'data',
        name: "Data Grid",
        component: () => import("pages/maker/DataGrid.vue")
      },
    ]
  },
  {
    path: "/experiment1",
    component: () => import("pages/IconTabLayout.vue")
  },
  {
    path: "/experiment2",
    component: () => import("pages/IconLabelLayout.vue")
  },
  {
    path: "/experiment3",
    component: () => import("pages/IconTabLayoutSearch.vue")
  },
  {
    path: "/experiment4",
    component: () => import("pages/headerTabIcon.vue")
  },
  {
    path: "",
    component: () => import("layouts/MyLayout.vue"),
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
