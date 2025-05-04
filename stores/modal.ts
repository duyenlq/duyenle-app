import type { Ref } from 'vue';

export const useModalStore = defineStore('modalStore', {
  state: () => ({
    loginModalIsOpen: false,
    loadingModal: false,
    adsModal: false,
  }),

  actions: {
    toggleLoginModal() {
      this.loginModalIsOpen = !this.loginModalIsOpen;
    },
    toggleLoadingModal(status: boolean) {
      this.loadingModal = status;
    },
    toggleAdsModal(status: boolean) {
      this.adsModal = status;
    },
  }
})
