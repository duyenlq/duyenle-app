<template>
    <div class="sticky flex justify-between md:justify-end top-0 right-0 w-full bg-gradient-to-l from-main to-sky-200 p-4 z-10 h-16">
        <div class="min-w-fit md:hidden"> 
            <UIcon @click="menuMB = !menuMB" class="text-[26px] text-white hover:text-mainHover" name="i-mingcute-menu-fill" dynamic />
        </div>
        <div class="flex items-center gap-2">
            
            <div class="text-white text-[14px] md:text-[18px]">({{ userLogin?.role?.title }}) {{ userLogin?.username }} </div>
            <div class="h-10 border-2 rounded-full">
                <NuxtImg class="w-full h-full" src="/img/logo-white.png" />
            </div>
        </div>        
    </div>
    <div class="hidden md:block w-[20%] h-screen bg-gradient-to-br from-main to-sky-200 sticky z-20 inset-0">
        <div class="h-full w-full flex flex-col gap-0.5">
            <div class="flex items-center flex-nowrap gap-1 md:gap-2 p-2 py-3 md:p-3 md:py-3.5 border-b-2">
                <nuxt-link to="/"
                    class="w-[50px] h-[50px] flex items-center justify-center text-white border-2 rounded-full">
                    <!-- <img src="/img/logo-white.png" class="w-full h-full rounded-full" alt=""> -->
                    <NuxtImg class="h-full w-full" src="/img/logo-white.png" loading="lazy" />
                </nuxt-link>
                <p class="text-[16px] md:text-[24px]  font-semibold text-slate-50">Destiny luck</p>
            </div>
            <!-- Danh sách menuSetting -->
            <div class="flex flex-col h-full overflow-y-auto scroll-cuttom-hidden rounded-md pl-0.5">
                <nuxt-link v-for="items, index in menuSetting" :key="index" :to="`/cai-dat/${items.link}`" v-show="items.active" class="text text-white bg-main border-l-[4px] border-transparent hover:bg-slate-50/10 p-3 cursor-pointer">
                    {{ items.title }}
                </nuxt-link>
            </div>
            <div class="flex items-center gap-1 text-white p-2 border-t-2 border-slate-100">
                <UIcon class="text-[14px] md:text-[20px]" name="material-symbols:nest-clock-farsight-analog-outline-rounded" dynamic />
                <p class="text-[12px] md:text-[14px]">{{ currentTime }}</p>
            </div>
        </div>
    </div>
<!-- <USlideover v-model="menuMB">
        <div class="p-4 flex-1">
            <UButton
                color="gray"
                variant="ghost"
                size="sm"
                icon="i-heroicons-x-mark-20-solid"
                class="flex sm:hidden absolute end-5 top-5 z-10"
                square
                padded
                @click="menuMB = false"
                />

        </div>
    </USlideover> -->

    <div class="fixed z-20 flex justify-end top-0 left-0 bg-transparent w-full h-full duration-100 invisible" :class="{'!visible':menuMB}"> 
        <div class="fixed z-[-1] w-full h-full bg-slate-200/80 dark:bg-slate-800/80 duration-150" @click="menuMB = !menuMB">
            </div>
            <div class="w-[80%] absolute top-0 left-[-100%] h-full flex flex-col bg-white dark:bg-gray-900/90 duration-500" :class="{'!left-0':menuMB}">
                <div class="flex items-center justify-between bg-gradient-to-l from-main to-main/50 px-2"> 
                    <div class="">
                        <img class="h-14" src="/img/logo-white.png" alt="">
                    </div>
                    <div>
                        <button @click="menuMB = !menuMB">
                            <UIcon class="text-2xl text-white" name="i-mingcute-close-fill" dynamic />
                        </button>
                    </div>
                </div>
                <div class="flex flex-col">
                    <nuxt-link @click="menuMB=false" v-for="items, index in menuSetting" :key="index" :to="`/cai-dat/${items.link}`" v-show="items.active" class="text text-main bg-slate-50 border-r-[4px] border-transparent p-3 cursor-pointer">
                        {{ items.title }}
                    </nuxt-link>
                </div>
            </div>
        </div>

</template>

<script setup lang="ts">
const { toggleLoadingModal } = useModalStore()
const { getMenuSetting } = useSettingStore()

const { userLogin } =  storeToRefs(useAuthStore())

toggleLoadingModal(true)
    await useAsyncData('getMenuSetting', ()=> getMenuSetting())
    const { menuSetting } = storeToRefs(useSettingStore())
    // console.log(menuSetting.value);
toggleLoadingModal(false)

// const listSetting = ref(
//     [
//         { id: '1', title: 'Cài đặt menu', link: 'menu', img: '', icon: '', active: true, menu: [] },
//         { id: '2', title: 'Cài đặt menu Trang chủ', link: 'menu-trang-chu', img: '', icon: '', active: true, menu: [] },
//         { id: '3', title: 'Danh sách người dùng', link: 'danh-sach-nguoi-dung', img: '', icon: '', active: true, menu: [] },
//         { id: '9', title: 'Cài đặt menu cài đặt', link: 'menu-cai-dat', img: '', icon: '', active: true, menu: [] },
//     ]
// )
const menuMB = ref(false)

const currentTime = ref('');

// function cập nhật thời gian
const updateTime = () => {
    const now = new Date();
    currentTime.value = now.toLocaleTimeString(); // Cập nhật thời gian
};

// Cập nhật thời gian lần đầu
onMounted(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000); // Cập nhật mỗi giây

    // Dọn dẹp interval khi component bị hủy
    onBeforeUnmount(() => {
        clearInterval(interval);
    });
});

</script>

<style scoped>
.router-link-active {
    @apply !bg-main/20 md:bg-slate-50/20 border-main/50 md:border-slate-50 
}
</style>