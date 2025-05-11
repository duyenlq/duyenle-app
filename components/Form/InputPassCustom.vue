<template>    
    <div class="flex flex-col">
        <label class="flex flex-col justify-center"> 
            <div class="labelInput">{{ props.label }}</div>
            <div class="flex"> 
                <input :type="showPassword?'text':'password'" :placeholder="props.placeholder" class="inputClass" :value="props.modelValue" @input="funcInput($event?.target)">
                <div class=" right-1 w-fit p-0.5 flex justify-end items-center gap-0.5 md:gap-1 text-slate-500 cursor-pointer mt-1 md:mt-2" @click="showPassword = !showPassword">
                    <!-- <p class="text">{{ showPassword?'Hiện':'Ẩn' }}</p> -->
                    <UIcon v-if="showPassword" class="text-2xl" name="i-iconoir-eye" dynamic />
                    <UIcon v-else class="text-2xl" name="i-iconoir-eye-closed" dynamic />
                </div>
            </div>      
        </label> 
        <div class="mt-1 flex justify-end duration-150">
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
        modelError: {
            type: String,
            default: '',
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
        confirmPassword: {
            type: Boolean,
            default: false,
        },
        confirmValue: {
            type: String,
            default: '',
        },
    })

    const showPassword = ref(false);

    const emitValue = defineEmits(['update:modelValue', 'update:error']);
    // const errorValue = ref('');
    const funcInput = (value: any) => {
        // console.log("Đang nhập dữu liệu!", value?.value);
        emitValue('update:modelValue', (value?.value).trim());
        emitValue('update:error', true);
        check(value?.value);
        
    }

    const check = ( value: any )=>{        
        if(props.confirmPassword){
            // console.log(props.confirmValue,'hiển thị pass trên');
            emitValue('update:error', passConfirm(value,props.confirmValue));
        }else{
            emitValue('update:error', checkNull6(value));  
        }
    }

    // watch(() => props.confirmValue (value) => {
    //     check(props.modelValue);
    // });

    if(props.confirmPassword){
        watch(() => props.confirmValue, (value) => {
            if(props.confirmValue != ''){
                // console.log('đã chay code kiểm tra pass');                
                check(props.modelValue);
            }
        });
    }
    

    watch(() => props.checkValue, (value) => {
        if(props.error == '' || props.error == null){
            check(props.modelValue);
        }
    });
</script>

<style scoped>
    .labelInput{
        @apply text-[14px] md:text-[16px] text-slate-400 font-semibold
    }

    .inputClass{
        @apply w-full outline-none border-b-2 border-slate-500/50 text-slate-500 text-[16px] px-0.5 bg-transparent
    }
</style>