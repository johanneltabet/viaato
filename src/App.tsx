import React, { createContext, lazy, Suspense, useRef } from 'react'

import Navbar from '~/components/layout/Navbar'
import Loader from '~/components/utils/Loader'

import useKeyboardDetection from '~/hooks/useKeyboardDetection'
import userProvider from '~/hooks/userProvider'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteProps,
} from 'react-router-dom'

export const routes: RouteProps[] = [
  { path: '/', component: 'homepage' as any },
  { path: '/profile', component: 'profile' },
  { path: '/settings', component: 'settings' },
]

export const UserContext = createContext({ user: null } as any)

const views = (path: string) => {
  return lazy(() => import(`./views/${path}.tsx`))
}

export default function App() {
  const [user, isLoading] = userProvider()

  const root = useRef<HTMLDivElement>(null)
  useKeyboardDetection(root)

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center">
      <UserContext.Provider value={user}>
        <Router>
          <Navbar />
          {isLoading ? (
            <Loader />
          ) : (
            <Suspense fallback={<Loader />}>
              <Switch>
                {routes.map((route, index) => (
                  <Route
                    exact
                    path={route.path}
                    key={index}
                    render={() => {
                      const Component = !user
                        ? views('login')
                        : views(route.component as any)
                      return <Component />
                    }}
                  />
                ))}
                <Route component={views('notfound')} />
              </Switch>
            </Suspense>
          )}
        </Router>
      </UserContext.Provider>
    </div>
  )
}
