export class Emitter {
	constructor () {
		this.listeners = {}
	}

	// dispatch, fire, trigger
	// Уведомляем слушателей, если они есть
	// event - type 'string' (название события)
	// Пример: table.emit('table:select', { a: 1 })
	emit (event, ...args) {
		if (!Array.isArray(this.listeners[event])) return false

		this.listeners[event].forEach(listener => {
			listener(...args)
		})

		return true
	}

	// on, listen
	// Подписываемся на уведомления
	// Добавляем нового слушателя
	// event - type 'string' (название события)
	// Пример: formula.subscribe('table:select', () => {})
	subscribe (event, fn) {
		this.listeners[event] = this.listeners[event] || []
		this.listeners[event].push(fn)

		return () => {
			this.listeners[event] = this.listeners[event].filter(listener => listener !== fn)
		}
	}
}

// Example
// const emitter = new Emitter()
//
// const unsub = emitter.subscribe('sasha', data => console.log(data))
//
// setTimeout(() => {
// 	emitter.emit('sasha', 222)
// }, 2000)
//
// setTimeout(() => {
// 	unsub()
// }, 3000)
//
//
// setTimeout(() => {
// 	emitter.emit('sasha', 4444)
// }, 4000)
