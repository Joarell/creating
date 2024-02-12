type User = {
	name: String,
	age: Number
}

function printer(user: User): void {
	console.log(`${user.name} and ${user.age}`);
};

const user = { name: "Jev", age: 33 };
printer(user);
