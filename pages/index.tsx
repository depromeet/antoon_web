import type { NextPage } from 'next';
import { useEffect } from 'react';
import { Mixpanel } from 'mixpanel';

import Header from '@components/layout/Header/Header';
import Modal from '@components/modal/onboard/Modal';
import { default as _Home } from '@domains/webtoon/home/Home';
import FloatingBtn from '@components/button/FloatingBtn';

import { useGetUserInformation } from '@apis/user';

const Home: NextPage = () => {
  useEffect(() => {
    Mixpanel.track('페이지 진입', {
      page: '홈 페이지',
    });
  }, []);

  const { data: user } = useGetUserInformation();

  return (
    <>
      {user ? (
        <Header leftBtn="logo" rightBtn="menu" imageUrl={user.imageUrl} />
      ) : (
        <Header leftBtn="logo" rightBtn="menu" />
      )}
      <Modal />
      <_Home />
      <FloatingBtn />
    </>
  );
};

export default Home;
