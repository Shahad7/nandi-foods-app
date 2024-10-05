export const environment = {
    production: true,
    keycloakServerUrl: process.env["KEYCLOAK_SERVER_URL"],
    realm: process.env["REALM"],
    clientId: process.env["CLIENT_ID"],
};
