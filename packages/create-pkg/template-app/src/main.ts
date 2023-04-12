import { createApp } from 'vue';
import { ElMessage } from 'element-plus';
import { createPinia } from 'pinia';
import NProgress from 'nprogress';
import { useI18n } from '@ygg/locales';
import mountRouter from '@/router/router';
import App from './App.vue';
import 'element-plus/theme-chalk/el-message.css';
import 'nprogress/nprogress.css';
import './style.scss';

NProgress.configure({ showSpinner: false });

const bootstrap = async () => {
  NProgress.start();
  const store = createPinia();
  const app = createApp(App);
  app.use(useI18n());
  app.use(store);
  const router = await mountRouter();
  app.use(router);
  app.mount('#app');
};

bootstrap()
  .catch(async () => {
    ElMessage.error('Oops! bootstrap app failed.');
  })
  .finally(() => {
    NProgress.done();
  });
