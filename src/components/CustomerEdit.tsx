import { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
//import { ErrorMessage } from '@hookform/error-message';
import './CustomerEdit.css'
import { CustomerType, CustomerEditTypeProps } from '../App'
import { addOrUpdateCustomersAPI } from '../service/apiService'
import Snackbar from '@mui/material/Snackbar';

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
  let [editFormData, setEditFormData] = useState({} as CustomerType)

  let isEditInProgess = false;
  let isEdittingRef = useRef(isEditInProgess)
  //if (isAddOrEdit === 'Add') { isEdittingRef.current = true }

  const [snackbarProps, setSnackbarProps] = useState( {open: false, message: ''} );

  const handleCloseSnackbar = () => setSnackbarProps({open: false, message: ''} );

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
    let missingEntry:boolean = true;
    let field = "";
    mapKeysArray.every((key, index) => {
      missingEntry = false;
      if (!formData[key] || formData[key]?.length === 0) {
        missingEntry = true;
        field = mapValuesArray[index];
        return false;
      }
      return true;
    }
    )
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

        setEditFormData( formData )
        addOrUpdateCustomersAPI(isAddOrEdit, customerParamStr, handleDBWriteCallback)
      }
    }
  }

  function handleDBWriteCallback(messageText: string) {
    handleSaveEdit(editFormData, messageText)
    setSnackbarProps({ open: true, message: messageText });
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
    <>
    <form onKeyDown={(e) => checkKeyDown(e)} onSubmit={handleSubmit(onSubmit)}>
      <h1>{isAddOrEdit} Customer</h1>
      <div className="edit-wrapper">
        <div className="edit-container">
          <div>
            <input className='noShow' {...register('id')} id="id" />
            
              <label htmlFor="first">First Name:</label>
                <input type="text" {...register('first', { required: true, onChange: () => editStatusWrapper(true) })} id="first" placeholder="Enter first name" />
                {errors.first?.type === 'required' && <p className="error" role="alert">first name is required</p>}
              
            
              <label htmlFor="street">Street Address:</label>
                <input type="text" {...register('street', { required: true, onChange: () => editStatusWrapper(true) })} id="street" placeholder="Enter street address" />
                {errors.street?.type === 'required' && <p className="error" role="alert">street address is required</p>}


              <label htmlFor="city">City:</label>
                <input type="text" {...register('city', { required: true, onChange: () => editStatusWrapper(true) })} id="city" placeholder="Enter city" />
                {errors.city?.type === 'required' && <p className="error" role="alert">city is required</p>}


              <label htmlFor="zip">Zip Code:</label>
                <input type="text" {...register('zip', { required: true, onChange: () => editStatusWrapper(true) })} id="zip" placeholder="Enter Zip Code" />
                {errors.zip?.type === 'required' && <p className="error" role="alert">zip code is required</p>}
              

              <label htmlFor="phone">Phone:</label>
                <input type="text" {...register('phone', { required: true, onChange: () => editStatusWrapper(true) })} id="phone" placeholder="Enter phone number" />
                {errors.phone?.type === 'required' && <p className="error" role="alert">phone number is required</p>}

          </div>
          <div>

              <label htmlFor="last">Last Name:</label>
                <input type="text" {...register('last', { required: true, onChange: () => editStatusWrapper(true) })} id="last" placeholder="Enter last name" />
                {errors.last?.type === 'required' && <p className="error" role="alert">last name is required</p>}

              <label htmlFor="hidden">&nbsp;</label>
                <input type="text" id="hidden"  style={{visibility:"hidden"}} />

              <label htmlFor="state">State:</label>
                <input type="text" {...register('state', { required: true, onChange: () => editStatusWrapper(true) })} id="state" />
                {errors.state?.type === 'required' && <p className="error" role="alert">state is required</p>}
              

          </div>
        </div>
      </div>

      <div className="rowcenter">
        <button className="edit-btn" type="submit" disabled={!isEdittingRef.current} >Save</button>
        <button className="edit-btn" type="button" disabled={!isEdittingRef.current} onClick={onCancel}>Cancel</button>
      </div>
    </form>
    <Snackbar
          open={snackbarProps.open}
          message={snackbarProps.message}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          onClose={handleCloseSnackbar}
          autoHideDuration={6000}
    />
    </>
  )
}
