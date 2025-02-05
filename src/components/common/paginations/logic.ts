import { useMemo } from "react";
export const usePagination = ({
    totalCount,
    pageSize,
    siblingCount = 1,
    currentPage,
}: {
    totalCount: number;
    pageSize: number;
    siblingCount?: number;
    currentPage: number;
}) => {
    const paginationRange = useMemo(() => {
        const range = (start: number, end: number) => {
            const length = end - start + 1;
            return Array.from({ length }, (_, idx) => idx + start);
        };

        const totalPageCount = Math.ceil(totalCount / pageSize);
        const totalPageNumbers = siblingCount + 2;

        /*
      Case 1:
      If the number of pages is less than the page numbers we want to show in our
      paginationComponent, we return the range [1..totalPageCount]
    */
        if (totalPageCount === 1) {
            return [1];
        }

        if (totalCount === 2) {
            return [1, 2];
        }

        if (totalCount === 3) {
            return range(1, totalPageNumbers);
        }

        if (totalCount === 4 && (currentPage === 2 || currentPage === 3)) {
            return range(1, 4);
        }

        /*
    	Calculate left and right sibling index and make sure they are within range 1 and totalPageCount
    */
        const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
        const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

        /*
      We do not show dots just when there is just one page number to be inserted between the extremes of sibling and the page limits i.e 1 and totalPageCount. Hence we are using leftSiblingIndex > 2 and rightSiblingIndex < totalPageCount - 2
    */
        const shouldShowLeftDots = leftSiblingIndex > 2;
        const shouldShowRightDots = rightSiblingIndex < totalPageCount - 1;

        const firstPageIndex = 1;
        const lastPageIndex = totalPageCount;

        /*
    	Case 2: No left dots to show, but rights dots to be shown
    */
        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 1 + 1 * siblingCount;
            const leftRange = range(1, leftItemCount);

            if (currentPage !== 1) {
                if (currentPage === 2) {
                    return [...leftRange, 3, "DOTS", totalPageCount];
                }
                return [...leftRange, ...range(currentPage, currentPage + 1), "DOTS", totalPageCount];
            }

            return [...leftRange, "DOTS", totalPageCount];
        }

        /*
    	Case 3: No right dots to show, but left dots to be shown
    */
        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 1 + 1 * siblingCount;
            const rightRange = range(totalPageCount - rightItemCount + 1, totalPageCount);

            if (rightRange[rightRange.length - 2] === totalPageCount - 1) {
                if (currentPage === totalPageCount - 2) {
                    return [firstPageIndex, "DOTS", ...range(totalPageCount - 3, totalPageCount - 2), ...rightRange];
                } else if (currentPage === totalPageCount - 1)
                    return [firstPageIndex, "DOTS", totalPageCount - 2, ...rightRange];
            }
            return [firstPageIndex, "DOTS", ...rightRange];
        }

        /*
    	Case 4: Both left and right dots to be shown
    */
        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex);

            if (middleRange[0] === 2) {
                return [firstPageIndex, ...middleRange, "DOTS", lastPageIndex];
            }
            if (middleRange[middleRange.length - 1] === totalCount - 1) {
                return [firstPageIndex, "DOTS", middleRange[middleRange.length - 1], ...middleRange, lastPageIndex];
            }
            return [firstPageIndex, "DOTS", ...middleRange, "DOTS", lastPageIndex];
        }
        return range(1, 5);
    }, [totalCount, pageSize, siblingCount, currentPage]);

    return paginationRange;
};
