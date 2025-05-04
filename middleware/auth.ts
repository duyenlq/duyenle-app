const { isLoggedIn } = storeToRefs(useAuthStore());
export default defineNuxtRouteMiddleware((to, from) => {
  // console.log(from,"Hiển thị từ from");
  // console.log(to,"Hiển thị đến to");
  // console.log("Hiển thị giá trị isLoggedIn",isLoggedIn.value);    
  if (!isLoggedIn.value) {
    useToast().add({title: 'Vui lòng đăng nhập', description: 'Bạn cần đăng nhập để truy cập chức năng này!', color:'red', timeout:1800});
    sessionStorage.setItem('nextPath', to.path);
    return navigateTo('/dang-nhap');
  }
});
