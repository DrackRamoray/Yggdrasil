import { createRouter, createWebHashHistory } from 'vue-router';
import beforeEach from '@/router/before-each';
import routes from '@/router/generate-routes';

const mountRouter = async () => {
  // 处理权限问题, 动态路由等, fake async fn
  await new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  });

  // 路由守卫
  beforeEach(router);

  return router;
};

export default mountRouter;
