<template>
    <div class="flex min-h-screen h-screen bg-gray-100 relative overflow-hidden">
        <!-- Đăng ký -->
        <div class="absolute md:!right-[50%] duration-500 top-0 right-[0%] w-full h-full md:w-1/2 flex flex-col flex-wrap items-center justify-evenly p-4 md:p-8" :class="{'!right-[100%]':loginTab}" >
            <p class="text-2xl md:text-4xl text-main font-semibold">Đăng Ký</p>
            <div class="w-[80%] md:w-2/3 flex flex-col gap-4 md:gap-6">                
                <form action="" class="w-full flex flex-col gap-4 md:gap-6">                    
                    <FormInputCustom :label="'Tên đăng ký'" type="text" :checkValue="checkFormRegister" v-model:modelValue="formRegister.id" v-model:error="formRegisterError.id"/>
                    <FormInputPassCustom :label="'Mật khẩu'" :checkValue="checkFormRegister" v-model:modelValue="formRegister.password" v-model:error="formRegisterError.password" />
                    <FormInputPassCustom :label="'Nhập lại mật khẩu'" :confirmPassword="true" :confirmValue="formRegister.password" :checkValue="checkFormRegister" v-model:modelValue="formRegister.passwordConfirm" v-model:error="formRegisterError.passwordConfirm" />
                </form>
            </div>
            <div class="w-[80%] md:w-2/3"> 
                <button :disabled="false" class="btn_custom" @click="handleRegister()">Đăng ký</button>
            </div>
            <div class="w-2/3 flex items-center gap-1 md:gap-2">
                <div class="h-[1.5px] rounded-full w-full bg-slate-400/80"></div>
                <div class="text text-slate-500">hoặc</div>
                <div class="h-[1.5px] rounded-full w-full bg-slate-400/80"></div>
            </div>
            <!-- Đăng ký -->
            <div class="w-2/3 text text-slate-800 flex flex-col gap-1 justify-center items-center"> 
                <p class="text-center">Nếu bạn đã có tài khoản, vui lòng vào<b class="font-normal text-main underline cursor-pointer" @click="loginTab=true"> Đăng nhập ! </b></p>
                <nuxt-link to="/" class="text-[12px] md:text-[14px] cursor-pointer hover:text-main underline underline-offset-2 px-2">Quay về trang chủ</nuxt-link>
            </div>
        </div>
        <!-- Đăng nhập -->
        <div class="absolute duration-500 top-0 right-[-100%] md:right-[0%] w-full h-full md:w-1/2 flex flex-col flex-wrap items-center justify-evenly p-4 md:p-8" :class="{'!right-0':loginTab}" >
            <p class="text-2xl md:text-4xl text-main font-semibold">Đăng nhập</p>
            <div class="w-[80%] md:w-2/3 flex flex-col gap-4 md:gap-6">                
                <form action="" class="w-full flex flex-col gap-4 md:gap-6">                    
                    <FormInputCustom :label="'Tên đăng nhập'" type="text" :checkValue="checkFormLogin" v-model:modelValue="formLogin.username" v-model:error="formLoginError.username"/>
                    <FormInputPassCustom :label="'Mật khẩu'" :checkValue="checkFormLogin" v-model:modelValue="formLogin.password" v-model:error="formLoginError.password" />
                </form>
            </div>
            <div class="w-[80%] md:w-2/3"> 
                <button :disabled="false" class="btn_custom" @click="handleLogin()">Đăng nhập</button>
            </div>
            <div class="w-2/3 flex items-center gap-1 md:gap-2">
                <div class="h-[1.5px] rounded-full w-full bg-slate-400/80"></div>
                <div class="text text-slate-500">hoặc</div>
                <div class="h-[1.5px] rounded-full w-full bg-slate-400/80"></div>
            </div>
            <!-- Đăng ký -->
            <div class="w-2/3 text text-slate-800 flex flex-col gap-1 justify-center items-center"> 
                <p class="text-center">Nếu bạn chưa có tài khoản, vui lòng <b class="font-normal text-main underline cursor-pointer" @click="loginTab=false"> Đăng ký </b> để đăng nhập! </p>
                <div @click=" useRouter().back" class="text-[12px] md:text-[14px] mt-1 cursor-pointer hover:text-main underline underline-offset-2 px-2">Lùi lại trang trước.</div>
            </div>
            
        </div>

        <div class="hidden md:flex absolute bg-main h-full w-1/2 top-0 right-[0%] duration-500 overflow-hidden" :class="{'!right-[50%]':loginTab}" > 
            
            <!-- <div class="relative h-full w-full flex flex-col justify-around"> 
                <p class="absolute left-[20%]  text-5xl font-bold text-white w-fit bg-red-600 duration-500" :class="{'!left-[40%]':loginTab}">Duyên Lê</p>
            </div><img class="object-fill w-32 h-32" src="/img/background/login.jpg" alt=""> -->
        </div>

    </div>
