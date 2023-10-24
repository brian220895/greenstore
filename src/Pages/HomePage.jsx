import React, { useContext } from 'react'
import Navbar from '../components/Navbar'
import Banner from '../components/Banner'
import Main from '../components/Main'
import { AppContext } from '../context/AppProvider'
import Information from '../components/Information'
import Slider from '../components/Slider'

function HomePage() {


  return (
    <div>
    <Navbar/>
    <Banner/>
    <Slider/>
    <Main/>
    <Information/>
    </div>
  )
}

export default HomePage