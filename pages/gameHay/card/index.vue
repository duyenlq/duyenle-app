<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Game hay',link:'/game-hay'}]" :last="'game thẻ bài'" />
    </div>
    <div class="container mt-2 mb-4 md:mt-4 flex flex-col gap-2 md:gap-4">
        <div class="class">
            <div class="my-2 md:my-4">
                <b class="text-2xl md:text-3xl">Game Thẻ Bài Gacha</b>
            </div>
            <div class=""> 
                <div class="flex flex-col gap-11 md:gap-2.5">
                    <p>danh sách nhận thưởng :</p>
                    <div class="flex gap-4 overflow-x-auto">
                        <div v-for="item,index in 4" :key="index" class="bg-amber-300/100 border-2 border-amber-500 p-1 rounded-lg"> 
                            <div class="h-[200px] bg-slate-50 min-w-[135px] flex flex-col justify-stretch rounded-md overflow-hidden">
                                <div class="h-[12%] flex items-center text-amber-300 text-sm font-semibold p-2">
                                    Tên thẻ
                                </div>
                                <div class="h-[60%] bg-blue-500/30 flex items-center justify-center px-1">
                                    Ảnh thẻ
                                </div>
                                <div class="h-[28%] text-sm border-t-2 border-main p-1">
                                    Nội dung thẻ
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div class="flex gap-4 mt-2 md:mt-3">
                    <div>
                        <button @click="generateRandomByArray()"  class="bg-main p-2 text-white"> radom </button>
                    </div>
                    hiển thị kết quả radom:
                    <div>
                        {{ randomResult }}
                    </div>
                </div>                    
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

// khai báo biến
const randomCode = ref('')

// tạo hàm random
// const generateRandomCode = () => {
//   const length = 8
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
//   let result = ''
//   for (let i = 0; i < length; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length))
//   }
//   randomCode.value = result
// }

const randomResult = ref()

// Mảng nhiều giá trị hơn
const options = [
    { id: 1, random: 50 },
    { id: 2, random: 20 },
    { id: 3, random: 15 },
    { id: 4, random: 10 },
    { id: 5, random: 5 }
]

    const generateRandomByArray = () => {
        const total = options.reduce((sum, item) => sum + item.random, 0)
        const rand = Math.random() * total
        let cumulative = 0
        for (const item of options) {
            // xét giá trị id 1 nếu kết quả < radom1 thì trả ra giá trị
            // nếu không thì chuyển xét KQ < radom1 + radom2 nếu ok thì trả ra giá trị ngược lại thì tiếp tục quá trình trên.
            cumulative += item.random
            if (rand < cumulative) {
                randomResult.value = item.id
                break
            }
        }
    }
    
</script>

<style scoped>

</style>