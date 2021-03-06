import React, { useState } from 'react'

import LoginForm from '~/components/user/Login'
import RegisterForm from '~/components/user/Register'

export default function Login() {
  const [isRegister, setIsRegister] = useState(false)
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="relative bg-white max-w-md w-96 space-y-8 px-8 py-10 border rounded-lg">
        <h2 className="my-4 text-center text-3xl font-extrabold text-gray-900">
          {isRegister ? 'Create an account' : 'Sign In'}
        </h2>
        {isRegister ? <RegisterForm /> : <LoginForm />}
        <p className="mt-2 text-center text-sm text-gray-600">
          Or&nbsp;
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="focus:outline-none font-medium text-indigo-600 hover:text-indigo-500"
          >
            {!isRegister
              ? 'Create a new account'
              : 'Sign in with your account'}
          </button>
        </p>
      </div>
    </div>
  )
}
