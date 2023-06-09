import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home.vue";
import About from "../views/About.vue"
import Login from "../views/Login.vue";
import Logout from "../views/Logout.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";
import AddProfile from "../views/AddProfile.vue"
import store from "../store/index";
import ProfileDetails from '../views/ProfileDetails.vue';
import Readings from '../views/Readings.vue';
import AddReading from '../views/AddReading.vue';
import AddBolus from '../views/AddBolus.vue';
import Activity from '../views/Activity.vue'

Vue.use(Router);

/**
 * The Vue Router is used to "direct" the browser to render a specific view component
 * inside of App.vue depending on the URL.
 *
 * It also is used to detect whether or not a route requires the user to have first authenticated.
 * If the user has not yet authenticated (and needs to) they are redirected to /login
 * If they have (or don't need to) they're allowed to go about their way.
 */

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/about",
      name: "about",
      component: About,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/profile",
      name: "Profile",
      component: Profile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/profile/add",
      name: "AddProfile",
      component: AddProfile,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "*",
      redirect: "/",
    },
    {
      path: '/profile/:profileId/:index',
      name: 'ProfileDetails',
      component: ProfileDetails,
      meta: {
        requiresAuth: true,
      },

    },
    {
      path: '/readings/:index',
      name: 'Readings',
      component: Readings,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/readings/add',
      name: 'AddReading',
      component: AddReading,
      meta : {
        requiresAuth: true,
      }
    },
    {
      path: '/bolus/add',
      name: 'AddBolus',
      component: AddBolus,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity,
      meta: {
        requiresAuth: true,
      }
    }
  ],
});

router.beforeEach((to, from, next) => {
  // Determine if the route requires Authentication
  const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);

  // If it does and they are not logged in, send the user to "/login"
  if (requiresAuth && store.state.token === "") {
    next("/login");
  } else {
    // Else let them go to their next destination
    next();
  }
});

export default router;
