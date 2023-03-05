CREATE TABLE `customer` (
  `CustomerID` int auto_increment primary key,
  `FirstName` char(15) DEFAULT NULL,
  `LastName` char(20) NOT NULL,
  `Street` char(25) DEFAULT NULL,
  `City` char(20) DEFAULT NULL,
  `State` char(2) DEFAULT NULL,
  `Zipcode` char(10) DEFAULT NULL,
  `Phone` char(13) DEFAULT NULL
) ;

insert into customer (FirstName, LastName, Street, City, State, Zipcode, Phone) values
 ( "Betty", "White", "5 Hollywood Blvd", "Holllywood", "CA", "22222", "222-333-4444" );
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone)  values 
("Walter","Rayleigh","1 Downing Street","London","UK","00001","000-000-0000"); 
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone)  values 
("Bill","Baldwin","123 Side St","Nowhere","FL","20001","555-100-5678");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("John","Wayne","555 East St","Anytown","CA","30000","555-200-1234");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Bob","Barker","234 West St","Hometown","TX","50000","999-300-4567");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Donald","Trump","2000 Pennsylvania Ave","Washington","DC","12347","202-222-3333");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Alec","Baldwin","1000 BroadwayStreet","New York","NY","50003","555-111-1212");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Jimmy","Stewart","6 Santa Monica Freeway","Hollywood","CA","24680","789-654-7777");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("John","Deere","000 Sesame Street","Anytown","CA","52522","767-111-1213");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Tom","Jones","987 Galloway Drive SE","Ashburn","UK","20176","5712719270");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Earl","James","567 Main Drive SE","Richmond","VA","20000","5551111234");
insert into CUSTOMER (FirstName, LastName, Street, City, State, Zipcode, Phone) values 
("Jane","Alden","19 english Road SE","London","UK","87654","987-654-4321");