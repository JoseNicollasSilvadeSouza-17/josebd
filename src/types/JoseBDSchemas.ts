import z from "zod";

const keySchema = z
	.string()
	.min(1, "The key name must be at least 1 character long");

const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);

type Literal = z.infer<typeof literalSchema>;
type Key = z.infer<typeof keySchema>;

type Json = Literal | { [key: Key]: Json } | Json[];

const jsonSchema: z.ZodType<Json> = z.lazy(() => {
	return z.union([
		literalSchema,
		z.record(keySchema, jsonSchema),
		z.array(jsonSchema),
	]);
});

const recordJsonSchema = z.record(keySchema, jsonSchema);

export { recordJsonSchema };
