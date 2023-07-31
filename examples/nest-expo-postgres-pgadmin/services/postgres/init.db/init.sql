CREATE TABLE public.todo (
  id SERIAL PRIMARY KEY,
  title VARCHAR NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);
CREATE TABLE public.todo_list (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
CREATE TABLE todo_list_item (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT false,
  todoListId INTEGER NOT NULL
  -- FOREIGN KEY (todoListId) REFERENCES todo_list (id) ON DELETE CASCADE
);


-- INSERT INTO todo (title, completed) VALUES
--   ('Learn Next.js', true),
--   ('Learn React', false),
--   ('Build something awesome', false);