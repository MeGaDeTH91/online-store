<img src="https://res.cloudinary.com/devpor11z/image/upload/v1597228588/nqmxfnsgbjtasmipxum7.png" alt="react-store-logo" />
<h3><i>Title: </i><b>React Store</b> - great choice for your sales.</h3>

### <i>Introduction: </i>
React store is simple solution for publishing, managing and selling your products with user-friendly UI.
The main goal is to make each seller's products available globally. The online store can be accessed as guest,
registered user with standard privileges and there is also administrative area.

### <i>Technologies: </i><br>
The application consists two parts - back-end REST API, based on Express.js and front-end application,
based on the amazing React library.

### <i>Launch settings: </i>
The REST API is located in the 'my-express-api' folder, in which .env file should be put with this info:<br>
PORT={specifiy port}<br>
DB_URL=mongodb+srv://{specify username}:{specify password}@aws-8thve.mongodb.net/{your database name}?retryWrites=true&w=majority<br>
COOKIE_KEY={your cookie key}<br>
PRIVATE_KEY={your private key}<br>
Then navigate to the folder with command prompt, powershell or
any other suitable command-line and execute 'npm start'. This will start the REST API on
[http://localhost:{port}](http://localhost:{port})
Next, in the project root folder, in separate command-line window run the same 'npm start' command and
this will start the React app on [http://localhost:3000](http://localhost:3000)
After that, it is up to you :)

<i>Table of contents: </i>
1 Public part – guest users can access home page with all products listed, page with listed categories so user can browse products by category, register, login pages and search by title option.
1.2 Private part:
1.2.1 Standard user – can access all public functionalities plus adding products to shopping cart, finalizing order and viewing order history, exploring, edition of profile details. User is able to share feedback by writing reviews.
1.2.2 Administrator – can access all functionalities, which standart user is able to, plus adding, editing and removing products, also adding and editing categories. Administrators can manage users and give administrative privileges or ban(deactivate) user accounts.
