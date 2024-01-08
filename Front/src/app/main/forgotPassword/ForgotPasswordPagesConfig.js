import React from 'react'
import ForgotPasswordPage from './ForgotPasswordPage'

const ForgotPasswordPagesConfig = {
    settings: {
        layout: {
          config: {
            navbar: {
              display: false,
            },
            toolbar: {
              display: false,
            },
            footer: {
              display: false,
            },
            leftSidePanel: {
              display: false,
            },
            rightSidePanel: {
              display: false,
            },
          },
        },
      },
    routes : [
        {
            path : 'authentification/motdepasseOublie',
            element : <ForgotPasswordPage/>
        }
    ]
}


export default ForgotPasswordPagesConfig
