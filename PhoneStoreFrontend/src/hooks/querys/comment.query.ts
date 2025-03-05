import commentAPI from '@/apis/comment.api'
import { CommentResponse, CommentType } from '@/types/comment.type';
import * as signalR from "@microsoft/signalr";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

const API_HUB_URL: string = import.meta.env.VITE_HUB_URL || ''

export const useGetCommentsByVariantId = (variantId: number, pageSize: number = 4) => {
  return useInfiniteQuery({
    queryKey: ['getCommentByVariantId', variantId],
    queryFn: ({ pageParam }) => commentAPI.getCommentsByVariantId(variantId, pageParam, pageSize),
    getNextPageParam: (lastPage) => (lastPage.currentPage < lastPage.totalPages ? lastPage.currentPage + 1 : undefined),
    enabled: !!variantId,
    initialPageParam: 1
  })
}

export const useCreateComment = () => {
  return useMutation({
    mutationKey: ['createComment'],
    mutationFn: commentAPI.createComment
  })
}

export const useCreateReply = () => {
  return useMutation({
    mutationKey: ['createReply'],
    mutationFn: commentAPI.createReply
  })
}

// export const useRecentComments = () => {
//   const queryClient = useQueryClient();

//   // Gọi API lấy bình luận gần đây
//   const { data: comments } = useQuery({
//     queryKey: ["recent-comments"],
//     queryFn: commentAPI.recentComments,
//   });

//   useEffect(() => {
//     // Kết nối SignalR
//     const connection = new signalR.HubConnectionBuilder()
//       .withUrl(API_HUB_URL)
//       .withAutomaticReconnect()
//       .build();

//     connection.start().catch((err) => console.error("SignalR error: ", err));

//     // Lắng nghe sự kiện khi có bình luận mới
//     connection.on("ReceiveComment", (newComment: CommentResponse) => {
//       queryClient.setQueryData<CommentResponse[]>(["recent-comments"], (oldComments = []) => {
//         return [newComment, ...oldComments.slice(0, 4)];
//       });
//     });

//     return () => {
//       connection.stop();
//     };
//   }, [queryClient]);

//   return { comments };
// };

export const useRecentComments = () => {
  const [page, setPage] = useState(1);
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useQuery({
    queryKey: ["recentComments", page],
    queryFn: () => commentAPI.recentComments(page),
  });

  // ✅ Dùng useEffect để cập nhật comments khi `data` thay đổi
  useEffect(() => {
    if (data) {
      if (data.length === 0) {
        setHasMore(false);
      } else {
        setComments((prev) => [...prev, ...data]);
      }
    }
  }, [data]);

  return { comments, loadMore: () => setPage((prev) => prev + 1), hasMore, isFetching };
};

