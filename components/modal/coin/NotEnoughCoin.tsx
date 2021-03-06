import {
  useRef,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';

import { useGetUserInformation } from '@apis/user';

import { AntCoinBigGrayIcon, AntCoinSmallIcon } from '@assets/icons';

import {
  Background,
  ModalContainer,
  ModalClose,
  ModalCoin,
  ModalCoinText,
  ModalHeader,
  ModalHeaderTitle,
  ModalInfo,
  ModalLogo,
  ModalMyCoin,
  ModalTitle,
  MyCoinReserve,
} from './NotEnoughCoin.style';

function NotEnoughCoin({
  modalStatus,
  setModalStatus,
}: {
  modalStatus: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}) {
  const { data: profile } = useGetUserInformation();

  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    profile && setWallet(profile.wallet);
  }, [profile]);

  const modalRef = useRef<HTMLDivElement>(null);
  const innerModalRef = useRef<HTMLDivElement>(null);

  const onClickOutSide = useCallback(
    (event: any) => {
      if (
        modalRef.current!.contains(event.target) &&
        !innerModalRef.current!.contains(event.target)
      ) {
        setModalStatus(false);
      } else {
        setModalStatus(true);
      }
    },
    [setModalStatus],
  );

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);

    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  }, [onClickOutSide]);

  const onClickClose = () => {
    setModalStatus(false);
  };

  useEffect(() => {
    if (modalStatus) {
      document.body.style.cssText = `
          position: fixed; 
          top: -${window.scrollY}px;
          overflow-y: scroll;
          width: 100%;`;

      return () => {
        const scrollY = document.body.style.top;
        document.body.style.cssText = '';
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      };
    }
  }, [modalStatus]);

  return (
    <Background ref={modalRef}>
      <ModalContainer ref={innerModalRef}>
        <ModalHeader>
          <ModalLogo>
            <AntCoinBigGrayIcon />
          </ModalLogo>
          <ModalHeaderTitle>??????????????? ????????????!</ModalHeaderTitle>
        </ModalHeader>
        <ModalTitle>
          ?????? ??????/?????????
          <br />
          ??????????????? ?????? ??? ?????????.
        </ModalTitle>
        <ModalInfo>?????? ???????????? ?????? ???????????? ????????? ??? ?????????.</ModalInfo>
        <ModalCoin>
          <ModalCoinText>????????????</ModalCoinText>
          <ModalMyCoin>
            <AntCoinSmallIcon />
            <MyCoinReserve>{wallet}</MyCoinReserve>
          </ModalMyCoin>
        </ModalCoin>
        <ModalClose onClick={onClickClose}>????????????</ModalClose>
      </ModalContainer>
    </Background>
  );
}

export default NotEnoughCoin;
