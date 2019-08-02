export default function groupBy(list, keyGetter) {
	const map = new Map()
	list.forEach(item => {
		const key = keyGetter(item)

		const collection = map.get(key)

		const newItem = {
			template: item.template,
			data: item.data
		}

		if (!collection) {
			map.set(key, [newItem])
		} else {
			collection.push(newItem)
		}
	})
	return map
}
