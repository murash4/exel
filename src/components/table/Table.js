import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { shouldResize } from './table.functions'
import { resizeHandler } from './table-resize'
import { TableSelection } from './TableSelection'

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

	prepare () {
		this.selection = new TableSelection()
	}

	init () {
		super.init()

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selection.select($cell)
	}

	onMousedown (event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event)
		}
	}
}
