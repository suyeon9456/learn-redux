const myLogger = store => next => action => {
  console.log(action)
  console.log('\tPrev', store.getState())
  const result = next(action) // action을 다음 middleware 에게 전달 다음 middleware가 없다면 reducer에게 전달
  console.log('\tNext', store.getState())
  return result
}

export default myLogger
