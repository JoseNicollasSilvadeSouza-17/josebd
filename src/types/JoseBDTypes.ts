import z from "zod";
import { recordJsonSchema } from "./JoseBDSchemas.js";

export type RecordJSON = z.infer<typeof recordJsonSchema>;