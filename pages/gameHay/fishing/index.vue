<template>
    <div class="container"> 
        <Breadcrumb :first="[{title: 'Trang chủ',link:'/'},{title: 'Game hay',link:'/game-hay'}]" :last="'game câu cá'" />
    </div>
    <div class="container p-2 sm:p-4">
        <h1 class="text-lg sm:text-xl font-bold mb-3 text-center">🎣 Demo Game Câu cá</h1>

        <!-- Chọn độ khó -->
        <div class="flex flex-wrap justify-center gap-2 mb-4">
            <button v-for="diff in difficulties" :key="diff.name"
                class="px-3 sm:px-4 py-2 rounded bg-blue-500 text-white text-sm sm:text-base" @click="startGame(diff)">
                {{ diff.name }}
            </button>
        </div>

        <!-- Nhập kích thước phao -->
        <div class="flex items-center justify-center gap-2 mb-4 text-sm sm:text-base">
            <label class="font-semibold">Chiều cao phao:</label>
            <input type="number" v-model.number="playerHeight" min="30" max="150"
                class="border px-2 py-1 w-16 sm:w-20 text-center" />
            <span>px</span>
        </div>

        <!-- Khu vực chơi game -->
        <div v-if="gameStarted" class="flex flex-col sm:flex-row items-center justify-center gap-6">

            <!-- Nút điều khiển -->
            <div class="flex sm:flex-col gap-3 sm:gap-4 w-full sm:w-auto justify-center">
                <button
                    class="flex-1 sm:flex-none bg-green-500 text-white py-4 sm:px-4 sm:py-2 rounded text-lg sm:text-base active:scale-95"
                    @touchstart.prevent="startMove" @touchend="stopMove" @mousedown="startMove" @mouseup="stopMove"
                    @mouseleave="stopMove">
                    ⬆️ Nhấn giữ
                </button>
                <button
                    class="flex-1 sm:flex-none bg-red-500 text-white py-4 sm:px-4 sm:py-2 rounded text-lg sm:text-base active:scale-95"
                    @click="resetGame">
                    🎣 Thả lại
                </button>
            </div>

            <div class="flex gap-1 sm:gap-4 order-first sm:order-lase">
                <!-- Thanh game -->
                <div class="relative border w-[15vw] sm:w-[50px] h-[40vh] sm:h-[300px] bg-gray-100">
                    <!-- Cá -->
                    <div class="absolute z-20 left-0 w-full bg-orange-500/10"
                        :style="{ bottom: fishY + 'px', height: fishHeight + 'px' }">
                        <NuxtImg class="h-full" src="/img/fishing/fishing_icon.png" loading="lazy" />
                    </div>

                    <!-- Phao -->
                    <div class="absolute left-0 w-full bg-main border border-white rounded-sm"
                        :style="{ bottom: playerY + 'px', height: playerHeight + 'px' }"></div>
                </div>

                <!-- Progress DẠNG ĐỨNG -->
                <div class="flex flex-col items-center justify-center">
                    <div class="w-6 sm:w-8 h-[25vh] sm:h-[200px] bg-gray-300 rounded overflow-hidden relative">
                        <div class="absolute bottom-0 w-full bg-green-500" :style="{ height: progress + '%' }"></div>
                    </div>
                    <p v-if="gameOver" class="mt-2 font-bold text-red-600 text-sm sm:text-base text-center">
                        {{ progress <= 0 ? "🐟 Hụt cá!" : "🎉 Bắt được cá!" }} </p>
                </div>
            </div>

            
        </div>
    </div>
</template>



<script setup lang="ts">
import { ref, onUnmounted } from 'vue'

const barHeight = 300
const fishHeight = 20
const startY = (barHeight - 50) / 2

// ---- Chế độ khó ----
// Mỗi chế độ: tốc độ cá (fishSpeed), phạm vi di chuyển cá (fishRange), và progress
const difficulties = [
    { name: "Dễ", progressGain: 2, progressLoss: 1, fishSpeed: 0.015, fishRange: 0.6 },
    { name: "Trung bình", progressGain: 2, progressLoss: 1.2, fishSpeed: 0.02, fishRange: 0.8 },
    { name: "Khó", progressGain: 2, progressLoss: 1.6, fishSpeed: 0.025, fishRange: 1.0 },
    { name: "Siêu khó", progressGain: 1.5, progressLoss: 2, fishSpeed: 0.035, fishRange: 1.2 }
]

let currentDiff: any = null

// ---- State game ----
const gameStarted = ref(false)
const playerY = ref(startY)
const fishY = ref(startY)
const progress = ref(50)
const gameOver = ref(false)

const playerHeight = ref(60)

let isHolding = false
let playerLoop: any = null
let fishAnim: number | null = null
let progressLoop: any = null

let fishTarget = startY

// ---- Điều khiển ----
function startMove() {
    if (!gameOver.value) isHolding = true
}
function stopMove() {
    isHolding = false
}

// ---- Game logic ----
function startGame(difficulty: any) {
    currentDiff = difficulty
    resetGame()
    gameStarted.value = true
}

function resetGame() {
    stopLoops()
    playerY.value = startY
    fishY.value = startY
    progress.value = 50
    gameOver.value = false
    fishTarget = Math.random() * (barHeight - fishHeight)
    startLoops()
}

function updatePlayer() {
    const speedUp = 2.5
    const speedDown = 2.2

    if (isHolding) {
        playerY.value = Math.min(barHeight - playerHeight.value, playerY.value + speedUp)
    } else {
        playerY.value = Math.max(0, playerY.value - speedDown)
    }
}

function updateFish() {
    if (!currentDiff) return
    if (Math.abs(fishY.value - fishTarget) < 2) {
        // Cá di chuyển xa hơn khi độ khó cao
        fishTarget = Math.random() * (barHeight - fishHeight) * currentDiff.fishRange
    }
    // Cá di chuyển mượt + nhanh hơn khi khó
    fishY.value += (fishTarget - fishY.value) * currentDiff.fishSpeed
}

function updateProgress() {
    if (gameOver.value) return

    const overlap = Math.min(playerY.value + playerHeight.value, fishY.value + fishHeight) - Math.max(playerY.value, fishY.value)

    if (overlap > 0) {
        progress.value = Math.min(100, progress.value + currentDiff.progressGain)
    } else {
        progress.value = Math.max(0, progress.value - currentDiff.progressLoss)
    }

    if (progress.value >= 100 || progress.value <= 0) {
        gameOver.value = true
        stopLoops()
    }
}

// ---- Loop ----
function startLoops() {
    playerLoop = setInterval(updatePlayer, 12)
    const animateFish = () => {
        updateFish()
        fishAnim = requestAnimationFrame(animateFish)
    }
    animateFish()
    progressLoop = setInterval(updateProgress, 80)
}
function stopLoops() {
    if (playerLoop) clearInterval(playerLoop)
    if (progressLoop) clearInterval(progressLoop)
    if (fishAnim) cancelAnimationFrame(fishAnim)
}

onUnmounted(() => stopLoops())
</script>
