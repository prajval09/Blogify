Add your .env to GitIgnore


Tech Stack
--Appwrite : backend as service
--Tinymce  : text editor feature
--HTML react parser : To parse html from database
--React Hook Form : forms
--Env variables react : security


env file
--created env file and added to GitIgnore
--restart your project whenever u make changes in env file
--1. if you are using create react method instead of vite then variable must start with REACT_APP_...
  and you can access it as process.env.REACT_APP_...
  
  2. if you are creating app using vite then your variable name in env file must starts with VITE_...
  abd you have to access it using import.meta.env.VITE_...
  
--we did a thing that we made a saprate file such that we can access them easitli names as Conf.js

To maintain the authentication that is login create user and logout
-- Create a coustom class includes Client that is which database provider and account as elements .
   to handle the users activity,
-- create its object and export it
-- while creating object write constructor such that when the object is called assign the client
   means provider ans use the functions provided by Appwrite function called account e.g - account.create()

Do the same above process with config that to handle the things related activities   


i have to check that user is logged in before getuser