import { useState, useEffect } from 'react';
import './App.css';
import { Customers } from './components/Customers'
import { CustomerEdit } from './components/CustomerEdit'
import { Messages } from './components/Messages'

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
  const [msg, setMsg] = useState("")
  const [isEditting, setIsEditting] = useState(false)
  let [editOrAdd, setAddOrEdit] = useState('Edit')
  let [clearSelectButton, setClearSelectButton] = useState(false)

  useEffect(() => {
    let url = "http://localhost:3000/customers"
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        let custjson = response.json()
        return custjson;
      })
      .then((result) => {  // result is an object
        console.log("customers fetch successful:", result);
        setCustomerList(result);
      })
      .catch((error) => {
        console.error("There has been a problem with the fetch 'customers' API call:", error);
      })
  }, [])

  const handleSelectCustomer = customer => {
    setAddOrEdit('Edit')
    setSelectedCustomer(customer);
    setClearSelectButton(false)
  };

  const handleSavedEdit = (updatedCustomer: CustomerType, serverMsg: string) => {
    if (editOrAdd === 'Edit') {
      const index = customerList.findIndex(c => c.id === updatedCustomer.id);
      customerList[index] = updatedCustomer;
    } else
    {
      customerList.push(updatedCustomer);
    }
    setSelectedCustomer(null);
    setIsEditting(false);
    setClearSelectButton(true)
    setMsg(serverMsg);
  };

  const handleCancelEdit = () => {
    setSelectedCustomer(null);
    setIsEditting(false)
    setClearSelectButton(true)
    setMsg('');
  };

  const onAdd = () => {
    setSelectedCustomer(defaultValue)
    setClearSelectButton(true)
    setAddOrEdit('Add')
  }

  return (
    <>
      <div>
        <Customers customers={customerList} onSelectCustomer={handleSelectCustomer} 
            isEditInProgess={isEditting} shouldClearSelectButton={clearSelectButton}/>
        <div className="btn-row">
          <div className="btn-row-left-side"></div>
          <div className="btn-row-middle">
            <button className="list-btn" disabled={isEditting} type="button" onClick={onAdd} >Add</button>
          </div>
        </div>
        {selectedCustomer &&
           <CustomerEdit customer={selectedCustomer} handleSaveEdit={handleSavedEdit} handleCancelEdit={handleCancelEdit} 
              handleEditStatusChange={setIsEditting} isEditInProgess={isEditting} isAddOrEdit={editOrAdd} />
        }
        <Messages messages={msg} />
      </div>
    </>
  )
}
