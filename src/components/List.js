import React from 'react';
import styled from 'styled-components';
import Item from './Item';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const ListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.8rem;
        margin-top: 0;
    }
`;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        return axios.get(`http://localhost:3001/${category}`, {
            timeout: 1000,
        });
    }, [category]);

    // 대기중일때
    if (loading) {
        return <ListBlock>대기중...</ListBlock>;
    }
    // 아직 response 값이 설정되지 않았을 때
    if (!response) {
        return null;
    }
    // 에러가 발생했을 때
    if (error) {
        return <ListBlock>에러 발생!</ListBlock>;
    }

    // response 값이 유효할 때
    const { articles } = response.data;
    console.log(articles);
    return (
        <ListBlock>
            {articles.map((article) => (
                <Item
                    key={article.url}
                    article={article}
                    desc={articles.desc}
                />
            ))}
        </ListBlock>
    );
};

export default NewsList;
