import Button from "../button/Button";
import CustomPagination from "../paginations/CustomPagination";
import BasicTable from "../table/page";
import "./css/data-table.scss";
export default function DataTable(props: any) {
    return (
        <>
            <div className="container-fluid data-table">
                <div className="row align-items-center">
                    <div className="col-sm-12 p-0">
                        <div className="card">
                            <div className="card-header">
                                {props?.customHeader ? (
                                    <>{props?.customHeader}</>
                                ) : (
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <h5 className={"text-capitalize"}>{props?.title}</h5>
                                        </div>
                                        {props?.addButtonText && (
                                            <div className="col-sm-8">
                                                <div className="text-end">
                                                    <Button
                                                        btnText={props?.addButtonText} // Button text
                                                        icon={props?.buttonIcon} // Button icon
                                                        onClick={props?.onclickCallback} // Form submission handler
                                                        disabled={props?.disabled} // Disable button while loading
                                                        isLoading={props?.isLoading} // Show loading spinner
                                                        type="submit"
                                                    />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className={`table-responsive ${props?.tableClassName ? props?.tableClassName : ""}`}>
                                <BasicTable headers={props?.headers} data={props?.findData()} />
                            </div>
                            {props?.pagination && (
                                <CustomPagination
                                    onPageChange={() => props?.onPageChange()}
                                    currentPage={props?.currentPage}
                                    setCurrentPage={props?.setCurrentPage}
                                    totalPage={Math.ceil(Number(props?.totalCount) / props?.pageLimit)}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