</template>

<script setup lang="ts">
    import type { User } from "@/models/user"
    const { toggleLoadingModal } = useModalStore()
    const { setUserLogin, addUsers, getUsersById  } = useAuthStore()
    // const { userLogin } = storeToRefs(useAuthStore())

    const authCookie = useCookie('authCookie',{maxAge: 60 * 60 * 4, path: '/'})
    const nextPath = sessionStorage.getItem('nextPath');
    if(nextPath)sessionStorage.removeItem('nextPath');
    // console.log("Hiển thị đường dẫn khi đăng nhập thành công",nextPath);
    

    definePageMeta({
        layout: "login"
    })

    const loginTab = ref(true);

    // form login detail
    const formLogin = ref({
        username: '',
        password: '',
    });

    const checkFormLogin = ref(false);

    const formLoginError = ref({
        username: null as any,
        password: null as any,
    });

    // form register detail
    const formRegister = ref({
        id: '',
        password: '',
        passwordConfirm: '',
    });

    const checkFormRegister = ref(false);

    const formRegisterError = ref({
        id: null as any,
        password: null as any,
        passwordConfirm: null as any,
    });


const loginWebsie = (value : any) => {
    // localStorage.setItem('userlogin', JSON.stringify(value)); //set vao localstorage
    // user.value = JSON.parse(data); //get ra
    authCookie.value = value;
    setUserLogin(value);
    navigateTo(nextPath?nextPath:'/');
}; 

const handleLogin = async () => {
        
    checkFormLogin.value = !checkFormLogin.value;
    if(!isObjectEmpty(formLoginError.value)){
        useToast().add({ title: 'Thông báo!' , description: 'Vui lòng kiểm tra lại thông tin đăng nhập' ,color: 'red' });
        return ;
    }

    const formData = {
        ...formLogin.value
    }

    toggleLoadingModal(true)
    
    const { data } = await useAsyncData<User>('getUserById', ()=> getUsersById(formData.username))

    if(data.value && data.value.active){
        if(data.value.password == formData.password ){
            useToast().add({ title: 'Thông báo!' , description: 'Đăng nhập thành công!', color: 'green', timeout:1000 })
            loginWebsie(data.value);
        }else{
            formLoginError.value.password = "Sai mật khẩu."
            useToast().add({ title: 'Đăng nhập thất bại!' , description: 'Vui lòng kiểm tra lại mật khẩu!', color: 'red' });
        }
    }else{
        formLoginError.value.username = "Tên đăng nhập không tồn tại."
        useToast().add({ title: 'Đăng nhập thất bại!' , description: 'Vui lòng kiểm tra lại tên đăng nhập!', color: 'red' });
    }    
    
    toggleLoadingModal(false)
};

const handleRegister = async () => {    
    checkFormRegister.value = !checkFormRegister.value;
    if(!isObjectEmpty(formRegisterError.value as any)){
        useToast().add({ title: 'Thông báo!' , description: 'Vui lòng kiểm tra lại thông tin đăng ký' ,color: 'red' });
        return ;
    }

    const formData: User = {            
        id: formRegister.value.id,
        username: formRegister.value.id,
        password: formRegister.value.password,
        image:'',
        role: {
            id: '2',
            title: 'user'
        },
        active : false,
        money: {
            cash: 100000,
            silver: 0,
            gold: 0,
            diamond: 0,
        },
    }

    toggleLoadingModal(true)
    const { data } = await useAsyncData<User>('getUserById', ()=> getUsersById(formData.id))
    if(data.value){
        formRegisterError.value.id = "Tên đăng nhập đã tồn tại."
        useToast().add({ title: 'Đăng ký thất bại!' , description: 'Vui lòng đổi lại tên đăng ký!', color: 'red' });
    }else{
        useToast().add({ title: 'Thông báo!' , description: 'Đăng ký thành công!', color: 'green' });
        await useAsyncData('addUser', ()=> addUsers(formData))
        formRegister.value = resetForm(formRegister.value)
    }
    toggleLoadingModal(false)
    
};
</script>

<style scoped>
    .btn_custom{
        @apply w-full font-semibold text-[14px] md:text-[18px] border-2 rounded-xl bg-main p-2 text-white duration-300  hover:shadow-md shadow-black disabled:bg-slate-400/50 disabled:text-slate-100/50
    }
</style>