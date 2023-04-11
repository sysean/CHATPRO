import { useState } from 'react'
import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import MyNavbar from './components/Navbar'
import { FaHome, FaHdd } from "react-icons/fa";
import ChatLayout from './components/menu-item/ChatLayout';

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(true);

  const handleToggle = () => {
    setShowContent((prev) => !prev);
  };

  return (
    <NextUIProvider>
      <MyNavbar onToggle={handleToggle} />
      <div className="mycontent">
        <ChatLayout />
      </div>
    </NextUIProvider>
  )
}

export default App