import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App = () => {
    return (
        <BrowserRouter>
            <Route path="/News_Feed/:category?" component={NewsPage} />
            {/* <Route path="/animation/" component={NewsArticle} /> */}
        </BrowserRouter>
    );
};

export default App;
