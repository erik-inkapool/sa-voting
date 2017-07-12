import React, { Component } from 'react';
import styled from 'styled-components';

const Title = styled.a`
  display: block;
  width: 100%;
`;

const defaultTitle = 'No title (click to edit)';

const CardTitle = ({ onClick, title }) =>
  <Title onClick={onClick}>
    {title ? title : defaultTitle}
  </Title>;

export default CardTitle;
