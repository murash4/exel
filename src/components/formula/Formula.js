import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'

export class Formula extends ExcelComponent {
	static className = 'excel-formula'

	constructor ($root, options) {
		super($root, {
			name: 'formula',
			listeners: ['input', 'keydown'],
			...options
		})
	}

	toHTML () {
		return `
			<div class="excel-formula__info">fx</div>
			<div id="formula" class="excel-formula__input" contenteditable spellcheck="false"></div>
		`
	}

	init () {
		super.init()

		this.$formula = this.$root.find('#formula')

		this.$on('table:select', $cell => {
			this.$formula.text($cell.text())
		})

		this.$subscribe(state => {
			this.$formula.text(state.currentText)
		})
	}

	onInput (event) {
		this.$emit('formula:input', $(event.target).text())
	}

	onKeydown (event) {
		const keys = ['Enter', 'Tab']
		if (keys.includes(event.key)) {
			event.preventDefault()
			this.$emit('formula:done')
		}
	}
}
