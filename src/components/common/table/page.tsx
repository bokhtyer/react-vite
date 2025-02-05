import "./table.scss";

export default function BasicTable(props: any) {
    const { headers, data, containerCss, tableCss, theadCss, tbodyCss, trCss, thCss, tdCss, no_data_text } = props;

    return (
        <div className={`${containerCss || "custom-table"}`}>
            <table className={`table table-sm table-hover ${tableCss ? tableCss : ""}`} aria-label="simple table">
                <thead className={`${theadCss ? theadCss : ""}`}>
                    <tr className={`c_table_header ${trCss ? trCss : ""}`}>
                        {headers?.map((v: any, i: number) => (
                            <th scope="col" key={i} className={`${thCss ? thCss : ""}`}>
                                {v}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={`${tbodyCss ? tbodyCss : ""} b_1px_gray`}>
                    {data?.length >= 1 ? (
                        data?.map((user: any, i: number) => (
                            <tr className={`${trCss ? trCss : ""} c_row_hover`} key={i}>
                                {user?.data?.map((property: any, i: number) => (
                                    <td className={`${tdCss ? tdCss : ""}`} key={i}>
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
                            <td className="text-center not-data-found" colSpan={headers?.length}>
                                {no_data_text ? no_data_text : "No Data Found"}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
