import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
	static className = 'excel-formula'

	constructor ($root) {
		super($root, {
			name: 'formula',
			listeners: ['input', 'click']
		})
	}

	toHTML () {
		return `
			<div class="excel-formula__info">fx</div>
			<div class="excel-formula__input" contenteditable spellcheck="false"></div>
		`
	}

	onInput (event) {
		console.log('Formula onInput', this.$root)
	}

	onClick () {}
}
