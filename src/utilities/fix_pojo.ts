export function fix_pojo<T>(pojo: T): T {
	return JSON.parse(JSON.stringify(pojo))
}
