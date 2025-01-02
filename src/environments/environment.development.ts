export const environment = {
    enableAuthGuard: true,
    production: false,
    keycloakServerUrl: "https://keycloak.erpnandifoods.com:8443",
    realm: "master",
    clientId: "nandi-foods-web-app",
    baseUrl: "http://localhost:8081",

    // Enable UI elements based environment flags
    // To cleanup search for disableUIEltsBasedOnEnvFlags() in components
    enableLinkedUOMInUOMDetails: true,
    enableLinkedPUandHuInUOMDetails: true,
    enableMeasuredValuesInUOMDetails: true,
};
