import { react } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Error from './pages/Error';
import ForgetPassword from './pages/ForgetPassword';
import 'primereact/resources/themes/saga-blue/theme.css'; // PrimeReact theme
import 'primereact/resources/primereact.min.css'; // Core PrimeReact CSS
import 'primeicons/primeicons.css'; // PrimeIcons
import { PrimeReactProvider } from 'primereact/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const value = {
    ripple: true,
  };
  return (
    <PrimeReactProvider value={{ ripple: true }}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/Forget_password' element={<ForgetPassword />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>

    </PrimeReactProvider>
  );
}

export default App;
