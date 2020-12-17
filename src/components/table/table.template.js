const CODES = {
	A: 65,
	Z: 90
}
const DEFAULT_WIDTH = 120

function getWidth (state, index) {
	return (state ? state[index] : DEFAULT_WIDTH) + 'px'
}

function toCell (state, row) {
	return function (_, col) {
		const width = getWidth(state.colState, col)

		return `
			<div
				class="excel-table__cell"
				style="width: ${width}"
				contenteditable
				data-col="${col}"
				data-type="cell"
				data-id="${row}:${col}"
			></div>`
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

function createRow (index, content) {
	const resizer = index ? `<div class="excel-table__row-resize" data-resize="row"></div>` : ''
	return `
		<div class="excel-table__row" data-type="resizable">
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
			width: getWidth(state.colState, index)
		}
	}
}

export function createTable (rowsCount = 15, state = {}) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(withWidthFrom(state))
		.map(toColumn)
		.join('')

	rows.push(createRow(null, cols))

	for (let row = 0; row < rowsCount; row++) {
		const cels = new Array(colsCount)
			.fill('')
			.map(toCell(state, row))
			.join('')

		rows.push(createRow(row + 1, cels))
	}

	return rows.join('')
}
