import styled from 'styled-components';

const FullscreenBackground = styled.div`
background-size:contain;
background-position:top;
height : 100% !important;
`;

const ImgFull = styled.div`
  position: relative;
  margin-top: 120px;
`;

const TextColor = styled.div`
 background: #e4e4e4;
 border-radius:9px;
 `;


const backgroundFinalStyle = {
  fullscreenBackground: { ...FullscreenBackground },
  imageFull: { ...ImgFull },
  textColor: { ...TextColor }
};

export default backgroundFinalStyle;
