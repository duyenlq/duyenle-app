<template>
    <div id="header" class="top-0 right-0 z-10 flex duration-300 flex-col w-full h-14 md:h-16">
        <div class="container h-full flex items-center justify-between gap-1 md:gap-2">
            <nuxt-link to="/" class="min-w-fit h-full flex items-center justify-center text-white">
                <!-- <img src="/img/logo-white.png" class="w-full h-full rounded-full" alt=""> -->
                <NuxtImg class="h-full w-full" src="/img/logo.png" loading="lazy" />
                <p class="font-bold text-main text-nowrap text-[16px] md:text-[24px]">Destiny Luck</p>
            </nuxt-link>
            <!-- menu web -->
            <div class="w-full h-full hidden md:flex items-center justify-center gap-1 md:gap-8 bg-transparent">
                <div v-for="item,index in menu" :key="index" class="relative h-fit py-1 flex gap-2 text-main dark:text-white items-center justify-center group/1 duration-300" @mouseenter="hoverMenuitem = item.id" @mouseleave="hoverMenuitem = ''">
                    <nuxt-link :to="`${ '/'+item.link }`" class="z-20 font-semibold cursor-pointer" >{{ item.title }}</nuxt-link>
                    <div class="h-[2px] w-[100%] bg-main dark:bg-sky-50 duration-300 absolute bottom-0 scale-x-0 group-hover/1:scale-x-100"/>
                    <!-- <div v-show="item.menu.length > 0" class="rotate-180 duration-500 flex items-center" :class="{'!rotate-0':hoverMenuitem==item.id}"> 
                        <UIcon v-show="item.menu.length > 0" class="h-full text group-hover/1:text-mainHover" name="i-ph-caret-up-fill" dynamic />
                    </div> -->
                    <!-- Menu con -->
                    <!-- <div v-if="item.menu.length > 0" class="absolute left-0 top-[100%] min-w-[160px] w-fit flex flex-col items-center justify-center z-20 duration-300 shadow-inner ease-in-out overflow-hidden rounded-b-sm rounded-tr-sm border-main/30 bg-gradient-to-tl from-main to-main/70 text-white" :class="{'border-[1px]':hoverMenuitem==item.id}" :style="`height:${hoverMenuitem==item.id?35*item.menu.length:0}px`">                       
                        <nuxt-link v-show="item.menu.length > 0" v-for="i,index2 in item.menu" :key="index2" class="!h-[35px] w-[100%] cursor-pointer text flex justify-center" :to="`/${i.link}`">
                            <div class="text h-full w-[90%] flex items-center text-nowrap border-white/50" :class="{'border-b-2':index2 < item.menu.length-1}">{{ i.title }}</div>
                        </nuxt-link>
                    </div> -->
                </div>
            </div>
            <!-- Đăng nhập -->
            <div class="hidden md:flex items-end min-w-fit justify-center">
                <nuxt-link v-if="!isLoggedIn" to="/dang-nhap" class="text-[13px] md:text-[15px] font-semibold text-slate-100 text-nowrap bg-main dark:bg-main/85 p-[5px] px-2.5 rounded-full">Đăng nhập</nuxt-link>
                <div v-else class="flex items-center gap-1 relative"  @click="menuLogin = !menuLogin"> 
                    <div class="text-[16px] text-end text-main/90 font-semibold cursor-pointer text-nowrap truncate max-w-[180px]">{{ userLogin.username}}</div>
                    <div class="w-fit h-full flex items-center justify-center cursor-pointer">
                        <UIcon class="text-[18px] text-main rotate-0 duration-150" :class="{'!rotate-180':menuLogin}" name="i-mingcute-down-fill" dynamic />
                    </div>
                    <!-- Menu tác vụ khi đã đăng nhập -->
                    <div class="absolute z-50 bg-slate-50/70 dark:bg-slate-800/70 top-[140%] right-0 w-fit min-w-[150px] rounded-md dark:border-slate-400 duration-200 overflow-hidden h-auto scale-0 origin-top-right" :class="{'!scale-100':menuLogin || !userLogin }"> 
                        <div class="flex flex-col items-center border-2 border-slate-100 dark:border-slate-400/70 rounded-lg ">
                            <nuxt-link to="/thong-tin-ca-nhan" class="h-[40px] w-full flex items-center px-3 text-nowrap text cursor-pointer text-main hover:text-white hover:bg-main/70 dark:text-slate-100 rounded-t-md"> Cài đặt thông tin cá nhân </nuxt-link>
                            <div class="border-t-[1px] border-slate-300/60 dark:border-slate-100/80 w-[90%]"></div>
                            <div @click="logout()" class="h-[40px] w-full flex items-center px-3 text-nowrap text cursor-pointer text-main hover:text-white hover:bg-main/70 dark:text-slate-100 rounded-b-md">Đăng xuất</div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Chọn nền web -->
            <div class="min-w-fit h-full hidden md:flex bg-transparent items-center justify-center text-white">
                <div class="p-4 relative group hover:bg-main/20 cursor-pointer">
                    <!-- hiển thị icon-->
                    <div v-for="item,index in listColorMode" :key="index"> 
                        <UIcon v-if="$colorMode.preference == item.value" class="text-[24px] text-main" :name="item.icon" dynamic />
                    </div>               
                    <!-- danh sách -->
                    <div v-if="listColorMode.length > 0" class="absolute z-40 top-[100%] left-0 bg-slate-50/70 dark:bg-gray-900/50 border-[1px] border-main/40 dark:border-gray-900/50 w-full duration-300 opacity-0 group-hover:opacity-100 invisible group-hover:visible">                        
                        <div v-for="item,index in listColorMode" :key="index" class="w-full text-center py-1 text-main/80 hover:text-mainHover dark:hover:text-main cursor-pointer" @click="$colorMode.preference=item.value"> 
                            <UIcon class="text-[24px]" :name="item.icon" dynamic />
                        </div>
                    </div>
                </div>
            </div>
            <!-- menu mobile icon -->
            <div class="min-w-fit flex flex-nowrap gap-2 items-center ml-auto md:hidden">
                <nuxt-link v-if="!isLoggedIn" to="/dang-nhap" class="text-[12px] font-semibold text-slate-100 text-nowrap bg-main p-1 px-2 rounded-full">Đăng nhập</nuxt-link>
                <UIcon @click="menuMB = !menuMB" class="text-[26px] text-main hover:text-mainHover" name="i-mingcute-menu-fill" dynamic />
            </div>
        </div>
    </div>
    <div id="onTop" @click="scrollUp()" class="fixed z-[999] right-1 md:right-5 bottom-1 md:bottom-5 w-8 md:w-10 h-8 md:h-10 border-[2px] border-slate-50 rounded-full bg-main hover:bg-mainHover ease-in duration-200 flex justify-center items-center cursor-pointer !invisible"> 
        <UIcon class="text-[18px] md:text-[24px] text-white" name="i-mdi-arrow-top" dynamic />
    </div>
    <div class="fixed z-20 flex justify-end top-0 left-0 bg-transparent w-full h-full duration-100 invisible" :class="{'!visible':menuMB}"> 
            <div class="fixed z-[-1] w-full h-full bg-slate-200/80 dark:bg-slate-800/80 duration-150" @click="menuMB = !menuMB">
            </div>
            <div class="w-[80%] absolute top-0 right-[-100%] h-full flex flex-col bg-white dark:bg-gray-900/90 duration-500" :class="{'!right-0':menuMB}">
                <div class="flex items-center justify-between bg-gradient-to-l from-main to-main/50 px-2"> 
                    <div class="min-w-fit">
                        <img class="h-14" src="/img/logo-white.png" alt="">
                    </div>
                    <div v-if="userLogin" class="w-full flex items-center font-medium text-/80 text-xl text-white/90 text-start  truncate">
                        <div class="w-full h-full flex gap-2 items-center justify-star cursor-pointer">
                            {{ userLogin.username }}
                        </div>
                    </div>
                    <div>
                        <button @click="menuMB = !menuMB">
                            <UIcon class="text-2xl text-white" name="i-mingcute-close-fill" dynamic />
                        </button>
                    </div>
                </div>
                <div v-if="isLoggedIn" @click="logout(), menuMB = !menuMB" class="flex items-center gap-1 py-2 px-1 font-medium">
                    <UIcon class="text-[18px] text-slate-800 dark:text-white " name="i-icon-park-outline-logout" dynamic />
                    <div class="text-[13px]">Đăng Xuất</div>
                </div>
                <div class="flex flex-col px-1 border-t-2 overflow-y-auto">
                    
                    <nuxt-link v-for="item,index in menu" :key="index" :to="`/${ item.link }`" @click="menuMB = !menuMB" class="py-3 px-1 font-medium border-b-2">
                        {{ item.title }}
                    </nuxt-link>
                    <nuxt-link v-if="isLoggedIn" to="thong-tin-ca-nhan" @click="menuMB = !menuMB" class="py-3 px-1 font-medium border-b-2">
                        Thông tin cá nhân
                    </nuxt-link>             
                </div>
                <div class="flex bg-main/10 border-t-2 mt-auto ">                   
                    <div v-for="item,index in listColorMode" :key="index" class="w-full text-center py-3 text-main hover:text-mainHover dark:hover:text-main cursor-pointer" @click="$colorMode.preference=item.value"> 
                        <UIcon class="text-[24px]" :name="item.icon" dynamic />
                    </div>
                </div>
            </div>
        </div>
