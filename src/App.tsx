import { useState, useEffect } from 'react'
import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import MyNavbar from './components/Navbar'
import ChatLayout from './components/menu-item/ChatLayout';
import { initKey } from './vars';

const App: React.FC = () => {
  const [showContent, setShowContent] = useState(true);

  const handleToggle = () => {
    setShowContent((prev) => !prev);
  };

  useEffect(() => {
    initKey();
  }, [])

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