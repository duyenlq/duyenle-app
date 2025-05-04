<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import type { User } from "@/models/user"
const { toggleLoadingModal } = useModalStore()
const { getMenu } = useSettingStore()
const { setUserLogin, getUsersById } = useAuthStore()
toggleLoadingModal(true)
const authCookie = useCookie<User>('authCookie');
if(authCookie.value){
  const { data } = await useAsyncData<User>('getUserById', ()=> getUsersById(authCookie.value.id)) 
  if(data.value?.id && data.value.active){
    await setUserLogin(data.value);
  }else{
    await setUserLogin({});
  }
}
await useAsyncData('getMenu', ()=> getMenu())
toggleLoadingModal(false)
</script>
