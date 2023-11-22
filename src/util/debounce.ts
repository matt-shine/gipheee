/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/ban-types
export default function debounce(func: Function, wait: number) {
  let timeoutId: ReturnType<typeof setTimeout>;
  
  return function(this: any, ...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    
    timeoutId = setTimeout(() => {
      func.apply(this, args);
      clearTimeout(timeoutId)
    }, wait);
  }
}