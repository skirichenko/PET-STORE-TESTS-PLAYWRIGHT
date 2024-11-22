import { URLSearchParams } from 'url';
import { definitions, operations } from '../../../.temp/types'
import { loadAPISpec, validate } from '../validator';
import { JsonRequest } from 'http-req-builder';
import { CONFIG } from '../../../config/env';


export class PetController {
    async getById(id: number | string) {
        const body = (
            await new JsonRequest()
                .url(`${CONFIG.PETSTORE_URL}pet/${id}`)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
        const apiSpec = await loadAPISpec();
        // @ts-ignore
        const schema = apiSpec.paths!['/pet/{petId}']!['get']!['responses']!['200']!['schema']
        validate(schema, body)
        return body
    }
    async findByStatus(status: string | string[]) {
        return(
            await new JsonRequest()
                .url(`${CONFIG.PETSTORE_URL}pet/findByStatus`)
                .searchParams(new URLSearchParams({ status }))
                .send<operations['findPetsByStatus']['responses']['200']['schema']>()
        ).body
        
    }
 
    

    async addNew(pet: Omit<definitions['Pet'], 'id'>) {
            return(
                await new JsonRequest()
                    .url(`${CONFIG.PETSTORE_URL}pet/`)
                    .method('POST')
                    .body(pet)
                    .send<operations['getPetById']['responses']['200']['schema']>()
            ).body
        }
   
    async update(pet: definitions['Pet']) {
        return(
            await new JsonRequest()
                .url(`${CONFIG.PETSTORE_URL}pet/`)
                .method('PUT')
                .body(pet)
                .send<operations['getPetById']['responses']['200']['schema']>()
        ).body
    }


    
    async delete(id: number | string) {
        return(
            await new JsonRequest()
                .url(`${CONFIG.PETSTORE_URL}pet/${id}`)
                .method('DELETE')
                .send<definitions['ApiResponse']>()
            ).body
        }
    }