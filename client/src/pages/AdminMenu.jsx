import { useState, useEffect, React } from 'react'
import AdminNavbar from '../components/AdminNavbar';
import Order from '../components/Order';

function AdminMenu() {

    const allMenu = {
        "Order":<Order></Order>,
        "Add Movie":<div>Add Movie page</div>,         //Add Add Movie page
        "Remove Movie":<div>Remove Movie page</div>,   //Add Remove Movie page
        "Setting":<div>Setting page</div>              //Add Setting page
    }

    return(<div>
        <AdminNavbar allMenu={allMenu}></AdminNavbar>
        </div>);
}

export default AdminMenu ;