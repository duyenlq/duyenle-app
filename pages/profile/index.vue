<template>
    <div class="">
        <Breadcrumb :first="[{ title: 'Trang chủ', link: '/' }]" :last="'cài đặt thông tin cá nhân'" />
    </div>
    <div class="flex flex-nowrap min-h-[500px] bg-main/0 w-full">
        <!-- <div class="flex w-1/2 bg-main/50 h-fit"> 
            <div class="textTitle text-main dark:text-white">Thông tin cá Nhân</div>
        </div>
        <div class="flex w-1/2 bg-main/20 h-fit">
            <div class="text font-semibold text-main dark:text-white"> 
                Nơi ảnh :
            </div>
        </div> -->
        <div class="w-full">
            <p class="text-main text-2xl font-semibold w-full py-2">Thông tin chi tiết:</p>
            <div class="flex flex-col mt-2 md:mt-3.5 border-[0px] border-main rounded-lg overflow-hidden"> 
                <!-- tên -->
                <div v-for="item,index in listData" :key="index" :class="{'!bg-main/30':index%2 == 0}" class="flex flex-row w-full p-1 bg-slate-200/30 hover:bg-slate-100 hover:cursor-pointer">
                    <div class="flex w-1/5 h-fit border-r-2 border-slate-100  px-1">
                        {{ item.name }}
                    </div>
                    <div class="flex w-4/5 h-fit px-1"> 
                        {{ item.value }}
                    </div>
                </div>
                

            </div>            
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: "profile",
})

const { userLogin } = storeToRefs(useAuthStore());
console.log( userLogin.value);

const listData = ref()

if(userLogin.value != null) {
    listData.value = [
        
        {
            name: 'Tên',
            value: userLogin.value.username,
        },
        {
            name: 'Tên đăng nhập',
            value:  userLogin.value.id||"...........",
        },
        {
            name: 'mật khẩu',
            value: fakePassVip( userLogin.value.password,'*',2)||"...........",
        },
        {
            name: 'Quyền hạn',
            value: userLogin.value.role.title||"...........",
        },

        {
            name: 'Giá trị',
            value: ( userLogin.value.money?.cash || 0 ).toLocaleString('vi-VN') +
            ' vnđ / Bạc: ' + ( userLogin.value.money?.silver || 0).toLocaleString('vi-VN') +
            ' / Vàng: ' + ( userLogin.value.money?.gold || 0).toLocaleString('vi-VN') +
            ' / Kim Cương: ' + ( userLogin.value.money?.diamond || 0 ).toLocaleString('vi-VN')
        },

        {
            name: 'Ngày tạo',
            value: userLogin.value.createdAt||"...........",
        },
        {
            name: 'Ngày cập nhật',
            value: userLogin.value.updatedAt||"...........",
        },
    ]
} 

console.log(listData.value);


</script>

<style scoped></style>