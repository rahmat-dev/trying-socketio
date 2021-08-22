import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Home';
import MovieDetail from './MovieDetail';

const App = () => (
  <Router>
    <Switch>
      <Route path="/movie/:movieId">
        <MovieDetail />
      </Route>
      <Route path="/">
        <Home />
      </Route>
    </Switch>
  </Router>
);

export default App;
