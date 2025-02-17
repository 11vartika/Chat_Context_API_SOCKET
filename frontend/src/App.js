import './App.css';
import {  Route, Routes } from 'react-router-dom';
import Homepage from './pages/homePage';
import ChatPage from './pages/chatPage';


function App() {
  return (
    <div className="App">
      
          <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/chats' element={<ChatPage />} />
          </Routes>
       
    </div>
  );
}

export default App;
