FROM mongo

COPY init.json /init.json
CMD mongoimport --host mongodb --db moviedatabase --collection movies --type json --file /init.json --jsonArray