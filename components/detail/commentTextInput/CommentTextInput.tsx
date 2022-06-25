import {
  CommentTextInputWrapper,
  TextAreaWrapper,
  TextArea,
  ProfileWrapper,
  ContentCheckArea,
  Profile,
  ProfileName,
  SubmitButton,
} from '@components/detail/commentTextInput/CommentTextInput.style';
import {
  MouseEventHandler,
  useCallback,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import Image from 'next/image';
import { useGetUserInformation } from '@apis/user';
import { usePostCommentsById } from '@apis/comments';
import LoadingSpinner from '@components/spinner/LoadingSpinner';
import OnError from '@components/OnError';

interface Props {
  length?: number;
  webtoonId?: number;
  discussionId?: number;
  editStatus?: boolean;
}

function CommentTextInput(props: Props) {
  const { data: user, isError } = useGetUserInformation();
  const MAX_LENGTH_CONTENT = 300;

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);
  const [content, setContent] = useState('');
  const [isOver, setIsOver] = useState(false);

  const {
    isLoading,
    isSuccess,
    error,
    mutate: postData,
  } = usePostCommentsById(Number(props.webtoonId), content);

  useEffect(() => {
    if (content.length >= MAX_LENGTH_CONTENT && textareaRef.current?.focus())
      setIsOver(true);
    else {
      setIsOver(false);
    }
  }, [content]);

  const placeHolderText =
    Number(props.length) > 0
      ? `${Number(props.length) + 1}번째 행진에 동참해 보세요!`
      : '첫 번째 행진에 동참해 보세요!';

  const ContentCheckHandler = useCallback(
    (text) => {
      setContent(text.slice(0, MAX_LENGTH_CONTENT));
    },
    [MAX_LENGTH_CONTENT, setContent],
  );

  const focusHandler = () => {
    if (!focused && textareaRef.current != null) {
      textareaRef.current.style.height = `${
        textareaRef.current.offsetHeight * 4
      }px`;
    }
    setFocused(true);
  };

  const onSubmitReply = () => {
    try {
      postData();
      setContent('');
      setFocused(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (props.editStatus) {
      setFocused(true);
    }
  }, [props.editStatus]);

  if (isError) return <OnError>로그인이 필요합니다.</OnError>;

  return (
    <CommentTextInputWrapper isOver={isOver}>
      {user && (
        <>
          <ProfileWrapper isShow={focused}>
            <Profile>
              <Image
                src={user.imageUrl}
                alt={user.name}
                width={20}
                height={20}
              />
              <ProfileName>{user.name}</ProfileName>
            </Profile>
            <ContentCheckArea>
              {content.length} / {MAX_LENGTH_CONTENT}
            </ContentCheckArea>
          </ProfileWrapper>
          <TextAreaWrapper>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <TextArea
                ref={textareaRef}
                placeholder={placeHolderText}
                onFocus={focusHandler}
                value={content}
                onChange={(e) => ContentCheckHandler(e.target.value)}
              />
            )}
            <SubmitButton isShow={focused} onClick={onSubmitReply}>
              등록
            </SubmitButton>
          </TextAreaWrapper>
        </>
      )}
      {}
    </CommentTextInputWrapper>
  );
}

export default CommentTextInput;
