import React from 'react'

import AccessDeniedImg from '../assets/img/access-denied.png'

export default function AccessDenied() {
  return (
    <div className='access-denied'>
      <img src={AccessDeniedImg} alt="access denied" />
      <h1>You don't have authorization to view this page</h1>
    </div>
  )
}
