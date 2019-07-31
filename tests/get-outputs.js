import getOutputs from '../src/lib/get-outputs'

test('return this array when only one unamed output', () => {
	const outputs = getOutputs()
	const array = [{ file: 'styles.css', template: 'templates/' }]
	expect(outputs).toEqual(expect.arrayContaining(array))
})
