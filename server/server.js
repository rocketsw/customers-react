let customerdb = require('./customerdb.js'),
    express = require( 'express' );

let custDB = new customerdb.CustomerDB();

let app = express();
app.use(express.static('public'));

const port = 3001;

app.get('/', (req, res) => res.send('<h1>Hello World!</h1>'))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

app.get('/customers', (req, res) => {
    custDB.getCustomers(res);
    console.log('done with custDB.getCustomers()')
  } );

app.get('/updateCustomer', (req, res) => {
    custDB.updateCustomer(req.query, updateCustomerCallback(res));
});

app.get('/addCustomer', (req, res) => {
    custDB.insertCustomer(req.query, updateCustomerCallback(res));
});

// the innerCallback() expects 'data' argurment will be an object with a 'message' key and 'string' value
let updateCustomerCallback = function (response) {
    let innerCallback = function (err, data) {
        let res = response;
        if (err) {
            // error handling code goes here
            console.log("ERROR : ", err);
        } else {
            console.log(data);
            res.write(data.message);
            res.end();
        }

    }
    return innerCallback;
}



