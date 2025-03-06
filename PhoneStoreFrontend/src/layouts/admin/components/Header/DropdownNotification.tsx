import { useRecentComments } from '@/hooks/querys/comment.query';
import { getProductRoute } from '@/utils/getProductRoute';
import { BellIcon } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';

const DropdownNotification = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);
  const { comments, loadMore, hasMore, isFetching } = useRecentComments();

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <li>
        <Link
          onClick={() => {
            setNotifying(false);
            setDropdownOpen(!dropdownOpen);
          }}
          to="#"
          className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
        >
          <span className={`absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-meta-1 ${notifying ? "inline" : "hidden"}`}>
            <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-meta-1 opacity-75"></span>
          </span>
          {/* Icon Notification */}
          <BellIcon size={20} />
        </Link>

        {dropdownOpen && (
          <div className="absolute -right-27 mt-2.5 flex h-auto w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80">
            <div className="px-4.5 py-3">
              <h5 className="text-sm font-medium text-bodydark2">Thông báo</h5>
            </div>

            <ul className="flex h-auto flex-col overflow-y-auto max-h-80">
              {comments.map((comment) => (
                <li key={comment.commentId}>
                  <Link className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                    to={getProductRoute(comment.categoryName, comment.brandName, comment.slug)}
                  >
                    <p className="text-sm">
                      <span className="text-black dark:text-white">
                        <strong>{comment.userName}</strong> đã bình luận sản phẩm <strong>{comment.variantName}</strong>
                      </span>
                    </p>
                    <p className="text-xs">{new Date(comment.createdAt).toLocaleString()}. "{comment.content}"</p>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Nút xem thêm */}
            {hasMore && (
              <button
                className="w-full py-2 text-center text-sm font-medium text-primary hover:bg-gray-100 dark:hover:bg-meta-4"
                onClick={loadMore}
                disabled={isFetching}
              >
                {isFetching ? "Đang tải..." : "Xem thêm"}
              </button>
            )}
          </div>
        )}
      </li>
    </ClickOutside>
  );
};

export default DropdownNotification;
