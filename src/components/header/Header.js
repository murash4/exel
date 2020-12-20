import { ExcelComponent } from '@core/ExcelComponent'
import { $ } from '@core/dom'
import { changeTitle } from '@/redux/actions'
import { defaultTitle } from '@/constants'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Header extends ExcelComponent {
	static className = 'excel-header'

	constructor ($root, options) {
		super($root, {
			name: 'header',
			listeners: ['input', 'click'],
			...options
		})
	}

	toHTML () {
		const title = this.store.getState().title || defaultTitle

		return `
			<input type="text" class="excel-header__input" value="${title}">
			<div class="excel-header__btns">
				<div class="btn" data-button="remove">
					<span class="material-icons">delete</span>
				</div>
				<div class="btn" data-button="exit">
					<span class="material-icons">exit_to_app</span>
				</div>
			</div>
		`
	}

	onInput (event) {
		const $target = $(event.target)
		this.$dispatch(changeTitle($target.text()))
	}

	onClick (event) {
		const $target = $(event.target)

		if ($target.data.button === 'remove') {
			const decision = confirm('Вы действительно хотите удалить эту таблицу?')

			if (decision) {
				localStorage.removeItem('excel:' + ActiveRoute.param)
				ActiveRoute.navigate('')
			}
		} else if ($target.data.button === 'exit') {
			ActiveRoute.navigate('')
		}
	}
}
