import { PetController } from './api/controller/pet.controller';
import {strict as assert} from 'assert'; 
//import assert, { deepEqual } from 'assert';
import { definitions } from '../.temp/types'
import { operations } from '../.temp/types'
import test from '@playwright/test';



const pet = new PetController()

test.describe('User can', function () {
  test('receive pet by its ID', async function () {
    const response = await pet.getById(1)
    assert(response.id == 1, `Expected ID 1 , but got ${response.id}`)

  });

  test('receive pet by its status', async function () {
    let data = await pet.findByStatus('available')
     assert(data.length > 0)
     data = await pet.findByStatus('pending')
     assert(data.length > 0) 
     data = await pet.findByStatus('sold')
     assert(data.length > 0) 
     data = await pet.findByStatus(['available', 'pending'])
     assert(data.length > 0)
     assert(data.some(pet => pet.status == 'available'))
     assert(data.some(pet => pet.status == 'pending'))
     assert(!data.some(pet => pet.status == 'sold'))

  })

  test('Add, Update or Delete', async function () {
    const petToCreate: Omit<definitions['Pet'], 'id'> = {
      "category": {
          "id": 0,
          "name": "string"
        },
        "name": "Cat",
        "photoUrls": [
          "https://test.com/image.jpg"
        ],
        "tags": [
          {
            "id": 0,
            "name": "string"
          }
        ],
        "status": "available"
      }
      const addedPet = await pet.addNew(petToCreate)
      //console.log('ID added:  ', addedPet.id  );
      
      assert.deepEqual(addedPet, {
        ... petToCreate, 
        id: addedPet.id
      }, `Error: Created Pet data does not match to expected`)
      assert(typeof(addedPet.id) == 'number', 'id must be present in response')

      let foundAddedPet = await pet.getById(addedPet.id) 
      //console.log("foundAddedPet: ", foundAddedPet)
      assert.deepEqual(foundAddedPet, {
        ... petToCreate, 
        id: addedPet.id
      }, `Error: Found Pet data does not match to expected`)

      let changedPet: definitions['Pet'] = {
        "id": addedPet.id,
        "category": {
          "id": 0,
          "name": "string2"
        },
        "name": "Cat2",
        "photoUrls": [
          "https://test.com/image2.jpg"
        ],
        "tags": [
          {
            "id": 1,
            "name": "string2"
          }
        ],
        "status": "pending"
      }

      
      //console.log('changedPet: ', changedPet)
      const updatedPet = await pet.update(changedPet)
      console.log(updatedPet.id, "Updated pet ID")

      assert.deepEqual(updatedPet, changedPet, `Updated Pet data does not match to expected`)

      await pet.delete(addedPet.id)
      //TODO: assert 404 error to attempt delete non-existing pet

    })
     
})


