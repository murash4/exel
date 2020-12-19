import { toInlineStyles } from '@core/utils'
import { defaultStyles } from '@/constants'
import { parser } from '@core/parser'

const CODES = {
	A: 65,
	Z: 90
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth (state, index) {
	return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight (state, index) {
	return (state ? state[index] : DEFAULT_HEIGHT) + 'px'
}

function toCell (state, row) {
	return function (_, col) {
		const width = getWidth(state.colState, col)
		const id = `${row}:${col}`
		const data = state.dataState[id]
		const styles = toInlineStyles({
			...defaultStyles,
			...state.stylesState[id]
		})

		return `
			<div
				class="excel-table__cell"
				style="${styles}; width: ${width}"
				contenteditable
				data-col="${col}"
				data-type="cell"
				data-id="${id}"
				data-value="${data || ''}"
			>${parser(data) || ''}</div>`
	}
}

function toColumn ({ col, index, width }) {
	return `
		<div
			class="excel-table__col"
			style="width: ${width}"
			data-type="resizable"
			data-col="${index}"
		>
			${col}
			<div class="excel-table__col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow (index, content, state) {
	const resizer = index ? `<div class="excel-table__row-resize" data-resize="row"></div>` : ''
	const height = getHeight(state, index)

	return `
		<div
			class="excel-table__row"
			style="height: ${height}"
			data-type="resizable"
			data-row="${index}"
		>
			<div class="excel-table__row-info">
				${index || ''}
				${resizer}
			</div>
			<div class="excel-table__row-data">${content}</div>
		</div>
	`
}

function toChar (_, index) {
	return String.fromCharCode(CODES.A + index)
}

function withWidthFrom (state) {
	return function (col, index) {
		return {
			col,
			index,
			width: getWidth(state, index)
		}
	}
}

export function createTable (rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state.colState))
		.map(toColumn)
		.join('')

	rows.push(createRow(null, cols, {}))

	for (let row = 0; row < rowsCount; row++) {
		const cels = new Array(colsCount)
			.fill('')
			.map(toCell(state, row))
			.join('')

		rows.push(createRow(row + 1, cels, state.rowState))
	}

	return rows.join('')
}
