import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { changeTitle } from '@/redux/actions'
import { defaultTitle } from '@/constants'

export class Header extends ExcelComponent {
	static className = 'excel-header'

	constructor ($root, options) {
		super($root, {
			name: 'header',
			listeners: ['input'],
			...options
		})
	}

	toHTML () {
		const title = this.store.getState().title || defaultTitle

		return `
			<input type="text" class="excel-header__input" value="${title}">
			<div class="excel-header__btns">
				<div class="btn">
					<span class="material-icons">delete</span>
				</div>
				<div class="btn">
					<span class="material-icons">exit_to_app</span>
				</div>
			</div>
		`
	}

	onInput (event) {
		const $target = $(event.target)
		this.$dispatch(changeTitle($target.text()))
	}
}
