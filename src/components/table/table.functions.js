import { range } from '@core/utils'

export function shouldResize (event) {
	return event.target.dataset.resize
}

export function isCell (event) {
	return event.target.dataset.type === 'cell'
}

export function matrix ($target, $current) {
	const target = $target.id(true)
	const current = $current.id(true)
	const rows = range(current.row, target.row)
	const cols = range(current.col, target.col)

	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`))
		return acc
	}, [])
}

export function nextSelector (key, { row, col }) {
	const MIN_VALUE = 0

	switch (key) {
		case 'Enter':
		case 'ArrowDown':
			row++
			break
		case 'Tab':
		case 'ArrowRight':
			col++
			break
		case 'ArrowLeft':
			if (col > MIN_VALUE) col--
			break
		case 'ArrowUp':
			if (row > MIN_VALUE) row--
			break
	}

	return `[data-id="${row}:${col}"]`
}
