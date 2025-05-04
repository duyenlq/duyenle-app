<template>
    <div class=""> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Cài đặt',link:'/cai-dat'}]" :last="'menu trang chủ'" />
    </div>
    <div class="mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="text text-main"> 
            Quản lí seting website nha
        </div>
        <div class="flex flex-col md:flex-row gap-10"> 
            <!-- <div class="border-2 rounded-xl flex flex-col gap-2 w-full md:w-1/4 p-4 pt-1">
                <p class="text font-medium">Thông tin : </p>
                <input v-model="user.id" type="text" class="border-2 px-2 p-1 outline-none focus:border-main" placeholder="ID">
                <input v-model="user.name" type="text" class="border-2 px-2 p-1 outline-none focus:border-main" placeholder="Name">
                <input v-model="user.value" type="text" class="border-2 px-2 p-1 outline-none focus:border-main" placeholder="Value">
                <button v-if="editValue" @click="setData()" class="bg-main p-2 rounded-md">
                    Sửa
                </button>
                <button v-else @click="setData()" class="bg-main p-2 rounded-md">
                    Thêm
                </button>
            </div> -->
            <div class="border-2 rounded-xl w-full pb-4 pt-1"> 
                <p class="text font-medium px-4">Danh sách : </p>
                <div class="h-full p-2 px-4"> 
                    <div v-for="items,index in userList" :key="index" :class="{'border-b-2':index == userList.length-1}" class="flex items-center hover:bg-slate-200/50 cursor-pointer duration-300 border-t-2 p-1">
                        <div class="w-1/6 text">{{ items.id }}</div>
                        <div class="w-1/6 text">{{ items.username }}</div>
                        <div class="w-3/6 text">{{ items.value }}</div>
                        <div class="w-1/6 flex gap-2">
                            <button  class="text border-slate-200 border-2 p-1 rounded-lg hover:bg-main duration-300">edit</button>
                            <button @click="show()" class="text border-slate-200 border-2 p-1 rounded-lg hover:bg-main duration-300">delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "setting"
    })
    const { toggleLoadingModal } = useModalStore()

    
    
    
    const show = () =>{
        const date = new Date()
        console.log(date.getMonth());
        console.log(getDatetoString(date));
    }



    const user = ref({
        id:'',
        name:'',
        value:'',
    })
    const userList = ref(<any>[])
    const editValue = ref(false)
    // const pathData = ref('/users')

    const getData = async () => {
        try {
            const data = await getFirebase('/users');
            userList.value = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    onMounted(async () => {
        getData()
    });

    const setData = () => {
        // console.log(user.value,"Hiển thị giá trị đc nhập vào");
        toggleLoadingModal(true)
        if(editValue.value){
            updateFirebase('/users/'+ user.value.id, { username:user.value.name, value: user.value.value })
        }else{
            setFirebase('/users/'+ user.value.id, { username:user.value.name, value: user.value.value })
        }        
        getData()
        toggleLoadingModal(false)
        user.value = resetForm(user.value)
    }

    const deleteData = ( value: any ) => {
        toggleLoadingModal(true)
        removeFirebase('/users/'+value)
        getData()
        toggleLoadingModal(false)
    }

    const editData = (id: any, name: any, value: any) => {
        editValue.value = !editValue.value
        user.value.id = id,
        user.value.name = name
        user.value.value = value
    }

</script>

<style scoped>

</style>