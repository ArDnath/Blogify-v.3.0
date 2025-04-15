export const DEFAULT = `<p dir="auto">Hi <strong>Creator</strong>,</p><p dir="auto">You can start writing your Blogs here!</p>`

export function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout
  return function (...args: any[]) {
    clearTimeout(timeout)
    // @ts-ignore
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}