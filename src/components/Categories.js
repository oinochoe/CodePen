import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const categories = [
    {
        name: 'all',
        text: '전체보기',
    },
    {
        name: 'background',
        text: '백그라운드효과',
    },
    {
        name: 'mouseover',
        text: '마우스오버효과',
    },
    {
        name: 'scroll',
        text: '스크롤효과',
    },
    {
        name: 'sidebar',
        text: '사이드바효과',
    },
    {
        name: 'text',
        text: '텍스트효과',
    },
    {
        name: 'etc',
        text: '기타효과',
    },
];

const CategoriesBlock = styled.div`
    display: flex;
    width: 768px;
    margin: 0 auto;
    box-sizing: border-box;
    @media screen and (max-width: 768px) {
        width: 100%;
        overflow-x: auto;
    }
`;

const Category = styled(NavLink)`
    font-size: 1rem;
    cursor: pointer;
    white-space: pre;
    text-decoration: none;
    color: inherit;
    padding: 1rem;
    box-sizing: border-box;

    &:hover {
        color: #495057;
    }

    &.active {
        font-weight: 600;
        border-bottom: 2px solid #22b8cf;
        color: #22b8cf;
        &:hover {
            color: #3bc9db;
        }
    }
`;

const Categories = () => {
    return (
        <CategoriesBlock>
            {categories.map((c) => (
                <Category
                    key={c.name}
                    activeClassName="active"
                    exact={c.name === 'all'}
                    to={
                        c.name === 'all'
                            ? '/News_Feed/'
                            : `/News_Feed/${c.name}`
                    }
                >
                    {c.text}
                </Category>
            ))}
        </CategoriesBlock>
    );
};

export default Categories;
