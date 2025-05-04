<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'}]" :last="'tiện ích'" />
    </div>
    <div class="container mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="text text-main"> 
            Đây là trang Tiện Tích
        </div>
            <!-- <div class="flex gap-2 mb-5">
                <button @click="rotateDeg=0" class="bg-main px-2 p-1">0</button>
                <button @click="rotateDeg=90" class="bg-main px-2 p-1">90</button>
                <button @click="rotateDeg=180" class="bg-main px-2 p-1">180</button>
                <button @click="rotateDeg=270" class="bg-main px-2 p-1">270</button>
                <button @click="rotateDeg=360" class="bg-main px-2 p-1">360</button>
            </div>  -->
            <div class="flex gap-5 flex-col md:flex-row">
                <GameCardBox :img="'/img/card/test/Ren_3.jpg'" :type="'3'" :name="'a'"/>
                <GameCardBox :img="'/img/card/test/GiaLam_3.jpg'" :type="'3'" :name="'a'"/>
                <GameCardBox :img="'/img/card/test/Tya_2.jpg'" :type="'2'" :name="'a'"/>
                <GameCardBox :img="'/img/card/test/Ren_2.jpg'" :type="'2'" :name="'a'"/>
                <GameCardBox :img="'/img/card/test/GiaLam_1.jpg'" :type="'1'" :name="'a'"/>
                <GameCardBox :img="'/img/card/test/Tya_4.jpg'" :type="'4'" :name="'a'"/>
            </div>
            
    </div>
</template>

<script setup lang="ts">

    // const { toggleLoadingModal } = useModalStore()
    //     const getData = async () => {
        
    // }
    // onMounted(async () => {
    //     getData()
    // });
    const rotateDeg = ref(0);
    

</script>

<style scoped>

</style>