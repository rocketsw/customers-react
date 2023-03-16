//import { useState, useEffect, useRef } from 'react';
import './Customers.css'
import { CustomerType } from '../App'

export const Customers = ({ customers, onSelectCustomer, isEditInProgess, shouldClearSelectButton }) => {
    console.log("in Customers")

    function onEdit(customer) {
        if (!isEditInProgess) {
            console.log("edit2()", customer?.last);

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

    return (
        <>
            <div className="list-container">
                <h1>Customers</h1>
                <div className="list tableFixHead" id="customers">
                    <table className="fixed_header">
                        <thead>
                            <tr>
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
                                    <tr key={customer.id} onClick={() => onEdit(customer)} >
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
        </>
    )
}
