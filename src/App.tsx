import { useState, useEffect } from 'react'
import './App.css'
import { NextUIProvider } from '@nextui-org/react'
import MyNavbar from './components/Navbar'
import ChatLayout from './components/menu-item/ChatLayout';
import ImageLayout from './components/menu-item/ImageLayout';

const App: React.FC = () => {
  const [showChatLayout, setShowChatLayout] = useState(true);

  const onMenuChange = (key: string) => {
    console.log('xxxxx = ' + key)
    setShowChatLayout(key === 'ai_chat')
  }

  return (
    <NextUIProvider>
      <MyNavbar onMenuChange={onMenuChange} />
      <div className="mycontent">
        {showChatLayout ? <ChatLayout /> : <ImageLayout />}
      </div>
    </NextUIProvider>
  )
}

export default App