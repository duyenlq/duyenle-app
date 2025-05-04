<template>
    <div class="h-[100vh] flex justify-center w-full">
        <div class="flex gap-1 sm:gap-2 lg:gap-3 flex-col items-center justify-center"> 
            <img class="h-[60vh]" :src="`/img/error/${error.statusCode}.png`" alt="">
            <div class="w-full text-center">
                <div class= "flex flex-col gap-1 sm:gap-2">
                    <!-- <p class="text-base sm:text-lg lg:text-xl font-bold">{{ error.statusCode }}</p> -->
                    <!-- <p class="text">{{ error }}</p> -->
                    <p class="font-bold text-lg sm:text-4xl">Oops....</p>
                    <p class="text-base sm:text-lg md:text-xl font-medium">{{ error.message }}</p>
                    <p class="text mt-1">Dường dẫn hiện không tồn tại Hoặc đã xóa! bạn có muốn <nuxt-link to="/" class="underline underline-offset-2 hover:text-main duration-300" >Quay lại trang chủ !</nuxt-link> </p>
                </div>                
            </div>
            <div class="flex flex-col justify-center items-center gap-0.5">
                <button @click="useRouter().back" class="flex gap-0.5 bg-main sm:gap-1 items-center px-2 md:px-3 py-2 rounded-md !text-white hover:shadow-md duration-200">
                    <div class="i-tdesign-arrow-left"></div>
                    <p class="text">Quay về trang trước</p>
                </button>
                <!-- <nuxt-link to="/" class="text-[12px] md:text-[13px] hover:text-main">
                    -- Quay lại trang chủ --
                </nuxt-link> -->
            </div>
        </div>        
    </div>    
</template>
<script setup lang="ts">
    defineProps(['error']);    
</script>