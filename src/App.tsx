import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
/* import { Favorites } from './pages/Favorites'; */
import { FormSignin } from './components/FormSignin';
import { FormSignup } from './components/FormSignup';

function App() {
  return (
    <Routes>
      <Route index element={<FormSignin />} />
      <Route path="/signup" element={<FormSignup />} />
      <Route path="/home" element={<Home />} />
      {/* <Route path='/favorites' element {<Favorites />} /> */}
    </Routes>

  );
}

export default App;
