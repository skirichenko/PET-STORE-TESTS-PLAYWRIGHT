
import { cleanEnv, str, url } from "envalid";


export const CONFIG = cleanEnv(process.env, {
    PETSTORE_URL: url({
        default: 'http://localhost/v2/',
        desc: 'API URL'
    }),
    PETSTORE_SWAGGER_URL: url({
        default: 'http://localhost/v2/swagger.json',
        desc: 'Swagger json doc'
    })
})
