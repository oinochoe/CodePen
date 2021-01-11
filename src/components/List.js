import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Item from './Item';
import axios from 'axios';
import Pagination from 'react-js-pagination';
import usePromise from '../lib/usePromise';

const ListBlock = styled.div`
    box-sizing: border-box;
    width: 100%;
    display:flex;
    flex-wrap:wrap;
    margin: 0 auto;
    margin-top: 2rem;
    margin-bottom: 10rem;
    padding:0 2rem;
    @media screen and (max-width: 768px) {
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;
        font-size: 0.8rem;
        margin-top: 0;
    }
    .howmany {
        display:block; position:absolute; right:50%; top:50px; margin-right:-500px;
        input {
            padding:5px;
        }
    }
`;

const Paging = styled.div`
    /*paging*/
    width: 100%;
    margin-top: 60px;
    ul {
        text-align: center;
        font-size: 0;
        li {
            display: inline-block;
            vertical-align: middle;
            min-width: 40px;
            height: 40px;
            box-sizing: border-box;
            text-align: center;
            border-radius: 3px;
            border: 1px solid #cfcfcf;
            margin-left: 10px;
            position: relative;
            &:nth-child(1) {
                margin-left: 0;
            }

            &.active {
                background: #0c3d6c;
                border: 1px solid #0c3d6c;
                a {
                    color: #fff;
                }
            }
            &:not(.disabled):hover {
                border: 1px solid #0c3d6c;
            }
            &.disabled {
                opacity: 0.5;
                a {
                    cursor: not-allowed;
                }
            }

            a {
                display: block;
                padding: 0 5px;
                font-size: 18px;
                font-weight: 400;
                color: #666;
                line-height: 40px;
                user-select: none;
                text-decoration:none;
            }
        }
    }

    /* paging */
    ul li.begin a,
    ul li.prev a,
    ul li.next a,
    ul li.end a {
        font-size: 0;
        position: relative;
        z-index: 10;
    }

    ul li.begin:before,
    ul li.begin:after,
    ul li.prev:before,
    ul li.prev:after,
    ul li.next:before,
    ul li.next:after,
    ul li.end:before,
    ul li.end:after {
        content: '';
        width: 6px;
        height: 6px;
        border: solid #666;
        border-width: 0 0 2px 2px;
        position: absolute;
        z-index: 0;
    }

    ul li.begin:before,
    ul li.begin:after,
    ul li.prev:before,
    ul li.prev:after {
        top: 50%;
        -webkit-transform: rotate(45deg) translateY(-50%);
        -moz-transform: rotate(45deg) translateY(-50%);
        transform: rotate(45deg) translateY(-50%);
    }
    ul li.begin:before {
        left: 11px;
    }
    ul li.begin:after {
        left: 18px;
    }
    ul li.prev:before {
        left: 14px;
    }
    ul li.prev:after {
        display: none;
    }
    ul li.next:before,
    ul li.next:after,
    ul li.end:before,
    ul li.end:after {
        top: calc(50% - 6px);
        to-webkit-transform: rotate(-135deg) translateY(-50%);
        -moz-transform: rotate(-135deg) translateY(-50%);
        transform: rotate(-135deg) translateY(-50%);
    }
    ul li.next:before {
        left: 16px;
    }
    ul li.next:after {
        display: none;
    }
    ul li.end:before {
        left: 13px;
    }
    ul li.end:after {
        left: 19px;
    }

    @media (max-width: 1400px) {
        ul li a {
            font-size: 16px;
        }
    }

    @media (max-width: 1280px) {
        margin-top: 40px;

        ul li {
            min-width: 35px;
            height: 35px;
        }
        ul li a {
            font-size: 15px;
            line-height: 33px;
        }
        ul li.begin:before,
        ul li.begin:after,
        ul li.next:before,
        ul li.next:after,
        ul li.prev:before,
        ul li.prev:after,
        ul li.end:before,
        ul li.end:after {
            width: 5px;
            height: 5px;
            border: solid #000;
            border-width: 0 0 1px 1px;
        }
        ul li.begin:before {
            left: 11px;
        }
        ul li.begin:after {
            left: 16px;
        }
        ul li.prev:before {
            left: 13px;
        }
        ul li.next:before,
        ul li.next:after,
        ul li.end:before,
        ul li.end:after {
            top: calc(50% - 5px);
        }
        ul li.next:before {
            left: 15px;
        }
        ul li.end:before {
            left: 12px;
        }
        ul li.end:after {
            left: 17px;
        }
    }
`;

const List = ({ category }) => {

    const [listLimitNumber, setLimit] = useState(3);
    const [page, setPage] = useState(1);
    const [totalCnt, setTotalCnt] = useState(0);
    const [categoryChange, setCategory] = useState('background');
    // const [articles, setArticles] = useState([]);

    const onChangePage = (pageChange) => {
        setPage(pageChange);
    };

    const onChange = (e) => {
        setLimit(e.target.value);
    }

    if(categoryChange !== category){
        setTimeout(() => {
            onChangePage(1);
        }, 100);
    }

    const [loading, response, error] = usePromise(() => {
        return axios.get(`/${category}`, {
            timeout: 1000,
        });
    }, [category, page]);

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

    const { articles } = response.data;
    setTimeout(() => {
        setTotalCnt(articles.length);
        setCategory(category);
    }, 100);
    // console.log(articles);
    // console.log(Array.from(articles).slice(listLimitNumber * page - listLimitNumber, listLimitNumber * page))

    return (
        <ListBlock>
            <label className="howmany">
                <span>Visible : </span>
                <input
                    type="number"
                    value={listLimitNumber}
                    onChange={onChange}
                    minLength="1"
                    maxLength="2"
                    min="1"
                    max="10"
                />
            </label>
            {Array.from(articles)
                .slice(
                    listLimitNumber * page - listLimitNumber,
                    listLimitNumber * page,
                )
                .map((article) => (
                    <Item
                        key={article.url}
                        article={article}
                        desc={articles.desc}
                    />
                ))}
            <Paging>
                <Pagination
                    onChange={onChangePage}
                    itemsCountPerPage={listLimitNumber}
                    totalItemsCount={totalCnt}
                    pageRangeDisplayed={5}
                    activePage={page}
                    itemClassFirst="begin"
                    itemClassPrev="prev"
                    itemClassNext="next"
                    itemClassLast="end"
                />
            </Paging>
        </ListBlock>
    );
};

export default List;
