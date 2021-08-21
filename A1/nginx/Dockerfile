FROM nginx:alpine

# Remove any existing config files
RUN rm /etc/nginx/conf.d/*

# Copy files
COPY ./nginx.conf /etc/nginx/conf.d/
COPY ./index.html /usr/share/nginx/html/index.html

# Expose the listening port
EXPOSE 80

# Launch NGINX
CMD [ "nginx", "-g", "daemon off;" ]