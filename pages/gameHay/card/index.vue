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
                    <div class="flex gap-5 md:gap-9 flex-col md:flex-row flex-wrap">
                        <!-- <GameCardBox :img="'/img/card/test/Ren_3.jpg'" :type="'3'" :name="'a'"/>
                        <GameCardBox :img="'/img/card/test/Tya_2.jpg'" :type="'2'" :name="'a'"/> -->
                        
                        <GameCardBox class="card" :img="'/img/card/test/GiaLam_1.jpg'" :type="'1'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Ren_2.jpg'" :type="'2'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/GiaLam_3.jpg'" :type="'3'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Tya_4.jpg'" :type="'4'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Ren_4.jpg'" :type="'5'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Tya_1.jpg'" :type="'0'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Tya_3.jpg'" :type="'3'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Ren_1.jpg'" :type="'0'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/Ren_3.jpg'" :type="'4'" :name="'a'"/>
                        <GameCardBox class="card" :img="'/img/card/test/GiaLam_4.jpg'" :type="'5'" :name="'a'"/>
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
        const rand = random(0,total)
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

    .card {
        opacity: 0;
        /* Bắt đầu ẩn */
        transform: translateY(20px);
        /* Để tạo hiệu ứng nâng lên */
        animation: appear 0.6s ease-out forwards;
        /* Animation cho hiệu ứng xuất hiện */
    }

    /* Cách áp dụng delay lần lượt cho mỗi thẻ */
    .card:nth-child(1) {
        animation-delay: 0s;
    }

    .card:nth-child(2) {
        animation-delay: 0.5s;
    }

    .card:nth-child(3) {
        animation-delay: 1s;
    }

    .card:nth-child(4) {
        animation-delay: 1.5s;
    }
    .card:nth-child(5) {
        animation-delay: 2s;
    }
    .card:nth-child(6) {
        animation-delay: 2.5s;
    }
    .card:nth-child(7) {
        animation-delay: 3s;
    }
    .card:nth-child(8) {
        animation-delay: 3.5s;
    }
    .card:nth-child(9) {
        animation-delay: 4s;
    }
    .card:nth-child(10) {
        animation-delay: 4.5s;
    }

    /* Keyframe để tạo hiệu ứng xuất hiện */
    @keyframes appear {
        0% {
            opacity: 0;
            transform: translateY(20px);
        }

        100% {
            opacity: 1;
            transform: translateY(0);
        }
    }

</style>