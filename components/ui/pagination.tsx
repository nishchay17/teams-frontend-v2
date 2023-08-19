import { useState } from "react";
import ReactPaginate, { ReactPaginateProps } from "react-paginate";

type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

function Pagination({
  perPage = 10,
  totalCount,
  className,
  ...props
}: Optional<ReactPaginateProps, "pageCount"> & {
  perPage: number;
  totalCount: number;
  className?: string;
}) {
  const [currentPage, setCurrentPage] = useState<number>(0);
  return (
    <div className={className}>
      {totalCount > perPage && (
        <ReactPaginate
          pageCount={Math.ceil(totalCount / perPage)}
          containerClassName="flex gap-2 items-center select-none"
          pageLinkClassName="text-sm border px-2 py-1 rounded-sm cursor-pointer"
          previousLinkClassName="text-sm border px-2 py-1 rounded-sm cursor-pointer"
          nextLinkClassName="text-sm border px-2 py-1 rounded-sm cursor-pointer"
          disabledLinkClassName="cursor-not-allowed opacity-70"
          activeClassName="bg-secondary"
          onPageChange={(e) => {
            if (e.selected === currentPage) {
              return;
            }
            setCurrentPage(e.selected);
            if (!!e && props?.onPageChange) {
              props?.onPageChange(e);
            }
          }}
          {...props}
        />
      )}
    </div>
  );
}

export default Pagination;
