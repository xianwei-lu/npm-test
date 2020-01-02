import Promise from	'es6-promise'

class Test {
	private id: any
	constructor(id: number) {
		this.id = id
	}

	printId() {
		console.log(this.id)
		return '测试'
	}

	returnPromise() {
		return Promise.Promise
	}
}

export default Test
