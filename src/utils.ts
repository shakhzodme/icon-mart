export const isCapital = (char: string) => char == char.toUpperCase()
export const splitByCaptial = (value: string) => value
  .split("")
  .reduce((acc, char, index) => (index == 0 ? acc.push([char]) : isCapital(char) ? acc.push([char]) : acc[acc.length - 1].push(char), acc), [] as string[][])
  .map((value) => value.join(""))