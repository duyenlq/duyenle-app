<template>
    <div class="cards-container">
        <div class="card">Thẻ 1</div>
        <div class="card">Thẻ 2</div>
        <div class="card">Thẻ 3</div>
        <div class="card">Thẻ 4</div>
    </div>
</template>

<script setup>
</script>

<style scoped>
.cards-container {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

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
    animation-delay: 0.3s;
}

.card:nth-child(3) {
    animation-delay: 0.6s;
}

.card:nth-child(4) {
    animation-delay: 0.9s;
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