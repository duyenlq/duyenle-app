<template>
    <div class="p-4 flex flex-col gap-3">
        Xin chào
        <UIcon class="text-[40px] text-purple-400" name="mdi:star-circle-outline" dynamic/>
        <FormInputCustom :label="'ID'" type="text" :checkValue="checkFormUser" v-model:modelValue="formUser.id" v-model:error="formUserError.id"/>
        <FormInputImageCustom :label="'Hình ảnh'" type="file" :checkValue="checkFormUser" v-model:modelValue="formUser.image" v-model:error="formUserError.image" />

        <button @click="submitForm()" class=" bg-main rounded-xl p-2 px-4 w-1/6"> 
            gửi from
        </button>
    </div>
</template>

<script lang="ts" setup>
    import type { User, Role } from "@/models/user"
    const checkFormUser = ref(false);

    const formUser = ref({
        id: '',
        image: '',
    });

    const formUserError = ref({
        id: null as any,
        image: null as any,
    });


    const submitForm = () => {
        console.log(formUser.value, "Hiển thị DS form");

        checkFormUser.value = !checkFormUser.value;
        console.log("Hiển thị giá trị error", formUserError.value);
        if(!isObjectEmpty(Object(formUserError.value))){
            useToast().add({ title: 'Thông báo!', description: 'Vui lòng kiểm tra lại thông tin người dùng' ,color: 'red', timeout: 1500 });
            return ;
        }

        console.log(formUser.value, "From đã gửi!");
        
    }


</script>

<style scoped>
</style>