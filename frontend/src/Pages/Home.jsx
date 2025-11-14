import React from 'react'
import Header from '../components/Home/Navbar'
import TopBanner from '../components/Home/TopBanner'
import HeroSection from '../components/Home/Hero'
import About from '../components/Home/Books'
import Contact from '../components/Home/Contact'
import Footer from '../components/Home/Footer'
import Testimonials from '../components/Home/Testimonials'


const Home = () => {
  return (
    <>
        <TopBanner/>
        <Header/>
        <HeroSection/>
        <About/>
        <Testimonials/>
        <Contact/>
        <Footer/>
    </>
  )
}

export default Home