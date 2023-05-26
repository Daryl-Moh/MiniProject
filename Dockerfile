FROM node:18 AS client-build

WORKDIR '/app'

COPY ./client .

ENV PATH /app/node_modules/.bin:$PATH

RUN ng build

FROM maven:3.8.3-openjdk-17 AS server-build

COPY server/src /home/app/src
COPY server/pom.xml /home/app

COPY --from=client-build /app/dist/client2 /home/app/src/main/resources/static

RUN mvn -f /home/app/pom.xml clean package -DskipTests

# put angular client build here 

FROM openjdk:17-oracle


COPY --from=server-build /home/app/target/server-0.0.1-SNAPSHOT.jar /usr/local/lib/server.jar

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/usr/local/lib/server.jar"]