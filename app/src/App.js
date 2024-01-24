import './App.css';
import Nav from './components/Navbar';
import Signup from './components/Signup';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import PrivateComponent from './components/PrivateComponent'
import Login from './components/Login'
import AddProduct from './components/AddProduct';
import ProductList from './components/ProductList';
import DocumentList from './components/DocumentList';
import UpdateProduct from './components/UpdateProduct';
import UploadDocument from './components/UploadDocument';
import Example from './components/Example';
import './';
import  Sidebar  from './components/Sidebar';

function App() {
  return (
    <div className="App">

 {/* hello bro */}

 <BrowserRouter>
        <Nav />
        <Routes>
          {/* PrivateComponent protects these routes */}
          <Route
            path="/"
            element={<PrivateComponent />}>
            {/* <Route path="/" element={<ProductList />} /> */}
            <Route path="/" element={<DocumentList />} />
          
            <Route path="/upload" element={ <UploadDocument/>} />
             
            <Route path="/sidebar" element={ <Sidebar/>} />
            <Route path="logout" element={<h1>Logout Component</h1>} />
            <Route path="profile" element={<h1>Profile Component</h1>} />
            <Route path="example" element={<Example/>} />
          </Route>
          {/* Public route accessible to all */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
        </Routes>
      </BrowserRouter>
     
      {/* <Footer /> */}


    </div>
  );
}

export default App;
