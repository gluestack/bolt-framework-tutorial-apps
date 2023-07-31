const { Pool } = require("pg");
const dotenv = require("dotenv");
const { v4: uuidv4 } = require("uuid");

dotenv.config();

function createPool() {
	return new Pool({
		connectionString: process.env.DB_URL,
		user: process.env.PGUSER,
		host: process.env.PGHOST,
		password: process.env.PGPASSWORD,
		database: process.env.PGDATABASE,
		port: 5432,
	});
}

module.exports = {
	name: "todo",
	actions: {
		getAllTodos: {
			rest: "GET getAllTodos",
			async handler(ctx) {
				try {
					const pool = createPool();

					const client = await pool.connect();
					const result = await client.query("SELECT * FROM todo");
					const todos = result.rows;
					client.release();
					return todos;
				} catch (error) {
					console.error("Error fetching todos:", error);
					return { error: error.message };
				}
			},
		},

		createTodo: {
			rest: "POST createTodo/",
			async handler(ctx) {
				const { title } = ctx.params.body;
				const id = uuidv4();
				const iscompleted = false;

				try {
					const pool = createPool();

					const client = await pool.connect();
					const queryText =
						"INSERT INTO todo (id, title, iscompleted) VALUES ($1, $2, $3)";
					const values = [id, title, iscompleted];
					const result = await client.query(queryText, values);
					client.release();
					return "Data Added Successfully";
				} catch (error) {
					console.error("Error fetching todos:", error);
					return { error: error.message };
				}
			},
		},

		updateTodo: {
			rest: "PUT updateTodo/:id",
			async handler(ctx) {
				const { id } = ctx.params.params;
				const { title, iscompleted } = ctx.params.body;

				try {
					const pool = createPool();

					const client = await pool.connect();
					// Use parameterized query to avoid SQL injection
					const queryText =
						"UPDATE todo SET title = $1, iscompleted = $2 WHERE id = $3";
					const values = [title, iscompleted, id];
					const result = await client.query(queryText, values);
					client.release();

					return "Todo Updated Successfully";
				} catch (error) {
					console.error("Error updating todo:", error);
					return { error: error.message };
				}
			},
		},

		deleteTodo: {
			rest: "DELETE deleteTodo/:id",
			async handler(ctx) {
				try {
					const pool = createPool();

					const { id } = ctx.params.params;

					const query = "DELETE FROM todo WHERE id = $1";
					const values = [id];
					const client = await pool.connect();
					const result = await client.query(query, values);
					client.release();
					return "Todo Deleted Successfully";
				} catch (error) {
					console.error("Error updating todo:", error);
					return { error: error.message };
				}
			},
		},
	},
};
