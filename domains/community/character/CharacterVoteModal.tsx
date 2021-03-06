import {
  useRef,
  useCallback,
  useEffect,
  Dispatch,
  SetStateAction,
} from 'react';

import { usePatchCharacterVoteById } from '@apis/webtoons';

import { AntCoinIcon, AntCoinSmallIcon } from '@assets/icons';

import NotEnoughCoin from '@components/modal/coin/NotEnoughCoin';

import {
  Background,
  ModalContainer,
  ModalHeader,
  ModalLogo,
  ModalHeaderTitle,
  ModalTitle,
  ModalInfo,
  ModalCoin,
  ModalCoinText,
  ModalMyCoin,
  MyCoinReserve,
  ModalBtns,
  ModalClose,
  ModalFunc,
} from './CharacterVoteModal.style';

function CharacterVoteModal({
  id,
  wallet,
  modalStatus,
  setModalStatus,
}: {
  id: number;
  wallet: number;
  modalStatus: boolean;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
}) {
  const { mutate: mutateCharacterVote } = usePatchCharacterVoteById(id);

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

  const onClickVote = () => {
    mutateCharacterVote(id as unknown as void);
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

  const isEnoughCoin = wallet <= 4 ? false : true;

  return (
    <Background ref={modalRef}>
      <ModalContainer ref={innerModalRef}>
        {isEnoughCoin ? (
          <>
            <ModalHeader>
              <ModalLogo>
                <AntCoinIcon />
              </ModalLogo>
              <ModalHeaderTitle>5 ????????????</ModalHeaderTitle>
            </ModalHeader>
            <ModalTitle>??????????????? ???????????? ??????????????????????</ModalTitle>
            <ModalInfo>5??????????????? ???????????? ????????? ??? ??? ?????????.</ModalInfo>
            <ModalCoin>
              <ModalCoinText>????????????</ModalCoinText>
              <ModalMyCoin>
                <AntCoinSmallIcon />
                <MyCoinReserve>{wallet}</MyCoinReserve>
              </ModalMyCoin>
            </ModalCoin>
            <ModalBtns>
              <ModalClose onClick={onClickClose}>????????????</ModalClose>
              <ModalFunc onClick={onClickVote}>???????????????</ModalFunc>
            </ModalBtns>
          </>
        ) : (
          <NotEnoughCoin
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
          />
        )}
      </ModalContainer>
    </Background>
  );
}

export default CharacterVoteModal;
