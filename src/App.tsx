import { useState, useEffect } from 'react';
import './App.css';
//import { Customers } from './components/Customers'
import { CustomerDataGrid } from './components/CustomerDataGrid'
import { CustomerEdit } from './components/CustomerEdit'
//import { Messages } from './components/Messages'
import { retrieveCustomersAPI } from './service/apiService'

export type CustomerType = {
  id: number;
  first: string;
  last: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

let defaultValue: CustomerType = {
  id: 0,
  first: '',
  last: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  phone: ''
}

type SelectedCustomerType = CustomerType | null

export type CustomersTypeProps = {
  customer: SelectedCustomerType;
  onSelectCustomer: (cust: CustomerType) => void;
  editStatus: (editinProgress: boolean) => void;
  shouldClearSelectButton: boolean;
}

export type CustomerEditTypeProps = {
  customer: SelectedCustomerType;
  handleSaveEdit: (cust: CustomerType, serverMsg: string) => void;
  handleCancelEdit: () => void;
  handleEditStatusChange: (editinProgress: boolean) => void;
  isEditInProgess: boolean;
  isAddOrEdit: string;
}



export const App = () => {
  console.log('in App()')
  const [customerList, setCustomerList] = useState<CustomerType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<SelectedCustomerType>(null);
  const [isEditting, setIsEditting] = useState(false)
  //const [msg, setMsg] = useState("")
  let [editOrAdd, setAddOrEdit] = useState('Edit')
  let [clearSelectButton, setClearSelectButton] = useState(false)

  useEffect(() => {

    retrieveCustomersAPI( setCustomerList )
   
  }, [])

  const handleSelectCustomer = customer => {
    setAddOrEdit('Edit')
    setSelectedCustomer(customer);
    setClearSelectButton(false)
  };

  const handleSavedEdit = (updatedCustomer: CustomerType, serverMsg: string) => {
    if (editOrAdd === 'Edit') {
      const index = customerList.findIndex(c => c.id === updatedCustomer.id);
      let newCustomerList: CustomerType[] = [...customerList ];
      newCustomerList[index] = updatedCustomer;
      setCustomerList( newCustomerList );
    } else
    {
      let newCustomerList: CustomerType[] = [...customerList ];
      newCustomerList.push(updatedCustomer);
      setCustomerList( newCustomerList );
    }
    setSelectedCustomer(null);
    setIsEditting(false);
    setClearSelectButton(true)
    //setMsg(serverMsg);
  };

  const handleCancelEdit = () => {
    setSelectedCustomer(null);
    setIsEditting(false)
    setClearSelectButton(true)
    //setMsg('');
  };

  const onAdd = () => {
    setSelectedCustomer(defaultValue)
    setClearSelectButton(true)
    setAddOrEdit('Add')
  }

  return (
    <>
      <div>
        <CustomerDataGrid customers={customerList} onSelectCustomer={handleSelectCustomer} 
            isEditInProgess={isEditting} shouldClearSelectButton={clearSelectButton}/>
        <div className="btn-row">
          <div className="btn-row-left-side"></div>
          <div className="btn-row-middle">
            <button className="list-btn" disabled={isEditting} type="button" onClick={onAdd} >Add Customer</button>
          </div>
        </div>

        <CustomerEdit customer={selectedCustomer} handleSaveEdit={handleSavedEdit} handleCancelEdit={handleCancelEdit} 
              handleEditStatusChange={setIsEditting} isEditInProgess={isEditting} isAddOrEdit={editOrAdd} />

        {/*  <Messages messages={msg} />  */}
      </div>
    </>
  )
}
