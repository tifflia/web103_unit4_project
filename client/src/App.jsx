import React from 'react'
import { useRoutes } from 'react-router-dom'
import Navigation from './components/Navigation'
import ViewIcecreams from './pages/ViewIcecreams'
import EditIcecream from './pages/EditIcecream'
import CreateIcecream from './pages/CreateIcecream'
import IcecreamDetails from './pages/IcecreamDetails'
import './App.css'

const App = () => {
  let element = useRoutes([
    {
      path: '/',
      element: <CreateIcecream title='SCOOP SLING | Customize' />
    },
    {
      path:'/icecreams',
      element: <ViewIcecreams title='SCOOP SLING | Ice Creams' />
    },
    {
      path: '/icecreams/:id',
      element: <IcecreamDetails title='SCOOP SLING | View' />
    },
    {
      path: '/edit/:id',
      element: <EditIcecream title='SCOOP SLING | Edit' />
    }
  ])

  return (
    <div className='app'>

      <Navigation />

      { element }

    </div>
  )
}

export default App
