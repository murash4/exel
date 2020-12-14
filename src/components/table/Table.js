import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { shouldResize } from './table.functions'
import { resizeHandler } from './table-resize'

export class Table extends ExcelComponent {
	static className = 'excel-table'

	constructor ($root) {
		super($root, {
			name: 'table',
			listeners: ['mousedown']
		})
	}

	toHTML () {
		return createTable(20)
	}

	onMousedown (event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
		}
	}
}
