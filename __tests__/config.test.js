import file from '../src/lib/Config.js'
const putValuesIntoArray = file.__get__('putValuesIntoArray')
const normaliseConfig = file.__get__('normaliseConfig')
const config = file.__get__('config')

test('should put value into an array', () => {
	expect(putValuesIntoArray('test')).toEqual(['test'])
})
