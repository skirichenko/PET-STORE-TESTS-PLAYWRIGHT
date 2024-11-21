
import { strict as assert } from 'assert'
import { PetController } from './api/controller/pet.controller'
import { StoreController } from './api/controller/store.controller'
import { definitions } from '../.temp/types'
import test from '@playwright/test'

const pet  = new PetController
const store = new StoreController 

test.describe('Store', () =>{
    test('should return its inventory and update statuses correctly', async function () {
        const inventory = await store.getInventory()
        assert(Object.keys(inventory).length > 0, 'List must not be empty')

        await pet.addNew(petWithStatus('available'))
        const inventoryWithAvailabeAdded = await store.getInventory()
        assert.equal(inventoryWithAvailabeAdded.available , inventory.available + 1, 'Available value in inestory must increase by 1 ')

        await pet.addNew(petWithStatus('pending'))
        const inventoryWithPendingAdded = await store.getInventory()
        assert.equal(inventoryWithPendingAdded.pending , inventory.pending + 1, 'Pending value in inestory must increase by 1 ')
    
        await pet.addNew(petWithStatus('sold'))
        const inventoryWithSoldAdded = await store.getInventory()
        assert.equal(inventoryWithSoldAdded.sold , inventory.sold + 1, 'Sold value in inestory must increase by 1 ')
    

    })
   
    test('allows to cteate an order and to see it', async function () {
      const order = {
        petId: 1,
        quantity: 1,
        shipDate: new Date().toISOString()
      }
      const placedOrder = await store.placeOrder(order)
      await store.getOrderById(placedOrder.id)
      //assert is done automaticaly by json schema verification

      
    })
})
    
    function petWithStatus(status: definitions['Pet']['status']) {
        return {
            "category": {
          "id": 0,
          "name": "string4"
        },
        "name": "Cat4",
        "photoUrls": [
          "https://test.com/image4.jpg"
        ],
        "tags": [
          {
            "id": 4,
            "name": "string4"
          }
        ],
        status
        }

    }