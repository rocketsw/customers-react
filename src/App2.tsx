import React, { useState } from 'react';

const customerList = [
  {
    id: 1,
    name: 'John Doe',
    address: '123 Main St',
    phone: '555-555-1234'
  },
  {
    id: 2,
    name: 'Jane Smith',
    address: '456 Oak Ave',
    phone: '555-555-5678'
  },
  {
    id: 3,
    name: 'Bob Johnson',
    address: '789 Pine St',
    phone: '555-555-9012'
  }
];

const CustomerList = ({ customers, onSelectCustomer }) => {
  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map(customer => (
          <li key={customer.id} onClick={() => onSelectCustomer(customer)}>
            {customer.name} ({customer.phone})
          </li>
        ))}
      </ul>
    </div>
  );
};

const CustomerDetail = ({ customer, onSave }) => {
  const [name, setName] = useState(customer.name);
  const [address, setAddress] = useState(customer.address);
  const [phone, setPhone] = useState(customer.phone);

  const handleSave = () => {
    onSave({
      ...customer,
      name,
      address,
      phone
    });
  };

  return (
    <div>
      <h2>Customer Detail</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={e => setName(e.target.value)} />
      </label>
      <br />
      <label>
        Address:
        <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <br />
      <label>
        Phone:
        <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
      </label>
      <br />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export const App = () => {
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const handleSelectCustomer = customer => {
    setSelectedCustomer(customer);
  };

  const handleSaveCustomer = updatedCustomer => {
    const index = customerList.findIndex(c => c.id === updatedCustomer.id);
    customerList[index] = updatedCustomer;
    setSelectedCustomer(null);
  };

  return (
    <div>
      <CustomerList customers={customerList} onSelectCustomer={handleSelectCustomer} />
      {selectedCustomer && (
        <CustomerDetail customer={selectedCustomer} onSave={handleSaveCustomer} />
      )}
    </div>
  );
};

export default App;
