import { useMutation, useQuery, useQueryClient } from 'react-query';
import { comments } from './queryKeys';
import { instance } from './api';

const getCommentsById = async (id: number) => {
  return await instance()
    .get(`webtoons/${id}/discussions`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

const useGetCommentsById = (id: number) => {
  return useQuery(comments.lists(id), () => getCommentsById(id));
};

const getCommentsLikedById = async (id: number) => {
  return await instance()
    .put(`webtoons/discussions/${id}/likes`)
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

const usePutCommentsLikedById = (id: number) => {
  return useQuery(comments.isLiked(id), () => getCommentsLikedById(id), {
    enabled: false,
  });
};

const postCommentsById = async (id: number, content: string) => {
  return await instance()
    .post(`webtoons/${id}/discussions`, { content: content })
    .then((res) => res.data)
    .catch((e) => console.log(e));
};

const usePostCommentsById = (id: number, content: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    comments.create(id, content),
    () => postCommentsById(id, content),
    {
      onSuccess: () => queryClient.invalidateQueries(comments.lists(id)),
    },
  );
};

const patchCommentsById = async (id: number, content: string) => {
  return await instance()
    .post(`webtoons/discussions/${id}`, { content: content })
    .catch((e) => console.log(e));
};

const usePatchCommentsById = (id: number, content: string) => {
  const queryClient = useQueryClient();
  return useMutation(
    comments.patch(id, content),
    () => patchCommentsById(id, content),
    {
      onSuccess: () => queryClient.invalidateQueries(comments.lists(id)),
    },
  );
};

const deleteCommentsById = async (id: number) => {
  return await instance()
    .delete(`webtoons/discussions/${id}`)
    .catch((e) => console.log(e));
};

const useDeleteCommentsById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation(comments.delete(id), () => deleteCommentsById(id), {
    onSuccess: () => queryClient.invalidateQueries(comments.lists(id)),
  });
};

export {
  getCommentsById,
  useGetCommentsById,
  getCommentsLikedById,
  usePutCommentsLikedById,
  postCommentsById,
  usePostCommentsById,
  usePatchCommentsById,
  useDeleteCommentsById,
};
