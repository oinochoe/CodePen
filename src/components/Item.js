import React from 'react';
import styled from 'styled-components';

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
            width: 160px;
            height: 100px;
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
            {thumbnail && (
                <div className="thumbnail">
                    <a
                        href={process.env.PUBLIC_URL + url}
                        rel="noopener noreferrer"
                        target="_blank"
                    >
                        <img
                            src={process.env.PUBLIC_URL + thumbnail}
                            alt="thumbnail"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                    process.env.PUBLIC_URL +
                                    '/animation/background/배경이미지겹칩(이동효과)/img/tumblr_p7n8kqHMuD1uy4lhuo1_540.png';
                            }}
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
