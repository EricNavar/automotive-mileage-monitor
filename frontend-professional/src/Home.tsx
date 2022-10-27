import React from 'react';
import './index.css';
import AWS from 'aws-sdk';

function s3() {

}

type HomeProps = {
    videoFile: any;
    setVideoFile: any;
    USState: any;
    setUSState: any;
}

const Home = (props: HomeProps) => {
    const [selectedFile, setSelectedFile] = React.useState(null);
    const [emptyFileError, setEmptyFileError] = React.useState(false);

    const handleFileInput = (e:any) => {
        setSelectedFile(e.target.files[0]);
    }

    function ballCrusher(event: any) {
        event?.preventDefault();
        if (selectedFile === null) {
            setEmptyFileError(true);
        }
        window.location.href = "/results";
        //will make API call
    }

    function onChangeUSState(event: any) {
        props.setUSState(event?.target.value);
    }

    // Bucket Configurations
    var bucketName = 'waffle-house';
    var bucketRegion = 'us-east-1';
    // identity pool name: waffle-house-employees
    var IdentityPoolId = 'us-east-1:638b9e6e-3ed9-4e0c-a9de-2cfed1a9577e';

    AWS.config.update({
        region: bucketRegion,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: IdentityPoolId
        })
    });

    var s3 = new AWS.S3({
        apiVersion: '2006-03-01',
        params: { Bucket: bucketName }
    });

    return (
        <div className="home">
            <h1>
                Automotive Mileage Monitor
            </h1>
            <form className="form" onSubmit={ballCrusher} id="form">
                <label>Video file</label>
                <input
                    type="file"
                    accept="video/*"
                    className="formInput browse"
                />
                {emptyFileError && <p style={{color:'red'}}>Please input an mp4 file</p>}
                <label>Select a state</label>
                <select onChange={onChangeUSState} className="formInput">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>
                    <option value="DC">District Of Columbia</option>
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
                <button onClick={ballCrusher} className="submit formInput">Calculate</button>
            </form>
        </div>
    );
};

export { Home };
