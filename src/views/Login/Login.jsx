import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { shadesOfPurple,  } from "@clerk/themes";

function Login() {
  return (
    // alternative theme - TBD 
    // <div className='flex justify-center items-center w-full h-fit mt-14'>
    //   <SignIn appearance={{
    //   baseTheme: shadesOfPurple,
    //   variables: {colorPrimary : '#f5f3f0', 
    //     colorBackground : "#156874", 
    //     colorInputBackground :"white" , 
    //     colorInputForeground : 'black',
    //     colorWarning : "#156874"
    //   }
    // }} forceRedirectUrl={"/dashboard"} />
    // </div>

    <div className='flex justify-center items-center w-full h-fit mt-10'>
      <SignIn signUpUrl = "/" appearance={{
      theme:"simple" ,
      variables: {colorPrimary : '#156874', 
        colorWarning : "white",
      }
    }} forceRedirectUrl={"/dashboard"} />
    </div>
  )
}

export default Login
