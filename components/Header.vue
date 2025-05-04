<template>
    <div id="header" class="top-0 right-0 z-10 flex duration-300 flex-col w-full h-14 md:h-16 bg-gradient-to-tl from-main via-main/60 to-main/70 shadow-md">
        <div class="container h-full flex items-center gap-2 md:gap-4">
            <nuxt-link to="/" class="min-w-fit h-full flex items-center justify-center text-white">
                <!-- <img src="/img/logo-white.png" class="w-full h-full rounded-full" alt=""> -->
                <NuxtImg class="h-full w-full" src="/img/logo-white.png" loading="lazy" />
            </nuxt-link>
            <!-- menu web -->
            <div class="w-full h-full hidden md:flex items-center gap-2 md:gap-3 bg-transparent">
                <div v-for="item,index in menu" :key="index" class="relative h-full flex gap-1 text-white dark:text-white items-center group/1 duration-300 px-0.5 md:px-1" @mouseenter="hoverMenuitem = item.id" @mouseleave="hoverMenuitem = ''">
                    <nuxt-link :to="`/${item.link}`" class="z-20 text font-semibold cursor-pointer duration-300 group-hover/1:text-mainHover dark:group-hover/1:text-main" >{{ item.title }}</nuxt-link>
                    <!-- <div v-show="item.menu.length > 0" class="rotate-180 duration-500 flex items-center" :class="{'!rotate-0':hoverMenuitem==item.id}"> 
                        <UIcon v-show="item.menu.length > 0" class="h-full text group-hover/1:text-mainHover" name="i-ph-caret-up-fill" dynamic />
                    </div> -->
                    <!-- Menu con -->
                    <!-- <div v-show="item.menu.length > 0" class="absolute left-0 top-[100%] min-w-[160px] w-fit flex flex-col items-center justify-center z-20 duration-300 shadow-inner ease-in-out overflow-hidden rounded-b-sm rounded-tr-sm border-main/30 bg-gradient-to-tl from-main to-main/70 text-white" :class="{'border-[1px]':hoverMenuitem==item.id}" :style="`height:${hoverMenuitem==item.id?35*item.menu.length:0}px`">                       
                        <nuxt-link v-for="i,index2 in item.menu" :key="index2" class="!h-[35px] w-[100%] cursor-pointer text flex justify-center" :to="`/${i.link}`">
                            <div class="text h-full w-[90%] flex items-center text-nowrap border-white/50" :class="{'border-b-2':index2 < item.menu.length-1}">{{ i.title }}</div>
                        </nuxt-link>
                    </div> -->
                </div>
            </div>
            <!-- Chọn nền web -->
            <div class="min-w-fit h-full hidden md:flex bg-transparent items-center justify-center text-white">
                <div class="p-4 relative group hover:bg-main/20 dark:hover:bg-gray-400/20 cursor-pointer">
                    <!-- hiển thị icon-->
                    <div v-for="item,index in listColorMode" :key="index"> 
                        <UIcon v-if="$colorMode.preference == item.value" class="text-[24px]" :name="item.icon" dynamic />
                    </div>               
                    <!-- danh sách -->
                    <div v-if="listColorMode.length > 0" class="absolute z-40 top-[100%] left-0 bg-main/80 dark:bg-gray-900/50 border-[1px] border-main/40 dark:border-gray-900/50 w-full duration-300 opacity-0 group-hover:opacity-100 invisible group-hover:visible">                        
                        <div v-for="item,index in listColorMode" :key="index" class="w-full text-center py-1 text-white/80 hover:text-mainHover dark:hover:text-main cursor-pointer" @click="$colorMode.preference=item.value"> 
                            <UIcon class="text-[24px]" :name="item.icon" dynamic />
                        </div>
                    </div>
                </div>
            </div>
            <!-- menu mobile -->
            <div class="min-w-fit ml-auto md:hidden"> 
                <UIcon @click="menuMB = !menuMB" class="text-[26px] text-white hover:text-mainHover" name="i-mingcute-menu-fill" dynamic />
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
                    <div class="">
                        <img class="h-14" src="/img/logo-white.png" alt="">
                    </div>
                    <div>
                        <button @click="menuMB = !menuMB">
                            <UIcon class="text-2xl text-white" name="i-mingcute-close-fill" dynamic />
                        </button>
                    </div>
                </div>
                <div class="flex flex-col px-1 border-t-2">
                    <nuxt-link v-for="item,index in menu" :key="index" :to="`/${ item.link }`" @click="menuMB = !menuMB" class="py-3 px-1 font-medium border-b-2">
                        {{ item.title }}
                    </nuxt-link>
                </div>
                <div class="flex bg-main/10 border-t-2 mt-auto">
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

    // const listMenu = ref([
    //     {id: '1', title: 'Trang chủ', link: '', icon: '', menu: []},
    //     {id: '2', title: 'Tiện ích', link: 'tien-ich', icon: '', menu: []},
    //     {id: '3', title: 'Game hay', link: 'game-hay', icon: '', menu: [
    //         // { id: '3-1', title: 'Cờ caro', link: 'co-caro', icon: '', menu: []},
    //         // { id: '3-2', title: 'Cờ caro online', link: 'co-caro-online', icon: '', menu: []},
    //         // { id: '3-3', title: 'Game PK', link: 'game-pk', icon: '', menu: []},
    //     ]},
    //     // {id: '4', title: '', link: '', icon: '', menu: []},
    //     // {id: '5', title: '', link: '', icon: '', menu: []},
    // ])

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