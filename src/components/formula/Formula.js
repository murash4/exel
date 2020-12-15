import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
	static className = 'excel-formula'

	constructor ($root, options) {
		super($root, {
			name: 'formula',
			listeners: ['input'],
			...options
		})
	}

	toHTML () {
		return `
			<div class="excel-formula__info">fx</div>
			<div class="excel-formula__input" contenteditable spellcheck="false"></div>
		`
	}

	onInput (event) {
		const text = event.target.textContent.trim()
		this.$emit('formulaInput', text)
	}
}
