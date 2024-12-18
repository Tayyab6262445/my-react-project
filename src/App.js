import { BrowserRouter, Route, Routes } from 'react-router-dom'
import {Home,Editor_page} from './Pages/index'
import { Toaster } from 'react-hot-toast'
export default function App() {
  

  return (
    <>
    <div>
      <Toaster
      position='top-right'
      toastOptions={{
        success:{
          theme:{
            primary:'#4aed88'
            
          },
        },
      }}
      >

      </Toaster>
    </div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} ></Route>
          <Route path='/editor/:roomId'  element={<Editor_page />} >   </Route>
        </Routes>
      
      
      </BrowserRouter>
    </>
  )
}