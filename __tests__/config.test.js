import file from '../src/lib/Config.js'
const putValuesIntoArray = file.__get__('putValuesIntoArray')

test('should put value into an array', () => {
	expect(putValuesIntoArray('test')).toEqual(['test'])
})
