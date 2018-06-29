# FSD Workout UI
This application built using ReactJS with Docker container, in order to run the application, follow the below steps
1. Build docker image <br>
   Command: ```docker build .```
2. Run the docker images <br>
   Command: ```docker run -d -p 3000:3000 <image_id>``` <br>
Note: Above command needs the image_id which created at step1, to find the image id, run the command ```docker images```