// Helper functions
const autoIncrement = arr => {
  console.log(`autoincrement array last element ID + 1: `, arr[arr.length-1].id + 1)
  let newId = arr[arr.length - 1].id + 1
  console.log(`autoIncrement newId: `, newId)
  return newId
}

// Database functions
const findAll = (arr) => {
  return Promise.resolve(arr)
}

const findById = (id, arr) => {
  // Find record in array
  const record = arr.find(item => item.id === Number(id))
 
  // Return promise based on results
  if (record) {
    return Promise.resolve(record)
  } else {
    return Promise.reject({
      code: 404,
      message: `Item ID ${id} not found`
    })
  }
}

const addRecord = (record, arr) => {
  if (record) {
    let newRecord = {
      id: autoIncrement(arr),
      ...record,
      createdAt: new Date().toISOString()
    }
    arr.push(newRecord)
    return Promise.resolve(arr)
  } else {
    return Promise.reject({
      code: 400,
      message: `Invalid update`
    })
  }
}

const deleteRecord = (id, arr) => {
  if (id >= 0) {
    let updatedArr = arr.filter(item => item.id !== Number(id))
    return Promise.resolve(updatedArr)
  } else {
    return Promise.reject({
      code: 500,
      message: `Record not deleted`
    })
  }
}

const updateRecord = (id, record, arr) => {
  let recordSearch = arr.find(item => item.id === Number(id))
  if (Number(id) === Number(recordSearch.id)) {
    let updatedRecord = {...recordSearch, ...record }
    let updatedArr = arr.map(item => {
      if (item.id == id) {
        return updatedRecord
      }
      else  {
        return item
      }
    })
    return Promise.resolve(updatedArr)
  } else {
    return Promise.reject({
      code: 400,
      message: `Record not updated`
    })
  }
}

module.exports = {
  findAll,
  findById,
  add: addRecord,
  remove: deleteRecord,
  update: updateRecord
}