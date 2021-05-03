import React from 'react'
// import CounterContainer from './containers/CounterContainer'
// import PostListContainer from './containers/PostListContainer'
// import TodosContainer from './containers/TodosContainer'
import { Route } from 'react-router-dom'
import PostListPage from './pages/PostListPage'
import PostPage from './pages/PostPage'

function App () {
  // return (
  //   <div>
  //     {/* <PostListContainer /> */}
  //     {/* <CounterContainer /> */}
  //     {/* <hr />
  //     <TodosContainer /> */}
  //   </div>
  // )
  return (
    <>
      <Route path="/" component={PostListPage} exact />
      <Route path="/:id" component={PostPage} />
    </>
  )
}

export default App
