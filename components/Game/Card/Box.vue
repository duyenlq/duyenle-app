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
        <div class="absolute inset-0 rounded-[10px] blur-xl z-[-2] translate-y-1 scale-95 duration-700" :class="magic_card_shadow,{'hidden':type == '1','!scale-0':flipped==false}" />
        <div class="w-full h-full rounded-[10px] border-[1px] border-slate-300/40 p-[2px] transition-transform duration-1000" :class="{ 'rotate-y-180': flipped }" style="transform-style: preserve-3d;">
            <div class="absolute inset-0 rounded-[10px] z-[-1] duration-1000 ease-out" :class="magic_card_shadow,{'opacity-0':flipped==false}"></div>
            <div class="w-full h-full overflow-hidden rounded-[9px] duration-700 ease-in" :class="{'opacity-0':flipped==false}">                
                <NuxtImg class="w-full h-full object-cover" :src="img?img:'/img/card/test/Ren_2.jpg'" loading="lazy" />
            </div> 
            <div class="absolute inset-0 w-full h-full overflow-hidden rounded-[9px] duration-700 ease-in" :class="{'opacity-0':flipped==true}">                
                <NuxtImg class="w-full h-full object-cover" :src="'/img/card/test/layout.png'" loading="lazy" />
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

</style>