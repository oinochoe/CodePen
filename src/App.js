import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ListPage from './pages/ListPage';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/List_Feed/:category?" component={ListPage} />
            {/* <Route path="/List_Feed/animation" component={ViewPage} /> */}
        </BrowserRouter>
    );
};

export default App;
