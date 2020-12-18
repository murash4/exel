import { TABLE_RESIZE } from './types'

// Pure Function
export function rootReducer (state, action) {
	let prevState
	let field

	switch (action.type) {
		case TABLE_RESIZE:
			field = action.data.type + 'State'
			prevState = state[field] || {}
			prevState[action.data.id] = action.data.value

			return {
				...state,
				[field]: prevState
			}
		default: return state
	}
}
