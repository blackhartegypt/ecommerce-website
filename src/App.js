import {Routes,Route, BrowserRouter} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Header,Footer,ProductDetails } from './components';
import { Home } from './pages'

// import Admin from './pages/admin/Admin';


function App() {
  
  return (
    
   <BrowserRouter>
   <ToastContainer/>
      <Header/>
      <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/productdetails/id" element={<ProductDetails/>}/>
      </Routes>

      <Footer/>
   </BrowserRouter>
   
  );
}

export default App;
