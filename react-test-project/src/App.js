//import logo from './logo.svg';
//import './App.css';
import Navbar from "./components/Navbar";
//import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import UPLOAD from "./components/pages/Upload";
import Create from "./components/pages/Create";
import Mark from "./components/pages/Mark";
import Review from "./components/pages/Review";
import Download from "./components/pages/Download";
import React from "react";
function App() {

  const [latestCSV, setCSVNAME] = React.useState('apples.csv');
  const updateCSNAME = (newName)=>{setCSVNAME(newName)}

  return (
    // <div className="container">
    //   <h1>
    //     hello
    //   </h1>
    //   <Header title="test"/>
    //   <Header />

    // </div>
    <div>
    <Router>
    <Navbar />
    <Routes>
        <Route exact path='/' element={<UPLOAD change={[updateCSNAME,latestCSV]} csvName={latestCSV}/>} />
        <Route path='/Upload' element={<UPLOAD change={[updateCSNAME,latestCSV]} csvName={latestCSV}/>} />
        <Route path='/Create' element={<Create />} />
        <Route path='/Mark' element={<Mark/>} />
        <Route path='/Review' element={<Review/>} />
        <Route path='/Download' element={<Download/>} />
    </Routes>
    </Router>
    <p> {latestCSV}</p>
    </div>
    
  );
}

export default App;
