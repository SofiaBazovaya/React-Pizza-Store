import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import './scss/app.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFound/NotFoundPage';
import CartPage from './pages/CartPage';
import AboutPage from './pages/About/AboutPage';
import DeliveryPage from './pages/Delivery/DeliveryPage';
import ContactsPage from './pages/Contacts/ContactsPage';
import Footer from './components/Footer/Footer';
import { SearchContext } from './context/SearchContext';


function App() {
  const [searchValue, setSearchValue] = useState('')

return (
    <div className="wrapper">
      <SearchContext.Provider value={{searchValue, setSearchValue}}>
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/about" element={<AboutPage />} />
        <Route path="/delivery" element={<DeliveryPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
      </SearchContext.Provider>
      <Footer/>
    </div>
  );
}

export default App
