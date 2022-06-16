import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { Retail } from './components/Retail';
import { Error } from './components/Error';

import { HomeContextProvider } from './context/HomeContext';
import { RetailProvider } from './context/RetailContext';

// import { Login } from './components/Login';
// import { Register } from './components/Register';
// import { Woolie } from './components/Woolie';
// import { Coles } from './components/Coles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={<Layout/>}>
          <Route index element={<HomeContextProvider><Home /></HomeContextProvider>} />

          {/* <Route path="/login" caseSensitive={false} element={<Login />} />
          <Route path="/register" caseSensitive={false} element={<Register />} />
          <Route path="/woolie" caseSensitive={false} element={<Woolie />} />
          <Route path="/coles" caseSensitive={false} element={<Coles />} /> */}
          
          <Route path="/retail" caseSensitive={false} element={<RetailProvider><Retail /></RetailProvider>} />
          <Route path="*" element={<Error />}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
