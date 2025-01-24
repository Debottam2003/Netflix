import { Outlet } from 'react-router-dom'
import Footer from './Footer'

function App() {

  return (
    <>
    <div className='landing-page'>
      <h1 className='netflix'>Netflix</h1>
       <Outlet />
    </div>
    <Footer />
    </>
  )
}

export default App
