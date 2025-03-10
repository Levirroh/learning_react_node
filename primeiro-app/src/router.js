import { BrowserRouter, Routes, Route} from 'react-router-dom';


import Home from './Pages/Home';
import Sobre from './Pages/Sobre';

function RoutesApp(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Home/>} />
                <Route path="/sobre" element={ <Sobre/>} />
            </Routes>
        </BrowserRouter>

    );
}
export default RoutesApp;