<template>
    <div class="md:h-60"> 
        <NuxtImg class="w-full h-full" src="/img/banner/banner2.jpg" loading="lazy"/>
    </div>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'}]" :last="'game hay'" />
    </div>
    <div class="container mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="class"> 
            <!-- <div class="font-semibold text-xl text-main mb-2 md:mb-4"> Game cơ bản </div> -->
            <div class="grid grid-cols-2 md:grid-cols-6 gap-4"> 
                <nuxt-link v-for="items,index in listGame" :key="index" :to="`/game-hay/${items.link}`" class="flex flex-col gap-2 min-h-60 bg-gradient-to-br from-main from-10% via-sky-400/30 via-60% to-sky-200 rounded-lg p-1 duration-300 shadow-lg hover:-translate-y-4"> 
                    <div class="bg-slate-50 h-2/3 overflow-hidden w-full flex item-center justify-center rounded-lg">
                        <NuxtImg class="w-full h-full" :src="`/img/banner/${items.img}`" loading="lazy"/>
                    </div>
                    <div class="bg-slate-50 h-1/3 w-full rounded-lg p-1"> 
                        <p class="font-semibold text-main">{{ items.title }}</p>
                    </div>
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    const listGame = ref( 
        [
            { id: '1', title: 'Cờ caro', link: 'co-caro', img: 'banner5.jpg', menu: []},
            { id: '2', title: 'Cờ caro online', link: 'co-caro-online', img: 'banner4.jpg', menu: []},
            { id: '3', title: 'Game Pokemon', link: 'game-pk', img: 'banner3.jpg', menu: []},
            { id: '3', title: 'Game thẻ bài', link: 'card', img: 'logo_card.png', menu: []},
        ]
    )
</script>

<style scoped>

</style>