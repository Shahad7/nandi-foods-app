export const environment = {
    enableAuthGuard: true,
    production: true,
    keycloakServerUrl: "https://142.93.147.177:8443",
    realm: "production",
    clientId: "nandi-foods-web-app",
    baseUrl: "",

    // Enable UI elements based environment flags
    // To cleanup search for disableUIEltsBasedOnEnvFlags() in components
    enableLinkedUOMInUOMDetails: true,
    enableLinkedPUandHuInUOMDetails: true,
    enableMeasuredValuesInUOMDetails: true,
};
