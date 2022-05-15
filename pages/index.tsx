import type { NextPage } from 'next';
import { default as _Home } from '@domains/webtoon/home/Home';
import Header from '@components/layout/Header/Header';
import { QueryClient, dehydrate } from 'react-query';
import {
  useGetWebtoons,
  useGetWebtoonById,
  getWebtoonsRanks,
  getWebtoonsByDay,
  useGetWebtoonsByDay,
} from '@apis/webtoons';
import { webtoons } from '@apis/queryKeys';
import Modal from '@components/modal/onboard/Modal';
import FloatingBtn from '@components/button/FloatingBtn';

const Home: NextPage = () => {
  console.log(
    '        /   |   / | / /___  __// __  // __  / / | / /\n\
       / /| |  /  |/ /  /  /  / / / // / / / /  |/ / \n\
      / /_| | / / | /  /  /  / /_/ // /_/ / / / | /  \n\
     /_/  |_|/_/  |/  /__/   \\____/ \\____/ /_/  |/ ',
  );

  // SSR;
  const { data: webtoons, isSuccess, isLoading, isError } = useGetWebtoons();
  console.log('webtoons', webtoons, isSuccess, isLoading, isError);

  const webtoonId = 1;

  // CSR;
  const { data: webtoon } = useGetWebtoonById(webtoonId);
  console.log('webtoon', webtoon);

  return (
    <>
      <Header leftBtn="logo" rightBtn="menu" accessToken="" />
      <button
        onClick={() => {
          throw new Error('버튼 에러!!!');
        }}
      >
        에러나는 버튼
      </button>
      <Modal />
      <_Home />
      <FloatingBtn />
    </>
  );
};

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  // SSR prefetch
  await queryClient.prefetchQuery(webtoons.ranks(), getWebtoonsRanks);
  await queryClient.prefetchQuery(webtoons.days('금'), () =>
    getWebtoonsByDay('금'),
  );

  return {
    props: {
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  };
}

export default Home;
