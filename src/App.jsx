import { useState } from 'react'
import classes from './index.module.css'
import Header from './Components/Header.jsx'
import Body from './Components/Body.jsx'
import Msg from './Components/Msg.jsx'
function App() {

  return (
    <>
      <div className={classes.container}>
        <Header/>
        <Body />
        <Msg />
      </div>
    </>
  )
}

export default App
