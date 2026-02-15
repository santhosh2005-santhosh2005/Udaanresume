import { A as SQL, F as is, N as Column, O as getTableColumns, P as isTable, j as isView, k as getViewSelectedFields } from "./drizzle-orm.mjs";
import { Bn as custom, Br as string, Dr as object, Er as number, Fr as record, Nn as boolean, On as any, Qr as union, Tn as _null, kn as array } from "./@ai-sdk/anthropic+[...].mjs";
import { s as external_exports } from "./@ai-sdk/gateway+[...].mjs";
var CONSTANTS = {
	INT8_MIN: -128,
	INT8_MAX: 127,
	INT8_UNSIGNED_MAX: 255,
	INT16_MIN: -32768,
	INT16_MAX: 32767,
	INT16_UNSIGNED_MAX: 65535,
	INT24_MIN: -8388608,
	INT24_MAX: 8388607,
	INT24_UNSIGNED_MAX: 16777215,
	INT32_MIN: -2147483648,
	INT32_MAX: 2147483647,
	INT32_UNSIGNED_MAX: 4294967295,
	INT48_MIN: -0x800000000000,
	INT48_MAX: 0x7fffffffffff,
	INT48_UNSIGNED_MAX: 0xffffffffffff,
	INT64_MIN: -9223372036854775808n,
	INT64_MAX: 9223372036854775807n,
	INT64_UNSIGNED_MAX: 18446744073709551615n
};
function isColumnType(column, columnTypes) {
	return columnTypes.includes(column.columnType);
}
function isWithEnum(column) {
	return "enumValues" in column && Array.isArray(column.enumValues) && column.enumValues.length > 0;
}
var isPgEnum = isWithEnum;
var jsonSchema = union([
	union([
		string(),
		number(),
		boolean(),
		_null()
	]),
	record(string(), any()),
	array(any())
]);
var bufferSchema = custom((v) => v instanceof Buffer);
function columnToSchema(column, factory) {
	const z$1 = factory?.zodInstance ?? external_exports;
	const coerce = factory?.coerce ?? {};
	let schema;
	if (isWithEnum(column)) schema = column.enumValues.length ? z$1.enum(column.enumValues) : z$1.string();
	if (!schema) {
		if (isColumnType(column, ["PgGeometry", "PgPointTuple"])) schema = z$1.tuple([z$1.number(), z$1.number()]);
		else if (isColumnType(column, ["PgGeometryObject", "PgPointObject"])) schema = z$1.object({
			x: z$1.number(),
			y: z$1.number()
		});
		else if (isColumnType(column, ["PgHalfVector", "PgVector"])) {
			schema = z$1.array(z$1.number());
			schema = column.dimensions ? schema.length(column.dimensions) : schema;
		} else if (isColumnType(column, ["PgLine"])) schema = z$1.tuple([
			z$1.number(),
			z$1.number(),
			z$1.number()
		]);
		else if (isColumnType(column, ["PgLineABC"])) schema = z$1.object({
			a: z$1.number(),
			b: z$1.number(),
			c: z$1.number()
		});
		else if (isColumnType(column, ["PgArray"])) {
			schema = z$1.array(columnToSchema(column.baseColumn, factory));
			schema = column.size ? schema.length(column.size) : schema;
		} else if (column.dataType === "array") schema = z$1.array(z$1.any());
		else if (column.dataType === "number") schema = numberColumnToSchema(column, z$1, coerce);
		else if (column.dataType === "bigint") schema = bigintColumnToSchema(column, z$1, coerce);
		else if (column.dataType === "boolean") schema = coerce === true || coerce.boolean ? z$1.coerce.boolean() : z$1.boolean();
		else if (column.dataType === "date") schema = coerce === true || coerce.date ? z$1.coerce.date() : z$1.date();
		else if (column.dataType === "string") schema = stringColumnToSchema(column, z$1, coerce);
		else if (column.dataType === "json") schema = jsonSchema;
		else if (column.dataType === "custom") schema = z$1.any();
		else if (column.dataType === "buffer") schema = bufferSchema;
	}
	if (!schema) schema = z$1.any();
	return schema;
}
function numberColumnToSchema(column, z, coerce) {
	let unsigned = column.getSQLType().includes("unsigned");
	let min;
	let max;
	let integer = false;
	if (isColumnType(column, ["MySqlTinyInt", "SingleStoreTinyInt"])) {
		min = unsigned ? 0 : CONSTANTS.INT8_MIN;
		max = unsigned ? CONSTANTS.INT8_UNSIGNED_MAX : CONSTANTS.INT8_MAX;
		integer = true;
	} else if (isColumnType(column, [
		"PgSmallInt",
		"PgSmallSerial",
		"MySqlSmallInt",
		"SingleStoreSmallInt"
	])) {
		min = unsigned ? 0 : CONSTANTS.INT16_MIN;
		max = unsigned ? CONSTANTS.INT16_UNSIGNED_MAX : CONSTANTS.INT16_MAX;
		integer = true;
	} else if (isColumnType(column, [
		"PgReal",
		"MySqlFloat",
		"MySqlMediumInt",
		"SingleStoreMediumInt",
		"SingleStoreFloat"
	])) {
		min = unsigned ? 0 : CONSTANTS.INT24_MIN;
		max = unsigned ? CONSTANTS.INT24_UNSIGNED_MAX : CONSTANTS.INT24_MAX;
		integer = isColumnType(column, ["MySqlMediumInt", "SingleStoreMediumInt"]);
	} else if (isColumnType(column, [
		"PgInteger",
		"PgSerial",
		"MySqlInt",
		"SingleStoreInt"
	])) {
		min = unsigned ? 0 : CONSTANTS.INT32_MIN;
		max = unsigned ? CONSTANTS.INT32_UNSIGNED_MAX : CONSTANTS.INT32_MAX;
		integer = true;
	} else if (isColumnType(column, [
		"PgDoublePrecision",
		"MySqlReal",
		"MySqlDouble",
		"SingleStoreReal",
		"SingleStoreDouble",
		"SQLiteReal"
	])) {
		min = unsigned ? 0 : CONSTANTS.INT48_MIN;
		max = unsigned ? CONSTANTS.INT48_UNSIGNED_MAX : CONSTANTS.INT48_MAX;
	} else if (isColumnType(column, [
		"PgBigInt53",
		"PgBigSerial53",
		"MySqlBigInt53",
		"MySqlSerial",
		"SingleStoreBigInt53",
		"SingleStoreSerial",
		"SQLiteInteger"
	])) {
		unsigned = unsigned || isColumnType(column, ["MySqlSerial", "SingleStoreSerial"]);
		min = unsigned ? 0 : Number.MIN_SAFE_INTEGER;
		max = Number.MAX_SAFE_INTEGER;
		integer = true;
	} else if (isColumnType(column, ["MySqlYear", "SingleStoreYear"])) {
		min = 1901;
		max = 2155;
		integer = true;
	} else {
		min = Number.MIN_SAFE_INTEGER;
		max = Number.MAX_SAFE_INTEGER;
	}
	let schema = coerce === true || coerce?.number ? integer ? z.coerce.number() : z.coerce.number().int() : integer ? z.int() : z.number();
	schema = schema.gte(min).lte(max);
	return schema;
}
function bigintColumnToSchema(column, z, coerce) {
	const unsigned = column.getSQLType().includes("unsigned");
	const min = unsigned ? 0n : CONSTANTS.INT64_MIN;
	const max = unsigned ? CONSTANTS.INT64_UNSIGNED_MAX : CONSTANTS.INT64_MAX;
	return (coerce === true || coerce?.bigint ? z.coerce.bigint() : z.bigint()).gte(min).lte(max);
}
function stringColumnToSchema(column, z, coerce) {
	if (isColumnType(column, ["PgUUID"])) return z.uuid();
	let max;
	let regex;
	let fixed = false;
	if (isColumnType(column, ["PgVarchar", "SQLiteText"])) max = column.length;
	else if (isColumnType(column, ["MySqlVarChar", "SingleStoreVarChar"])) max = column.length ?? CONSTANTS.INT16_UNSIGNED_MAX;
	else if (isColumnType(column, ["MySqlText", "SingleStoreText"])) if (column.textType === "longtext") max = CONSTANTS.INT32_UNSIGNED_MAX;
	else if (column.textType === "mediumtext") max = CONSTANTS.INT24_UNSIGNED_MAX;
	else if (column.textType === "text") max = CONSTANTS.INT16_UNSIGNED_MAX;
	else max = CONSTANTS.INT8_UNSIGNED_MAX;
	if (isColumnType(column, [
		"PgChar",
		"MySqlChar",
		"SingleStoreChar"
	])) {
		max = column.length;
		fixed = true;
	}
	if (isColumnType(column, ["PgBinaryVector"])) {
		regex = /^[01]+$/;
		max = column.dimensions;
	}
	let schema = coerce === true || coerce?.string ? z.coerce.string() : z.string();
	schema = regex ? schema.regex(regex) : schema;
	return max && fixed ? schema.length(max) : max ? schema.max(max) : schema;
}
function getColumns(tableLike) {
	return isTable(tableLike) ? getTableColumns(tableLike) : getViewSelectedFields(tableLike);
}
function handleColumns(columns, refinements, conditions, factory) {
	const columnSchemas = {};
	for (const [key, selected] of Object.entries(columns)) {
		if (!is(selected, Column) && !is(selected, SQL) && !is(selected, SQL.Aliased) && typeof selected === "object") {
			columnSchemas[key] = handleColumns(isTable(selected) || isView(selected) ? getColumns(selected) : selected, refinements[key] ?? {}, conditions, factory);
			continue;
		}
		const refinement = refinements[key];
		if (refinement !== void 0 && typeof refinement !== "function") {
			columnSchemas[key] = refinement;
			continue;
		}
		const column = is(selected, Column) ? selected : void 0;
		const schema = column ? columnToSchema(column, factory) : any();
		const refined = typeof refinement === "function" ? refinement(schema) : schema;
		if (conditions.never(column)) continue;
		else columnSchemas[key] = refined;
		if (column) {
			if (conditions.nullable(column)) columnSchemas[key] = columnSchemas[key].nullable();
			if (conditions.optional(column)) columnSchemas[key] = columnSchemas[key].optional();
		}
	}
	return object(columnSchemas);
}
function handleEnum(enum_, factory) {
	return (factory?.zodInstance ?? external_exports).enum(enum_.enumValues);
}
var selectConditions = {
	never: () => false,
	optional: () => false,
	nullable: (column) => !column.notNull
};
var createSelectSchema = (entity, refine) => {
	if (isPgEnum(entity)) return handleEnum(entity);
	return handleColumns(getColumns(entity), refine ?? {}, selectConditions);
};
export { createSelectSchema as t };
