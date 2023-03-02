import { useState } from 'react';
import './Customers.css'
import { CustomerType } from '../App'

export const Customers = ({ customers, onSelectCustomer, isEditInProgess }) => {
    console.log("in Customer")

    let [rowSelectedError, setRowSelectedError] = useState(false)

    function onEdit() {
        console.log("edit()");
        let radios = document.getElementsByName('custid');
        let index = -1;
        for (let i = 0, length = radios.length; i < length; i++) {
            let radio = radios[i] as HTMLInputElement;
            if (radio.checked) {
                index = i;  
                break;
            }
        }
        if (index > -1) {
            editCustomer(index);
        }
        else {
            setRowSelectedError(true);
            setTimeout(() => setRowSelectedError(false), 3000)
        }
    }

    function editCustomer(index: number): CustomerType {
        console.log("index = " + index);
        if (index >= 0) {
            console.log('calling onSelectCustomer() with ', customers[index])
            onSelectCustomer(customers[index])
        }
        else {
            alert("index out of range");
        }
        return customers[index]
    }

    return (
        <>
            <div className="list-container">
                <h1>Customers</h1>
                <div className="list" id="customers">
                    <table>
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Street</th>
                                <th>City</th>
                                <th>State</th>
                                <th>Zip</th>
                                <th>Phone</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                customers.map((customer) => (
                                    <tr key={customer.id}>
                                        <td><input type="radio" name="custid" value={customer.id} /></td>
                                        <td>{customer.first}</td>
                                        <td>{customer.last}</td>
                                        <td>{customer.street}</td>
                                        <td>{customer.city}</td>
                                        <td>{customer.state}</td>
                                        <td>{customer.zip}</td>
                                        <td>{customer.phone}</td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                <div className="btn-row">
                    <div className="btn-row-left-side"></div>
                    <div className="btn-row-middle">
                       <button className="list-btn" disabled={isEditInProgess} type="button" onClick={onEdit} >Edit</button>
                    </div>
                    {rowSelectedError && 
                       <div className="btn-row-right-side"><span className="list-error">Select a row to edit</span></div>}
                </div>
            </div>
        </>
    )
}
