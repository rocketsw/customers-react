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

export type CustomersTypeProps = {
  customer: CustomerType;
  onSelectCustomer: (cust: CustomerType)=>void;
  editStatus: ( editinProgress: boolean ) => void;
}

export type CustomerEditTypeProps = {
  customer: CustomerType;
  handleSaveEdit: (cust: CustomerType, serverMsg: string)=>void;
  handleCancelEdit: ()=>void;
  handleEditStatusChange: ( editinProgress: boolean ) => void;
  isEditInProgess: boolean;
}


//export type SetCustomerType = SetStateAction<CustomerType>
//export type CustomersProps = { setCustomer: SetCustomerType }

export const App = () => {
  console.log('in App()')
  const [customerList, setCustomerList] = useState<CustomerType[]>([]);
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerType>(defaultValue);
  const [msg, setMsg] = useState("")
  const [isEditting, setIsEditting] = useState(false)

  useEffect(() => {
    let url = "http://localhost:3000/customers"
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not OK");
        }
        return response.json();
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
    setSelectedCustomer(customer);
  };

  const handleSavedEdit = (updatedCustomer: CustomerType, serverMsg: string) => {
    const index = customerList.findIndex(c => c.id === updatedCustomer.id);
    customerList[index] = updatedCustomer;
    setSelectedCustomer(defaultValue);
    setIsEditting(false);
    setMsg(serverMsg);
  };

  const handleCancelEdit = () => {
    setSelectedCustomer(selectedCustomer);
    setIsEditting(false)
    setMsg('');
  };


  return (
    <>
      <div>
        <Customers customers={customerList} onSelectCustomer={handleSelectCustomer} isEditInProgess={isEditting} />
        <CustomerEdit customer={selectedCustomer} handleSaveEdit={handleSavedEdit} handleCancelEdit={handleCancelEdit} handleEditStatusChange={setIsEditting} isEditInProgess={isEditting}/>
        <Messages messages={msg}/>
      </div>
    </>
  )
}
