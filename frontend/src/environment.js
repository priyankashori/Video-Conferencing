let IS_PROD = true;
const server = IS_PROD ?
    "https://video-conferencing-pyd8.onrender.com" :

    "http://localhost:7000"


export default server;