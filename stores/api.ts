import type { Ref } from 'vue';

export const useApiStore = defineStore('apiStore', {
  state: () => ({
    id: '123 345 678 910',
  }),

  actions: {
    async getFakeApi<T>() {
      return await useApiGet<T>(`/1`);
    },
  }
})
