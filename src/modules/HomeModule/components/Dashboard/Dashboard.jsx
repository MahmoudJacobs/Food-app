import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import homeImg from "../../../../assets/images/eating-food.png"
import FillandShow from '../../../SharedModule/components/FillandShow/FillandShow'

export default function Dashboard() {
  return (
    <div>
      <Header title={'Welcome mahmoud'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} imgUrl={homeImg}/>
      <br/>
      <FillandShow />
    </div>
  )
}
