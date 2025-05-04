<template>
    <div>
        <slot />
        <!-- <Footer /> -->        
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