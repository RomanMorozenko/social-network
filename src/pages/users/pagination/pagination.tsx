import { useState } from 'react'

import s from './pagination.module.scss'

import { usePagination } from './usePagination'

import { Select } from 'antd'

type PaginationProps = {
    className?: string
    onClick: (count: number, page: number) => void
    totalUsersCount: number
}

export const Pagination = ({
    onClick,
    totalUsersCount,
    className,
}: PaginationProps) => {
    const [activePage, setActivePage] = useState<number>(1)
    const [pageSize, setPageSize] = useState<number>(10)

    const totalPages = Math.ceil(totalUsersCount / pageSize)
    const paginationRange = usePagination({
        pagesCount: totalPages,
        pageSize,
        activePage,
    })

    const onNextClick = () => {
        if (activePage === totalPages) return
        setActivePage(activePage + 1)
        onClick(pageSize, activePage + 1)
    }

    const onPreviousClick = () => {
        if (activePage === 1) return
        setActivePage(activePage - 1)
        onClick(pageSize, activePage - 1)
    }

    const onPageNumberClick = (value: number) => {
        if (activePage === value) return
        setActivePage(value)
        onClick(pageSize, value)
    }

    const onSelectValueChange = (value: string) => {
        setPageSize(+value)
        setActivePage(1)
        onClick(+value, 1)
    }

    return (
        <div className={s.paginationContainer + ' ' + className}>
            <span className={s.paginationArrow} onClick={onPreviousClick}>
                &#8249;
            </span>
            <div className={s.paginationPages}>
                {paginationRange?.map((item, index) => {
                    return (
                        <PageButton
                            key={index}
                            activePage={activePage}
                            pageNumber={item}
                            onClick={onPageNumberClick}
                        />
                    )
                })}
            </div>
            <span className={s.paginationArrow} onClick={onNextClick}>
                &#8250;
            </span>
            <p className={s.selectText}>Show</p>
            <div className={s.selectMenu}>
                <Select
                    defaultValue={'10'}
                    onChange={onSelectValueChange}
                    options={[
                        { value: '10', label: '10' },
                        { value: '20', label: '20' },
                        { value: '100', label: '100' },
                    ]}
                />
            </div>
            <p className={s.selectText}>users per page</p>
        </div>
    )
}

type PageButtonProps = {
    activePage: number
    pageNumber: number | string
    onClick: (value: number) => void
}

const PageButton = ({ activePage, pageNumber, onClick }: PageButtonProps) => {
    const onButtonClick = (value: string | number) => {
        if (isNaN(Number(pageNumber))) return
        onClick(+value)
    }

    return (
        <div
            onClick={() => onButtonClick(pageNumber)}
            className={
                isNaN(Number(pageNumber))
                    ? s.dots
                    : activePage == pageNumber
                    ? s.paginationPage + ' ' + s.activePage
                    : s.paginationPage
            }
        >
            {pageNumber}
        </div>
    )
}
