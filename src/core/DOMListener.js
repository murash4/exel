import { capitalize } from '@core/utils'

export class DOMListener {
	constructor ($root, listeners = []) {
		if (!$root) {
			throw new Error('No $root provided for DOMListener!')
		}

		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			if (!this[method]) {
				throw new Error(`Method ${method} is not implemented in ${this.name} component`)
			}
			this[method] = this[method].bind(this)
			// Это тоже самое, что и addEventListener
			this.$root.on(listener, this[method])
		})
	}

	removeDOMListeners () {
		this.listeners.forEach(listener => {
			const method = getMethodName(listener)
			// Это тоже самое, что и removeEventListener
			this.$root.off(listener, this[method])
		})
	}
}


// input => onInput
function getMethodName (eventName) {
	return 'on' + capitalize(eventName)
}
