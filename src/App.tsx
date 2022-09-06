import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { MyNote } from './components/MyNote';
import { Error } from './components/Error';

import { HomeContextProvider } from './context/HomeContext';
import { MyNotesProvider } from './context/MyNotesContext';
import { MyNoteWrapper } from "./components/MyNoteWrapper";
import { Auth } from "./components/Auth";

// import { Login } from './components/Login';
// import { Register } from './components/Register';
// import { Woolie } from './components/Woolie';
// import { Coles } from './components/Coles';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" caseSensitive={false} element={<Layout/>}>
          <Route index element={<HomeContextProvider><Home/></HomeContextProvider>}/>
          <Route path="/mynote" caseSensitive={false} element={<MyNotesProvider><MyNoteWrapper/></MyNotesProvider>}>
            <Route path="/mynote" caseSensitive={false} element={<Auth/>}/>
            <Route path="/mynote/docket" caseSensitive={false} element={<MyNote/>}>
            </Route>
          </Route>
          <Route path="*" element={<Error/>}/>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
