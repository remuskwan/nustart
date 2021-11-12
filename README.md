## NUStart
### Members
- A0201320J Deng XueQi
- A0194539N Kong Xinyue
- A0202491N Lee Xiu Qi Alison 
- A0214628E Remus Kwan Hao Hui 
- A0194544X Zhou Yurou 

### Introduction
NUStart is a web application to facilitate the academic and social integration of new NUS students. It provides a university starter pack for incoming students, which include the campus map, the guides published by existing NUS Staff and the forum for new students to ask questions and meet new people.

The map page is managed by admins. Admins can upload and delete the map picture.

The guides are divided into several categories which contain helpful information for new students to get acclimated to university life and students and staff can also comment on the guides. Only admins can add, edit and delete a category.

The forum contains different threads and each thread contains multiple posts. Students can choose his/her interested forum and publish threads or posts to take part in a discussion.

There is also a user management feature for all the users. Student and staff accounts will contain their own profile page that can be personalised. They can also view all the guides, threads and posts they have created. Only admins can manage all users on the platform. Admins can approve or reject a staff and block a user.


### Technology Used
The backend is supported by Java EE. File upload supported by AWS S3. The frontend is powered by React, JavaScript, HTML and CSS. Tailwind CSS and TailwindUI components.

### Setting up the backend
To run the NetBeans project, create a new Java DB Database with the following credentials
* JavaDB Database Name: nustartDB
* JavaDB username: administrator
* JavaDB password: password
* JNDI name: nustart
* JDBC Connection Pool Name: nustartConnectionPool

### Setting up the frontend
1. Navigate to the “ui” folder and install relevant dependencies with npm install.
2. Once download has been completed execute npm run start and the browser window should direct you to localhost:3000
3. Default login
Admin1: 
- email: admin01@mail.com
- password: 1234567aA@

The web application is deployed and ready now. 
