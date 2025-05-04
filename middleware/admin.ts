import type { User } from "~/models/user";

const { isLoggedIn, userLogin } = storeToRefs(useAuthStore());
export default defineNuxtRouteMiddleware((to, from) => {  
  // console.log(to,"Hiển thị to admin");
  // console.log(from,"Hiển thị from admin");
  // console.log('Hiển thị role Number admin',Number(userLogin.value.role.id));
  // const userCookie = useCookie<User>('authCookie')
  if(!userLogin.value.id && useCookie<User>('authCookie').value){
    userLogin.value =  useCookie<User>('authCookie').value
  }
    
  if (!isLoggedIn.value) {
    useToast().add({title: 'Vui lòng đăng nhập', description: 'Bạn cần đăng nhập để truy cập chức năng này!', color:'red', timeout:1500});
    sessionStorage.setItem('nextPath', to.path);
    return navigateTo('/dang-nhap');
  }else if(Number(userLogin.value?userLogin.value.role.id:2) > 1){
    useToast().add({title: 'Thông báo!', description: 'Bạn chưa đủ quyền để truy cập chức năng này!', color:'red', timeout:1500});
    if(from.path){
      return navigateTo(from.path);
    }
    return navigateTo('/');
  }
});