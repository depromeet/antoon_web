import type { InferGetServerSidePropsType, NextPage } from 'next';
import { default as _Home } from '@domains/webtoon/home/Home';
import Header from '@components/layout/Header';
import { useState } from 'react';

interface Product {
  id: string;
  name: string;
  quantity: number;
}

interface Review {
  id: string;
  author: string;
  content: string;
}

const Home = ({
  product,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  console.log(
    '        /   |   / | / /___  __// __  // __  / / | / /\n\
       / /| |  /  |/ /  /  /  / / / // / / / /  |/ / \n\
      / /_| | / / | /  /  /  / /_/ // /_/ / / / | /  \n\
     /_/  |_|/_/  |/  /__/   \\____/ \\____/ /_/  |/ ',
  );

  const [reviews, setReviews] = useState<Review[]>([]);

  const handleGetReview = () => {
    fetch('https://example.com/reviews')
      .then((res) => res.json())
      .then(setReviews);
  };

  return (
    <>
      {/* <Header leftBtn="logo" /> */}
      {/* <_Home /> */}
      <div key={product.id}>
        <p>상품이름: {product.name}</p>
        <p>상품수량: {product.quantity} </p>
      </div>
      <br />
      <button onClick={handleGetReview}>리뷰 가져오기</button>
      {reviews &&
        reviews.map((review) => (
          <div key={review.id}>
            <p>{review.author}</p>
            <p>{review.content}</p>
          </div>
        ))}
    </>
  );
};

export async function getServerSideProps() {
  const res = await fetch('https://example.com/products/22');
  const product: Product = await res.json();

  return {
    props: {
      product,
    },
  };
}

export default Home;
