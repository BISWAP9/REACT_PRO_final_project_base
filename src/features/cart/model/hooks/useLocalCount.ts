import { useState, ChangeEvent, useCallback } from 'react'
import { clampCount } from '../utils/clampCount'

export const useLocalCount = (initial = 1) => {
	const [count, setCount] = useState(initial)

	const handleCount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setCount(clampCount(+e.target.value))
	}, [])

	const handleCountMinus = useCallback(() => {
		setCount((prev) => clampCount(prev - 1))
	}, [])

	const handleCountPlus = useCallback(() => {
		setCount((prev) => clampCount(prev + 1))
	}, [])

	return { count, handleCount, handleCountMinus, handleCountPlus }
}
