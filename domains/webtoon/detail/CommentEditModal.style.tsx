import styled from '@emotion/styled';

const Background = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 99999;
  background-color: rgb(0 0 0 / 50%);
`;

const ModalContainer = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transform: translate(-50%, -50%);
  transition: all 300ms ease-in-out;
  border-radius: 1rem;
  background: white;
  width: 31.2rem;
  height: 15.2rem;
  user-select: none;

  button:nth-of-type(1) {
    margin: 0 0 0.8rem;
  }
`;

const ModalBtn = styled.button<{ status: string }>`
  border-radius: 1rem;
  background-color: ${(props) =>
    props.status === 'EDIT'
      ? props.theme.colors.grayscale.gray_1000
      : props.theme.colors.grayscale.gray_200};
  width: 26.4rem;
  height: 4.8rem;
  color: ${(props) =>
    props.status === 'EDIT'
      ? props.theme.colors.basic.white
      : props.theme.colors.grayscale.gray_800};
  font-size: 1.6rem;
  font-weight: 600;
`;

const DeleteText = styled.p`
  margin: 0 0 2.4rem;
  color: ${(props) => props.theme.colors.grayscale.gray_1000};
  font-size: 1.6rem;
  font-weight: 700;
`;

const DeleteBtnWrap = styled.div`
  button:nth-of-type(1) {
    margin: 0 0.8rem 0 0;
  }
`;

const DeleteConfirmBtn = styled.button<{ status: string }>`
  border-radius: 1rem;
  background-color: ${(props) =>
    props.status === 'CANCEL'
      ? props.theme.colors.grayscale.gray_200
      : props.theme.colors.secondary.red};
  width: 12.8rem;
  height: 4.8rem;
  color: ${(props) =>
    props.status === 'CANCEL'
      ? props.theme.colors.grayscale.gray_800
      : props.theme.colors.basic.white};
  font-size: 1.6rem;
  font-weight: 500;
`;

export {
  Background,
  ModalContainer,
  ModalBtn,
  DeleteText,
  DeleteBtnWrap,
  DeleteConfirmBtn,
};
