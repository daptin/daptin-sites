const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/:layout/card",
        component: () => import("pages/CardView.vue")
      },
      {
        path: "/:layout/list",
        component: () => import("pages/ListView.vue")
      },
      {
        path: "/:layout/form/:referenceId",
        component: () => import("pages/FormView.vue")
      },
      {
        path: "/:layout/template/:referenceId",
        component: () => import("pages/TemplateView.vue")
      },
      {
        path: "/:layout/template",
        component: () => import("pages/TemplateView.vue")
      },
      {
        path: "/:layout/article1/:referenceId",
        component: () => import("pages/ArticleView1.vue")
      },
      {
        path: "/:layout/card1",
        component: () => import("pages/CardView1.vue")
      }
    ]
  },
  {
    path: "/sidenav/",
    component: () => import("layouts/LeftSideNavigationLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("pages/Index.vue")
      },
      {
        path: "/card",
        component: () => import("pages/CardView.vue")
      },
      {
        path: "/list",
        component: () => import("pages/ListView.vue")
      },
      {
        path: "/form/:referenceId",
        component: () => import("pages/FormView.vue")
      },
      {
        path: "/article1/:referenceId",
        component: () => import("pages/ArticleView1.vue")
      },
      {
        path: "/card1",
        component: () => import("pages/CardView1.vue")
      }
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
        path: "/card/:typeName",
        component: () => import("pages/CardView.vue")
      },
      {
        path: "/list/:typeName",
        component: () => import("pages/ListView.vue")
      },
      {
        path: "/form/:typeName/:referenceId",
        component: () => import("pages/FormView.vue")
      },
      {
        path: "/article1/:typeName/:referenceId",
        component: () => import("pages/ArticleView1.vue")
      },
      {
        path: "/card1/:typeName",
        component: () => import("pages/CardView1.vue")
      }
    ]
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

    path: "/template",
    component: () => import("layouts/TemplateEditor.vue"),
  },
  {
    path: "/login",
    component: () => import("layouts/GuestLayout.vue"),
    children: [{path: "", component: () => import("pages/Login.vue")}]
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
