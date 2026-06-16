export type Theme = 'dark' | 'light' | 'auto'
export type ThemeNoAuto = ReturnType<typeof getTheme>
export function getTheme() {
  const theme = localStorage.getItem('theme') as Theme
  if (theme && theme !== 'auto') {
    return theme
  }

  const dark = window.matchMedia('(prefers-color-scheme: dark)').matches
  return dark ? 'dark' : 'light'
}
