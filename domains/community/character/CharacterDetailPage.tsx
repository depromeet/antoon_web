import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import { useGetUserInformation } from '@apis/user';

import { ArrowRight } from '@assets/icons';
import { StockUpIcon } from '@assets/icons/StockIcon';

import { useToast } from '@hooks/useToast';

import { getToLocaleString } from '@utils/num-util';

import CharacterVoteModal from './CharacterVoteModal';
import CharacterPageCountDown from './CharacterPageCountDown';

import {
  CharacterDetailPageWrap,
  BackgroundColor,
  CharacterProfileImg,
  CharacterName,
  CharacterDataWrap,
  CharacterRank,
  Divider,
  TotalCoinAmount,
  WebtoonInfoWrap,
  WebtoonThumbnailWrap,
  WebtoonThumbnail,
  WebtoonDetailInfoWrap,
  WebtoonTitle,
  WebtoonScore,
  IconWrap,
  ConfirmBtn,
  JoinBtn,
  TotalJoinCount,
} from './CharacterDetailPage.style';

import { CharacterInfo } from '@_types/webtoon-type';

function CharacterDetailPage({ characters }: { characters: CharacterInfo }) {
  const { data: profile } = useGetUserInformation();

  const [wallet, setWallet] = useState(0);

  useEffect(() => {
    profile && setWallet(profile.wallet);
  }, [profile]);

  const router = useRouter();

  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  const [modalStatus, setModalStatus] = useState(false);

  const { fireToast } = useToast();

  const onClickModal = () => {
    if (!profile) {
      fireToast({ joinLeaveStatus: 'NO-LOGIN' });
      setModalStatus(false);
    } else setModalStatus(true);
  };

  const onClickWebtoonInfo = () => {
    router.push(`/webtoon/${characters.webtoonId}`);
  };

  return (
    <>
      {modalStatus && (
        <CharacterVoteModal
          id={characters.id}
          wallet={wallet}
          modalStatus={modalStatus}
          setModalStatus={setModalStatus}
        />
      )}
      <CharacterDetailPageWrap>
        {!isSSR && (
          <>
            <BackgroundColor backgroundColor={characters.backGroundColor} />
            <CharacterProfileImg src={characters.characterThumbnail} />
            <CharacterName>{characters.name}</CharacterName>
            <CharacterDataWrap>
              <CharacterRank>?????? {characters.rank}???</CharacterRank>
              <Divider />
              <TotalCoinAmount>
                ?????? ???????????? {getToLocaleString(characters.coinAmount)}
              </TotalCoinAmount>
            </CharacterDataWrap>
            <WebtoonInfoWrap onClick={onClickWebtoonInfo}>
              <WebtoonThumbnailWrap>
                <WebtoonThumbnail src={characters.webtoonThumbnail} />
                <WebtoonDetailInfoWrap>
                  <WebtoonTitle>{characters.title}</WebtoonTitle>
                  <WebtoonScore>{characters.score}</WebtoonScore>
                </WebtoonDetailInfoWrap>
              </WebtoonThumbnailWrap>
              <IconWrap>
                <ArrowRight />
              </IconWrap>
            </WebtoonInfoWrap>
            <CharacterPageCountDown endTime="" />
            {characters.isJoined ? (
              <ConfirmBtn>????????????</ConfirmBtn>
            ) : (
              <JoinBtn onClick={onClickModal}>
                <StockUpIcon />
                <span>????????????</span>
              </JoinBtn>
            )}

            <TotalJoinCount>
              {getToLocaleString(characters.joinedCount)} ?????? ?????? ???
            </TotalJoinCount>
          </>
        )}
      </CharacterDetailPageWrap>
    </>
  );
}

export default CharacterDetailPage;
