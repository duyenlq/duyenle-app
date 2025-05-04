declare global {
  interface Window {
    [key: string]: any
  }
}

import { useBreakpoints } from '@vueuse/core'
export const breakpoints = useBreakpoints({
  '4xs': 320,
  '3xs': 360,
  '2xs': 480,
  xs: 600,
  sm: 768,
  md: 1024,
  lg: 1280,
  xl: 1440,
  '2xl': 1600,
  '3xl': 1920,
  '4xl': 2560,
  '5xl': 5120
})
export const currentScreen = breakpoints.current()
export const xs = breakpoints.smaller('sm')
export const xse = breakpoints.smallerOrEqual('sm')
export const sm = breakpoints.between('sm', 'md')
export const md = breakpoints.between('md', 'lg')
export const lg = breakpoints.between('lg', 'xl')
export const xl = breakpoints.between('xl', '2xl')
export const xxl = breakpoints['2xl']
export const isDesktop = breakpoints.between('md', '5xl')
export const isMobile = breakpoints.between('4xs', 'md')