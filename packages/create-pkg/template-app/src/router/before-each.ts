import type { Router } from 'vue-router';

const beforeEach = (router: Router) => {
  router.beforeEach((to, from, next) => {
    next();
  });
};

export default beforeEach;
