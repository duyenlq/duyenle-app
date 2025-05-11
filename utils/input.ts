export function numbersOnly(evt: any) {
  evt = (evt) ? evt : window.event;
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57 || charCode == 46 || charCode == 45))) {
    return evt.preventDefault();
  }
  return true;
}

export const delay = async (ms: number) => new Promise(res => setTimeout(res, ms));

export function textOnly(evt: any) {
  evt = (evt) ? evt : window.event;
  const charCode = (evt.which) ? evt.which : evt.keyCode;
  if ((charCode > 31 && (charCode < 48 || charCode > 57 || charCode == 46 || charCode == 45))) {
    return true;
  }else{
    return evt.preventDefault();    
  }  
}

export function checkNull(value:any) {
  if(!value){
    return 'Vui lòng không bỏ trống.'
  }
  return ''
}

export function checkNull6(value:any) {
  if(value.trim() == ''){
    return 'Vui lòng không bỏ trống.'
  }else if(value.length < 6){
    return 'Vui lòng nhập hơn 6 ký tự.'
  }
  return ''
}

export function passConfirm(value:any, value2:any) {
  if(value.trim() == ''){
    return 'Vui lòng không bỏ trống.'
  }else if(value.length < 6){
    return 'Vui lòng nhập hơn 6 ký tự.'
  }else if(value != value2){
    return 'Vui lòng Nhập lại mật khẩu đúng.'
  }  
  return ''
}

export function checkPhone(value:any) {
  if(value.trim() == ''){
    return 'Vui lòng không bỏ trống.'
  }else if(value.length < 10 || value.length > 10){
    return 'Vui lòng nhập đúng định dạng.'
  }
  return ''
}

export function checkEmail(value:any) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(value.trim() == ''){
    return 'Vui lòng không bỏ trống.'
  }else if( !emailRegex.test(value) ){
    return 'Vui lòng nhập đúng định dạng gmail.'
  }
  return ''
}

export function resetForm( value: any ) {
    Object.keys(value).forEach(key => {
      value[key] = '';
    });
    return value;    
}

export function formTrim( value: any ) {
  Object.keys(value).forEach(key => {
    value[key] = value[key].trim();
  });
  return value;
}


export function isObjectEmpty (obj: Record<string, string>) {
  return Object.values(obj).every(value => value === '')
}




