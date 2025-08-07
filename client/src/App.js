import React from 'react'
import Messenger from './components/Messenger';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AccountProvider } from './context/AccountProvider';

function App() {
  const clientId = '495568468515-vscslqkojj19a961oo67hvkm1nhjtt70.apps.googleusercontent.com'

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider >
      <Messenger/>

      </AccountProvider>
    </GoogleOAuthProvider>
  )
}

export default App
