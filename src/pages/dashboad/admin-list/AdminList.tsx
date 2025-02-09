import { useTranslation } from "react-i18next";
import DataTable from "../../../components/common/data-table/Pages";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin3Line, RiEdit2Fill } from "react-icons/ri";
import Tooltip from "../../../components/common/Tooltip/Tooltip";
import Breadcrumb from "../../../components/common/Breadcrumb/Breadcrumb";
import DoubleConfirmationModal from "../../../components/common/DoubleConfirmationModal/DoubleConfirmationModal";
import Tooltip2 from "../../../components/common/Tooltip/Tooltip2";

const AdminList = () => {
    const { t } = useTranslation();
    const pageLimit = 10;
    const [modalOpen, setModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const totalCount = 80;
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

    const handleAction = (id: number) => {
        console.log("Edit", id);
        return (
            <div className="action-buttons">
                <Tooltip content="Top tooltip with smooth animation Top tooltip with smooth animation Top tooltip with smooth animation">
                    <button className="btn btn-primary">
                        <RiEdit2Fill />
                    </button>
                </Tooltip>
                {/* <Tooltip2 content="Top tooltip with smooth animation" position="top">
                    <button onClick={() => setModalOpen(true)} className="btn btn-danger">
                        <RiDeleteBin3Line />
                    </button>
                </Tooltip2> */}
                <Tooltip
                    position="bottom"
                    content="Top tooltip with smooth animation Top tooltip with smooth animation Top tooltip with smooth animation"
                >
                    <button onClick={() => setModalOpen(true)} className="btn btn-danger">
                        <RiDeleteBin3Line />
                    </button>
                </Tooltip>
            </div>
        );
    };

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
            rowData.data.push(handleAction(item?.id));

            // Add the complete row (with all columns) to the list of table rows
            tableListsRows.push(rowData);
        });

        // Return the fully populated array of table rows
        return tableListsRows;
    };

    useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    return (
        <div className="admin-list">
            <Breadcrumb parent="Admin Management" title={t("adminList")} />

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
                loading={loading}
            />
            <DoubleConfirmationModal
                text={"Are you sure you went to remove this User"}
                open={modalOpen}
                close={() => setModalOpen(false)}
                icon={<RiDeleteBin3Line />}
            />
        </div>
    );
};

export default AdminList;
