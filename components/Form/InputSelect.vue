<template>
    <div class="flex flex-col">
        <label class="w-full felx-col gap-2 md:gap-6">
            <div class="text-[14px] md:text-[16px] text-slate-400 font-semibold">{{ props.label }}</div>
            <!-- <input type="checkbox" v-model="menuForm.active" :value="menuForm.active" class="w-fit accent-main text-white"> -->
            <select v-model="props.modelValue" @input="funcInput($event?.target)" class="w-full mt-1 md:mt-2 outline-none border-b-2 border-slate-500/50 text text-slate-500 bg-transparent py-1.5">
                <!-- <option class="text-main" :value="true">Kích hoạt</option>
                <option :value="false">Tạm dừng</option> -->

                <option v-for="items,index in props.listSelect" :key="index" class="text-slate-700" :value="items.value">{{ items.title }}</option>

            </select>
        </label>
        <div class="mt-1 flex justify-end">
            <span class="text-[10px] md:text-[14px] font-thin italic text-red-400">{{ error }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
    const props = defineProps({
    modelValue: {
        type: String as any || Boolean as any,
        required: true,
    },
    listSelect: {
        type: [] as any,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    placeholder: {
        type: String,
        default: '',
    },
    typeOutputBoolean: {
        type: Boolean,
        default: false,
        required: false,
    },
    checkValue: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: '',
    },
})

const emitValue = defineEmits(['update:modelValue', 'update:error']);
const funcInput = (value: any) => {
    // console.log("Đang nhập dữu liệu!", value.value === 'true');
    if(props.typeOutputBoolean){
        emitValue('update:modelValue', value.value === 'true');
    }else{
        emitValue('update:modelValue', value.value);
    }
    
    check(value?.value +'');
}

const check = ( value: any )=>{
    // errorValue.value = checkNull6(value); 
    emitValue('update:error', checkNull(value));
}

watch(() => props.checkValue, (value) => {
    if(props.error == '' || props.error == null){
        check(props.modelValue);
        // console.log("Đã chạy được nha oke bạn ơi", props.modelValue);        
    }
});

</script>

<style scoped>
</style>