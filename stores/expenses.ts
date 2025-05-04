export const useExpensesStore = defineStore('expensesStore', {
    state: () => ({
        menu: [],
    }),

    actions: {
        getMenu() {
            
            this.menu = []
        },
        
    }
})