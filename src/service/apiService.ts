import { CustomerType } from "../App";

const PORT: string = "3000";

export async function retrieveCustomersAPI(setCustomerList: Function) {
  let customersArray: CustomerType[] = [];

  let url = `http://localhost:${PORT}/customers`;
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      let custjson = response.json();
      return custjson;
    })
    .then((result) => {
      // result is an object
      console.log("customers fetch successful:");
      console.log("number of customers is:", result?.length);
      customersArray = result;
    })
    .catch((error) => {
      console.error(
        "There has been a problem with the fetch 'customers' API call:",
        error
      );
    });
  setCustomerList(customersArray);
  return customersArray;
}

export async function addOrUpdateCustomersAPI(
  isAddOrEdit: string,
  customerParamStr: string,
  handleDBWriteCallback: Function
) {
  let message = {};
  let api = isAddOrEdit === "Add" ? "addCustomer" : "updateCustomer";
  let url = `http://localhost:${PORT}/` + api + "?" + customerParamStr;
  console.log("in addOrUpdateCustomers before fetch");
  await fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(
          "Network response for '" +
            api +
            "' was an error. " +
            response.statusText
        );
      }
      return response.text();
    })
    .then((result) => {
      // result is an object
      console.log(
        api + " fetch addOrUpdate successful:",
        JSON.stringify(result)
      );
      message = result;
    })
    .catch((error) => {
      console.error("The '" + api + "'  API call returned an error:", error);
    });
  handleDBWriteCallback(message);
  return message;
}
