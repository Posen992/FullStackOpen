import { useState } from 'react'

export const useField = (type: string) => {
	const [value, setValue] = useState('')
	const onChange = (event: any) => {
        event.preventDefault()
		setValue(event.target.value)
	}

	const reset = () => {
		setValue('')
	}

	const tagProps = () => {
		return {
			type,
			value,
			onChange,
		}
	}

	return {
		type,
		value,
		onChange,
		reset,
		tagProps,
	}
}
