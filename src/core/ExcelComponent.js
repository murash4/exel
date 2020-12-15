import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor ($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''

		this.prepare()
	}

	prepare () {}

	// Возвращат шаблон компонента
	toHTML () {
		return ''
	}

	init () {
		this.initDOMListeners()
	}

	destroy () {
		this.removeDOMListeners()
	}
}
