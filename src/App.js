
import {  Route, BrowserRouter, Routes } from "react-router-dom";
import Editor from "./compents/Editor";
function App() {
  return (
    <>
    <BrowserRouter>
    {/* <Router> */}
      <Routes>
      <Route path="/" element={<Editor/>}></Route>
      </Routes>
    {/* </Router> */}
    </BrowserRouter>
    </>
  )
}

export default App
