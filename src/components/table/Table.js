import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { shouldResize, isCell, matrix, nextSelector } from './table.functions'
import { resizeHandler } from './table-resize'
import { TableSelection } from './TableSelection'
import { $ } from '@core/dom'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
	static className = 'excel-table'

	constructor ($root, options) {
		super($root, {
			name: 'table',
			listeners: ['mousedown', 'keydown', 'input'],
			...options
		})
	}

	toHTML () {
		return createTable(20, this.store.getState())
	}

	prepare () {
		this.selection = new TableSelection()
	}

	init () {
		super.init()

		const $cell = this.$root.find('[data-id="0:0"]')
		this.selectCell($cell)

		this.$on('formula:input', data => {
			this.selection.current.text(data)
		})

		this.$on('formula:done', () => {
			this.selection.current.focus()
		})
	}

	selectCell ($cell) {
		this.selection.select($cell)
		this.$emit('table:select', $cell)
	}

	async resizeTable (event) {
		try {
			const data = await resizeHandler(this.$root, event)
			this.$dispatch(actions.tableResize(data))
		} catch (e) {
			console.warn('Resize error', e.message)
		}
	}

	onMousedown (event) {
		if (shouldResize(event)) {
			this.resizeTable(event)
		} else if (isCell(event)) {
			const $target = $(event.target)

			if (event.shiftKey) {
				// select group
				const $cells = matrix($target, this.selection.current)
					.map(id => this.$root.find(`[data-id="${id}"]`))
				this.selection.selectGroup($cells)
			} else {
				this.selectCell($target)
			}
		}
	}

	onKeydown (event) {
		const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp']
		const { key } = event

		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault()
			const currenId = this.selection.current.id(true)
			const $next = this.$root.find(nextSelector(key, currenId))
			this.selectCell($next)
		}
	}

	onInput (event) {
		this.$emit('table:input', $(event.target))
	}
}
