import JoseBD from "./models/JoseBD.class.js";

const db = new JoseBD({
	object: {
		id: 1,
		name: "José Nícollas Silva de Souza",
	},
});

console.log(await db.read());
