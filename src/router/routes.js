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
        path: '',
        name: "Maker Home",
        component: () => import("pages/maker/AppSettings.vue")
      },
      {
        path: 'settings',
        name: "App Settings",
        component: () => import("pages/maker/AppSettings.vue")
      },
      {
        path: 'layout',
        name: "App Layout",
        component: () => import("pages/maker/ChooseLayout.vue")
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
        name: "Data Grid Instance",
        component: () => import("pages/maker/DataGrid.vue")
      },
    ]
  },
  {
    path: "/experiment1",
    component: () => import("layouts/IconBotTabLayout.vue")
  },
  {
    path: "/experiment2",
    component: () => import("layouts/LabelBotTabLayout.vue")
  },
  {
    path: "/experiment3",
    component: () => import("layouts/SearchIconBotTabLayout.vue")
  },
  {
    path: "/experiment4",
    component: () => import("layouts/IconTopTabSearchLayout.vue")
  },
  {
    path: "/experiment5",
    component: () => import("layouts/LeftSideNavigationLayout.vue")
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
