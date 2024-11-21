import { definitions, operations } from "../../../.temp/types";
import { JsonRequest } from 'http-req-builder';
import { CONFIG } from "../../../config/env";


export class StoreController {

    async getOrderById(id: any) {
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/store/order/${id}`)
            .send<operations['getOrderById']['responses']['200']['schema']>()
        )
        
    }

    async placeOrder(order: Omit<definitions['Order'], 'id'>) {
        return (
            await new JsonRequest()
            .url(`http://localhost/v2/store/order`)
            .method('POST')
            .body(order)
            .send<Required<operations['placeOrder']['responses']['200']['schema']>>()
        ).body
    }
    

    async getInventory() {
        return(
            await new JsonRequest()
            .url(`http://localhost/v2/store/inventory`)
            .send<operations['getInventory']['responses']['200']['schema']>()
        ).body
    }
}
