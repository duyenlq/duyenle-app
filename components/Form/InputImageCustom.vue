<template>
    <div class="flex flex-col">
        <!-- <label class="flex flex-col">
            <div for="" class="labelInput">{{ props.label }}</div>
            <input type="file" :placeholder="props.placeholder" class="inputClass" @change="funcInput($event?.target)" accept="image/png, image/jpeg, image/webp">
        </label>
        <div class="mt-1 flex justify-end">
            <span class="text-[10px] md:text-[14px] font-thin italic text-red-400">{{ error }}</span>
        </div> -->
        <label class="bg-slate-300/20 border-[2px] border-main border-dashed rounded-[4px] relative flex items-center justify-center" :class="classModel">
            <!-- <div class="absolute text-main bg-white w-fit px-[6px] p-1 rounded-[5px] cursor-pointer duration-300 hover:text-white hover:bg-main/90 -z-10">Chọn ảnh</div> -->
            <div v-show="pendingImage" class="absolute inset-0 z-10 flex justify-center items-center">
                <UIcon class="text-[40px] text-slate-200 animate-spin" name="mingcute:loading-fill" dynamic/>
            </div>
            <NuxtImg v-show="!pendingImage" class="w-full max-h-[100%] object-cover" :src="urlImageLoad?urlImageLoad:'/img/no_image.png'" loading="lazy" />
            <input id="inputImage" type="file" class="inputClass hidden" @change="funcInput($event?.target)" accept="image/png, image/jpeg, image/webp">
        </label>
    </div>

</template>

<script lang="ts" setup>
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    classModel: {
        type: String,
        default: 'h-[180px] w-[120px]',
        required: false,
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
})

const urlImageLoad = ref('')
const pendingImage = ref(false)

const pending = (value: boolean) => {
    pendingImage.value = value
}

const emitValue = defineEmits(['update:modelValue', 'update:error']);
// const errorValue = ref('');
const funcInput = async (value: any) => {
    console.log("Đang nhập dữu liệu!", value.files[0]);
    pending(true)
    emitValue('update:modelValue', value.files[0]);
    urlImageLoad.value = (await saveImageCustomFirebase(value.files[0], randomName(value.files[0].name), 'loadingImage')).url    
    // urlImageLoad.value = imageSave.url
    console.log(urlImageLoad.value,'-----------------------');
    
    emitValue('update:error', true);
    check(value?.value);  
    pending(false)  
}

const deleteImage = () => {

}

const check = ( value: any )=>{
    // errorValue.value = checkNull6(value);
    emitValue('update:error', checkNull(value));
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