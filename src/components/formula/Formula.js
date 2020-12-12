import { ExcelComponent } from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
	static className = 'excel-formula'

	toHTML () {
		return `
			<div class="excel-formula__info">fx</div>
			<div class="excel-formula__input" contenteditable spellcheck="false"></div>
		`
	}
}
