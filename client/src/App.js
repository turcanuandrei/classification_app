import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastContainer, Zoom } from 'react-toastify';
import { UploadImage } from "./pages/UploadImage";
import { ImageList } from "./pages/ImageList";
import { Navbar } from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <div>
        <Router>
        <Navbar />
          <ToastContainer
            hideProgressBar
            autoClose={3000}
            draggable={false}
            transition={Zoom}

          />
          <div className="container">
            <Switch>
              <Route exact path="/" component={UploadImage} />
              <Route path="/api/images" component={ImageList} />
            </Switch>
          </div>
      </Router>
    </div>
  );
}

export default App;
