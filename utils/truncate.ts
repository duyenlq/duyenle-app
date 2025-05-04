export function truncate(str: string, maxLength: number): string {
  if (str && str.length <= maxLength) {
    return str;
  }
  return str ? str.slice(0, maxLength) + '...' : '';
}

export function truncateBreacrum(input: string) {
  if (input && input.includes(',')) {
    let result = input.split(',')
    return result[0]
  }
  else {
    return input
  }
}
