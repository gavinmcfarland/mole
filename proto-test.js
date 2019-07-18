var people = require('./person_pb')

var message = new people.Person()

message.setId(1234)
message.setName('John Doe')
message.setEmail('jdoe@example.com')

console.log(message.id)

console.log(message)
