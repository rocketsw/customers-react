let mysql = require('mysql');
// May need to install and use 'mysql2'.  Errors connecting with mysql on laptop.
module.exports = 
{
	
	CustomerDB: function () {

		let connection = mysql.createConnection({
		  host: "localhost",
		  user: "root",
		  password: "admin",
		  database: "devl"
		});

	    try {
		   connection.connect();
		   console.log("connected to mysql DB");
		} catch(err) {
			console.log("Error connecting to mysql DB", err);
		}
		

        function myquery(sql, args) {
            return new Promise( function(resolve, reject)  {
                connection.query(sql, args, (err, data) => {
                    if (err)
                        return reject(err);
                    resolve(data);
                });
            });
        }

        this.getCustomers = function(response) {
            let res = response
            myquery('SELECT * FROM customer')
                .then(data => {
                    let customerjson = '[';
                    for (i = 0; i < data.length; i++) {
                        if (customerjson.length > 1) {
                            customerjson = customerjson + ',';
                        }
                        customerjson = customerjson + `{"id":"${data[i].CustomerID.toString()}","first":"${data[i].FirstName}","last":"${data[i].LastName}","street":"${data[i].Street}","city":"${data[i].City}","state":"${data[i].State}","zip":"${data[i].Zipcode}","phone":"${data[i].Phone}"}`;
                    }
                    customerjson = customerjson + ']';
                    console.log('customerjson: ' + customerjson);

                    res.write(customerjson)
                    res.end()
                })
                .catch(err => {
                    console.log(err.sqlMessage)
                });
        }

        this.updateCustomer = function (indata, callback) {
            console.log("updateCustomer:", indata)
            let id = indata.id
            console.log("customer id: " + id)
            let updateSqlStr = `update CUSTOMER set FirstName = "${indata['first']}", LastName = "${indata['last']}", Street = "${indata['street']}", City = "${indata['city']}", State = "${indata['state']}", Zipcode = "${indata['zip']}", Phone = "${indata['phone']}" where CustomerID = ${id};`;
            console.log(updateSqlStr)
            connection.query(updateSqlStr, function (err, data) {
                if (err)
                    callback(err, null);
                else {
                    callback(null, data);
                }
            });
        }

        this.insertCustomer = function (indata, callback) {
            console.log("insertCustomer:", indata)
            let id = indata.id
            
            let insertSqlStr = `insert into CUSTOMER  (FirstName, LastName, Street, City, State, Zipcode, Phone) values (  "${indata['first']}", "${indata['last']}", "${indata['street']}", "${indata['city']}", "${indata['state']}", "${indata['zip']}", "${indata['phone']}" )`;
       
            console.log(insertSqlStr)
            connection.query(insertSqlStr, function (err, data) {
                if (err)
                    callback(err, null);
                else {
                    callback(null, data);
                }
            });
        }
		
        this.getCustomerByID = function (indata, callback) {
            let id = indata
            console.log('id = ' + id.toString())
            //customerjson = '{"last":"' + results[last_name_pos] + '","first":"' + results[first_name_pos] + '"}';
            let getCustomerSQL = `select lastname, firstname from customer where customerid = + ${id}`
            console.log(getCustomerSQL)
            connection.query(getCustomerSQL, function (err, data) {
                if (err)
                    callback(err, null);
                else {
                    callback(null, data);
                }
            });
            //customerjson = '{"last":"Wayne","first":"John","street":"555 East St","city":"Anytown","state":"CA","zip":"30000","phone":"555-200-1234"}';
        }

        let closeConnection = function () {
            connection.end();
        };
	}
}