<template>
    <div class="py-1.5 md:py-2">
        <!-- Breadcrumb -->
        <div class="flex items-center text-14px line-clamp-1">
            <div v-for="item, index in first" :key="index" class="min-w-fit text-grey flex justify-centeritems-center">
                <nuxt-link class="text min-w-fit hover:text-main" :to="item.link">{{ item.title }}</nuxt-link>
                <p class="font-semibold text mx-1 md:mx-1.5">/</p>
                <!-- <UIcon class="text-[14px] sm:text-[16px] md:text-[18px] text-slate-600 rotate-90" name="i-iconamoon-arrow-up-2-light" dynamic /> -->
            </div>
            <p class="text text-main flex normal-case truncate">{{ last }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
const { first, last } = defineProps<
    {
        first: Array<{
            link: any|string,
            title: any|string
        }>,
        last: any|string
    }>();
</script>

<style scoped>

</style>