# How to Run?

-   install Angular by `npm install @angular/cli -g`
-   navigate to root folder
-   execute `npm i -f`
-   run the app using `ng serve -o` && to specify production mode execute `ng serve -o --prod`

# Configuring keycloak client

-   Pass following env variables in prod :-
-   `KEYCLOAK_SERVER_URL`
-   `REALM`
-   `CLIENT_ID`

# Overriding default keycloak login page theme

-   navigate to `keycloak-server-config` folder
-   copy `custom-theme` folder to themes in keycloak server folder : `keycloak-x.x.x/themes`
