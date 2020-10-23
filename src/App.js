import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/:category?" component={ListPage} />
        </BrowserRouter>
    );
};

export default App;
