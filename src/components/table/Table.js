import { ExcelComponent } from '@core/ExcelComponent'

export class Table extends ExcelComponent {
	static className = 'excel-table'

	toHTML () {
		return `
			<div class="excel-table__row">
				<div class="excel-table__row-info"></div>
					<div class="excel-table__row-data">
						<div class="excel-table__col">A</div>
						<div class="excel-table__col">B</div>
						<div class="excel-table__col">C</div>
					</div>
			</div>
			<div class="excel-table__row">
				<div class="excel-table__row-info">1</div>
				<div class="excel-table__row-data">
					<div class="excel-table__cell selected" contenteditable>1</div>
					<div class="excel-table__cell" contenteditable>2</div>
					<div class="excel-table__cell" contenteditable>3</div>
				</div>
			</div>
			<div class="excel-table__row">
				<div class="excel-table__row-info">2</div>
				<div class="excel-table__row-data">
					<div class="excel-table__cell" contenteditable>1</div>
					<div class="excel-table__cell" contenteditable>2</div>
					<div class="excel-table__cell" contenteditable>3</div>
				</div>
			</div>
		`
	}
}
