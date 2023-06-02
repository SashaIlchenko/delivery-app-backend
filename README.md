"Delivery -App" -application for delivery food.

About the app: Frontend: This app was created from a template based on react create app. There are 2 pages with react router navigation connected. The first page is the store bar and the product list. The customer can filter the list of products by the selected store. As long as he does not choose - will see the animation. From the list you can add a product to cart and go to the second page - cart. Here the user can select the quantity, delete the product, see the total price and complete the order by filling in the form. Also autofill the address, the map is connected, but still in development. In the near future the map will show the selected area.

Stack technologies and libraries: React, Git, emotion-styled, axios ,formik, nanoid, router-dom and other. 
Command: npm start

Backend: Backend realized in other repo [https://github.com/SashaIlchenko/delivery-app-backend] on Node.js with connection to MongoDB. Get and post queries are implemented. When the page loads, the data are loaded from the database and filtered using buttons. When you click on the button to place an order, data about the order and the user are sent to the Mongo database.
The list shows the name, price of the product and the photo - is randomly generated using [https://loremflickr.com] (a temporary solution for testing). In the future it is possible to create your own repository of unique images with links to the image database. Also implemented part of the user authorization with tokens, which will make sense for the frontend part of the history of orders of the buyer and others futures. It was deployed on [Render.com].

Stack technologies and libraries: Node.js, express, MongoDB, Mondoose, Joi Schema and other.
- `npm start` &mdash; stert server on production
- `npm run start:dev` &mdash; stert server (development)
- `npm run lint` &mdash; testing code by eslint 
- `npm lint:fix` &mdash; testing code by eslint with fix primitive bugs

Repo URL Frontend: [https://github.com/SashaIlchenko/delivery-app]

Live Page Frontend: [https://sashailchenko.github.io/delivery-app/]

Repo URL Backend: [https://github.com/SashaIlchenko/delivery-app-backend]

Live Page Backeng: [https://delivery-app-api-7kmw.onrender.com]

My GitHub: [https://github.com/SashaIlchenko]; My Linkedin: [linkedin.com/in/oleksandra-ilchenko] My Telegram: [https://t.me/sandra_ilchenko]









