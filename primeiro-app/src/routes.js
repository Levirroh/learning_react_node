
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Sobre from './Pages/Sobre';
import Contato from './Pages/Contato';


function RoutesApp(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home/> } />
        <Route path="/sobre" element={ <Sobre/> } />
        <Route path="/contato" element={ <Contato/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default RoutesApp;