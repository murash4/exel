const CODES = {
	A: 65,
	Z: 90
}

function toCell (row) {
	return function (_, col) {
		return `<div class="excel-table__cell" data-col="${col}" contenteditable data-id="${row}:${col}" ></div>`
	}
}

function toColumn (col, index) {
	return `
		<div class="excel-table__col" data-type="resizable" data-col="${index}">
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

export function createTable (rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1
	const rows = []
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('')

	rows.push(createRow(null, cols))

	for (let row = 0; row < rowsCount; row++) {
		const cels = new Array(colsCount)
			.fill('')
			.map(toCell(row))
			.join('')

		rows.push(createRow(row + 1, cels))
	}

	return rows.join('')
}
