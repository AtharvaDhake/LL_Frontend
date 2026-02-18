import React from 'react'
import Topbar from '../Layout/Topbar'
import Navbar from '../Common/Navbar'

const Header = () => {
  return (
    <header className="border-b border-gray-200">
      {/* Topbar */}
      <Topbar />
      <Navbar />
      {/* You can add navigation links or other header content here */}
    </header>
  )
}

export default Header