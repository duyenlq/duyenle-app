<template>
    <div class="">
        <Breadcrumb :first="[{ title: 'Trang chủ', link: '/' }]" :last="'cài đặt thông tin cá nhân'" />
    </div>
    <div class="flex flex-nowrap min-h-[500px] bg-main/20">
        <div class="flex w-1/2 bg-main/50 h-fit"> 
            <div class="textTitle text-main dark:text-white">Thông tin cá Nhân</div>
        </div>
        <div class="flex w-1/2 bg-main/20 h-fit">
            <div class="text font-semibold text-main dark:text-white"> 
                Nơi ảnh :
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    middleware: 'auth',
    layout: "setting",
})


const modelValue = ref('123');
const modelError = ref('bạn hiện đang lỗi');
// const { toggleLoadingModal } = useModalStore()

// const show = () => {
//     const date = new Date()
//     console.log(date.getMonth());
//     console.log(getDatetoString(date));
// }

// const user = ref({
//     id: '',
//     name: '',
//     value: '',
// })
// const userList = ref(<any>[])
// const editValue = ref(false)
// const pathData = ref('/users')

// const getData = async () => {
//     try {
//         const data = await getFirebase('/users');
//         userList.value = data ? Object.keys(data).map(key => ({ id: key, ...data[key] })) : [];
//     } catch (error) {
//         console.error('Error loading users:', error);
//     }
// }

// onMounted(async () => {
//     getData()
// });

// const setData = () => {
//     // console.log(user.value,"Hiển thị giá trị đc nhập vào");
//     toggleLoadingModal(true)
//     if (editValue.value) {
//         updateFirebase('/users/' + user.value.id, { username: user.value.name, value: user.value.value })
//     } else {
//         setFirebase('/users/' + user.value.id, { username: user.value.name, value: user.value.value })
//     }
//     getData()
//     toggleLoadingModal(false)
//     user.value = resetForm(user.value)
// }

// const deleteData = (value: any) => {
//     toggleLoadingModal(true)
//     removeFirebase('/users/' + value)
//     getData()
//     toggleLoadingModal(false)
// }

// const editData = (id: any, name: any, value: any) => {
//     editValue.value = !editValue.value
//     user.value.id = id,
//         user.value.name = name
//     user.value.value = value
// }

</script>

<style scoped></style>