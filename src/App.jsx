import Header from './components/Header/Header'
import Newsfeed from './components/Newsfeed/Newsfeed'
import Stats from './components/Stats/Stats'

function App() {

  return (
    <div className="app">
      <div className="app__header">
        <Header />
      </div>
      <div className="app__body">
        <div className="app__container">
          <Newsfeed />
          <Stats />
        </div>
      </div>
    </div>
  )
}

export default App
