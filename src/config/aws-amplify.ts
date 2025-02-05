import { bucket, cognito_app_client_id, cognitoUserPoolId, identityPoolId, region } from "./config";

export const S3_Pool_conf = {
    Auth: {
        identityPoolId: identityPoolId,
        region: region,
        userPoolId: cognitoUserPoolId,
        userPoolWebClientId: cognito_app_client_id,
    },
    Storage: {
        bucket: bucket,
        region: region,
    },
};

// export function SetS3Config(bucket: string, level: string) {
//     Storage.configure({
//         bucket: bucket,
//         level: level,
//         region: region,
//         identityPoolId: identityPoolId,
//     });
// }
