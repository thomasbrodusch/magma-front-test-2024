// NPM
import { createRouter, createWebHistory } from "vue-router";

// Views
import ErrorView from "@/views/ErrorView.vue";
// Sign-up
import SignupLayout from "@/views/signup/SignupLayout.vue";
import SignupOrganizationView from "@/views/signup/SignupOrganizationView.vue";
import SignupAmbassadorsView from "@/views/signup/SignupAmbassadorsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: ErrorView,
      props: true
    },
    // Sign-up
    {
      path: "/sign-up",
      component: SignupLayout,
      children: [
        {
          path: "organization",
          name: "signup-organization",
          component: SignupOrganizationView
        },
        {
          path: "ambassadors",
          name: "signup-ambassadors",
          component: SignupAmbassadorsView
        },
      ]
    },
  ]
});

export default router;
