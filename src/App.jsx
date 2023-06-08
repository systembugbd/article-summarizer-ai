
import Hero from './components/Hero';
import AISummarizer from './components/AISummarizer';
import './App.css'

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>
      <div className='app'>
        <Hero />
        <AISummarizer />
      </div>
    </main>
  )
}

export default App
