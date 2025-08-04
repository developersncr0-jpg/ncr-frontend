
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import LoginPage from './components/LoginPage/LoginPage';
import ManagerView from './components/ManagerPage/ManagerView';
import topLogo from './assets/topPage.png';
import FormPage from './components/FormPage/FormPage';
import TrackingPage from './components/TrackingPage/TrackingPage';
import ManagerFormPage from './components/ManagerPage/ManagerFormPage';
// import VerificationPage from './components/VerificationPage/VerificationPage'

function App() {
  

  return (
  
      <div >
      
      <div className="logo-container">
  <img src={topLogo} alt="Top Logo" className="logo-image" />
</div>
          
    

        <main className="main-content">
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/manager" element={<ManagerView />} />
            <Route path="/newForm" element={<FormPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/form/:applicationNumber" element={<ManagerFormPage />} />
            
          </Routes>
        </main>

      
      </div>
 
   ) ;
}

export default App;
