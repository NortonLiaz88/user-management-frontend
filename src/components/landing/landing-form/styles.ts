import styled from 'styled-components';

export const Form = styled.div`
  flex: 1;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;

  padding: 4.4rem;

  box-sizing: border-box;

  max-width: 80%;
  position: absolute;
  min-width: 60rem;
  /* height: 80%;  */
  left: -8rem;
  top: 12rem;

  background: linear-gradient(
    146.54deg,
    rgba(255, 255, 255, 0.4) 3.3%,
    rgba(255, 255, 255, 0) 93.53%
  );
  box-shadow: 0px 4px 24px -1px rgba(113, 113, 113, 0.25);
  backdrop-filter: blur(20px);
  /* Note: backdrop-filter has minimal browser support */

  border-radius: 8px;

  @media (max-width: 980px) {
    position: absolute;
    margin-left: auto;
    margin-right: auto;
    left: 0;
    right: 0;
    text-align: center;
  }

  @media (max-width: 600px) {
    /* padding: 0px; */
    height: 100%;
    top: 0px;
    min-width: unset;
  }
`;

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h1`
  font-family: ${({theme}) => theme.fonts.secondaryRegular};

  font-size: 2.4rem;
  line-height: 5rem;
  /* identical to box height */
  letter-spacing: 0.25px;

  color: #000;
`;

export const Subtitle = styled.h2`
  font-family: ${({theme}) => theme.fonts.secondaryRegular};

  font-size: 1.8rem;
  line-height: 2.7rem;
  text-align: center;
  letter-spacing: 0.5px;
  word-wrap: break-word;
  /* Texto/Cinza 70 */

  color: ${({theme}) => theme.colors.grey70};
`;

export const CoreContainer = styled.div`
  display: flex;
  flex: 1;
  width: 100%;

  justify-content: center;
`;
