import { ExcelComponent } from '@core/ExcelComponent'

export class Header extends ExcelComponent {
	static className = 'excel-header'

	toHTML () {
		return `
			<input type="text" class="excel-header__input" value="Новая таблица">
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
}
