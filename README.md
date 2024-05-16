# Project Title

This is a simple Express.js application that allows users to upload files. It uses Multer for handling file uploads and Supabase for data storage.

## Prerequisites

- Node.js
- Supabase account

## Setup

1. Clone the repository.
2. Install the dependencies using `npm install`.
3. Create a `.env` file in the root directory and add your Supabase URL and key
4. Start the server using `npm start`. The server will run on port 3001 by default, but you can configure this in the `.env` file.

## Usage

Send a POST request to the `/upload` endpoint with a file in the `image` field to upload a file. The file size limit is 2MB.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

vercel link https://openmart-be.vercel.app/