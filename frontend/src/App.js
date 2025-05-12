import logo from './logo.svg';
import './App.css';
import { useContext, useEffect } from 'react'; 
import {Routes , Route} from 'react-router-dom' ;
import Home from './pages/Home'
import Navbar from './components/Navbar';
import Properties from './pages/Properties'
import Builders from './pages/Builders' ;
import PostProperty from './pages/PostProperty' ;
import AboutUs from './pages/AboutUs' ;
import Contact from './pages/Contact' ;
import { propertyContext } from "./context/RealEstateContext";
import Auth from './components/Auth';
import Property from './pages/Property.jsx' ;
import ChangePassword from './components/ChangePassword.jsx';
import ModifyProfile from './components/ModifyProfile.jsx';
import {motion , AnimatePresence} from 'framer-motion' ;
import LikedProperty from './pages/LikedProperty.jsx';
import ChatPage from './pages/ChatPage.jsx';
import MyProperties from './pages/MyProperties.jsx';
import Footer from './components/Footer.jsx';

function App() {

  
  const {authPage , setAuthPage ,  setScrolling , changePasswordComp , modifyProfileComp } = useContext(propertyContext) ;
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 750) {
        setScrolling(true);
      } else {
        setScrolling(false);
      }
    };

    window.addEventListener('scroll' , handleScroll) ;
    return () => {
      window.removeEventListener('scroll'  , handleScroll) ; 
    }
  } , [] ) ;

  return (


    
      <div className="App relative">
      <div className='w-full  h-[55px] bg-black absolute top-0 left-0 z-10  '></div>
      <Navbar/>
      <AnimatePresence>
        {changePasswordComp && <ChangePassword key = "modal" />}
      </AnimatePresence>

      <AnimatePresence>
        {modifyProfileComp && <ModifyProfile key = "modal" />}
      </AnimatePresence>

      <Routes>
        <Route path='/' element = {<Home/>} />
        <Route path='/properties' element = {<Properties/>} />
        <Route path='/builders' element = {<Builders/>} />
        <Route path='/post-property' element = {<PostProperty/>} />
        <Route path='/about' element = {<AboutUs/>} />
        <Route path='/contact' element = {<Contact/>} />
        <Route path = "/view/property/:id" element={<Property/>}/>
        {/* LikedProperty */}
        <Route path = "/view/liked/property" element={<LikedProperty/>}/>
        <Route path = "/chats" element={<ChatPage/>}/>
        <Route path = "/my/properties" element={<MyProperties/>}/>
      </Routes>

      <Footer/>
    </div>
    
  );
}

export default App;
