<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Game hay',link:'/game-hay'}]" :last="'game caro'" />
    </div>
    <div class="container flex flex-col gap-2 md:gap-4">
        <!-- <p class="text uppercase mt-3 sm:mt-4 md:mt-5">Đây là trang test cờ caro : {{ count }}</p> -->
        <div class="flex flex-col w-full md:flex-row mt-8 mb-4 md:mt-10 gap-4 md:gap-2"> 
            <div class=" relative flex justify-center w-full md:w-9/12 bg-main/40 max-w-[100%] max-h-[500px] md:max-h-fit md:max-w-auto overflow-auto pl-4 p-1 md:p-2 rounded-md">   
                <div v-for="i in table.row" :key="i" class="">
                    <div v-for="j in table.col" :key="j" class="h-[30px] w-[30px] cursor-pointer bg-slate-100/90 dark:bg-slate-300 hover:border-main duration-500 flex items-center justify-center border-2" @click="selectBoard( i-1, j-1 )" :class="{'!bg-main/10 dark:!bg-main/90':selectlocation.i==(i-1)&&selectlocation.j==(j-1)}"> 
                        <UIcon v-if="chessboard[i-1][j-1] == 'o'" class="text-blue-600 text-[24px]" name="i-codicon-circle-outline" dynamic />
                        <UIcon v-if="chessboard[i-1][j-1] == 'x'" class="text-red-600 text-[16px]" name="i-codicon-chrome-close" dynamic />
                        <!-- {{ i +'-'+ j }} -->
                    </div>
                </div>
            </div>
            <div class="flex order-first md:order-last rounded-md flex-col gap-3 md:gap-4 w-full md:w-3/12 min-h-10 bg-gradient-to-tl from-main to-main/70 p-3 md:p-5"> 
                <div class="flex items-center gap-1 md:gap-2">
                    <img class="w-12 border-2 border-white rounded-full" src="/img/logo-white.png" alt="">
                    <p class="text-[16px] md:text-[28px] font-bold uppercase text-white">Cờ caro</p>
                </div>
                <div> 
                    <p class="text-white"><b class="text">Số lượt chơi: </b>{{ countGame }}</p>
                </div>
                <div class="text-white">
                    <p>tỷ số:</p>
                    <div class="flex gap-1 pt-2"> 
                        <div class="w-full flex flex-col border-[1px] border-slate-200/60">
                            <p class="text-center py-1 font-bold bg-slate-400/50 border-b-[1px] border-slate-200/60" :class="{'!bg-main':tickX}">Player X</p>
                            <div class="flex justify-center items-center min-h-[60px]"> 
                                <p class="font-bold text-[16px] md:text-[28px]">{{ playerX }}</p>
                            </div>
                            <p class="text-sm text-center py-1 font-medium border-t-[1px]">{{ timeX }} s</p>
                        </div>
                        <div class="w-full flex flex-col border-[1px] border-slate-200/60">
                            <p class="text-center py-1 font-bold bg-slate-400/50 border-b-[1px] border-slate-200/60" :class="{'!bg-main':!tickX}">Player O</p>
                            <div class="flex justify-center items-center min-h-[60px]"> 
                                <p class="font-bold text-[16px] md:text-[28px]">{{ playerO }}</p>
                            </div>
                            <p class="text-sm text-center py-1 font-medium border-t-[1px]">{{ timeO }} s</p>
                        </div>
                    </div>
                </div>
                <div class=""> 
                    <div class="text text-white">Lượt đánh : {{ count }}</div>
                </div>
                <div class="mt-auto">
                    <button class="bg-main hover:bg-mainHover text-white border-white dark:border-main/40 hover:border-white border-[1px] md:border-[2px] rounded-md duration-300 text p-1 px-3 shadow-md shadow-slate-400/40 hover:scale-105" @click="resetChessboard()">đặt lại game</button>
                </div>
            </div>
        </div>
        <UModal v-model="isOpen" prevent-close>
            <div class="p-4 flex flex-col">
                <div class="relative flex items-center justify-center">
                    <div class=""> 
                        <img src="/img/caro/winner.png" alt="">
                    </div>
                    <div class="absolute flex items-center gap-2"> 
                        <div class="">
                            <UIcon v-if="winner == 'o'" class="text-blue-600 text-[48px]" name="i-codicon-circle-outline" dynamic />
                            <UIcon v-if="winner == 'x'" class="text-red-600 text-[32px]" name="i-codicon-chrome-close" dynamic />
                        </div> 
                        <p class="font-semibold">là người thắng</p>
                    </div>                    
                </div>
                <div class="flex justify-end"> 
                    <UButton @click="resetGame(),isOpen=false">Chơi lại</UButton>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    const table = ref({col: 31, row: 31})
    const selectlocation = ref({i:-1,j:-1})
    const tickX = ref(true)
    
    const count = ref(0)
    const countGame = ref(0)
    const playerX = ref(0)
    const playerO = ref(0)    
    const winner = ref('')

    const timePlayer = ref()
    const timeX = ref(60)
    const timeO = ref(60)

    

    const isOpen = ref(false)

    // data bàn cờ
    const chessboard = ref([[]] as any)
    const dislay = () => {
        for (let i = 0; i < table.value.row; i++) {
            chessboard.value[i] = [];
            for (let j = 0; j < table.value.col; j++) {
                chessboard.value[i][j] = '';
            }
        }
        console.log('bàn cờ : ', chessboard.value);
    }
    dislay()  

    const selectBoard = (x: any, y: any) => {
        if(chessboard.value[x][y] == ''){
            count.value = count.value + 1
            clearInterval(timePlayer.value);
            timePlay('x')
            selectlocation.value = {...selectlocation.value, i:x, j:y}
            tickX.value = !tickX.value

            if(count.value%2!=0){
                chessboard.value[x][y] = winner.value == 'x'?'o':'x';
                if(checkWin(winner.value == 'x'?'o':'x')){
                    setWin(winner.value == 'x'?'o':'x')
                }
            }else{
                chessboard.value[x][y] = winner.value == 'x'?'x':'o';
                if(checkWin(winner.value == 'x'?'x':'o')){
                    setWin(winner.value == 'x'?'x':'o')
                }
            }
            
        }        
    }

    const setWin = (value: any) => {
        winner.value = value
        isOpen.value = true
        clearInterval(timePlayer.value)
    }
    
    const timePlay = ( value: any) => {
        // console.log('đã chạy set time cho game');
        timeX.value = 60
        timeO.value = 60
        timePlayer.value = setInterval(()=>{
                if(tickX.value){
                    timeX.value = timeX.value - 1
                    if(timeX.value < 0){
                        // console.log('win O');
                        setWin('o')
                        }
                }else{
                    timeO.value = timeO.value - 1
                    if(timeO.value < 0){
                        // console.log('win X');
                        setWin('x')
                        }
                }
            },1000)
        
    }

    const resetChessboard = () => {
        dislay()
        count.value = 0
        tickX.value = winner.value=='x'?false:true
        clearInterval(timePlayer.value)
        timeX.value = 60
        timeO.value = 60
        selectlocation.value = {...selectlocation.value, i:-1, j:-1}
    }

    const countWinPlayer = () => {
        if(winner.value == 'x'){
            playerX.value = playerX.value + 1
        }else if(winner.value == 'o'){
            playerO.value = playerO.value + 1
        }else{
            console.log('Người thắng hiện tại đang trống?, kiểm tra lại đi bro!');
        }
        countGame.value = countGame.value + 1
    }

    const resetGame = () => {
        resetChessboard()
        countWinPlayer()
    }

    const checkWin = ( value: any ) => {
        try {
            for (let i = 0; i < chessboard.value.length; i++) {            
                for (let j = 0; j < chessboard.value[i].length; j++) {
                    // let checkRow = chessboard.value[i][j] == value && chessboard.value[i][j] == value
                    if(chessboard.value[i][j] == value && chessboard.value[i+1][j] == value && chessboard.value[i+2][j] == value && chessboard.value[i+3][j] == value && chessboard.value[i+4][j] == value){
                        return true
                    }else if(chessboard.value[i][j] == value && chessboard.value[i][j+1] == value && chessboard.value[i][j+2] == value && chessboard.value[i][j+3] == value && chessboard.value[i][j+4] == value){
                        return true
                    }else if(chessboard.value[i][j] == value && chessboard.value[i+1][j+1] == value && chessboard.value[i+2][j+2] == value && chessboard.value[i+3][j+3] == value && chessboard.value[i+4][j+4] == value){
                        return true
                    }
                    else if(chessboard.value[i][j] == value && chessboard.value[i+1][j-1] == value && chessboard.value[i+2][j-2] == value && chessboard.value[i+3][j-3] == value && chessboard.value[i+4][j-4] == value){                
                        return true
                    }
                }
            }
        } catch (error) {
            // console.log('');            
        }
    }
    
</script>

<style scoped>
</style>