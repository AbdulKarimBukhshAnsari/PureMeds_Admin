import { SignIn } from '@clerk/clerk-react'
import React from 'react'
import { shadesOfPurple,  } from "@clerk/themes";

function Login() {
  return (
    <div className='flex justify-center items-center w-full h-fit mt-20'>
      <SignIn signUpUrl = "/" 
      
      appearance={{
        // hiding SignUp and Google Buttons 
        elements : {
          footerAction : {display : "none"}, // for Signup
          socialButtons : {display : 'none'}, // for Google SignIn
          dividerRow : {display : "none"} // for Row Divider 
        },
      theme:"simple" ,
      variables: {colorPrimary : '#156874', 
        colorWarning : "white",
      }
    }} forceRedirectUrl={"/dashboard"} 
    />
    </div>
  )
}

export default Login
