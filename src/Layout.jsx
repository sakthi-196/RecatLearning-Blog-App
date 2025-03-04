import Header from './Header.jsx'
import Nav from './Nav.jsx';
import Footer from './Footer.jsx';
import { Outlet } from 'react-router-dom';
const Layout = () => {
  return (
    <div className='App'>
      <Header 
        title='React Js Blog'
      />
      <Nav/>
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
