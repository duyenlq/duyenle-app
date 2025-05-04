export const useSettingStore = defineStore('settingStore', {
    state: () => ({
        menu: [] as any,
        menuSetting: [] as any,
    }),

    getters:{
        getMenuNha: (state) => state.menu,
    },

    actions: {
        // menu main website
        async getMenu() {
            try {
                const data = await getFirebase('/setting/menu');
                // this.menu = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
                this.menu = data ? Object.keys(data).map(key => ({ ...data[key] })) : [];
                // console.log(this.menu, 'Hiển thị menu đã get');
                
            } catch (error) {
                console.error('Error loading get:', error);
            }
        },

        async addMenu(param : any) {
            try {
                setFirebase('/setting/menu/'+ param.id, param)
            } catch (error) {
                console.error('Error loading add:', error);
            }
            
        },

        async updateMenu(param : any) {            
            try {
                updateFirebase('/setting/menu/'+ param.id, param)
            } catch (error) {
                console.error('Error loading update:', error);
            }
        }, 

        async deleteMenu(id: any) {            
            try {
                removeFirebase('/setting/menu/'+ id)
            } catch (error) {
                console.error('Error loading delete:', error);
            }
        }, 
        
        // menu setting

        async getMenuSetting() {
            try {
                const data = await getFirebase('/setting/menuSetting');
                // this.menu = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
                this.menuSetting = data ? Object.keys(data).map(key => ({ ...data[key] })) : [];
                // console.log(this.menu, 'Hiển thị menu đã get');
                
            } catch (error) {
                console.error('Error loading get:', error);
            }
        },

        async addMenuSetting(param : any) {
            try {
                setFirebase('/setting/menuSetting/'+ param.id, param)
            } catch (error) {
                console.error('Error loading add:', error);
            }
            
        },

        async updateMenuSetting(param : any) {            
            try {
                updateFirebase('/setting/menuSetting/'+ param.id, param)
            } catch (error) {
                console.error('Error loading update:', error);
            }
        }, 

        async deleteMenuSetting(id: any) {            
            try {
                removeFirebase('/setting/menuSetting/'+ id)
            } catch (error) {
                console.error('Error loading delete:', error);
            }
        }, 
    }
})