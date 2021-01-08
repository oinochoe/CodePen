import React from 'react';
import styled from 'styled-components';
import Iframe from 'react-iframe';

const ItemBlock = styled.div`
    position: relative;
    display: block;
    text-align: center;
    width: 33.33%;
    flex: 0 0 33.33%;

    iframe {
        position: relative;
        width: 100%;
        overflow: hidden;
        margin: 0 auto;
    }

    .goLink {
        display: none;
        position: absolute;
        right: 20px;
        top: 15px;
        z-index: 99;
        width: 40px;
        height: 40px;
        background: #000 url(${process.env.PUBLIC_URL}/new_window.png) no-repeat center center;
        opacity:.7;
        transition:opacity .3s;

        &:hover {
            opacity:1;
        }
    }

    &:hover .goLink {
        display:block;
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        display: block;
    }
    .thumbnail {
        padding: 0 0.5rem;
        /* img {
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
        } */
    }
    .contents {
        display: flex;
        justify-content: center;
        flex-direction: column;
        margin-top: 0.5rem;
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
    &:nth-of-type(3) ~ & {
        margin-top: 2rem;
    }
`;


const Item = ({ article }) => {
    const { title, description, url, thumbnail } = article;

    const goLink = (event) => {
        console.log(event);
    }

    var iframe = document.querySelectorAll('iframe');
    console.log(iframe)

    return (
        <ItemBlock>
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
                        <i className='goLink' onClick={goLink}></i>
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
