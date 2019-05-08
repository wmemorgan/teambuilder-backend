const uuidv4 = require('uuid/v4')

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
      message: `item not found`
    })
  }
}

const addRecord = (record, arr) => {
  if (record) {
    let newRecord = {
      id: uuidv4(),
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
  if (Number(id) === Number(record.id)) {
    let updatedArr = arr.map(item => {
      if (Number(id) === Number(item.id)) {
        return record
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