import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
	constructor ($root, options = {}) {
		super($root, options.listeners)
		this.name = options.name || ''
		this.store = options.store
		this.emitter = options.emitter
		this.unsubscribers = []
		this.storeSub = null

		this.prepare()
	}

	// Настраиваем наш компонент до init
	prepare () {}

	// Возвращат шаблон компонента
	toHTML () {
		return ''
	}

	// Уведомляем слушателей про событие event
	$emit (event, ...args) {
		this.emitter.emit(event, ...args)
	}

	// Подписываемся на событие event
	$on (event, fn) {
		const unsub = this.emitter.subscribe(event, fn)

		this.unsubscribers.push(unsub)
	}

	$dispatch (action) {
		this.store.dispatch(action)
	}

	$subscribe (fn) {
		this.storeSub = this.store.subscribe(fn)
	}

	// Инициализируем компонент
	// Добавляем DOM слушателей
	init () {
		this.initDOMListeners()
	}

	// Удаляем компонент
	// Чистим слушатели
	destroy () {
		this.removeDOMListeners()
		this.unsubscribers.forEach(unsub => unsub())
		this.storeSub.unsubscribe()
	}
}
