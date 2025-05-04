<template>
    <div class="">
        <!-- <p class="text-2xl font-bold">Trang chủ</p> -->
        <!-- <UIcon class="text-main text-[24px] hover:text-red-400 hover:cursor-pointer hover:scale-125 duration-500" name="i-mdi-like" dynamic /> -->
        <div class="flex justify-center">
            <div class="absolute h-[95vh] md:h-[92vh] container mx-auto bg-0 flex gap-1 flex-col justify-center"> 
                <p class="text-[88px] translate-x-0 font-bold text-main">LÊ QUỐC DUYÊN</p>
                <p class="text-2xl font-medium text-sky-500/60 md:text-main">Xin Chào bạn đến với trang web của tôi ...</p>
            </div>
            <div class=" w-0 md:w-3/5 bg-transparent h-[90vh]">
            </div>
            <div class="w-full h-[90vh] md:w-2/5 bg-gradient-to-tl from-main rounded-tl-[100%] md:rounded-tl-[75%] rounded-bl-[5%]"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    definePageMeta({
        layout: "main"
    })
</script>

<style scoped>
</style>