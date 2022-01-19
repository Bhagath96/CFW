import React from 'react';
import styled from 'styled-components';
import Avatar from '@material-ui/core/Avatar';
import { useTheme } from '@material-ui/core';

const SizedAvatar = styled(Avatar)`
  ${({ height, width, theme }) => `
    width: ${theme.spacing(width)}px; 
    height: ${theme.spacing(height)}px; 
  `};
`;

const CustomAvatar = (props) => {
  const { height = 8, width = 8, alt = '', src = '', ...rest } = props;

  return <SizedAvatar
    theme={useTheme()}
    height={height}
    width={width}
    alt={alt}
    src={src}
    {...rest}
  />;
};

export default CustomAvatar;
