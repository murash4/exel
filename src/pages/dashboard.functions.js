function getAllKeys () {
	const keys = []

	for (let i = 0; i < localStorage.length; i++) {
		const key = localStorage.key([i])

		if (key && key.includes('excel:')) {
			keys.push(key)
		}
	}

	return keys
}

function toHTML (item, index) {
	return `
		<li class="db__list-record">
			<a href="" class="db__list-record-link">Таблица №1</a>
			<strong>12.06.2020</strong>
		</li>
	`
}

function getAllRecords (keys) {
	return keys.map(toHTML).join('')
}

export function createRecordsTable () {
	const keys = getAllKeys()

	if (!keys.length) {
		return `<p>Вы пока не создали ни одной таблицы</p>`
	}

	return `
		<div class="db__list-header">
			<span>Название</span>
			<span>Дата открытия</span>
		</div>
		<ul class="db__list">
			${getAllRecords(keys)}
		</ul>
	`
}
