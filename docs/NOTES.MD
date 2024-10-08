# How to Run?

-   install Angular by `npm install @angular/cli -g`
-   navigate to root folder
-   execute `npm i -f`
-   run the app using `ng serve -o` && to specify production mode execute `ng serve -o --qa`
-   run the app using `npm run start -o` && to specify production mode execute `npm run start -o --qa`

# Configuring keycloak client

-   Pass following env variables in prod :-
-   `KEYCLOAK_SERVER_URL`
-   `REALM`
-   `CLIENT_ID`

# Overriding default keycloak login page theme

-   navigate to `keycloak-server-config` folder
-   copy `custom-theme` folder to themes in keycloak server folder : `keycloak-x.x.x/themes`
-   go to keycloak administrator
-   go to realm settings and in the themes section, click on login theme
-   from the dropdown, choose custom-theme option
