import React from 'react';
import styled from 'styled-components';

const NewsItemBlock = styled.div`
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
            margin: 0;
            line-height: 1.4;
            white-space: normal;
        }
    }
    & + & {
        margin-top: 2rem;
    }
`;

const NewsItem = ({ article }) => {
    const { title, description, url, urlToImage } = article;
    return (
        <NewsItemBlock>
            {urlToImage && (
                <div className="thumbnail">
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        <img src={urlToImage} alt="thumbnail" />
                    </a>
                </div>
            )}
            <div className="contents">
                <h2>
                    <a href={url} target="_blank" rel="noopener noreferrer">
                        {title}
                    </a>
                </h2>
                <p>{description}</p>
            </div>
        </NewsItemBlock>
    );
};

export default NewsItem;
