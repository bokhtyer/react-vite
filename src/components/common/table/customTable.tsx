import "./ResponsiveTable.scss";

export default function BillStatusReportTable(props: any) {
    const { headers, subHeaders, data, containerCss, tableCss, theadCss, trCss, thCss, no_data_text } = props;

    return (
        <div className={`${containerCss}`}>
            <table
                className={`table table-sm table-hover table BillStatusReportTable ${tableCss}`}
                aria-label="simple table"
            >
                <thead className={`${theadCss}`}>
                    <tr className={`c_table_header ${trCss}`}>
                        {headers?.map((item: any, i: number) => (
                            <th
                                rowSpan={item.rowspan ? item.rowspan : undefined}
                                colSpan={item.colspan ? item.colspan : undefined}
                                key={i}
                                className={`${thCss}`}
                            >
                                {item?.label}
                            </th>
                        ))}
                    </tr>
                    <tr className={`c_table_header`}>
                        {subHeaders?.map(
                            (item: any, i: number) =>
                                headers.some((col: any) => col.value === item.value) && (
                                    <th key={i} className={`${thCss}`}>
                                        {item.label}
                                    </th>
                                )
                        )}
                    </tr>
                </thead>
                <tbody className={`b_1px_gray`}>
                    {data?.length >= 1 ? (
                        data?.map((user: any, i: number) => (
                            <tr className={`c_row_hover`} key={i}>
                                {user?.data?.map((property: any, i: number) => (
                                    <td style={{ borderRight: "1px solid #ddd" }} key={i}>
                                        {typeof property === "string" ? (
                                            property
                                        ) : (
                                            <span
                                                onClick={() =>
                                                    property?.props?.handleClick &&
                                                    property?.props?.handleClick(user.id)
                                                }
                                            >
                                                {property}
                                            </span>
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={headers?.length + subHeaders?.length} className="text-center not-data-found">
                                {no_data_text ? no_data_text : "No Data Found"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
