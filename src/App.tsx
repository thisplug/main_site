import { Contact } from './components/Contact'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { PageBackground } from './components/PageBackground'
import { Projects } from './components/Projects'
import { SkillsMarquee } from './components/SkillsMarquee'
import { WhatIDo } from './components/WhatIDo'
import { LanguageProvider } from './i18n/LanguageContext'

function App() {
  return (
    <LanguageProvider>
      <div className="relative min-h-svh">
        <PageBackground />
        <div className="relative z-10">
          <Header />
          <main>
            <Hero />
            <SkillsMarquee />
            <WhatIDo />
            <Projects />
            <Contact />
          </main>
          <Footer />
        </div>
      </div>
    </LanguageProvider>
  )
}

export default App
