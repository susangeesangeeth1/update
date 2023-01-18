import mongoose from "mongoose";

const connection = {};

(async function dbConnect() {
	if (connection.isConnected) {
		return;
	}

	console.log(
		"mongodb+srv://twg:twg123@cluster0.x2opb1s.mongodb.net/mern?retryWrites=true&w=majority"
	);
	try {
		const db = await mongoose.connect(
			"mongodb+srv://twg:twg123@cluster0.x2opb1s.mongodb.net/mern?retryWrites=true&w=majority",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
				useCreateIndex: true,
				useFindAndModify: false,
			}
		);

		connection.isConnected = db.connections[0].readyState;

		console.log("MongoDB Connected");
	} catch (error) {
		console.log(error);
	}
})();
