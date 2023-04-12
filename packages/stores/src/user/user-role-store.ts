import { reactive } from 'vue';
import { defineStore } from 'pinia';
import type { Role } from '@ygg/types';
import { isArray, local } from '@ygg/utils';
import { RoleStorageKey } from '@ygg/constants';

const useRoleStore = defineStore('role', () => {
  const role = reactive<Role>({
    id: '',
    name: '',
  });
  const roles = reactive<Role[]>([]);

  const getCurrentRole = () => role;

  const saveRoles = (roleArr: Role[]) => {
    roles.splice(0, roles.length, ...roleArr);
    local.setItem<Role[]>(RoleStorageKey, roleArr, { security: true });
  };

  const loadRoles = () => {
    if (roles.length > 0) {
      return roles;
    }

    const roleArr = local.getItem<Role[]>(RoleStorageKey);

    if (isArray(roleArr)) {
      roles.splice(0, roles.length, ...roleArr);
    }

    return roles;
  };

  return {
    getCurrentRole,
    saveRoles,
    loadRoles,
  };
});

export default useRoleStore;
