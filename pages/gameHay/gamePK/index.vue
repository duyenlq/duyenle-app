<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Game hay',link:'/game-hay'}]" :last="'game PK'" />
    </div>
    <div class="container mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="w-full h-[600px] md:h-[580px] bg-white border-2 md:border-4 rounded-md border-main flex gap-2 md:gap-4 flex-col md:flex-row">
            <div class="p-2 md:p-4 w-full md:w-3/4 h-[60%] md:h-full bg-cover bg-bottom" style="background-image: url(/img/background/background1.jpg);">
                <div class="grid grid-cols-12 grid-rows-2 gap-1 w-full h-full overflow-hidden">
                    <!-- Nơi thanh máu 2 -->
                    <div class="col-span-7 w-full h-full md:pr-5 bg-slate-100/0 relative">
                        <div class="w-full relative">
                            <div class="w-full bg-gradient-to-br from-main to-sky-200 border-[3px] md:border-[4px] border-cyan-200/80 rounded-tr-2xl md:rounded-tr-[45px] rounded-bl-2xl md:rounded-bl-[45px] py-0 md:pb-2 px-1.5 md:px-4 flex flex-col"> 
                                <!-- Thông tin monster -->
                                <div class="w-full flex justify-end">
                                    <!-- tên monster 2 -->
                                    <div class="absolute left-0 top-0 flex gap-0.5 md:gap-1 items-center bg-gradient-to-br from-main to-sky-100 rounded-tr-full py-0 pt-1 px-1.5 md:px-4 w-fit">
                                        <div class="w-fit py-[2px] md:py-[4px] flex items-center rounded-t-lg"> 
                                            <p class="text !text-[13px] md:!text-[16px] font-semibold text-slate-200 stroke-text">{{ monster_2.name }}</p>
                                        </div>
                                        <div class="flex gap-0.5 md:gap-1 h-3 md:h-5"> 
                                            <NuxtImg v-for="items,index in monster_2.type" :key="index" class="h-full border-slate-300/60 border-[1px] shadow-slate-700/80 shadow-sm rounded-full" preload :src="`/img/monster/type/${items}.webp`"></NuxtImg>
                                        </div>
                                    </div>
                                    <!-- Thanh level -->
                                    <div class="w-fit px-1 md:px-2 py-[2px] md:py-[4px] flex items-center rounded-t-lg"> 
                                        <p class="text-[11px] md:text-[14px] text-slate-100 stroke-text stroke-slate-900 font-semibold"> Lv {{ monster_2.currentLevel }}</p>
                                    </div>                    
                                </div>
                                <!-- thanh HP monster 2 -->
                                <div class="relative w-full h-4 md:h-6 border-[1px] flex items-center justify-center border-green-600/50 rounded-sm rounded-tl-2xl rounded-br-3xl overflow-hidden"> 
                                    <div class="w-full h-full bg-gray-200"> 
                                        <div class="h-full bg-gradient-to-r from-green-200 to-green-400 duration-300" :style="`width:${monster_2.hp.percent}%`"></div>
                                    </div>
                                    <div class="absolute text text-white stroke-text font-bold">{{ monster_2.hp.now }} / {{ monster_2.hp.total }}</div>
                                </div>
                                <!-- thanh exp -->
                                <div class="flex items-center gap-[4px] md:gap-1 md:mt-1">
                                    <p class="text-[10px] md:text-[12px] text-gray-700">exp:</p>
                                    <div class="relative w-[90%] h-1.5 md:h-2 border-[1px] flex items-center justify-center border-yellow-500/50 rounded-sm rounded-tl-2xl rounded-br-3xl overflow-hidden"> 
                                    <div class="w-full h-full bg-gray-200"> 
                                        <div class="h-full bg-mainHover duration-300" :style="`width:${40}%`"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Nơi quái vật 2 -->
                    <div class="col-span-5 w-full h-full bg-slate-100/0 relative flex justify-center">
                        <!-- Ảnh monster -->
                        <div class="absolute bottom-0 md:bottom-2 z-10 cursor-pointer bg-blue-400/0">
                            <NuxtImg class="hidden md:block max-w-[270px] max-h-[270px]" :width="monster_2.size.w" src="/img/monster/Rua_Nuoc.png" loading="lazy" preload />
                            <NuxtImg class="block md:hidden max-w-[165px] max-h-[165px]" :width="Math.floor(monster_2.size.w/1.5)" src="/img/monster/Rua_Nuoc.png" loading="lazy" preload/>
                        </div>
                        <!-- Bóng monster 2 -->
                        <div class="absolute bottom-0 bg-gray-800/50 w-4/5 md:w-3/5 h-5 md:h-10 rounded-[100%]" />
                        <!-- Skill-->
                    </div>

                    <!-- Nơi quái vật 1 -->
                    <div class="col-span-5 w-full h-full bg-slate-100/0 relative flex justify-center">
                        <!-- Ảnh monster -->
                        <div class="absolute bottom-0 md:bottom-2 z-10 cursor-pointer bg-red-400/0">                            
                            <NuxtImg class="hidden md:block max-w-[270px] max-h-[270px] -scale-x-100" :width="Math.floor(monster_1.size.w)" src="/img/monster/Rong_Lua.png" loading="lazy" preload />
                            <NuxtImg class="block md:hidden max-w-[165px] max-h-[165px] -scale-x-100" :width="Math.floor(monster_1.size.w/1.5)" src="/img/monster/Rong_Lua.png" loading="lazy" preload />
                        </div>
                        <!-- Bóng monster 1 -->
                        <div class="absolute bottom-0 bg-gray-800/50 w-4/5 md:w-3/5 h-5 md:h-10 rounded-[100%]" />
                        <!-- Skill -->
                    </div>

                    <!-- Nơi thanh máu 1 -->
                    <div class="col-span-7 w-full h-full md:pl-5 bg-slate-100/0 relative flex items-end md:items-center">
                        <div class="w-full relative">
                            <div class="w-full bg-gradient-to-br from-main to-sky-200 border-[3px] md:border-[4px] border-cyan-200/80 rounded-tr-2xl md:rounded-tr-[45px] rounded-bl-2xl md:rounded-bl-[45px] py-0 md:pb-2 px-1.5 md:px-4 flex flex-col"> 
                                <!-- Thông tin monster -->
                                <div class="w-full flex justify-end">
                                    <!-- tên monster 1 -->
                                    <div class="absolute left-0 top-0 flex gap-0.5 md:gap-1 items-center bg-gradient-to-br from-main to-sky-100 rounded-tr-full py-0 pt-1 px-1.5 md:px-4 w-fit">
                                        <div class="w-fit py-[2px] md:py-[4px] flex items-center rounded-t-lg"> 
                                            <p class="text !text-[13px] md:!text-[16px] font-semibold text-slate-200 stroke-text">{{ monster_1.name }} nha</p>
                                        </div>
                                        <div class="flex gap-[4px] md:gap-1 h-3 md:h-5"> 
                                            <NuxtImg v-for="items,index in monster_1.type" :key="index" class="h-full border-slate-300/60 border-[1px] shadow-slate-700/80 shadow-sm rounded-full" preload :src="`/img/monster/type/${items}.webp`" loa />
                                        </div>
                                    </div>
                                    <!-- Thanh level -->
                                    <div class="w-fit px-1 md:px-2 py-[2px] md:py-[4px] flex items-center rounded-t-lg"> 
                                        <p class="text-[11px] md:text-[14px] text-slate-100 stroke-text stroke-slate-900 font-semibold"> Lv {{ monster_1.currentLevel }}</p>
                                    </div>                    
                                </div>
                                <!-- thanh HP monster1 -->
                                <div class="relative w-full h-4 md:h-6 border-[1px] flex items-center justify-center border-green-600/50 rounded-sm rounded-tl-2xl rounded-br-3xl overflow-hidden"> 
                                    <div class="w-full h-full bg-gray-200"> 
                                        <div class="h-full bg-gradient-to-r from-green-200 to-green-400 duration-300" :style="`width:${monster_1.hp.percent}%`"></div>
                                    </div>
                                    <div class="absolute text text-white stroke-text font-bold">{{ monster_1.hp.now }} / {{ monster_1.hp.total }}</div>
                                </div>
                                <!-- thanh exp -->
                                <div class="flex items-center gap-0.5 md:gap-1 md:mt-1">
                                    <p class="text-[10px] md:text-[12px] text-gray-700">exp:</p>
                                    <div class="relative w-[90%] h-1.5 md:h-2 border-[1px] flex items-center justify-center border-yellow-500/50 rounded-sm rounded-tl-2xl rounded-br-3xl overflow-hidden"> 
                                    <div class="w-full h-full bg-gray-200"> 
                                        <div class="h-full bg-mainHover duration-300" :style="`width:${40}%`"></div>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="h-[40%] md:h-full w-full md:w-1/4 bg-gradient-to-br from-main to-sky-200 p-2 pt-3 md:pt-6 border-2 border-slate-100 flex flex-col gap-1 md:gap-2">
                <!-- Thông báo -->
                <div class="h-1/3 md:h-4/6 bg-slate-100 p-1 rounded-b-lg rounded-tr-lg relative text-slate-900">
                    <p class="absolute -top-3 md:-top-5 left-0 text bg-slate-100 rounded-t-md px-1 text-[11px] md:text-[14px] font-semibold">Thông báo:</p>
                    <div ref="scrollContainer" class="flex flex-col gap-1 md:gap-2 overflow-y-auto h-full">
                        <p class="text-[12px] md:text-[14px] leading-4 md:leading-5" v-for="items,index in notePK" :key="index">{{ items }}</p>
                    </div>
                </div>
                <!-- List skill -->
                <div class="h-2/3 md:h-2/6 flex flex-col gap-1 md:gap-1.5 justify-between rounded-lg">
                    <div class="h-5/6 p-1 md:p-2 bg-gradient-to-br from-sky-200 to-sky-50 rounded-lg border-[1px] border-main"> 
                        <div v-if="tabPK == 1" class="h-full grid grid-cols-2 grid-rows-2 gap-1 md:gap-2">
                            <button v-for="skill,index in monster_1.skill" :key="index" @click="atkRound( monster_1, monster_2, skill, index )" :disabled="skill.mana.pp <= 0" class="btn-skill text relative overflow-hidden">
                                <div class="absolute w-[110%]">
                                    <NuxtImg preload class="w-full md:w-full" :src="`/img/monster/type/${skill.type}.webp`" loading="lazy"/>
                                </div>
                                <div class="w-fit z-10 px-1 text-white">
                                    <div class="w-full text font-semibold stroke-text-gray pb-1">{{ skill.name }}</div>                                
                                </div>
                                <div class="absolute z-10 left-0 bottom-0 w-fit text-[12px] leading-4 font-semibold px-1 rounded-tr-lg bg-slate-600/40 text-slate-200">
                                    {{ skill.mana.pp }}/{{ skill.mana.total }}
                                </div>
                                <div class="absolute z-10 right-0 bottom-0 w-fit text-[12px] leading-4 font-semibold px-1 rounded-tl-lg bg-slate-600/40 text-slate-200">
                                    {{ skill.power }}
                                </div>
                            </button>
                        </div>
                        <div v-if="tabPK == 2" class="h-full grid grid-cols-2 gap-1 md:gap-2">
                            <!-- <button v-for="skill,index in monster_1.skill" :key="index" @click="Deal_damage( monster_1, monster_2, skill, index )" :disabled="skill.mana.pp <= 0" class="btn-skill text relative overflow-hidden">
                                Hồi máu 1
                            </button> -->
                        </div>
                    </div>                    
                    <div class="h-1/6 flex items-center gap-1.5 md:gap-2"> 
                        <button v-for="items,index in tabMenu" :key="index" @click="tabPK=items.id" class="btn-menu text" :class="{'opacity-35':true}">{{ items.name }}</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import type { Monster } from '@/models/monster'
    import type { Skill } from '@/models/skill';

    const toast = useToast()
    const { toggleLoadingModal } = useModalStore();

    const scrollContainer = ref()

    const monster_1 = ref<Monster>({
        id: '001',
        name: 'Rồng Lửa',
        hp: {
            total: 178,
            now: 178,
            percent: 100,
        },
        atk: 109,
        def: 85,
        speed: 100,
        critical: 200,
        critical_strike: 10,
        img: 'Rong_Lua.png',
        skill:[ 
            {
                id: '001',
                name: 'Phóng hỏa',
                mana: {
                    total: 10,
                    pp: 5,
                },
                power: 95,
                type: 'Fire',
                active: true,
                rate: 95,
            }, 
            {
                id: '003',
                name: 'Hạ Cánh',
                mana: {
                    total: 5,
                    pp: 3,
                },
                power: 20,
                type: 'Flying',
                active: true,
                rate: 100,
            },
            {
                id: '004',
                name: 'Đuôi sắt',
                mana: {
                    total: 10,
                    pp: 10,
                },
                power: 100,
                type: 'Steel',
                active: true,
                rate: 90,
            },
            {
                id: '005',
                name: 'Vuốt rồng',
                mana: {
                    total: 10,
                    pp: 5,
                },
                power: 80,
                type: 'Dragon',
                active: true,
                rate: 100,
            },
            ],
        size:{
            w: 260,
            h: 260,
        },
        life: true,
        currentLevel: 36,
        type:['Fire','Flying']   
    })
    const monster_2 = ref<Monster>({
        id: "002",
        name: 'Rùa Nước',
        hp: {
            total: 179,
            now: 179,
            percent: 100,
        },
        atk: 85,
        def: 105,
        speed: 78,
        critical: 170,
        critical_strike: 10,
        img: 'Rua_Nuoc.png',
        skill:[
            {
                id: '002',
                name: 'Súng nước',
                mana: {
                    total: 15,
                    pp: 15,
                },
                power: 40,
                type: 'water',
                active: true,
                rate: 100,
            },
            {
                id: '007',
                name: 'Tông',
                mana: {
                    total: 20,
                    pp: 20,
                },
                power: 40,
                type: 'Normal',
                active: true,
                rate: 100,
            },
            {
                id: '008',
                name: 'Bơm thủy lực',
                mana: {
                    total: 5,
                    pp: 5,
                },
                power: 100,
                type: 'water',
                active: true,
                rate: 90,
            },
        ],
        size:{
            w: 150,
            h: 150,
        },
        life: true,
        currentLevel: 38,
        type:['Water'],
    })

    const gameRound = ref({
        count: 0,

    })

    const game = ref({

    })

    const atkRound = async (monster: Monster, target: Monster, skill: Skill, skill_index?: number) => {

        if(monster.speed >= monster_2.value.speed){
            await delay(100)
            await Deal_damage( monster, target, skill, skill_index )
            if(monster_2.value.hp.now <= 0){
                return
            }
            await delay(500)    
            await Deal_damage( monster_2.value, monster_1.value, monster_2.value.skill[random(0,monster_2.value.skill.length-1)])
        }else{
            await delay(100)
            await Deal_damage( monster_2.value, monster_1.value, monster_2.value.skill[random(0,monster_2.value.skill.length-1)])
            if(monster_1.value.hp.now <= 0){
                return
            }
            await delay(500)
            await Deal_damage( monster, target, skill, skill_index )   
            
        }
    

    }

    const tabMenu = ref([
        {id: 1,name: "Skill",class: "bg-gradient-to-r from-mainHover to-orange-300 "},
        {id: 2,name: "Health",class: "bg-gradient-to-r from-green-400 to-green-300 "},
        {id: 3,name: "Ball",class: "bg-gradient-to-r from-red-400 to-red-300 "},
        {id: 4,name: "Out",class: "bg-gradient-to-r from-gray-400 to-gray-300 "},
    ]) 
    
    const tabPK = ref(1)

        
    const notePK = ref([
        "Chào đến với trò chơi...",
    ])

    const scrollToBottom = async () => {
        await nextTick();
        scrollContainer.value.scrollTop = scrollContainer.value.scrollHeight
    }

    watch(() => notePK.value.length, () => {
        scrollToBottom()
    })

    const Deal_damage = (monster: Monster, target: Monster, skill: Skill, skill_index?: number) => {
        console.log("Hiển thị Skill:",skill);
        
        if(target.hp.now <= 0){
            return
        }

        if( random(1,100) > skill.rate ){
            notePK.value.push(monster.name +' đã đánh hụt')
            return
        }

        const atk = monster.atk + monster.currentLevel;
        const def = target.def + target.currentLevel;
        const dame = ref(atk)

        // dame.value = Math.floor(atk/def * skill.power * random(85,100)/100)
        dame.value =  Math.floor(( ((2*monster.currentLevel+10)/250) * (atk/def) * skill.power + 2 ) * random(85,100)/100)
        // console.log(atk/def,"hiển thị hệ số atk/def");  
        
        const critNote = ref('')
        if( random(1,100) <= monster.critical_strike ){ // tỉ lệ chí mạng
            critNote.value = '(chí mạng)'
            dame.value = Math.round(dame.value * (monster.critical/100))
            // notePK.value.push('gây sát thương chí mạng')
        }
        notePK.value.push(monster.name + ' Sử dụng Skill '+ skill.name + ' gây ' + dame.value, critNote.value)
        if(target.hp.now > 0){
            if(target.id == monster_1.value.id){
                if(skill_index != null){
                    monster_2.value.skill[skill_index].mana.pp = monster_2.value.skill[skill_index].mana.pp - 1
                }              
                monster_1.value.hp.now = monster_1.value.hp.now - dame.value
                monster_1.value.hp.percent = (monster_1.value.hp.now/monster_1.value.hp.total)*100
                if(monster_1.value.hp.now <= 0){
                    monster_1.value.hp.now = 0
                    monster_1.value.hp.percent = 0
                    notePK.value.push(monster_1.value.name + ' đã bị hạ, làm tốt lắm.')
                    return
                }
            }else{
                if(skill_index != null){
                    monster_1.value.skill[skill_index].mana.pp = monster_1.value.skill[skill_index].mana.pp - 1
                }  
                monster_2.value.hp.now = monster_2.value.hp.now - dame.value
                monster_2.value.hp.percent = (monster_2.value.hp.now/monster_2.value.hp.total)*100
                if(monster_2.value.hp.now <= 0){
                    monster_2.value.hp.now = 0
                    monster_2.value.hp.percent = 0
                    notePK.value.push(monster_2.value.name + ' đã bị hạ, làm tốt lắm.')
                    return
                }
            }
        }
    }

</script>

<style scoped>
    .btn-skill{
        @apply text-white hover:shadow-md hover:border-slate-300 disabled:opacity-40 cursor-pointer border-[2px] border-slate-200 py-3 md:py-4 rounded-md flex flex-wrap items-center justify-center w-full duration-300
    }

    .btn-menu{
        @apply w-full h-full flex border-2 border-slate-100/50 rounded-md p-1 md:p-1 text-slate-50 hover:text-white hover:scale-105 hover:shadow-md cursor-pointer duration-200
    }

    .stroke-text {
        -webkit-text-stroke: 0.2mm rgb(100, 100, 100);
    }
    .stroke-text-gray {
        -webkit-text-stroke: 0.2mm rgb(150, 150, 150);
    }
</style>