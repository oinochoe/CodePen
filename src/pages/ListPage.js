import React from 'react';
import Header from '../components/Header';
import Categories from '../components/Categories';
import List from '../components/List';

export const ListPage = ({ match }) => {
    const category = match.params.category || 'background';

    return (
        <>
            <Header />
            <Categories />
            <List category={category} />
        </>
    );
};

export default ListPage;
