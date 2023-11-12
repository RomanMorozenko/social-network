// original pagination code: https://www.freecodecamp.org/news/build-a-custom-pagination-component-in-react/

import { useMemo } from 'react'

type usePaginationProps = {
    pagesCount: number
    pageSize: number
    activePage: number
    siblingCount?: number
}

export const usePagination = ({
    pagesCount,
    pageSize,
    siblingCount = 1,
    activePage,
}: usePaginationProps) => {
    return useMemo(() => {
        const paginationItemsToDisplay = siblingCount + 5

        if (paginationItemsToDisplay >= pagesCount) {
            return range(1, pagesCount)
        }

        const leftSiblingIndex = Math.max(activePage - siblingCount, 1)
        const rightSiblingIndex = Math.min(
            activePage + siblingCount,
            pagesCount
        )

        const shouldShowLeftDots = leftSiblingIndex > 2
        const shouldShowRightDots = rightSiblingIndex < pagesCount - 2

        const firstPageIndex = 1
        const lastPageIndex = pagesCount

        if (!shouldShowLeftDots && shouldShowRightDots) {
            const leftItemCount = 3 + 2 * siblingCount
            const leftRange = range(1, leftItemCount)

            return [...leftRange, '...', pagesCount]
        }

        if (shouldShowLeftDots && !shouldShowRightDots) {
            const rightItemCount = 3 + 2 * siblingCount
            const rightRange = range(
                pagesCount - rightItemCount + 1,
                pagesCount
            )

            return [firstPageIndex, '...', ...rightRange]
        }

        if (shouldShowLeftDots && shouldShowRightDots) {
            const middleRange = range(leftSiblingIndex, rightSiblingIndex)

            return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
        }
    }, [pagesCount, pageSize, activePage])
}

const range = (start: number, end: number) => {
    const length = end - start + 1

    return Array.from({ length }, (_, idx) => idx + start)
}
