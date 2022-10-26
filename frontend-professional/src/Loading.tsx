import React from "react";
import AWS from 'aws-sdk';

function s3() {
    // Bucket Configurations
    var bucketName = 'waffle-house';
    var bucketRegion = 'us-east-1';
    var IdentityPoolId = 'us-east-1:638b9e6e-3ed9-4e0c-a9de-2cfed1a9577e';

    AWS.config.update({
                    region: bucketRegion,
                    credentials: new AWS.CognitoIdentityCredentials({
                        IdentityPoolId: IdentityPoolId
                    })
                });

                var s3 = new AWS.S3({
                    apiVersion: '2006-03-01',
                    params: {Bucket: bucketName}
    });
}

const Loading  = () => {
    s3();

    return (
        <div>
            <video width="320" height="240" controls src="./assets/sauls-balls-2.mp4">
                <source src="./assets/sauls-balls-2.mp4" />
            </video>
            <div>loading...</div>
        </div>
    );
};

export {Loading};