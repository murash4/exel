import { ExcelComponent } from '@core/ExcelComponent'
import { createTable } from '@/components/table/table.template'
import { $ } from '../../core/dom'

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
		if (event.target.dataset.resize) {
			const $resizer = $(event.target)
			const $parent = $resizer.closest('[data-type="resizable"]')
			const coords = $parent.getCoords()
			const type = $resizer.data.resize
			const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`)
			let value = null

			document.onmousemove = e => {
				if (type === 'col') {
					const delta = e.pageX - coords.right

					value = coords.width + delta
					$parent.css({ width: value + 'px' })
					cells.forEach(el => el.style.width = value + 'px')
				} else {
					const delta = e.pageY - coords.bottom

					value = coords.height + delta
					$parent.css({ height: value + 'px' })
				}
			}

			document.onmouseup = () => {
				document.onmousemove = null
			}
		}
	}
}

// 149 ms  Scripting
// 1465 ms  Rendering
// 121 ms  Painting
// 1072 ms  System
// 14473 ms  Idle
// 17280 ms  Total
