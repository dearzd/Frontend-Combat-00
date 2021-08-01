import Content from './content';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

export default function Root(props) {
  // return <section>{props.name} is mounted!</section>;
  // return <Content />;
  return (
    <Router>
      <Switch>
        <Route path="/content/:id" component={Content} />
      </Switch>
    </Router>
  );
}