</template>

<script setup lang="ts">
    const { menu } = storeToRefs(useSettingStore())
    const colorMode = useColorMode()
    const menuMB = ref(false)
    const headerScroll = ref(false)
    const hoverMenuitem = ref('')
    const listColorMode = ref([
        {id:'1', name:'system', value:'system', icon:'i-mi-computer'},
        {id:'2', name:'light', value:'light', icon:'i-solar-sun-2-outline'},
        {id:'3', name:'dark', value:'dark', icon:'i-solar-moon-outline'},
        {id:'4', name:'sepia', value:'sepia', icon:'i-ci-coffee'},
    ])

    const { userLogin, isLoggedIn } = storeToRefs(useAuthStore())
    // console.log(userLogin.value,'hiển thị user đã đăng nhập');
    const { setUserLogin } = useAuthStore()

    const menuLogin = ref(false)

    const logout = () => {
        useCookie('authCookie').value = null;
        menuLogin.value = false
        setUserLogin({})        
    }

    onMounted(() => {
        const header = document.getElementById('header') as HTMLElement;
        const onTop = document.getElementById('onTop') as HTMLElement;
        window.onscroll = () => {
            // if(document.documentElement.scrollTop < 20){
            //     header.classList.remove('fixed')
            //     // header.classList.remove('bg-main/80')
            //     header.classList.add('sticky')
            //     headerScroll.value = false
                
            // }else {
            //     header.classList.remove('sticky')
            //     header.classList.add('fixed')
            //     // header.classList.add('bg-main/80')
            //     headerScroll.value = true
            // }

            // hiển thị on-top
            if(document.documentElement.scrollTop > 10){
                onTop.classList.remove('!invisible')
                // onTop.classList.add('visible')
            }else{
                onTop.classList.add('!invisible')
                // onTop.classList.remove('visible')
            }
        }
    });
</script>

<style scoped>
</style>