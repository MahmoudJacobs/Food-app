import React from 'react'
import Header from '../../../SharedModule/components/Header/Header'
import homeImg from "../../../../assets/images/eating-food.png"

export default function Dashboard() {
  return (
    <>
      <Header title={'Welcome mahmoud1'} description={'This is a welcoming screen for the entry of the application , you can now see the options'} imgUrl={homeImg}/>
    </>
  )
}
