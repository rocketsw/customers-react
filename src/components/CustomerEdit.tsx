import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
//import { ErrorMessage } from '@hookform/error-message';
import './CustomerEdit.css'
import { CustomerType, CustomerEditTypeProps } from '../App'

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
// Create map of object keys to form field names
let mapKeyToFieldArray = [{ "first": "First Name" }, { "last": "Last Name" }, { "street": "Street" }, { "city": "City" }, { "state": "State" }, { "zip": "Zipcode" }, { "phone": "Phone Number" }]

// mapKeyToFieldArray.map(entry => console.log(Object.keys(entry)[0] ) )
let mapKeysArray = mapKeyToFieldArray.map(entry => Object.keys(entry)[0])
//console.log( mapKeysArray )
//mapKeysArray.map( (key, index) => { console.log(mapKeyToFieldArray[index][mapKeysArray[index]] ) } )
let mapValuesArray = mapKeysArray.map((key, index) => mapKeyToFieldArray[index][mapKeysArray[index]])
//console.log( mapValuesArray )

export const CustomerEdit = ({ customer, handleSaveEdit, handleCancelEdit, handleEditStatusChange, isAddOrEdit }: CustomerEditTypeProps) => {
  console.log('in CustomerEdit', customer)
  let [shouldClearEntry, setShouldClearEntry] = useState(false)

  let isEditInProgess = false;
  let isEdittingRef = useRef(isEditInProgess)
  if (isAddOrEdit === 'Add') { isEdittingRef.current = true }


  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { ...defaultValue }
  });

  const onSubmit: SubmitHandler<CustomerType> = data => {
    console.log('onSubmit called', data);
    submit(data)
  }

  // force form to reset when 'customer' prop changes
  useEffect(() => {
    reset(customer!)
    setShouldClearEntry(false)
  }, [reset, customer, shouldClearEntry])

  function checkRequired(formData: CustomerType) {
    // Edit the 'mapKeyToFieldArray' object array above whenever a new text input field is added or existing field is removed or renamed.
    // Will need to handle other input types outside of the loop below.
    let missingEntry = true;
    let field = "";
    mapKeysArray.every((key, index) => {
      if (!formData[key] || formData[key]?.length === 0) {
        missingEntry = true;
        field = mapValuesArray[index];
        return false;
      }
      return true;
    }
    )
    /*   Replaced below with mapKeysArray.every() loop above.  
        if( formData.first?.length === 0 ) { missingEntry = true;  field = "First Name"; }
        if( formData.last?.length === 0 ) { missingEntry = true;  field = "Last Name"; }
        if( formData.street?.length === 0 ) { missingEntry = true;  field = "Street"; }
        if( formData.city?.length === 0 ) { missingEntry = true;  field = "City"; }
        if( formData.state?.length === 0 ) { missingEntry = true;  field = "State"; }
        if( formData.zip?.length === 0 ) { missingEntry = true;  field = "Zipcode"; }
        if( formData.phone?.length === 0 ) { missingEntry = true;  field = "Phone Number"; }
    */
    if (missingEntry === true) {
      alert(field + " value is required.");
    }
    return missingEntry;
  }

  function submit(formData: CustomerType) {
    if (formData) {
      console.log("submitting customer id :" + formData.id);

      let missingEntry = checkRequired(formData);
      if (!missingEntry) {
        let id = formData.id
        let first = formData.first
        let last = formData.last
        let street = formData.street
        let city = formData.city
        let state = formData.state
        let zip = formData.zip
        let phone = formData.phone
        let customerParamStr = "id=" + id + "&first=" + first + "&last=" + last + "&street=" + street + "&city=" + city + "&state=" + state + "&zip=" + zip + "&phone=" + phone;
        console.log(customerParamStr)

        let api = isAddOrEdit === 'Add' ? 'addCustomer' : 'updateCustomer'
        let url = "http://localhost:3000/" + api + "?" + customerParamStr;
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response for '" + api + "' was an error. " + response.statusText);
            }
            return response.text();
          })
          .then((result) => {  // result is an object
            console.log(api + " fetch successful:", result);
            handleDBWriteCallback(formData, result);
          })
          .catch((error) => {
            console.error("The '" + api + "'  API call returned an error:", error);
          })
      }
    }
  }

  function handleDBWriteCallback(formData: CustomerType, messageText) {
    handleSaveEdit(formData, messageText)
    isEdittingRef.current = false;
    setShouldClearEntry(true);
  }

  let onCancel = () => {
    isEdittingRef.current = false;
    handleEditStatusChange(isEditInProgess)
    setShouldClearEntry(true);
    handleCancelEdit();
    return false;
  }

  let editStatusWrapper = (isEditting: boolean) => {
    isEdittingRef.current = isEditting
    handleEditStatusChange(isEditting)
  }

  const checkKeyDown = (e) => {
    if (e.code === 'Enter') e.preventDefault();
  };

  return (
    <form onKeyDown={(e) => checkKeyDown(e)} onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddOrEdit} Customer</h1>
      <div className="edit-wrapper">
        <div className="edit-container">
          <div>
            <input className='noShow' {...register('id')} id="id" />
            <div className="data-div">
              <label>First Name:
                <input type="text" {...register('first', { required: true, onChange: () => editStatusWrapper(true) })} id="first" placeholder="Enter first name" />
                {errors.first?.type === 'required' && <p className="error" role="alert">first name is required</p>}
              </label>
            </div>
            <div className="data-div">
              <label>Street Address:
                <input type="text" {...register('street', { required: true, onChange: () => editStatusWrapper(true) })} id="street" placeholder="Enter street address" />
                {errors.street?.type === 'required' && <p className="error" role="alert">street address is required</p>}
              </label>
            </div>
            <div className="data-div">
              <label>City:
                <input type="text" {...register('city', { required: true, onChange: () => editStatusWrapper(true) })} id="city" placeholder="Enter city" />
                {errors.city?.type === 'required' && <p className="error" role="alert">city is required</p>}
              </label>
            </div>
            <div className="data-div">
              <label>Zip Code:
                <input type="text" {...register('zip', { required: true, onChange: () => editStatusWrapper(true) })} id="zip" placeholder="Enter Zip Code" />
                {errors.zip?.type === 'required' && <p className="error" role="alert">zip code is required</p>}
              </label>
            </div>
            <div className="data-div">
              <label>Phone:
                <input type="text" {...register('phone', { required: true, onChange: () => editStatusWrapper(true) })} id="phone" placeholder="Enter phone number" />
                {errors.phone?.type === 'required' && <p className="error" role="alert">phone number is required</p>}
              </label>
            </div>
          </div>
          <div>
            <div className="data-div">
              <label>Last Name:
                <input type="text" {...register('last', { required: true, onChange: () => editStatusWrapper(true) })} id="last" placeholder="Enter last name" />
                {errors.last?.type === 'required' && <p className="error" role="alert">last name is required</p>}
              </label>
            </div>
            <div className="data-div">
              <label>  &nbsp;
                <input className="hidden" />
              </label>
            </div>
            <div className="data-div">
              <label>State:
                <input type="text" {...register('state', { required: true, onChange: () => editStatusWrapper(true) })} id="state" placeholder="Enter State" />
                {errors.state?.type === 'required' && <p className="error" role="alert">state is required</p>}
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="rowcenter">
        <button className="edit-btn" type="submit" disabled={!isEdittingRef.current} >Save</button>
        <button className="edit-btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  )
}
