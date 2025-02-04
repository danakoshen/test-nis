import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TestList from './components/TestList';
import TestForm from './components/TestForm';
import TestView from './components/TestView';
import TestResultsPage from './components/TestResult';
import Login from './components/Login';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<TestList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-test" element={<TestForm />} />
        <Route path="/test/:id" element={<TestView />} />
        <Route path="/results" element={<TestResultsPage />} />
      </Routes>
    </Router>
  );
};

export default App;