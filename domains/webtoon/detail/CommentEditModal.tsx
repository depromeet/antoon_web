/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';

import { useDeleteCommentsById, usePatchCommentsById } from '@apis/comments';

import {
  Background,
  ModalContainer,
  ModalBtn,
  DeleteText,
  DeleteBtnWrap,
  DeleteConfirmBtn,
} from './CommentEditModal.style';

function CommentEditModal({
  id,
  setModalStatus,
  setEditStatus,
}: {
  id: number;
  setModalStatus: Dispatch<SetStateAction<boolean>>;
  setEditStatus: Dispatch<SetStateAction<boolean>>;
}) {
  const modalRef = useRef<HTMLDivElement>(null);
  const innerModalRef = useRef<HTMLDivElement>(null);

  const onClickOutSide = (event: any) => {
    if (
      // @ts-ignore: Object is possibly 'null'.
      modalRef.current.contains(event.target) &&
      // @ts-ignore: Object is possibly 'null'.
      !innerModalRef.current.contains(event.target)
    ) {
      setModalStatus(false);
    } else {
      setModalStatus(true);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOutSide);

    return () => {
      document.removeEventListener('mousedown', onClickOutSide);
    };
  });

  const [deleteStatus, setDeleteStatus] = useState(false);

  const onClickDelete = () => {
    setDeleteStatus(true);
  };

  const { mutate: deleteComment } = useDeleteCommentsById(id);

  // const { mutate: patchComment } = usePatchCommentsById(id, content);

  const onClickDeleteCancel = () => {
    setModalStatus(false);
  };

  const onClickDeleteConfirm = (id: number) => {
    deleteComment(id as unknown as void);
    setModalStatus(false);
  };

  const onClickEdit = () => {
    setEditStatus(true);
    setModalStatus(false);
    // patchComment(id, comment);
  };

  return (
    <Background ref={modalRef}>
      <ModalContainer ref={innerModalRef}>
        {deleteStatus ? (
          <>
            <DeleteText>삭제하시겠습니까?</DeleteText>
            <DeleteBtnWrap>
              <DeleteConfirmBtn status="CANCEL" onClick={onClickDeleteCancel}>
                취소
              </DeleteConfirmBtn>
              <DeleteConfirmBtn
                status="CONFIRM"
                onClick={() => onClickDeleteConfirm(id)}
              >
                삭제
              </DeleteConfirmBtn>
            </DeleteBtnWrap>
          </>
        ) : (
          <>
            <ModalBtn status="EDIT" onClick={onClickEdit}>
              수정할래요
            </ModalBtn>
            <ModalBtn status="DELETE" onClick={onClickDelete}>
              삭제할래요
            </ModalBtn>
          </>
        )}
      </ModalContainer>
    </Background>
  );
}

export default CommentEditModal;
