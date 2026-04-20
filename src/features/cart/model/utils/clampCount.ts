export const MIN_COUNT = 1
export const MAX_COUNT = 99

export const clampCount = (n: number) => (n > MAX_COUNT ? MAX_COUNT : n < MIN_COUNT ? MIN_COUNT : n)
