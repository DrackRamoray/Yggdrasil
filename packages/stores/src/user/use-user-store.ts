import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { UserInfo } from '@ygg/types';
import { local } from '@ygg/utils';
import { UserStorageKey } from '@ygg/constants';

const useUserStore = defineStore('user', () => {
  const user = reactive<UserInfo>({
    userId: '',
  });

  const saveUser = (u: UserInfo) => {
    user.userId = u.userId;

    local.setItem<UserInfo>(UserStorageKey, user, { security: true });
  };

  const loadUser = () => {
    if (user && user.userId) {
      return user;
    }

    const u = local.getItem<UserInfo>(UserStorageKey);

    if (u && u.userId) {
      user.userId = u.userId;
    }

    return user;
  };

  const loadUserId = () => loadUser().userId;

  return {
    saveUser,
    loadUser,
    loadUserId,
  };
});

export default useUserStore;
