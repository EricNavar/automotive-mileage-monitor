# Automotive Mileage Monitor

## Setup

1. Create a `.env` file in the `automotive-mileage-monitor/server` folder with the contents:
    ```
    PORT=4000
    COLLECT_API_KEY="[your CollectAPI api key]"
    ```
    Create a CollectAPI account [here](https://collectapi.com/).
2. Install and use Node version 18.12.0.
3. `cd` into `server`.
4. Run `npm i` to install dependencies.
5. Run `npm run dev` to start the backend server.
5. `cd` into `fronted-professional`.
6. Run `npm i` to install dependencies.
7. Run `npm start` to start the frontend.
8. Navigate to `localhost:4000` in your browser to view the app.

## How to Use

1. Upload a video of cars in traffic.
2. Select the US State in which the video was taken.
3. Submit
4. Wait for a moment, then enjoy viewing the data!