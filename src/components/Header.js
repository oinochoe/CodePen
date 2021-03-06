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
    try {
        setTimeout(() => {
            var iframe = document.querySelectorAll('iframe');

            iframe.forEach((el) => {
                if (!el.contentWindow) {
                    return;
                }
                var iframeBody = el.contentWindow.document.body;
                var script = document.createElement('script');
                script.src = `${process.env.PUBLIC_URL}/stop_animation.js`;

                if(!iframeBody) {
                    return;
                }
                iframeBody.appendChild(script);
            });
        }, 2000);
    } catch (e) {
        console.log('error of iframe stop' + e);
    }
    return <Header>Interactions</Header>;
};

export default HeaderWrap;
