"use client";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { usePagination } from "./logic";
import "./styles.scss";

// Define prop types
interface CustomPaginationProps {
    onPageChange: (page: number, pageObj?: Record<string, string | number | boolean>) => void;
    totalPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    queryList?: Array<Record<string, string | number | boolean>>;
    dynamo?: boolean;
    queryDynamo?: Record<string, string | number | boolean>;
    hidePaginationMenu?: boolean;
    className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = (props) => {
    const {
        onPageChange,
        totalPage: totalCount,
        currentPage,
        setCurrentPage,
        queryList,
        dynamo,
        hidePaginationMenu,
    } = props;

    const pageSize = 1;
    const paginationRange = usePagination({
        currentPage,
        totalCount,
        siblingCount: 1,
        pageSize,
    });

    const [query] = useSearchParams();
    const router = useNavigate();
    const location = useLocation();
    const pathname = location.pathname;

    const [page, setPage] = useState<number | Record<string, string | number | object | null>>({});
    const DOTS = "DOTS";

    useEffect(() => {
        if (totalCount > 0) {
            if (totalCount < currentPage) {
                setQueryParams(`?page=${totalCount}`);
                setPage(totalCount);
                setCurrentPage(totalCount);
            }
        }
    }, [totalCount]);
    // console.log(totalCount, "totalCount", currentPage, "currentPage");
    const onNext = () => {
        if (!dynamo) {
            setPage(currentPage + 1);
            setQueryParams(`?page=${currentPage + 1}`);
        } else {
            dynamoQuerySetter(currentPage + 1);
        }
        setCurrentPage(currentPage + 1);
    };

    const onPrevious = () => {
        if (!dynamo) {
            setPage(currentPage - 1);
            setQueryParams(`?page=${currentPage - 1}`);
        } else {
            dynamoQuerySetter(currentPage - 1);
        }
        setQueryParams(`?page=${currentPage - 1}`);
        setCurrentPage(currentPage - 1);
    };

    const keys = ["page", "pid", "lepk", "lesk", "legsipk", "legsisk"];

    const setQueryParams = (queryString: string) => {
        const currentUrlParams = new URLSearchParams(query); // `query` is from `useSearchParams()`

        currentUrlParams.forEach((value, key) => {
            // Only append keys not in the predefined list
            if (!keys.includes(key)) {
                queryString = `${queryString}&${key}=${value}`;
            }
        });

        // Create a query object for `router.push`
        const queryObj: Record<string, string> = {};
        queryString
            .slice(1) // Remove the initial "?" from the query string
            .split("&")
            .forEach((param) => {
                const [key, value] = param.split("=");
                queryObj[key] = value;
            });

        router({
            pathname: `${pathname}?${new URLSearchParams(queryObj).toString()}`,
        });
    };

    const lastPage = paginationRange[paginationRange.length - 1];

    useEffect(() => {
        const currentUrlParams = new URLSearchParams(query);
        setPage(Number(currentUrlParams.get("page")));
    }, [query]);

    useEffect(() => {
        if (!dynamo) {
            if (isNaN(page as number)) return;
            if (!page || (page as number) <= 0) {
                setCurrentPage(1);
                setQueryParams(`?page=1`);
                onPageChange(1);
                return;
            }
            setCurrentPage(page as number);
            onPageChange(page as number);
        } else {
            if (Object.keys(page).length === 0) return;
            if ((page as Record<string, string | number | null>)?.pid) {
                const validPage =
                    Number((page as Record<string, string | number | null>)?.pid) <= totalCount
                        ? Number((page as Record<string, string | number | null>)?.pid)
                        : 1;
                onPageChange(
                    validPage,
                    Object.fromEntries(Object.entries(page).filter(([_, v]) => v !== null)) as Record<
                        string,
                        string | number | boolean
                    >
                );
                setCurrentPage(validPage);
                return;
            }
            dynamoQuerySetter(1);
            onPageChange(1);
            setCurrentPage(1);
        }
    }, [page]);

    const dynamoQuerySetter = (page: number) => {
        const queryParams = queryList ? queryList[page] : {};
        setQueryParams(
            `?lepk=${queryParams.lepk}&lesk=${queryParams.lesk}&legsipk=${queryParams.legsipk}&pid=${page}&legsisk=${queryParams.legsisk}`
        );
    };

    if (currentPage === 0 || totalCount < 1) {
        return;
    }

    return (
        <div className="pagination-component">
            {paginationRange.length > 1 && (
                <div className={`pagination-component-wrapper ${hidePaginationMenu ? "hidePaginationMenu" : ""}`}>
                    <ul className={classnames("pagination-container", props.className)}>
                        {/* Left navigation arrow */}
                        <li
                            className={classnames("pagination-item", {
                                disabled: currentPage === 1,
                            })}
                            onClick={onPrevious}
                        >
                            {/* <MaterialSymbol icon={"chevron_left"} /> */}
                            {"<<"}
                        </li>

                        {paginationRange.map((pageNumber, index) => {
                            if (pageNumber === DOTS) {
                                return (
                                    <li className="pagination-item dots" key={index}>
                                        &#8230;
                                    </li>
                                );
                            }

                            return (
                                <li
                                    className={classnames("pagination-item", {
                                        selected: pageNumber === currentPage,
                                    })}
                                    onClick={() => {
                                        if (!dynamo) setQueryParams(`?page=${pageNumber}`);
                                        else dynamoQuerySetter(pageNumber as number);
                                        if (!dynamo) setPage(Number(pageNumber));
                                        setCurrentPage(pageNumber as number);
                                    }}
                                    key={index}
                                >
                                    {pageNumber}
                                </li>
                            );
                        })}

                        {/* Right navigation arrow */}
                        <li
                            className={classnames("pagination-item", {
                                disabled: currentPage === lastPage,
                            })}
                            onClick={onNext}
                        >
                            {/* <MaterialSymbol icon={"chevron_right"} /> */}
                            {">>"}
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default React.memo(CustomPagination);
