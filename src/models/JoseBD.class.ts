import type { RecordJSON } from "../types/JoseBDTypes.js";
import type { IJoseBD } from "../types/IJoseBD.js";
import fs from "node:fs/promises";
import { existsSync, statSync, writeFileSync, readFileSync } from "node:fs";
import { ZodError } from "zod";

export default class JoseBD {
	private dbName: string;
	private object: RecordJSON;
	private db: Array<RecordJSON> = [];

	constructor(dbData: IJoseBD) {
		this.dbName = dbData.dbName ?? "db.json";
		this.object = dbData.object;
		this.initSync(this.object);
	}

	private initSync(initialObject: RecordJSON) {
		if (!existsSync(this.dbName) && statSync(this.dbName).size === 0) {
			this.db = [initialObject];
			writeFileSync(this.dbName, JSON.stringify(this.db, null, 2));
			return;
		}

		try {
			const data = readFileSync(this.dbName, "utf-8").trim();

			if (!data) throw new SyntaxError("JSON file void");

			this.db = JSON.parse(data);
		} catch {
			this.db = [initialObject];
			writeFileSync(this.dbName, JSON.stringify(this.db, null, 2));
		}
	}

	async read(): Promise<Array<RecordJSON>> {
		try {
			const data = await fs.readFile(this.dbName, "utf-8");
			return JSON.parse(data);
		} catch {
			return [];
		}
	}

	async write(object: RecordJSON) {
		if (!object) throw new Error("Please provide data to save");

		try {
			this.db = await this.read();

			this.db.push(object);

			await fs.writeFile(this.dbName, JSON.stringify(this.db, null, 2));
		} catch (error) {
			if (error instanceof ZodError) throw new Error("Invalid type");

			console.error(error);
		}
	}
}
