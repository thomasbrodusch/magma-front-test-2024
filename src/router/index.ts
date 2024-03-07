// NPM
import { createRouter, createWebHistory } from "vue-router";
import { HttpError } from "@/types/Errors";
import { SignupStep } from "@/composables/useSignupRouting";
import useOrganization from "@/composables/useOrganization";
import SignupGuard from "@/router/guards/SignupGuard";

// Views
const ErrorView = () => import("@/views/ErrorView.vue");

// Sign-up
const SignupLayout = () => import("@/views/signup/SignupLayout.vue");
const SignupOrganizationView = () =>
  import("@/views/signup/SignupOrganizationView.vue");
const SignupAmbassadorsView = () =>
  import("@/views/signup/SignupAmbassadorsView.vue");

const SignupSuccessView = () => import("@/views/signup/SignupSuccessView.vue");

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: "/",
      name: "main",
      redirect: () => ({ path: "/sign-up" })
    },
    // Sign-up
    {
      path: "/sign-up",
      component: SignupLayout,
      redirect: () => ({ name: SignupStep.Organization }),
      children: [
        {
          path: "organization",
          name: SignupStep.Organization,
          component: SignupOrganizationView
        },
        {
          path: "ambassadors",
          name: SignupStep.Ambassadors,
          component: SignupAmbassadorsView,
          beforeEnter: SignupGuard
        },
        {
          path: "created-with-success",
          name: SignupStep.Success,
          component: SignupSuccessView,
          beforeEnter: SignupGuard
        }
      ]
    },
    {
      path: "/:pathMatch(.*)*",
      name: "error",
      component: ErrorView,
      props: { errorCode: HttpError.NotFound }
    }
  ]
});

export default router;
