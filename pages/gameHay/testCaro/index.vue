<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Game hay',link:'/game-hay'}]" :last="'cờ caro online'" />
    </div>
    <div class="container flex flex-col gap-2 md:gap-4">
        <!-- <p class="text uppercase mt-3 sm:mt-4 md:mt-5">Đây là trang test cờ caro : {{ count }}</p> -->
        <div class="flex flex-col w-full md:flex-row mt-3 mb-4 md:mt-6 gap-4 md:gap-2 h-fit">
            <div class="relative flex justify-center w-full md:w-9/12 bg-main/60 max-w-[100%] max-h-[500px] md:max-h-fit md:max-w-auto overflow-auto pl-4 p-1 md:p-2 rounded-md">   
                <div v-if="!codeChess" class="h-full flex items-center text font-semibold text-white gap-1">  
                    Chưa có bàn để chơi !
                </div>
                <div v-else v-for="items,index in chessboard" :key="index">
                    <div v-for="items2,index2 in items" :key="index2" class="h-[30px] w-[30px] cursor-pointer bg-slate-100/90 dark:bg-slate-300 hover:border-main duration-500 flex items-center justify-center border-2" @click="selectBoard( index, index2 )"> 
                        <UIcon v-if="items2.value == 'o'" class="text-blue-600 text-[24px]" name="i-codicon-circle-outline" dynamic />
                        <UIcon v-if="items2.value == 'x'" class="text-red-600 text-[16px]" name="i-codicon-chrome-close" dynamic />
                        <!-- {{ (i-1) +'-'+ (j-1) }} -->
                        <!-- {{ index +'-'+ index2 }} -->
                        <!-- {{ chessboard[0][0][0]}} -->
                        <!-- {{ items2.value }} -->
                    </div>
                </div>
                
            </div>
            <div v-if="codeChess" class="flex order-first md:order-last rounded-md flex-col gap-1 md:gap-2 w-full md:w-3/12 min-h-10 bg-gradient-to-tl from-main to-main/70 p-3 md:p-5"> 
                <div class="flex items-center gap-1 md:gap-2">
                    <img class="w-12 border-2 border-white rounded-full" src="/img/logo-white.png" alt="">
                    <p class="text-[16px] md:text-[28px] font-bold uppercase text-white">Caro online</p>
                </div>
                <div class="flex flex-col gap-1 md:gap-1.5 mt-1"> 
                    <p class="text-white text"><b class="">Tên Bàn: </b>{{ chess.name?chess.name:codeChess }}</p>
                    <p class="text-white text"><b class="">Code: </b>{{ codeChess }}</p>
                </div>
                <div class="flex flex-col gap-1 md:gap-1.5">                    
                    <p class="text-white"><b class="text">Số lượt chơi: </b>{{ chess.countGame }}</p>                    
                </div>
                <div class="text-white">
                    <p>tỷ số:</p>
                    <div class="flex gap-1 pt-2"> 
                        <div class="w-full flex flex-col border-[1px] border-slate-200/60">
                            <p class="text-center py-1 font-bold bg-slate-400/50 border-b-[1px] border-slate-200/60" :class="{'!bg-main':tickX}">Player X</p>
                            <div class="flex justify-center items-center min-h-[60px]"> 
                                <p class="font-bold text-[16px] md:text-[28px]">{{ chess.playerX }}</p>
                            </div>
                            <p class="text-sm text-center py-1 font-medium border-t-[1px]">{{ timeX }} s</p>
                        </div>
                        <div class="w-full flex flex-col border-[1px] border-slate-200/60">
                            <p class="text-center py-1 font-bold bg-slate-400/50 border-b-[1px] border-slate-200/60" :class="{'!bg-main':!tickX}">Player O</p>
                            <div class="flex justify-center items-center min-h-[60px]"> 
                                <p class="font-bold text-[16px] md:text-[28px]">{{ chess.playerO }}</p>
                            </div>
                            <p class="text-sm text-center py-1 font-medium border-t-[1px]">{{ timeO }} s</p>
                        </div>
                    </div>
                </div>
                <div class=""> 
                    <div class="text text-white">Lượt đánh : {{ chess.count }}</div>
                </div>
                <div class="mt-auto">
                    <button class="bg-main hover:bg-mainHover text-white border-white dark:border-main/40 hover:border-white border-[1px] md:border-[2px] rounded-md duration-300 text p-1 px-3 shadow-md shadow-slate-400/40 hover:scale-105" @click="resetChessboard('getChess')">đặt lại game</button>
                </div>
            </div>
            <div v-else class="flex order-first md:order-last rounded-md flex-col gap-3 md:gap-4 w-full md:w-3/12 min-h-10 bg-gradient-to-tl from-main to-main/70 p-3 md:p-5"> 
                <div class="flex items-center gap-1 md:gap-2">
                    <img class="w-12 border-2 border-white rounded-full" src="/img/logo-white.png" alt="">
                    <p class="text-[16px] md:text-[28px] font-bold uppercase text-white">Caro online</p>
                </div>
                <div class="flex flex-col gap-2 md:gap-3"> 
                    <p class="text-slate-50 text">Lựa chọn để chơi:</p>
                    <div class="flex gap-2 md:gap-3"> 
                        <button @click="modelCode = true" class="w-fit font-semibold text-main bg-slate-50 rounded-lg p-2 px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Đã có bàn</button>
                        <button @click="modelCreate = true" class="w-fit font-semibold text-white bg-mainHover rounded-lg p-2 px-3 text duration-300 hover:shadow-md hover:scale-105">Tạo bàn mới</button>
                    </div>
                </div>
            </div>
        </div>

        <UModal v-model="isOpen" prevent-close>
            <div class="p-4 flex flex-col">
                <div class="relative flex items-center justify-center">
                    <div class="">
                        <nuxt-img src="/img/caro/winner.png" preload loading="lazy"/>
                    </div>
                    <div class="absolute flex items-center gap-2"> 
                        <div class="">
                            <UIcon v-if="chess.winner == 'o'" class="text-blue-600 text-[48px]" name="i-codicon-circle-outline" dynamic />
                            <UIcon v-if="chess.winner == 'x'" class="text-red-600 text-[32px]" name="i-codicon-chrome-close" dynamic />
                        </div> 
                        <p class="font-semibold">là người thắng</p>
                    </div>                    
                </div>
                <div class="flex justify-end"> 
                    <UButton @click="resetGame(),isOpen=false">Chơi lại</UButton>
                </div>
            </div>
        </UModal>

        <UModal v-model="modelCode">
            <div class="p-4 flex flex-col gap-1 md:gap-2 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 rounded-md">
                <p class="text font-semibold text-main">Xin chào</p>
                <p class="text !text-[14px]">Vui lòng nhập mã code phòng :</p>
                <div class="w-full">
                    <input type="text" v-model="codeInput" class="w-full outline-none border-b-2 border-slate-500/50 text-main text bg-transparent">
                </div>
                <div class="flex gap-2 md:gap-3 mt-1 md:mt-2 justify-end">
                    <button @click="modelCode = false" class="w-[20%] font-semibold text-white bg-mainHover rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Hủy</button>
                    <button @click="searchChess()" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Xác nhận</button>
                </div>
            </div>
        </UModal>

        <UModal v-model="modelCreate">
            <div class="p-4 flex flex-col gap-1 md:gap-2 bg-gradient-to-br from-slate-100 via-slate-50 to-slate-200 rounded-md">
                <p class="text font-semibold text-main">Tạo phòng:</p>
                <div class="flex flex-col gap-2 md:gap-3">
                    <div class="w-full">
                        <p class="text !text-[14px]">Vui lòng tên Phòng :</p>
                        <input type="text" v-model="nameCreate" class="w-full outline-none border-b-2 border-slate-500/50 text-main text bg-transparent">
                    </div>
                    <div class="w-full">
                        <p class="text !text-[14px]">Số lượng cột :</p>
                        <input type="number" min="5" max="100" v-model="table.col" class="w-full outline-none border-b-2 border-slate-500/50 text-main text bg-transparent">
                    </div>
                    <div class="w-full">
                        <p class="text !text-[14px]">Số lượng hàng :</p>
                        <input type="number" min="5" max="100" v-model="table.row" class="w-full outline-none border-b-2 border-slate-500/50 text-main text bg-transparent">
                    </div>
                </div>
                <div class="flex gap-2 md:gap-3 mt-1 md:mt-2 justify-end">
                    <button @click="modelCreate = false" class="w-[20%] font-semibold text-white bg-mainHover rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Hủy</button>
                    <button @click="createChess(), modelCreate = false" class="font-semibold text-white bg-main rounded-lg p-2 md:px-3 text duration-300 hover:shadow-md shadow-black hover:scale-105">Xác nhận</button>
                </div>
            </div>
        </UModal>
    </div>
