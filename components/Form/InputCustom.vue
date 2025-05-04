<template>
    <div class="flex flex-col">
        <label class="flex flex-col">
            <div for="" class="labelInput">{{ props.label }}</div>
            <input :type="props.type" :placeholder="props.placeholder" :readonly="props.readonly" class="inputClass" :class="{'!bg-slate-300/30':props.readonly}" :value="props.modelValue" @input="funcInput($event?.target)">
        </label>
        <div class="mt-1 flex justify-end">
            <span class="text-[10px] md:text-[14px] font-thin italic text-red-400">{{ error }}</span>
        </div>
    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
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
    type: {
        type: String,
        default: 'text',
    },
    checkValue: {
        type: Boolean,
        default: false,
    },
    error: {
        type: String,
        default: '',
    },
    readonly: {
        type: Boolean,
        default: false,
        required: false,
    },
})

const emitValue = defineEmits(['update:modelValue', 'update:error']);
// const errorValue = ref('');
const funcInput = (value: any) => {
    // console.log("Đang nhập dữu liệu!", value?.value);
    emitValue('update:modelValue', value?.value);
    emitValue('update:error', true);
    check(value?.value);
    
}

const check = ( value: any )=>{
    // errorValue.value = checkNull6(value);
    emitValue('update:error', checkNull6(value));
}

watch(() => props.checkValue, (value) => {
    if(props.error == '' || props.error == null){
        check(props.modelValue);
    }
    
});

</script>

<style scoped>
.labelInput {
    @apply text-[14px] md:text-[16px] text-slate-400 font-semibold
}

.inputClass {
    @apply w-full outline-none border-b-2 border-slate-500/50 text-slate-500 text-[16px] px-0.5 bg-transparent
}
</style>