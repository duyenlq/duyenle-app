<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Game hay',link:'/pixel demo'}]" :last="'pixel demodemo'" />
    </div>
    <div class="container">        
        <h1 class="textTitle"> Pixel demo </h1>
        
        <div class="min-h-[400px] w-full border-main border-2"> 
            <!-- các HàngHàng -->
            <div v-for="i in rows" :key="i" class="flex">
                <!-- Các Cột -->
                <div v-for="j in cols" :key="j" class="w-[25px] h-[25px] bg-white/90 cu border-main border-2 hover:border-slate-600" @click="selectBoard( i-1, j-1 )" :class="matrix[i-1][j-1].class"> 
                    <!-- {{ i +'-'+ j }} -->
                    
                </div>
            </div>
        </div>

        <div>
            <input type="color" v-model="color"/>
            <button @click="selectColor(1,1)" class="bg-main/10 border-2 border-main px-4 rounded-lg"> Chọn </button>
        </div>

    </div>
</template>

<script setup lang="ts">
    const rows = ref(10);
    const cols = ref(10);

    const color = ref('#000000');

    const matrix = ref([[]] as any)
    
    const dislay = () => {
        for (let i = 0; i < rows.value; i++) {
            matrix.value[i] = [];
            for (let j = 0; j < cols.value; j++) {
                matrix.value[i][j] = { 
                    x: i,
                    y: j,
                    class: ''
                } as any;
            }
        }
        
    }
    dislay()    

    const selectBoard = ( row: any, col: any ) => {
        matrix.value[row][col].class = '!bg-red-600';
    }
    const selectColor = ( row: any, col: any ) => {
        matrix.value[row][col].class = '!bg-[#595959]';

        console.log('màu đang set : ',  color.value);
    }
</script>

<style scoped>
</style>