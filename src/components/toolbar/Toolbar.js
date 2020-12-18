import { ExcelStateComponent } from '@core/ExcelStateComponent'
import { createToolbar } from '@/components/toolbar/toolbar.template'
import { $ } from '@core/dom'

export class Toolbar extends ExcelStateComponent {
	static className = 'excel-toolbar'

	constructor ($root, options) {
		super($root, {
			name: 'toolbar',
			listeners: ['click'],
			...options
		})
	}

	prepare () {
		const initialState = {
			textAlign: 'left',
			fontWeight: 'normal',
			textDecoration: 'none',
			fontStyle: 'normal'
		}

		this.initState(initialState)
	}

	get template () {
		return createToolbar(this.state)
	}

	toHTML () {
		return this.template
	}

	onClick (event) {
		const $target = $(event.target)

		if ($target.data.type === 'button') {
			const value = JSON.parse($target.data.value)
			const key = Object.keys(value)[0]

			this.setState({ [key]: value[key] })
		}
	}
}