</template>

<script setup lang="ts">
    const { toggleLoadingModal } = useModalStore()
    const toast = useToast()

    const table = ref({col: 5, row: 5})
    const selectlocation = ref({i:-1,j:-1})
    const tickX = ref(true)
    
    // const count = ref(0)
    // const countGame = ref(0)
    // const playerX = ref(0)
    // const playerO = ref(0)
    // const winner = ref('')

    const timePlayer = ref()
    const timeX = ref(60)
    const timeO = ref(60)

    

    const isOpen = ref(false)
    const modelCode = ref(false)
    const codeInput = ref('')

    const modelCreate = ref(false)
    const nameCreate = ref('')
    // const codeInput = ref('')

    // const name = ref('Bàn 001')
    const codeChess = ref('')

    const chess = ref()

    // data bàn cờ
    const chessboard = ref([[{value:''} as any]] as any)
    
    const selectBoard = async (x: any, y: any) => {
        // console.log(chessboard.value[x][y],"Hiển thị cái đã chọn");
        // console.log(x,"Hiển thị cái đã chọn" , y);
        if(chessboard.value[x][y].value == ''){
            chess.value.count = chess.value.count + 1
            updateFirebase('/caro/'+ codeChess.value,{count:chess.value.count});
            
            clearInterval(timePlayer.value);
            timePlay('x')
            selectlocation.value = {...selectlocation.value, i:x, j:y}
            tickX.value = !tickX.value
            const ojb = ref({value:''})
            if(chess.value.count%2!=0){
                ojb.value.value = chess.value.winner == 'x'?'o':'x';
                updateFirebase('/caro/'+ codeChess.value +'/board/'+ x +'/'+ y, ojb.value)
                await getChess(codeChess.value)
                if(checkWin(chess.value.winner == 'x'?'o':'x')){
                    setWin(chess.value.winner == 'x'?'o':'x')
                }
            }else{
                ojb.value.value = chess.value.winner == 'x'?'x':'o';
                updateFirebase('/caro/'+ codeChess.value +'/board/'+ x +'/'+ y, ojb.value)
                await getChess(codeChess.value)                
                if(checkWin(chess.value.winner == 'x'?'x':'o')){
                    setWin(chess.value.winner == 'x'?'x':'o')
                }
            }
        }        
    }

    const setWin = async (value: any) => {
        // chess.value.winner = value
        await updateFirebase('/caro/'+ codeChess.value,{ winner: value });
        isOpen.value = true
        clearInterval(timePlayer.value)
        await getChess(codeChess.value)
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

    const resetChessboard = async (chest?: any ) => {
        // createBoard(codeChess.value)
        toggleLoadingModal(true)
        await updateAllBoard(codeChess.value,'')
        // chess.value.count = 0
        updateFirebase('/caro/'+ codeChess.value,{ count: 0 });
        clearInterval(timePlayer.value)
        timeX.value = 60
        timeO.value = 60
        selectlocation.value = {...selectlocation.value, i:-1, j:-1}
        if(chest && chest == 'getChess'){
            getChess(codeChess.value)
        }
        toggleLoadingModal(false)
        // console.log("Đã chạy thằng reset -------------------------------->");
        
    }

    const countWinPlayer = () => {
        if(chess.value.winner == 'x'){
            updateFirebase('/caro/'+ codeChess.value,{playerX:chess.value.playerX + 1});
        }else if(chess.value.winner == 'o'){
            // chess.value.playerO = chess.value.playerO + 1
            updateFirebase('/caro/'+ codeChess.value,{playerO:chess.value.playerO + 1});
        }else{
            console.log('Người thắng hiện tại đang trống?, kiểm tra lại đi bro!');
            toast.add({ title: 'Người thắng hiện tại đang trống?, kiểm tra lại đi bro!', timeout: 1000, color: 'red' })
        }
        // chess.value.countGame = chess.value.countGame + 1
        updateFirebase('/caro/'+ codeChess.value,{countGame: chess.value.countGame + 1});
    }

    const resetGame = async () => {
        await resetChessboard()
        await countWinPlayer()
        await getChess(codeChess.value)
        tickX.value = chess.value.winner =='x'?false:true
    }

    const checkWin = ( value: any ) => {
        try {
            for (let i = 0; i < chessboard.value.length; i++) {            
                for (let j = 0; j < chessboard.value[i].length; j++) {
                    // let checkRow = chessboard.value[i][j] == value && chessboard.value[i][j] == value
                    // console.log(chessboard.value[i][j].value,"Hiển thị check" + i + "và" +j);
                    if(chessboard.value[i][j].value == value && chessboard.value[i+1][j].value == value && chessboard.value[i+2][j].value == value && chessboard.value[i+3][j].value == value && chessboard.value[i+4][j].value == value){
                        return true
                    }else if(chessboard.value[i][j].value == value && chessboard.value[i][j+1].value == value && chessboard.value[i][j+2].value == value && chessboard.value[i][j+3].value == value && chessboard.value[i][j+4].value == value){
                        return true
                    }else if(chessboard.value[i][j].value == value && chessboard.value[i+1][j+1].value == value && chessboard.value[i+2][j+2].value == value && chessboard.value[i+3][j+3].value == value && chessboard.value[i+4][j+4].value == value){
                        return true
                    }
                    else if(chessboard.value[i][j].value == value && chessboard.value[i+1][j-1].value == value && chessboard.value[i+2][j-2].value == value && chessboard.value[i+3][j-3].value == value && chessboard.value[i+4][j-4].value == value){                
                        return true
                    }
                }
            }
        } catch (error) {
            // console.log('');            
        }
        
    }

    const createBoard = async (id: any) => {
        toggleLoadingModal(true)
        for (let i = 0; i < table.value.row; i++) {
            // chessboard.value[i] = [];
            await setFirebase('/caro/'+ id + '/board' + i, {})
            for (let j = 0; j < table.value.col; j++) {
                // chessboard.value[i][j] = '';
                await setFirebase('/caro/'+ id + '/board/' + i +'/' + j, { value: ''})
            }
        }        
        toggleLoadingModal(false)
        // console.log('bàn cờ : ', chessboard.value);
    }

    const updateAllBoard = async (id: any, value: any) => {
        for (let i = 0; i < chess.value.row; i++) {
            // chessboard.value[i] = [];
            await updateFirebase('/caro/'+ id + '/board' + i, {})
            for (let j = 0; j < chess.value.col; j++) {
                // chessboard.value[i][j] = '';
                await updateFirebase('/caro/'+ id + '/board/' + i +'/' + j, { value: value})
            }
        } 
    }

    const getChess = async (code: any) => {
        try {
            const data = await getFirebase('/caro/'+ code);
            // chess.value = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
            if(data){
                chess.value = data
                chessboard.value = chess.value.board
                codeChess.value = code
            }else{
                toast.add({ title: 'Bàn hiện không tồn tại!', timeout:1000, color:'red' })
            }
            
            console.log(data,"Hiển thị giá trị của bàn cờ!");
            
            // for (let index = 0; index < chessboard.value.length; index++) {
            //     chessboard.value[index] = Object.keys(chessboard.value[index]).map(key => ({ ...chessboard.value[index][key] })) ;
            // }
            // console.log('bàn cờ : ', chessboard.value);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }

    const createChess = async () => {
        const randomCode = ref()
        const date = ref(new Date())
        // String(date.value.getDate()) + String(date.value.getMonth()) + String(date.value.getFullYear())
        randomCode.value = String(date.value.getTime()) + random(1,100)
        // console.log("Hiển thị giá trị date:", formattedDate.value);
        toggleLoadingModal(true)
        await setFirebase('/caro/'+ randomCode.value, 
        {
            name: nameCreate.value? nameCreate.value: 'Bàn' + random(1, 1000),
            playerX: 0,
            playerO: 0,
            col: table.value.col,
            row: table.value.row,
            countGame: 0,
            count: 0,
            winner:'',
        })
        await createBoard(randomCode.value)
        await getChess(randomCode.value)
        toggleLoadingModal(false)
    }

    const searchChess = () => {
        if(codeInput.value){
            toggleLoadingModal(true)
                getChess(codeInput.value)
                modelCode.value = false
            toggleLoadingModal(false)
        }else{
            toast.add({ title: 'Vui lòng nhập dữ liệu đi pro', timeout:1000, color:'red' })
        }
    }
    
</script>

<style scoped>
</style>