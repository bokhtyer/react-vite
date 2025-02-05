const branch: string = "dev";
export const maintenance = false;

type Environment = "dev" | "qa" | "stage" | "live" | "local";

interface EnvironmentConfig {
    web_base_url: string;
    api_base_url: string;
    business_base_url: string;
    social_api_base_url: string;
    bucket_base_url: string;
    cognitoUserPoolId: string;
    identityPoolId: string;
    bucket: string;
    region: string;
    cognito_app_client_id: string;
    GOOGLE_CLIENT_ID: string;
    ENCRYPTION_KEY: string;
}

const environmentConfigs: Record<Environment, EnvironmentConfig> = {
    local: {
        web_base_url: "http://localhost:5001",
        api_base_url: "http://127.0.0.1:8001",
        business_base_url: "https://ogdtu7325h.execute-api.us-west-2.amazonaws.com/dev",
        social_api_base_url: "",
        bucket_base_url: "https://hsbs-healthcare-dev.s3.us-west-2.amazonaws.com/public/",
        cognitoUserPoolId: "us-west-2_tUxuydxr3",
        identityPoolId: "us-west-2:d5aa1f72-9dd0-4599-bf75-3b533b07cb83",
        bucket: "hsbs-healthcare-dev",
        region: "us-west-2",
        cognito_app_client_id: "47k57684o6gbsa6e4pt7v02gka",
        GOOGLE_CLIENT_ID: "962854925318-epvn4c3bqqf7kb8bfaln7r6jfucd2pk0.apps.googleusercontent.com",
        ENCRYPTION_KEY: "x6rBTSMQ96Yd7YiGoVlnAI2q-A_KilkP54961sRQqJQ=",
    },
    dev: {
        web_base_url: "https://dev.dp092fyooelsa.amplifyapp.com",
        api_base_url: "https://devhsbsapi.shadhinlab.xyz",
        business_base_url: "https://ogdtu7325h.execute-api.us-west-2.amazonaws.com/dev",
        social_api_base_url: "",
        bucket_base_url: "https://hsbs-healthcare-dev.s3.us-west-2.amazonaws.com/public/",
        cognitoUserPoolId: "us-west-2_tUxuydxr3",
        identityPoolId: "us-west-2:d5aa1f72-9dd0-4599-bf75-3b533b07cb83",
        bucket: "hsbs-healthcare-dev",
        region: "us-west-2",
        cognito_app_client_id: "47k57684o6gbsa6e4pt7v02gka",
        GOOGLE_CLIENT_ID: "962854925318-epvn4c3bqqf7kb8bfaln7r6jfucd2pk0.apps.googleusercontent.com",
        ENCRYPTION_KEY: "x6rBTSMQ96Yd7YiGoVlnAI2q-A_KilkP54961sRQqJQ=",
    },
    qa: {
        web_base_url: "https://qahsbs.shadhinlab.xyz",
        api_base_url: "https://qahsbsapi.shadhinlab.xyz",
        business_base_url: "https://27whjeforb.execute-api.us-west-2.amazonaws.com/qa",
        social_api_base_url: "",
        bucket_base_url: "https://hsbs-healthcare-qa.s3.us-west-2.amazonaws.com/public/",
        cognitoUserPoolId: "us-west-2_tUxuydxr3",
        identityPoolId: "us-west-2:300dd1de-e47d-4982-a465-0d316913d09b",
        bucket: "hsbs-healthcare-qa",
        region: "us-west-2",
        cognito_app_client_id: "47k57684o6gbsa6e4pt7v02gka",
        GOOGLE_CLIENT_ID: "962854925318-10gq8l01lifadfutlf37k04f3ts15rfa.apps.googleusercontent.com",
        ENCRYPTION_KEY: "RkJ4eAAAD0SsN5eJFUzaNaNrlrXPSC6f6r8dZatjZXE=",
    },
    stage: {
        web_base_url: "https://uat.medska.com",
        api_base_url: "https://apistagehc.medska.com",
        business_base_url: "https://27whjeforb.execute-api.us-west-2.amazonaws.com/qa",
        social_api_base_url: "",
        bucket_base_url: "https://medska-stage.s3.eu-west-2.amazonaws.com/public/",
        cognitoUserPoolId: "eu-west-2_IZnUKTE81",
        identityPoolId: "eu-west-2:65764098-fd57-48ae-b256-9b762c7b8416",
        bucket: "medska-stage",
        region: "eu-west-2",
        cognito_app_client_id: "5gr5rj52ej6gr7t0n8vpndnu57",
        GOOGLE_CLIENT_ID: "962854925318-17cl2q3qgcj9h8c504j7g5jbdki82iel.apps.googleusercontent.com",
        ENCRYPTION_KEY: "DhZTNw6LOUvVlJUK0fmsUFlHT0HEvIMm3-caprT43vk=",
    },
    live: {
        web_base_url: "https://live.do1tgm07u5sca.amplifyapp.com",
        api_base_url: "https://apihc.medska.com",
        business_base_url: "https://27whjeforb.execute-api.us-west-2.amazonaws.com/qa",
        social_api_base_url: "",
        bucket_base_url: "https://medska-prod.s3.eu-west-2.amazonaws.com/public/",
        cognitoUserPoolId: "eu-west-2_IZnUKTE81",
        identityPoolId: "eu-west-2:65764098-fd57-48ae-b256-9b762c7b8416",
        bucket: "medska-prod",
        region: "eu-west-2",
        cognito_app_client_id: "5gr5rj52ej6gr7t0n8vpndnu57",
        GOOGLE_CLIENT_ID: "962854925318-e31iu2j0fv3nus306l6r821ddr7i0h4c.apps.googleusercontent.com",
        ENCRYPTION_KEY: "xG2dAT4d6ZpMYn1HncJWgIddeOHq1w1vhUGqZWN0AjM=",
    },
};

// Get current environment config
const currentConfig = environmentConfigs[branch as Environment] || environmentConfigs.dev;

// Export all configuration values
export const web_base_url = currentConfig.web_base_url;
export const api_base_url = currentConfig.api_base_url;
export const business_base_url = currentConfig.business_base_url;
export const social_api_base_url = currentConfig.social_api_base_url;
export const bucket_base_url = currentConfig.bucket_base_url;
export const cognitoUserPoolId = currentConfig.cognitoUserPoolId;
export const identityPoolId = currentConfig.identityPoolId;
export const bucket = currentConfig.bucket;
export const region = currentConfig.region;
export const cognito_app_client_id = currentConfig.cognito_app_client_id;
export const GOOGLE_CLIENT_ID = currentConfig.GOOGLE_CLIENT_ID;
export const ENCRYPTION_KEY = currentConfig.ENCRYPTION_KEY;

// Constants that don't vary by environment
export const cookie_url_endpoint = "";
export const auth0_redirected_endpoint = "";
export const cloudfront_base_url = "";
export const auth0_app_client_id = "";
export const DEFAULT_LANGUAGE = "en";
export const messengerChatId = "";
export const payment_currency_type = "USD";
