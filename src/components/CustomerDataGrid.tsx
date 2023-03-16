import React from "react";
import {
  DataGrid,
  GridEventListener
} from '@mui/x-data-grid';

//import { CustomerType } from '../App'
import './CustomerDataGrid.css'
import { CustomerType } from '../App'

// Did not set fields as editable.  This would allow editing in the grid and not need a separate 
// "Edit Customer" form.  But when any field is editted, the update fucnction is called to persist to DB. 
// There is no way to cancel or undo or even an warning that the DB will be updated.
const columns = [
  { field: "id", headerName: "ID", width: 1, visible: false },
  { field: "first", headerName: "First Name", width: 100 },  //, editable: true },
  { field: "last", headerName: "Last Name", width: 100 },  //, editable: true },
  { field: "street", headerName: "Street", width: 200 },  //, editable: true },
  { field: "city", headerName: "City", width: 120 },  //, editable: true },
  { field: "state", headerName: "State", width: 20 },  //, editable: true },
  { field: "zip", headerName: "Zip", width: 70 },  //, editable: true },
  { field: "phone", headerName: "Phone", width: 120 },  //, editable: true }
];

export const CustomerDataGrid = ({ customers, onSelectCustomer, isEditInProgess, shouldClearSelectButton }) => {
  console.log("in CustomerDataGrid")
  console.log("customerArray.length:", customers?.length);

  function onEdit(customer) {
    if (!isEditInProgess) {
      console.log("edit()", customer?.last);

      if (customer) {
        editCustomer(customer);
      }
    }
  }

  function editCustomer(customer: CustomerType): CustomerType {
    console.log("customer = " + customer?.last);
    if (customer) {
      console.log('calling onSelectCustomer() with ', customer)
      onSelectCustomer(customer)
    }
    else {
      alert("index out of range");
    }
    return customer
  }

  const handleOnClickEvent: GridEventListener<'rowClick'> = (
    params, // GridRowParams
    event, // MuiEvent<React.MouseEvent<HTMLElement>>
    details, // GridCallbackDetails
  ) => {
    console.log(`"id "${params.row.id}" First "${params.row.first}" Last "${params.row.last}" clicked`);
    let customer = customers.find((customer) => customer.id === params.row.id)
    console.log(`"clicked on customer is ${JSON.stringify(customer)}"`)
    onEdit(customer)
  };


  return (
    <>
      <div className="list-container">
        <h1>Customers</h1>
        <div className="list" id="customers">
          <div className="grid">
            <DataGrid rows={customers} columns={columns}
              onRowClick={handleOnClickEvent}
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 10, page: 0 }
                },
                columns: {
                  columnVisibilityModel: { id: false }
                },
              }}
              pageSizeOptions={[5, 10, 25]}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDataGrid;
