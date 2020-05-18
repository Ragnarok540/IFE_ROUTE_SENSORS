# base image
FROM trion/ng-cli-karma:latest

# specify the port number the container should expose
EXPOSE 9876

# start app
CMD ng test
