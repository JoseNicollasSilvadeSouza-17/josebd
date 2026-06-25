import z from "zod";
import { JSON_FILE_REGEX } from "../utils/regexp.js";
import { recordJsonSchema } from "./JoseBDSchemas.js";

const joseBdSchema = z.object({
	dbName: z
		.string()
		.regex(JSON_FILE_REGEX, "Invalid JSON file!")
		.min(1, "The db filename cannot be shorter than 1 character")
		.default("db.json")
		.optional(),
	object: recordJsonSchema,
});

export type IJoseBD = z.infer<typeof joseBdSchema>;