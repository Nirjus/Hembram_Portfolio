import React from 'react'
import Header from './_components/header'
import Hero from './_components/Hero/Hero'
import Skills from './_components/Skils/Skills'
import Projects from './_components/Projects/Projects'
import Services from './_components/Services/services'
import Footer from './_components/Footer'

const page = () => {
  return (
    <div className='main-background'>
      <section id='home'>
        <Header />
      </section>
      <section id='home'>
         <Hero />
      </section>
      <section id='skills'>
         <Skills />
      </section>
      <section id='project'>
        <Projects />
      </section>
      <section id='services'>
     <Services />
      </section>
<Footer />
    </div>
  )
}

export default page