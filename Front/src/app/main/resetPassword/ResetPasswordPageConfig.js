import React from 'react'
import ResetPasswordPage from './ResetPasswordPage'

const ResetPasswordPageConfig = {
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
            path : 'authentification/resetPassword/:token',
            element : <ResetPasswordPage/>
        }
    ]
}

export default ResetPasswordPageConfig
