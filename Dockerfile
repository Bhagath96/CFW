# set the base image
# n/b: for production, node is only used for building 
# the static Html and javascript files
# as react creates static html and js files after build
# these are what will be served by nginx
# use alias build to be easier to refer this container elsewhere
# e.g inside nginx container
FROM node:14.15.1-alpine as build
#get build args from docker-compose.yml
ARG BUILD_ENV
# set working directory
# this is the working folder in the container
# from which the app will be running from
WORKDIR /app
# copy everything to /app directory
COPY . /app
# add the node_modules folder to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install and cache dependencies
RUN yarn
#build the project for production
RUN yarn build:$BUILD_ENV
# set up production environment
# the base image for this is an alpine based nginx image
FROM nginx:1.18.0-alpine
#get build args from docker-compose.yml
ARG BUILD_ENV
# Install curl and bash for the entry script
RUN apk --update add openssh git curl bash && rm -rf /var/cache/apk/*

# copy the dist folder from react to the root of nginx (www)
COPY --from=build /app/dist /usr/share/nginx/html
# --------- only for those using react router ----------
# if you are using react router 
# you need to overwrite the default nginx configurations
# remove default nginx configuration file
RUN rm /etc/nginx/conf.d/default.conf
# replace with custom one
COPY nginx-${BUILD_ENV}.conf /etc/nginx/conf.d/ngnix.conf
# --------- /only for those using react router ----------
# expose port 80 to the outer world
EXPOSE 80
# start nginx 
CMD ["nginx", "-g", "daemon off;"]
