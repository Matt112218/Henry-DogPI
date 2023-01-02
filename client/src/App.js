import "./App.css";
import Landing from "./Components/Landing/landing";
import Home from "./Components/Home/home";
import Navbar from "./Components/Navbar/navbar";
import Detail from "./Components/Detail/Detail";
import { Route } from "react-router-dom";
import CreateForm from "./Components/CreateForm/CreateForm";
import NotFound from "./Components/notFound/NotFound";

function App() {
  return (
    <div className="App">
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/home">
        <Navbar className="appNavbar" />
      </Route>
      <Route exact path="/home">
        <Home className="appHome" />
      </Route>
      <Route path="/detail/:id">
        <Detail />
      </Route>
      <Route path="/home/create">
        <CreateForm />
      </Route>
      <Route path="/home/error">
        <NotFound />
      </Route>
    </div>
  );
}

export default App;
