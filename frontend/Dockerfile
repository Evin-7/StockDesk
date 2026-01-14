FROM node:18-alpine as build
RUN mkdir -p /src/app
WORKDIR /src/app

COPY package.json /src/app
RUN npm install 

COPY . /src/app

RUN npm run build 


# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /src/app/dist /usr/share/nginx/html/
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx/nginx.conf /etc/nginx/conf.d

CMD ["nginx", "-g", "daemon off;"]

# CMD ["npm","run","serve"]


# make changes to dockerfile
    #  `docker build -t <build_name>:<version> .
    # 8080 is whatever you exposed above basically  `docker run -p 8080:8080 <build_name>:<version>`

