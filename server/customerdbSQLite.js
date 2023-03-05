const sqljs = require('sql.js');
const fs = require("fs");

module.exports = 
{
	
	CustomerDB: function () {
		let results;
		// Create a database
		const db = new sqljs.Database();

		let sqlstr = "CREATE TABLE customers (FirstName char(20), LastName char(20), Street char(30), City char(20), State char(2), Zipcode char(10), Phone char(13)); \
		insert into customers values ('Betty', 'White', '5 Hollywood Blvd', 'Holllywood', 'CA', '22222', '222-333-4444' );\
		insert into customers values ('Walter','Rayleigh','1 Downing Street','London','UK','00001','000-000-0000'); \
		insert into customers values ('Bill','Baldwin','123 Side St','Nowhere','FL','20001','555-100-5678');\
		insert into customers values ('John','Wayne','555 East St','Anytown','CA','30000','555-200-1234');\
		insert into customers values ('Bob','Barker','234 West St','Hometown','TX','50000','999-300-4567');\
		insert into customers values ('Donald','Trump','2000 Pennsylvania Ave','Washington','DC','12347','202-222-3333');\
		insert into customers values ('Alec','Baldwin','1000 BroadwayStreet','New York','NY','50003','555-111-1212');\
		insert into customers values ('Jimmy','Stewart','6 Santa Monica Freeway','Hollywood','CA','24680','789-654-7777');\
		insert into customers values ('John','Deere','000 Sesame Street','Anytown','CA','52522','767-111-1213');\
		insert into customers values ('Tom','Jones','987 Galloway Drive SE','Ashburn','UK','20176','5712719270');\
		insert into customers values ('Earl','James','567 Main Drive SE','Richmond','VA','20000','5551111234');\
		insert into customers values ('Jane','Alden','19 English Road SE','London','UK','87654','987-654-4321');"
		
		db.run(sqlstr);

        this.getCustomers = function(response) {
			const result = db.exec("SELECT rowid, FirstName, LastName, Street, City, State, Zipcode, Phone FROM customers");

			let colarr = result[0].columns;
			colarr = ['id', 'first', 'last', 'street', 'city', 'state', 'zip', 'phone']
			let valarr = result[0].values;
			//console.log(valarr)
			customers = []
			valarr.map((row) => { 
			  //console.log(valarr); 
			  customer = {}
			  row.map((column, index) => 
			     customer[colarr[index]] = column
		      )
			  customers.push(customer)
			 }
			)
			let customersJSON = JSON.stringify( customers )
			console.log( 'customers:', customersJSON )
			
			response.write(customersJSON)
            response.end()
        }

        this.updateCustomer = function (indata, callback) {
            console.log("updateCustomer:", indata)
            let id = indata.id
            console.log("customer id: " + id)
            let updateSqlStr = `update customers set FirstName = '${indata['first']}', LastName = '${indata['last']}', Street = '${indata['street']}', City = '${indata['city']}', State = '${indata['state']}', Zipcode = '${indata['zip']}', Phone = '${indata['phone']}' where rowid = ${id};`;
            console.log(updateSqlStr)
            db.exec(updateSqlStr)
			let numRowsModified = db.getRowsModified();
			let msg = "Number rows modified: " + numRowsModified
			callback(null, {message:msg});
        }

        this.insertCustomer = function (indata, callback) {
            console.log("insertCustomer:", indata)
            let id = indata.id
            
            let insertSqlStr = `insert into customers  (FirstName, LastName, Street, City, State, Zipcode, Phone) values (  "${indata['first']}", "${indata['last']}", "${indata['street']}", "${indata['city']}", "${indata['state']}", "${indata['zip']}", "${indata['phone']}" )`;
       
            console.log(insertSqlStr)
            db.exec(insertSqlStr)
			let numRowsModified = db.getRowsModified();
			let msg = "Number rows added: " + numRowsModified
			callback(null, {message:msg});			
        }
		
        this.getCustomerByID = function (indata, callback) {
            let id = indata
            console.log('id = ' + id.toString())
            let getCustomerSQL = `select lastname, firstname from customers where rowid = + ${id}`
            console.log(getCustomerSQL)
            let result = db.exec(getCustomerSQL)
			let customer = {}
			
			let colarr = result[0].columns;
			let valarr = result[0].values;
			//console.log(valarr)
			
			valarr.map((row) => { 
			  console.log(valarr); 
			  row.map((column, index) => customer[colarr[index]] = column )
			 }
			)
			console.log( 'customer', JSON.stringify( customer ) )
			callback(null, customer);
        }
	}
}