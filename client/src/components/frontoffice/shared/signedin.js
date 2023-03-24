import React from 'react'
import HeaderFront from './HeaderFront'
import HomeFront from '../HomeFront'
import FooterFront from './FooterFront'
import HeaderSignedInClient from './HeaderSignedInClient'
import CheckUser from '../authentification/CheckUser'


const signedin = () => {
  const token=localStorage.getItem('token'); 

  return (
    <div>
      {token ?(

     
        <>
        <HeaderSignedInClient/>

        <HomeFront/>

        <FooterFront/>
        </>


        ):(
          <CheckUser/>
        )
      }
    </div>
  )
}

export default signedin
