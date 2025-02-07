import "node:fs"
import { enviromentKeys } from "./enviromentKeys";

export function envInit() {
    for (const key in enviromentKeys) {
        const envData = process.env[key];
        if (envData) {
            enviromentKeys[key] = envData;
        }else{
            enviromentKeys[key] = "";
        }
    }

}
