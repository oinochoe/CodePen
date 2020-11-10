import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';

const ItemBlock = styled.div`
    display: flex;
    @media screen and (max-width: 768px) {
        width: 100%;
        display: block;
    }
    .thumbnail {
        margin-right: 1rem;
        img {
            display: block;
            width: 260px;
            height: 200px;
            object-fit: cover;
            -webkit-transition: filter 0.3s;
            transition: filter 0.3s;
            &:hover {
                filter: brightness(1.12);
            }
            @media screen and (max-width: 768px) {
                width: 100%;
                margin-bottom: 0.5rem;
            }
        }
        a {
            display: block;
        }
    }
    .contents {
        display: flex;
        justify-content: center;
        flex-direction: column;
        h2 {
            margin: 0;
            a {
                color: black;
                text-decoration: none;
                &:hover {
                    color: #0c3d6e;
                }
            }
        }
        p {
            margin: 5px 0 0 0;
            line-height: 1.4;
            white-space: normal;
        }
    }
    & + & {
        margin-top: 2rem;
    }
`;

const Item = ({ article }) => {
    const { title, description, url, thumbnail } = article;
    return (
        <ItemBlock>
            {/* thumbnail이 있어야만 iframe도 나오는 것이다.............. */}
            {thumbnail && (
                <div className="thumbnail">
                    <a
                        href={process.env.PUBLIC_URL + url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {/* <img
                            src={process.env.PUBLIC_URL + thumbnail}
                            alt="thumbnail"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    process.env.PUBLIC_URL + '/default.jpg';
                            }}
                        /> */}
                        <Iframe
                            width="400"
                            height="400"
                            url={process.env.PUBLIC_URL + url}
                        />
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a
                        href={process.env.PUBLIC_URL + url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </ItemBlock>
    );
};

export default Item;
