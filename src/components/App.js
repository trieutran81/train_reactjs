import React from 'react'
import Button from '../containers/Button';
import NewsItem from '../containers/NewsItem'
import Loading from '../containers/Loading'
class App extends React.Component {
  render() {
    return (
        <div>
        <NewsItem />
     </div>
    )
  }
}
export default App