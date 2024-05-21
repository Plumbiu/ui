export function calOffset(width?: string | number) {
  if (typeof width === 'number') {
    return width
  }
  if (typeof width === 'string') {
    const num = parseFloat(width)
    return Number.isNaN(num) ? 200 : num
  }
  return 200
}

interface T {
  a?: string
  children: T[]
}

function findMaxChildren(a: T[]) {
  let max = 0
  for (const item of a) {
    if (item.children) {
      max = Math.max(1 + findMaxChildren(item.children), max)
    }
  }
  return max
}

console.log(
  findMaxChildren([
    {
      children: [],
    },
    {
      a: '1',
      children: [
        {
          a: '1',
          children: [
            {
              a: '1',
              children: [
                {
                  a: '1',
                  children: [],
                },
              ],
            },
          ],
        },
      ],
    },
  ]),
)
