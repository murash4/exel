import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor ($root, options = {}) {
		super($root, options.listeners)
	}
	// Возвращат шаблон компонентаc
	toHTML () {
		return ''
	}

	init () {
		this.initDOMListeners()
	}
}
