<template>
    <div class=""> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Cài đặt',link:'/cai-dat'}]" :last="'menu trang chủ'" />
    </div>
    <div class="mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="text text-main"> 
            Quản lý menu website
        </div>
        <div class="flex flex-col">
            <!-- <div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
                <UInput placeholder="Lọc theo tiêu đề..." />
            </div> -->
            <div class="flex items-center justify-end"> 
                <button @click="modal = true" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Thêm</button>
            </div>
            <UTable :rows="menu" :columns="columns">
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
                <p v-if="!editValue" class="text font-semibold text-main pb-1">Tạo menu:</p>
                <p v-else class="text font-semibold text-main pb-1">Sửa menu:</p>
                <div class="flex flex-col gap-2 md:gap-3">
                    <div class="w-full">
                        <p class="text !text-[14px] text-main font-semibold">Tiêu đề :</p>
                        <input type="text" v-model="menuForm.title" class="w-full outline-none border-b-2 border-slate-500/50 text-slate-500 text bg-transparent">
                    </div>
                    <div class="w-full">
                        <p class="text !text-[14px] text-main font-semibold">Đường dẫn :</p>
                        <input type="text" v-model="menuForm.link" class="w-full outline-none border-b-2 border-slate-500/50 text-slate-500 text bg-transparent">
                    </div>
                    <div class="w-full">
                        <p class="text !text-[14px] text-main font-semibold">Icon :</p>
                        <input type="text" v-model="menuForm.icon" class="w-full outline-none border-b-2 border-slate-500/50 text-slate-500 text bg-transparent">
                    </div>
                </div>
                <div class="flex gap-2 md:gap-3 mt-1 md:mt-2 justify-end">
                    <button @click=" modal = false" class="w-[20%] font-semibold text-white bg-mainHover rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Hủy</button>
                    <button v-if="editValue" @click=" updateData(), modal = false" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Cập nhật</button>
                    <button v-else @click=" setData(), modal = true" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Xác nhận</button>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "setting"
    })
    const { toggleLoadingModal } = useModalStore()
    const { getMenu, addMenu, updateMenu, deleteMenu } = useSettingStore()
    const { menu } = storeToRefs(useSettingStore())

    const modal = ref(false)
    const editValue = ref(false)

    const menuForm = ref(
        {
            id: '',
            title: '',
            link: '',
            icon: '',
        }
    )

    // const page = ref(1)
    // const pageCount = 2

    // const rows = computed(() => {
    //     return menu.slice((page.value - 1) * pageCount, (page.value) * pageCount)
    // })

    const columns = [
        {
        key: 'title',
        label: 'Tiêu đề'
        },{
            key: 'link',
            label: 'Đường dẫn'
        },{
            key: 'icon',
            label: 'Biểu tượng'
        },{
            key: 'actions'
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

    const getData = async ()=>{
        toggleLoadingModal(true)    
        await useAsyncData('getMenu', ()=> getMenu())
        toggleLoadingModal(false)
    }

    onMounted(async () => {
        getData()
    });

    watch(() => modal.value, () => {
        if(!modal.value){
            menuForm.value = resetForm(menuForm.value)
        }
    })

    const setData = async () => {
        // console.log(menuForm.value,"Hiển thị giá trị đc nhập vào");
        toggleLoadingModal(true)
        const date = ref(new Date())
        menuForm.value.id = String(date.value.getTime()) + random(1,100)        
        await useAsyncData('addMenu', ()=> addMenu(menuForm.value))
        getData()
        toggleLoadingModal(false)
        menuForm.value = resetForm(menuForm.value)
    }

    const deleteData = async ( value: any ) => {
        toggleLoadingModal(true)
        await useAsyncData('addMenu', ()=> deleteMenu(value))
        getData()
        toggleLoadingModal(false)
    }

    const updateData = async () => {
        toggleLoadingModal(true)
        await useAsyncData('updateMenu', ()=> updateMenu(menuForm.value))
        getData()
        toggleLoadingModal(false)
        menuForm.value = resetForm(menuForm.value)
    }

    const edit = async ( value: any ) => {
        modal.value = true
        menuForm.value = {...menuForm.value, ...value}
        editValue.value = true
    }

</script>

<style scoped>

</style>