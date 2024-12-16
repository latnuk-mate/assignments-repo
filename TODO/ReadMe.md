# REST API for a TODO Project 

# TECH STACK
Node/Express.js to design the api architecture.
MongoDB as a database.

# ROUTE CONFIGURATION
<!-- routes -->
/ home [GET REQUSTE] {Get all the tasks}
/task/:id [GET REQUEST] get a specific task details using task id
/task/create [POST REQUESTE] create a new task
/task/edit/:id [PUT REQUEST] update a task status
/task/delete/:id [DELETE REQUEST] delete a task


# HOW TO USE
To use the app first copy this repository HTTPS web url and in your machine terminal run
git clone url {replace the url with your copied url}
then cd to that directory using [cd {directory name}]
then run [npm i or npm install ] to download necessary modules.
change the database url in app.js [process.env.MONGO_URI] to your own db url 
or if you want make your own necessary db configuration, then your are welcome :-)

After db set up is done, run this command [npm run dev]

You have the app up and running and all set :)
