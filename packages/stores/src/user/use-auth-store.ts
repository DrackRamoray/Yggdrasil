import { ref } from 'vue';
import { defineStore } from 'pinia';
import { local } from '@ygg/utils';
import { TokenStorageKey } from '@ygg/constants';
import useUserStore from './use-user-store';

const useAuthStore = defineStore('auth', () => {
  const token = ref<string>('');
  const userStore = useUserStore();

  const saveToken = (t: string) => {
    token.value = t;
    local.setItem(TokenStorageKey, t, { security: true });
  };

  const loadToken = () => {
    if (token.value) {
      return token.value;
    }

    const t = local.getItem<string>(TokenStorageKey);

    if (t) {
      token.value = t;
    }

    return t;
  };

  const getAuthParams = () => ({
    userId: userStore.loadUserId(),
    token: token.value,
  });

  return {
    saveToken,
    loadToken,
    getAuthParams,
  };
});

export default useAuthStore;
