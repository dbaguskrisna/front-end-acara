const environment = {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
}

if (!environment.API_URL) {
    console.error("NEXT_PUBLIC_API_URL is missing");
    console.log("environment =>", environment);
}
console.log("API baseURL =>", environment.API_URL);

export default environment;