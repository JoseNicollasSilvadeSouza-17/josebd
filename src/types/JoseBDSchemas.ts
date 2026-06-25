import z from "zod";
import type { JsonValue, JsonObject } from "type-fest";

const keySchema = z
	.string()
	.min(1, "The key name must be at least 1 character long");

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;
type Key = z.infer<typeof keySchema>;

const jsonSchema: z.ZodType<JsonValue> = z.lazy(() => {
	return z.union([
		literalSchema,
		z.record(keySchema, jsonSchema),
		z.array(jsonSchema),
	]);
});

const recordJsonSchema: z.ZodType<JsonObject> = z.record(keySchema, jsonSchema);

export { recordJsonSchema };
