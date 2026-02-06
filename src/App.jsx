import { Route, Routes } from 'react-router-dom';
import './scss/app.scss';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import CartPage from './pages/CartPage';

function App() {
return (
    <div className="wrapper">
      <Header/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
      </Routes>
    </div>
  );
}

export default App
