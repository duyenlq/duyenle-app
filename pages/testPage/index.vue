<template>
    <div class="w-[200px] h-[300px] perspective cursor-pointer" @click="flipped = !flipped">
        <div class="relative w-full h-full transition-transform duration-700" :class="{ 'rotate-y-180': flipped }">
            <!-- Mặt trước -->
            <div class="absolute w-full h-full rounded-lg overflow-hidden">
                <img src="/img/card/test/GiaLam_1.jpg" class="w-full h-full object-cover" />
            </div>

            <!-- Mặt sau -->
            <div class="absolute w-full h-full rounded-lg overflow-hidden flex items-center justify-center bg-gradient-to-tr from-purple-600 via-pink-500 to-red-500 text-white text-xl font-bold rotate-y-180 z-10 duration-700" :class="{ 'opacity-0': flipped }">
                Bạn trúng SSR 🎉
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const flipped = ref(false)
</script>

<style scoped>
.perspective {
    perspective: 1000px;
}

.rotate-y-180 {
    transform: rotateY(180deg);
}
</style>