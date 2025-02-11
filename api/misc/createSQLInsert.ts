export function converToSQLInsert(data: any, tableName: string) {
    var keyes: string = "";
    var values: any[] = [];
    var comodin: string = "";
    for (const key in data) {
        const keyName = key;
        if (data[keyName] !== undefined) {
            keyes += key + ',';
            values.push(data[keyName]);
            comodin += '?,'
        }
    }

    keyes = keyes.slice(0, -1);
    comodin = comodin.slice(0, -1);
    const query = `INSERT INTO ${tableName} (${keyes}) VALUES (${comodin})`;

    return { keyes, values, comodin, query };
}