"use client";

import classnames from "classnames";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState, useCallback } from "react";
import { usePagination } from "./logic";
import "./styles.scss";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface CustomPaginationProps {
    onPageChange: (page: number, pageObj?: Record<string, any>) => void;
    totalPage: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
    queryList?: Array<Record<string, any>>;
    dynamo?: boolean;
    hidePaginationMenu?: boolean;
    className?: string;
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
    onPageChange,
    totalPage,
    currentPage,
    setCurrentPage,
    queryList,
    dynamo,
    hidePaginationMenu,
    className,
}) => {
    const pageSize = 1;
    const paginationRange = usePagination({
        currentPage,
        totalCount: totalPage,
        siblingCount: 1,
        pageSize,
    });

    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [page, setPage] = useState<number | Record<string, any>>(currentPage);
    const DOTS = "DOTS";

    const keysToExclude = ["page", "pid", "lepk", "lesk", "legsipk", "legsisk"];

    // Function to update query parameters in the URL
    const setQueryParams = useCallback(
        (queryString: string) => {
            const currentUrlParams = new URLSearchParams(searchParams);

            currentUrlParams.forEach((value, key) => {
                if (!keysToExclude.includes(key)) {
                    queryString = `${queryString}&${key}=${value}`;
                }
            });

            navigate({
                pathname: location.pathname,
                search: `?${new URLSearchParams(queryString).toString()}`,
            });
        },
        [searchParams, navigate, location.pathname]
    );

    // Handle next page
    const onNext = () => {
        if (currentPage < totalPage) {
            setCurrentPage(currentPage + 1);
            setPage(currentPage + 1);
            if (!dynamo) setQueryParams(`?page=${currentPage + 1}`);
            else dynamoQuerySetter(currentPage + 1);
        }
    };

    // Handle previous page
    const onPrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
            setPage(currentPage - 1);
            if (!dynamo) setQueryParams(`?page=${currentPage - 1}`);
            else dynamoQuerySetter(currentPage - 1);
        }
    };

    // Update the page when totalPage changes
    useEffect(() => {
        if (totalPage > 0 && totalPage < currentPage) {
            setCurrentPage(totalPage);
            setPage(totalPage);
            setQueryParams(`?page=${totalPage}`);
        }
    }, [totalPage, currentPage, setCurrentPage, setQueryParams]);

    // Read page from query parameters
    useEffect(() => {
        const currentUrlParams = new URLSearchParams(searchParams);
        if (!dynamo) {
            setPage(Number(currentUrlParams.get("page")) || 1);
        } else {
            setPage({
                lepk: currentUrlParams.get("lepk"),
                lesk: currentUrlParams.get("lesk"),
                legsipk: currentUrlParams.get("legsipk"),
                legsisk: currentUrlParams.get("legsisk"),
                pid: currentUrlParams.get("pid"),
            });
        }
    }, [searchParams, dynamo]);

    // Update state based on page
    useEffect(() => {
        if (!dynamo) {
            if (typeof page !== "number" || page <= 0 || isNaN(page)) {
                setCurrentPage(1);
                setQueryParams("?page=1");
                onPageChange(1);
            } else {
                setCurrentPage(page);
                onPageChange(page);
            }
        } else {
            if (Object.keys(page).length === 0) return;
            if ((page as Record<string, any>)?.pid) {
                const validPage =
                    Number((page as Record<string, any>)?.pid) <= totalPage ? (page as Record<string, any>).pid : 1;
                onPageChange(validPage, page as Record<string, any>);
                setCurrentPage(validPage);
            } else {
                dynamoQuerySetter(1);
                onPageChange(1);
                setCurrentPage(1);
            }
        }
    }, [page, dynamo, onPageChange, setCurrentPage, setQueryParams, totalPage]);

    // Function to set query parameters dynamically for Dynamo pagination
    const dynamoQuerySetter = (page: number) => {
        if (queryList) {
            const queryParams = queryList[page] || {};
            setQueryParams(
                `?lepk=${queryParams.lepk}&lesk=${queryParams.lesk}&legsipk=${queryParams.legsipk}&pid=${page}&legsisk=${queryParams.legsisk}`
            );
        }
    };

    if (currentPage === 0 || totalPage < 1) return null;

    return (
        <div className="pagination-component">
            {paginationRange.length > 1 && (
                <div className={`pagination-component-wrapper ${hidePaginationMenu ? "hidePaginationMenu" : ""}`}>
                    <ul className={classnames("pagination-container", className)}>
                        {/* Left navigation arrow */}
                        <li
                            className={classnames("pagination-item", { disabled: currentPage === 1 })}
                            onClick={onPrevious}
                        >
                            <span>
                                <FiChevronLeft />
                            </span>
                        </li>

                        {paginationRange.map((pageNumber, index) => (
                            <li
                                key={index}
                                className={classnames("pagination-item", { selected: pageNumber === currentPage })}
                                onClick={() => {
                                    if (pageNumber !== DOTS) {
                                        setCurrentPage(Number(pageNumber));
                                        setPage(Number(pageNumber));
                                        if (!dynamo) setQueryParams(`?page=${pageNumber}`);
                                        else dynamoQuerySetter(pageNumber as number);
                                    }
                                }}
                            >
                                {pageNumber === DOTS ? "…" : pageNumber}
                            </li>
                        ))}

                        {/* Right navigation arrow */}
                        <li
                            className={classnames("pagination-item", { disabled: currentPage === totalPage })}
                            onClick={onNext}
                        >
                            <span>
                                <FiChevronRight />
                            </span>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default React.memo(CustomPagination);
