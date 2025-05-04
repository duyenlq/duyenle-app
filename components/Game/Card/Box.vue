<template>
    <div v-if="type == '1'" class="h-[300px] w-[200px] relative flex items-center justify-center duration-200 cursor-pointer hover:translate-y-[-10px]">
        <!-- <div class="absolute -z-10 magic_card_shadow"></div> -->
        <div class="h-[300px] w-[200px] relative border-[1px] border-slate-400/80 overflow-hidden p-[3px] rounded-[8px] flex items-center justify-center hover:">
            <div class="w-[190%] h-[190%] absolute -z-[1] magic_card"></div>
            <div class="bg-white w-full h-full overflow-hidden rounded-[7px]"> 
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy"></NuxtImg>
            </div>
        </div>
    </div>

    <div v-else-if="type == '2'" class="h-[300px] w-[200px] relative flex items-center justify-center duration-200 cursor-pointer hover:translate-y-[-10px]">
        <div class="absolute -z-10 magic_card_shadow_2"></div>
        <div class="h-[300px] w-[200px] relative border-[1px] border-slate-400/80 overflow-hidden p-[3px] rounded-[8px] flex items-center justify-center hover:">
            <div class="w-[190%] h-[190%] absolute -z-[1] magic_card_2"></div>
            <div class="bg-white w-full h-full overflow-hidden rounded-[7px]"> 
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy"></NuxtImg>
            </div>
        </div>
    </div>
    <div v-else-if="type == '3'" class="h-[300px] w-[200px] relative flex items-center justify-center duration-200 cursor-pointer hover:translate-y-[-10px]">
        <div class="absolute -z-10 magic_card_shadow_3"></div>
        <div class="h-[300px] w-[200px] relative border-[1px] border-slate-400/80 overflow-hidden p-[3px] rounded-[8px] flex items-center justify-center hover:">
            <div class="w-[190%] h-[190%] absolute -z-[1] magic_card_3"></div>
            <div class="bg-white w-full h-full overflow-hidden rounded-[7px]"> 
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy"></NuxtImg>
            </div>
        </div>
    </div>
    <div v-else-if="type == '4'" class="h-[300px] w-[200px] relative flex items-center justify-center duration-200 cursor-pointer hover:translate-y-[-10px]">
        <div class="absolute -z-10 magic_card_shadow_4"></div>
        <div class="h-[300px] w-[200px] relative border-[1px] border-slate-400/80 overflow-hidden p-[3px] rounded-[8px] flex items-center justify-center hover:">
            <div class="w-[190%] h-[190%] absolute -z-[1] magic_card_4"></div>
            <div class="bg-white w-full h-full overflow-hidden rounded-[7px]"> 
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy"></NuxtImg>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { img, name, type } = defineProps<
    {
        img: string,
        name: string,
        type: string,

    }>();
</script>

<style scoped>
        @keyframes rotateBgColor{
        0% {
            transform: rotate(0deg);
            width: 170px;
            height: 270px;
            /* border-top-right-radius: 100%;
            border-bottom-left-radius: 100%; */
        }
        25% {
            transform: rotate(90deg);
            width: 270px;
            height: 170px;
        }
        50% {
            transform: rotate(180deg);
            width: 170px;
            height: 270px;
        }
        75%{
            transform: rotate(270deg);
            width: 270px;
            height: 170px;
        }
        100%{
            transform: rotate(360deg);
            width: 170px;
            height: 270px;
        }

    }

    @keyframes rotate{
        0% {
            transform: rotate(0deg);
        }
        100%{
            transform: rotate(360deg);
        }

    }

    .magic_card_shadow {
        background: linear-gradient(90deg, #9ebd13 0%, #008552 100%);
        filter: blur(60px);
        border-radius: 100%;
        animation: rotateBgColor 8s infinite linear;
    }

    .magic_card {        
        background: linear-gradient(90deg, #9ebd13 0%, #008552 100%);
        animation: rotate 8s infinite linear;
    }

    .magic_card_shadow_2 {
        background: linear-gradient(90deg, #b53eff 10%, #515ada 90%);
        filter: blur(60px);
        border-radius: 100%;
        animation: rotateBgColor 8s infinite linear;
    }

    .magic_card_2 {        
        background: linear-gradient(90deg, #b53eff 10%, #515ada 90%);
        animation: rotate 8s infinite linear;
    }

    .magic_card_shadow_3 {
        background: linear-gradient(90deg,rgba(235, 203, 0, 1) 0%, rgba(255, 242, 0, 1) 29%, rgba(255, 249, 207, 1) 100%);
        filter: blur(60px);
        border-radius: 100%;
        animation: rotateBgColor 8s infinite linear;
    }

    .magic_card_3 {        
        background: linear-gradient(90deg,rgba(235, 203, 0, 1) 0%, rgba(255, 242, 0, 1) 29%, rgba(255, 249, 207, 1) 100%);
        animation: rotate 8s infinite linear;
    }
    .magic_card_shadow_4 {
        /* background: linear-gradient(90deg, #0055ff, #44ff00, #ffea00 , #ff0000); */
        background: linear-gradient(90deg, #007BFF, #FFD700, #FF0000);
        filter: blur(60px);
        border-radius: 100%;
        animation: rotateBgColor 8s infinite linear;
    }

    .magic_card_4 {
        background: linear-gradient(90deg, #007BFF, #FFD700, #FF0000);
        animation: rotate 8s infinite linear;
    }


</style>