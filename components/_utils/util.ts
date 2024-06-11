export function slsx(signal: boolean | undefined | null, value: any) {
  return signal ? value : undefined
}
