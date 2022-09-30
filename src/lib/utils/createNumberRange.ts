interface RangeProps {
  start: number
  end: number
  step?: number
  offset?: number
  allowNegatives?: boolean
}

//from=> https://stackoverflow.com/a/31989462
export const createNumberRange = ({
  start,
  end,
  step = 1,
  offset = 0,
  allowNegatives = true,
}: RangeProps): number[] => {
  const arraySize = (Math.abs(end - start) + offset * 2) / step + 1
  const direction = start < end ? 1 : -1
  const startingPoint = start - direction * offset
  const stepSize = direction * step

  return Array(arraySize)
    .fill(0)
    .map(function (_, index) {
      return startingPoint + stepSize * index
    })
    .filter((number) => (allowNegatives ? true : number) > 0)
}
