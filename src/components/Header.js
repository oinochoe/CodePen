import React from 'react';
import styled from 'styled-components';

const Header = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1.5rem;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #092d52, #0e4a85);
    color: #fff;
    font-size: 1.2rem;
`;

const HeaderWrap = () => {
    return <Header>UI Interactions</Header>;
};

export default HeaderWrap;
