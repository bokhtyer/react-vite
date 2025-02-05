import React from "react";

const AdminList: React.FC = () => {
    const admins = [
        { id: 1, name: "Admin One", email: "admin1@example.com" },
        { id: 2, name: "Admin Two", email: "admin2@example.com" },
        { id: 3, name: "Admin Three", email: "admin3@example.com" },
    ];

    return (
        <div>
            <h1>Admin List</h1>
            <ul>
                {admins.map((admin) => (
                    <li key={admin.id}>
                        {admin.name} - {admin.email}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;
