import React from 'react'
import HeaderFront from './HeaderFront'
import HomeFront from '../HomeFront'
import FooterFront from './FooterFront'
import HeaderSignedInClient from './HeaderSignedInClient'
import { Link } from 'react-router-dom';


const signedin = () => {
  return (
    <div>

        <HeaderSignedInClient/>

        <HomeFront/>

        <FooterFront/>


      
    </div>
  )
}

export default signedin
