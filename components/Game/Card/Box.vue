<template>
    <!-- <div v-if="type == '1'" class="h-[300px] w-[200px] relative flex items-center justify-center duration-200 cursor-pointer hover:translate-y-[-10px]">
        <div class="absolute -z-10 magic_card_shadow"></div>
        <div class="h-[300px] w-[200px] relative border-[1px] border-slate-400/80 overflow-hidden p-[3px] rounded-[8px] flex items-center justify-center hover:">
            <div class="w-[190%] h-[190%] absolute -z-[1] magic_card"></div>
            <div class="bg-white w-full h-full overflow-hidden rounded-[7px]"> 
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy"></NuxtImg>
            </div>
        </div>
    </div> -->
    <div class="h-[300px] w-[200px] relative flex items-center justify-center cursor-pointer" @click="flipped = !flipped">
        <div class="absolute inset-0 rounded-[10px] blur-xl z-[-2] translate-y-1 scale-95 duration-700 delay-300" :class="magic_card_shadow,{'hidden':type == '1','!scale-0':flipped==false}" />
        <div class="h-[300px] w-[200px]  rounded-[10px] border-[1px] border-slate-300/40 p-[2px] transition-transform duration-1000 rotate-y-180" :class="{ '!rotate-0': flipped }" style="transform-style: preserve-3d;">
            <!-- ảnh viền -->
            <div class="absolute inset-0 rounded-[10px] z-[-1] duration-700 delay-200" :class="magic_card_shadow,{'opacity-0':flipped==false}" />
            <div class="relative w-full h-full overflow-hidden rounded-[9px] duration-700" :class="{'opacity-0':flipped==false}">                
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy" />
                <div class="sparkle" v-if="flipped && (type == '4' || type == '5')"></div>
                <div class="sparkle_2" v-if="flipped && (type == '4' || type == '5')"></div>
            </div> 
            <div class="absolute inset-0 w-full h-full overflow-hidden rounded-[9px] duration-700 ease-in" :class="{'opacity-0':flipped==true}">                
                <NuxtImg class="w-full h-full object-fill" :src="'/img/card/test/layout.png'" loading="lazy" />
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
const { img, name, type } = defineProps<
    {
        img: string,
        name: string,
        type?: string,
        rarity?: string,
    }>();

    const magic_card_shadow = ref();
    if(type=='1'){
        magic_card_shadow.value = 'bg-gradient-to-tr from-emerald-600 via-green-500 to-lime-700'
    }else if(type=='2'){
        magic_card_shadow.value = 'bg-gradient-to-tr from-indigo-800 via-purple-500 to-violet-600'
    }else if(type=='3'){
        magic_card_shadow.value = 'bg-gradient-to-tr from-orange-400 via-amber-400 to-yellow-400'
    }else if(type=='4'){
        magic_card_shadow.value = 'bg-gradient-to-tr from-red-600 via-orange-500 to-rose-700'
    }else if(type=='5'){
        magic_card_shadow.value = 'bg-RGB'
    }else{
        magic_card_shadow.value = ''
    }

    const flipped = ref(false)

</script>

<style scoped>
    .bg-RGB {
        background: linear-gradient(305deg, red, orange, yellow, green, blue, indigo, violet, rgb(238, 130, 130));
    }

    .perspective {
        perspective: 1000px;
    }

    .rotate-y-180 {
        transform: rotateY(180deg);
    }

    .sparkle {
        position: absolute;
        top: 0;
        left: -80%;
        width: 40%;
        height: 100%;
        background: linear-gradient(
            120deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.8) 50%, 
            rgba(255, 255, 255, 0) 100%
        ), 
        linear-gradient(
            60deg, 
            rgba(173, 216, 230, 0.3) 0%, 
            rgba(255, 255, 255, 0.5) 50%, 
            rgba(173, 216, 230, 0.3) 100%
        );
        opacity: 0.6;
        transform: skewX(-22deg);
        animation: sparkleMove 4s infinite;
        z-index: 1;
        filter: blur(40px)        
    }

    .sparkle_2 {
        position: absolute;
        top: 0;
        left: -80%;
        width: 40%;
        height: 100%;
        /* background: linear-gradient(
            120deg, 
            rgba(255, 255, 255, 0) 0%, 
            rgba(255, 255, 255, 0.8) 50%, 
            rgba(255, 255, 255, 0) 100%
        ), 
        linear-gradient(
            60deg, 
            rgba(173, 216, 230, 0.3) 0%, 
            rgba(255, 255, 255, 0.5) 50%, 
            rgba(173, 216, 230, 0.3) 100%
        ); */
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(173, 216, 230, 0.5));
        opacity: 0.6;
        transform: skewX(-22deg);
        animation: sparkleMove 4s infinite;
        animation-delay: 2000ms;
        z-index: 1;
        filter: blur(40px)        
    }

    @keyframes sparkleMove {
        0% {
            left: -80%;
        }

        100% {
            left: 130%;
        }
    }

</style>