const initSqlJs = require('sql.js');
const fs = require("fs");

// Create a database
const db = new initSqlJs.Database();
// NOTE: You can also use new SQL.Database(data) where
// data is an Uint8Array representing an SQLite database file


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
insert into customers values ('Jane','Alden','19 english Road SE','London','UK','87654','987-654-4321');"

db.run(sqlstr);

let updatestr = "update CUSTOMERS set FirstName = 'Bartholomew' where rowid = 12;"
db.run(updatestr);

const result = db.exec("SELECT rowid, FirstName, LastName, Street, City, State, Zipcode, Phone FROM customers");

let colarr = result[0].columns;
let valarr = result[0].values;
//console.log(valarr)
customers = []
valarr.map((row) => { 
  console.log(valarr); 
  customer = {}
  row.map((column, index) => customer[colarr[index]] = column )
  customers.push(customer)
 }
)
console.log( JSON.stringify( customers ) )

// free the memory used by the statement
//stmt.free();

// Export the database to an Uint8Array containing the SQLite database file
const data = db.export();
const buffer = Buffer.from(data);
fs.writeFileSync("filename.sqlite", buffer);