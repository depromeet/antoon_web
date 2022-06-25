import { useState, useEffect } from 'react';

import { useGetCommentsById } from '@apis/comments';

import CommentEditIcon from '@assets/icons/CommentEditIcon';

import UserProfile from '@components/image/UserProfile';
import FavoriteBtn from '@components/button/FavoriteBtn';
import CommentTextInput from '@components/detail/commentTextInput/CommentTextInput';
import OnError from '@components/OnError';
import ErrorBoundary from '@components/ErrorBoundary';
import CommentEditModal from './CommentEditModal';

import {
  CommentListWrap,
  Title,
  CommentWrap,
  MainWrap,
  UserInfo,
  UserInfoDataWrap,
  Name,
  TimeStamp,
  Content,
  EditContent,
  FavoriteWrap,
  Favorite,
} from './Comment.style';

import { IComment } from '@_types/comments-type';

function Comment({ id }: { id: number }) {
  const { data: t, isError } = useGetCommentsById(id);
  const [comments, setComments] = useState<IComment[]>([]);

  useEffect(() => {
    if (t) setComments(t.data);
  }, [t, comments]);

  const [modalStatus, setModalStatus] = useState(false);

  const [currentDiscussionId, setCurrentDiscussionId] = useState(0);

  const onClickModal = (id: number) => {
    setModalStatus(true);
    setCurrentDiscussionId(id);
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

  const [editStatus, setEditStatus] = useState(false);

  if (isError) return <OnError>댓글을 불러오지 못하고 있어요 😭😭😭</OnError>;

  return (
    <ErrorBoundary message="댓글을 불러오지 못하고 있어요 😭😭😭">
      <CommentListWrap>
        {modalStatus && (
          <CommentEditModal
            id={currentDiscussionId}
            setModalStatus={setModalStatus}
            setEditStatus={setEditStatus}
          />
        )}
        <Title>개미들의 행진 {comments?.length}</Title>
        <CommentTextInput length={comments?.length} webtoonId={id} />
        {comments &&
          comments?.map((comment: IComment) => {
            return (
              <CommentWrap key={comment.discussionId}>
                {editStatus && currentDiscussionId === comment.discussionId ? (
                  <CommentTextInput
                    discussionId={comment.discussionId}
                    editStatus={editStatus}
                  />
                ) : (
                  <>
                    <UserProfile
                      src={comment.imageUrl}
                      width="32"
                      height="32"
                    />
                    <MainWrap>
                      <UserInfo>
                        <UserInfoDataWrap>
                          <Name>{comment.nickname}</Name>
                          <TimeStamp>{comment.time}</TimeStamp>
                        </UserInfoDataWrap>
                        <CommentEditIcon
                          onClickModal={() =>
                            onClickModal(comment.discussionId)
                          }
                        />
                      </UserInfo>
                      <Content>{comment.content}</Content>
                      <FavoriteWrap>
                        <FavoriteBtn isFavoriteChecked={comment.isUserLike} />
                        <Favorite>{comment.likeCount}</Favorite>
                      </FavoriteWrap>
                    </MainWrap>
                  </>
                )}
              </CommentWrap>
            );
          })}
      </CommentListWrap>
    </ErrorBoundary>
  );
}

export default Comment;
