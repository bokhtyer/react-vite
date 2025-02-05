import { useTranslation } from "react-i18next";
import DataTable from "../../../components/common/data-table/Pages";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";

const AdminList = () => {
    const { t } = useTranslation();
    const pageLimit = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const totalCount = 12;
    const [currentPage, setCurrentPage] = useState(1);

    const customerList = [
        {
            id: 1,
            full_name: "John Doe",
            email: "Email@gmail.com",
            phone: "1234567890",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 3,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
        {
            id: 2,
            full_name: "Jane Doe",
            email: "Hello123@gmail.com",
            phone: "0987654321",
        },
    ];

    const tableHeadings = ["Name", "Email", "Phone", "Action"];

    /*
     * Function to generate table rows for the customer list
     * This function iterates over the `customerList` array,
     * creates an object for each customer, and populates it with the necessary data for each table column.
     */
    const generateTableListRows = () => {
        const tableListsRows: any[] = []; // Array to store all rows of the customer list table

        customerList?.forEach((item: any) => {
            const rowData: any = {}; // Object to store the data for each row
            rowData.data = [];

            rowData.data.push(item?.full_name || "N/A");
            rowData.data.push(item?.email || "N/A");
            rowData.data.push(item?.phone || "N/A");

            // Add the complete row (with all columns) to the list of table rows
            tableListsRows.push(rowData);
        });

        // Return the fully populated array of table rows
        return tableListsRows;
    };

    return (
        <div className="admin-list">
            <h1>{t("adminList")}</h1>

            <DataTable
                headers={tableHeadings}
                findData={generateTableListRows}
                title={"Admin List"}
                addButtonText={"Add Admin"}
                buttonIcon={<FaPlus />}
                onclickCallback={() => setModalOpen(true)}
                // filter
                // filterName
                // filterEmail
                // filterPhone
                // filterDateRange
                pagination
                pageLimit={pageLimit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalCount={totalCount}
                onPageChange={() => console.log("Hello")}
            />
        </div>
    );
};

export default AdminList;
