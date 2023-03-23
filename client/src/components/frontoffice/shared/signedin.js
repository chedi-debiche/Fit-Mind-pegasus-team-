import React from 'react'
import HeaderFront from './HeaderFront'
import HomeFront from '../HomeFront'
import FooterFront from './FooterFront'
import HeaderSignedInClient from './HeaderSignedInClient'
import { Link } from 'react-router-dom';
import requireAuth from '../authentification/requireAuth'

const signedin = () => {
  return (
    <div>

        <HeaderSignedInClient/>

        <HomeFront/>

        <FooterFront/>


      
    </div>
  )
}
// export default signedin;

 export default requireAuth(signedin);
