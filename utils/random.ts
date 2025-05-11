export function random(min: any, max: any) {
  return Math.floor(Math.random() * ( max - min + 1)) + min;
}

export function randomName(name?: string) {
  const newName = ref('')
  if(name){
    newName.value = '_' + name
  }
  
  return Date.now() +'_'+ random(1,1000) +  newName.value
}