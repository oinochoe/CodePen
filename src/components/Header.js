import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: .5rem;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #092d52, #0e4a85);
    color: #fff;
    font-size: 1.2rem;
`;

const HeaderWrap = () => {
    setTimeout(() => {
        var iframe = document.querySelectorAll('iframe');

        iframe.forEach((el) => {
            var iframeBody = el.contentWindow.document.body;
            var script = document.createElement('script');
            script.src = `${process.env.PUBLIC_URL}/stop_animation.js`;

            iframeBody.appendChild(script);
        });
    }, 1500);
    return <Header>Interactions</Header>;
};

export default HeaderWrap;
