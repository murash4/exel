import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'

export class Table extends ExcelComponent {
	static className = 'excel-table'

	constructor ($root) {
		super($root, {
			name: 'table'
			// listeners: ['mousedown', 'mouseup', 'click']
		})
	}

	toHTML () {
		return createTable(20)
	}
}
