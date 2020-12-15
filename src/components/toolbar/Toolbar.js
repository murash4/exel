import { ExcelComponent } from '@core/ExcelComponent'

export class Toolbar extends ExcelComponent {
	static className = 'excel-toolbar'

	constructor ($root, options) {
		super($root, {
			name: 'toolbar',
			listeners: ['click'],
			...options
		})
	}

	toHTML () {
		return `
			<div class="btn btn--green">
				<span class="material-icons">format_align_left</span>
			</div>
			<div class="btn btn--green">
				<span class="material-icons">format_align_center</span>
			</div>
			<div class="btn btn--green">
				<span class="material-icons">format_align_right</span>
			</div>
			<div class="btn btn--green">
				<span class="material-icons">format_bold</span>
			</div>
			<div class="btn btn--green">
				<span class="material-icons">format_italic</span>
			</div>
			<div class="btn btn--green">
				<span class="material-icons">format_underlined</span>
			</div>
		`
	}

	onClick () {}
}
