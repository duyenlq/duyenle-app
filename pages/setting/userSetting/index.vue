<template>
    <div class=""> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Cài đặt',link:'/cai-dat'}]" :last="'danh sách người dùng'" />
    </div>
    <div class="mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="text text-main font-semibold"> 
            Quản lý Danh sách người dùng
        </div>
        <div class="flex flex-col">
            <!-- <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput placeholder="Lọc theo tiêu đề..." />
            </div> -->
            <div class="flex items-center justify-end"> 
                <button @click="modal = true" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Thêm dữ liệu</button>
            </div>
            <UTable :rows="userList" :columns="columnsTitle">
                <template #password-data="{ row }">
                    <div class="font-medium">{{ maskPass(row.password) }}</div>
                </template>
                <template #active-data="{ row }">
                    <div class="font-medium" :class="{'text-main': row.active}">{{ row.active? " Hoạt động ":" Tạm dừng " }}</div>
                </template>
                <template #actions-data="{ row }">
                    <UDropdown :items="items(row)">                        
                        <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                    </UDropdown>
                </template>
            </UTable>
            <!-- <div class="flex justify-end px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <UPagination v-model="page" :page-count="pageCount" :total="menu.length" />
            </div> -->
        </div>
        <UModal v-model="modal">
            <div class="p-4 flex flex-col gap-1 md:gap-2 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 rounded-md">
                <p v-if="!editValue" class="text font-semibold text-main pb-1">Tạo người dùng:</p>
                <p v-else class="text font-semibold text-main pb-1">Sửa Thông tin người dùng:</p>
                <div class="flex flex-col gap-2 md:gap-3">
                <form action="" class="w-full flex flex-col gap-4 md:gap-6">
                    <FormInputCustom :label="'Tên đăng nhập'" :readonly="editValue" type="text" :checkValue="checkFormUser" v-model:modelValue="formUser.id" v-model:error="formUserError.id"/>
                    <FormInputCustom :label="'Họ Tên'" type="text" :checkValue="checkFormUser" v-model:modelValue="formUser.username" v-model:error="formUserError.username"/>
                    <FormInputPassCustom :label="'Mật khẩu'" :checkValue="checkFormUser" v-model:modelValue="formUser.password" v-model:error="formUserError.password" />
                    <FormInputSelect :label="'Phân quyền'" :funcCheck="checkNull(formUser.role.id)" :listSelect="listSelect" type="text" :checkValue="checkFormUser" v-model:modelValue="formUser.role.id" v-model:error="formUserError.role" />
                    <FormInputSelect :label="'Trạng thái'" :listSelect="listActive" :typeOutputBoolean="true" :checkValue="checkFormUser" v-model:modelValue="formUser.active" v-model:error="formUserError.active" />
                </form>
                </div>

                <div class="flex gap-2 md:gap-3 mt-2 md:mt-4 justify-end">
                    <button @click=" modal = false" class="w-[20%] font-semibold text-white bg-mainHover rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Hủy</button>
                    <button v-if="editValue" @click=" updateData()" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Cập nhật</button>
                    <button v-else @click=" setData()" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Xác nhận</button>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        middleware: 'admin',
        layout: "setting",
    })
    import type { User, Role } from "@/models/user"
    const { toggleLoadingModal } = useModalStore()
    const { getUsersList, getUsersById, addUsers, updateUsers, deleteUsers, getRoleUserById, getRoleUserList, addRoleUser, updateRoleUser, deleteRoleUser } = useAuthStore()
    // const { menuSetting } = storeToRefs(useSettingStore())

    const userList = ref([])

    const modal = ref(false)
    const editValue = ref(false)

    // const page = ref(1)
    // const pageCount = 2

    // const rows = computed(() => {
    //     return menu.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    // })
    const listSelect = ref();
    const listActive = ref([
        {title: 'Hoạt động', value: true},
        {title: 'Tạm ngừng', value: false}
    ]);

    const { data:roleList } = await useAsyncData('getRoleUserList', ()=> getRoleUserList())
    // const listRole = ref<Role[]>();
    if(roleList.value){
        listSelect.value = roleList.value.map(items => ({
            title: items.title,
            value: items.id,
        }));
    }

    const columnsTitle = [
        
        {
        key: 'id',
        label: 'Tên đăng nhập'
        },
        {
            key: 'password',
            label: 'Mật khẩu'
        },
        {
        key: 'username',
        label: 'Họ Tên'
        },
        {
            key: 'role.title',
            label: 'Phân quyền'
        },
        {
            key: 'active',
            label: 'Trạng thái'
        },{
            key: 'actions',            
        }
    ]

    const items = (row: any) => [
        [{
            label: 'Edit',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => edit(row)
        }], [{
            label: 'Delete',
            icon: 'i-heroicons-trash-20-solid',
            click: () => deleteData(row.id)
        }]
    ]

    // form User detail

    const checkFormUser = ref(false);

    const formUser = ref<User>({
        id: '',
        username: '',
        password: '',
        image: '',
        role: {id:'',title:''},
        active: false,
    });

    const formUserError = ref({
        id: null as any,
        username: null as any,
        password: null as any,
        image: '' as any,
        role: null as any,
        active: '',
    });


    // Lấy dữ liệu
    const getData = async ()=>{
        toggleLoadingModal(true)
        const { data }: any = await useAsyncData('getUserList', ()=> getUsersList())
        if(data.value.length > 0){
            userList.value = data.value
            // console.log(userList.value,"Hiển thị danh sách user đã get");
            
        }else{
            useToast().add({ title: 'Thông báo' , description: 'Danh sách hiện tại đang trống', color: 'yellow', timeout:1000 });
        }        
        reset();
        toggleLoadingModal(false)
    }

    onMounted(async () => {
        getData()
    });

    // reset form
    const reset = ()=> {
        formUser.value = <User>{ 
            id: '', 
            username: '', 
            password: '', 
            image: '', 
            role: { id: '', title: '' }, 
            active: false,
        };        
    }

    watch(() => modal.value, () => {
        if(!modal.value){
            reset();
            editValue.value = false;
        }
    })

    // Thêm dữ liệu
    const setData = async () => { 
        checkFormUser.value = !checkFormUser.value;
        console.log("Hiển thị giá trị error", formUserError.value);
        if(!isObjectEmpty(Object(formUserError.value))){
            useToast().add({ title: 'Thông báo!', description: 'Vui lòng kiểm tra lại thông tin người dùng' ,color: 'red', timeout: 1500 });
            return ;
        }

        toggleLoadingModal(true)

        const { data:role } = await useAsyncData('getRoleUserList', ()=> getRoleUserById(formUser.value.role.id))
        // console.log(role.value, "Hiển thị role đã chọn ddcuoj getra");        
        const formData = <User> {            
            ...formUser.value,  
            role: role.value,
            active: Boolean(formUser.value.active),
            createdAt: getDatetoString(new Date()),
        }
        // console.log("Hiển thị giá trị đc nhập vào",formData);
        const { data } = await useAsyncData<User>('getUserById', ()=> getUsersById(formData.id))
        if(data.value){
            formUserError.value.id = "Tên đăng nhập đã tồn tại."
            useToast().add({ title: 'Thêm người dùng thất bại!' , description: 'Vui lòng đổi lại tên đăng nhập!', color: 'red' });
        }else{
            useToast().add({ title: 'Thông báo!' , description: 'Thêm thành công!', color: 'green' });
            await useAsyncData('addUser', ()=> addUsers(formData))
            reset();
            modal.value = false;
            getData();
        }        
        toggleLoadingModal(false)
    }

    // Xóa dữ liệu
    const deleteData = async ( value: any ) => {
        toggleLoadingModal(true)
        await useAsyncData('deleteUser', ()=> deleteUsers(value))
        getData()
        toggleLoadingModal(false)
    }

    // Cập nhật dữ liệu
    const updateData = async () => {
        toggleLoadingModal(true)
        

        const { data:role } = await useAsyncData('getRoleUserList', ()=> getRoleUserById(formUser.value.role.id))
        // console.log(role.value, "Hiển thị role đã chọn ddcuoj getra");        
        const formData = <User> {            
            ...formUser.value,
            role: role.value,
            active: Boolean(formUser.value.active),
            updatedAt: getDatetoString(new Date()),
        }
        // console.log(formData,"Hiển thị các from cập nhật");
        
        await useAsyncData('updateUser', ()=> updateUsers(formData))
        getData();
        // console.log("Đã chạy Cập nhật dữ liệu!");
        modal.value = false;
        toggleLoadingModal(false)
    }

    const edit = async ( value: any ) => {
        modal.value = true
        formUser.value = {...formUser.value, ...value}
        // console.log(formUser.value,"Hiển thị formUser.value kakaka");
        editValue.value = true
    }

</script>

<style scoped>
</style>