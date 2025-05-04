export function fakePass(value: any, key?: any) {
  const maskedPart = '*'.repeat(value.length - 2);
  const visiblePart = value.slice(-2);
  return maskedPart + visiblePart;
}

export function fakePassVip(value: any, key: any ,notHiden: number) {
  const maskedPart = `${key}`.repeat(value.length - notHiden);
  const visiblePart = value.slice(-notHiden);
  return maskedPart + visiblePart;
}

export function maskPass(value: any) {
  return '*'.repeat(value.length);
}