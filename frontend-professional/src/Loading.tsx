import React from "react";
import AWS from 'aws-sdk';
import './loading.css';
import './index.css';

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
        <div style={{minHeight: '100vh', alignContent: 'center', textAlign: 'center'}}>
            <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="130" height="60" viewBox="0 0 130 60" xmlSpace="preserve" style={{fill:'#000', width: 260, height: 120, marginTop: 'calc(50vh - 100px)'}}>
                <desc>Created with Fabric.js 4.6.0</desc>
                <defs>
                </defs>
                <g transform="matrix(0.13 0 0 -0.13 65.89 30.79)" id="uzIOWGqMEI6WpHsfhOhFi"  >
                <path 
                    style={{stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeDashoffset: 0, strokeLinejoin: 'miter', strokeMiterlimit: 4, fill: '#000', fillRule: 'nonzero', opacity: 1}}
                    vector-effect="non-scaling-stroke"  transform=" translate(-500, -690)"
                    d="M 204 891 C 148 858 88 793 35 704 C 3 651 0 639 0 570 C 0 472 11 460 98 460 C 158 460 160 461 160 485 C 160 521 202 560 240 560 C 278 560 320 521 320 485 L 320 460 L 510 460 L 700 460 L 700 485 C 700 521 742 560 780 560 C 818 560 860 521 860 485 C 860 461 863 460 913 460 C 984 460 1000 477 1000 555 C 1000 664 937 741 833 757 C 785 764 771 772 689 832 C 577 913 555 920 395 920 C 258 920 254 919 204 891 z M 380 820 L 380 760 L 255 760 C 186 760 130 764 130 768 C 130 781 203 848 235 864 C 252 873 290 880 323 880 L 380 880 L 380 820 z M 603 840 C 634 821 672 796 687 783 L 715 761 L 568 760 L 420 760 L 420 821 L 420 882 L 484 878 C 534 875 559 867 603 840 z"
                    strokeLinecap="round" />
                </g>
            </svg>
            <br/>
            <div style={{marginLeft: 13, marginTop: -20}} className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <div style={{marginLeft: 100, marginTop: -20}} className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <p>We're calculating your shit lmaooooooooo</p>
        </div>
    );
};

export {Loading};