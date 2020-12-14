const CODES = {
	A: 65,
	Z: 90
}

function toCell () {
	return `<div class="excel-table__cell" contenteditable></div>`
}

function toColumn (col) {
	return `
		<div class="excel-table__col" data-type="resizable">
			${col}
			<div class="excel-table__col-resize" data-resize="col"></div>
		</div>
	`
}

function createRow (index, content) {
	const resizer = index ? `<div class="excel-table__row-resize" data-resize="row"></div>` : ''
	return `
		<div class="excel-table__row">
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

export function createTable (rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')

	rows.push(createRow(null, cols))

	for (let i = 0; i < rowsCount; i++) {
		const cels = new Array(colsCount)
			.fill('')
			.map(toCell)
			.join('')

		rows.push(createRow(i + 1, cels))
	}

	return rows.join('')
}
