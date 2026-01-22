import Navigation from './components/flashclip/Navigation'
import Hero from './components/flashclip/Hero'
import WhyFlashDoc from './components/flashclip/WhyFlashDoc'
import WhatsNew from './components/flashclip/WhatsNew'
import KeyFeatures from './components/flashclip/KeyFeatures'
import Shortcuts from './components/flashclip/Shortcuts'
import PermissionsPrivacy from './components/flashclip/PermissionsPrivacy'
import PerfectFor from './components/flashclip/PerfectFor'
import FAQ from './components/flashclip/FAQ'
import FinalCTA from './components/flashclip/FinalCTA'
import Footer from './components/flashclip/Footer'
import FloatingButton from './components/flashclip/FloatingButton'

function App() {
  return (
    <div className="bg-black text-slate-50 min-h-screen">
      <Navigation />

      <main className="pt-20">
        <Hero />
        <WhyFlashDoc />
        <WhatsNew />
        <KeyFeatures />
        <Shortcuts />
        <PermissionsPrivacy />
        <PerfectFor />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <FloatingButton />
    </div>
  )
}

export default App
