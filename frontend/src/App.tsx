import { Route, Routes } from 'react-router-dom';
import './App.css'
import { Header } from './components/guest/header/Header'
import { Home } from './components/guest/home/Home';
import { Hall } from './components/guest/halls/Hall';
import { Payment } from './components/guest/payment/Payment';
import { Ticket } from './components/guest/payment/Ticket';
import { Main } from './components/admin/Main';
import { Provider } from 'react-redux';
import { store as guestStore } from './components/guest/redux/store/store';
import { store as adminStore } from './components/admin/redux/store/store';
import { Auth } from './components/auth/Auth';

function App() {

  return (
    <> 
        <Provider store={guestStore}>
            <Routes>
                <Route path='/' element={<Header />}>            
                    <Route path='' element={<Home />}/>
                    <Route path='hall/:id' element={<Hall />}/>
                    <Route path='payment' element={<Payment />}/>
                    <Route path='ticket/:id' element={<Ticket />}/>
                </Route>
            </Routes> 
        </Provider>
        <Provider store={adminStore}>
            <Routes>
                <Route path='admin' element={<Main />}/>
                <Route path='auth' element={<Auth />}/>
            </Routes> 
        </Provider>
    </>
  )
}

export default App
