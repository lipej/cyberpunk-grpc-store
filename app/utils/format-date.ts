export const formatValidate = (date: string) => {
  const [mm, aaaa] = [ date.slice(0, 2), date.slice(2)];
  return `${mm}/${aaaa}`
}