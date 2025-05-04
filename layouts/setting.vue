<template>
    <div class="flex flex-wrap">
        <NavSetting />
        <div class="w-full md:w-[80%] p-4">
            <slot />
        </div>  
    </div>
    <Loading v-if="loadingModal" />
    <UNotifications class=""/>
</template>

<script setup lang="ts">
    const colorMode = useColorMode()
    const { loadingModal } = storeToRefs(useModalStore());
    
    // colorMode.preference = 'light'
</script>

<style scoped>
</style>