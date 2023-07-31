CREATE TABLE public.todo_nuxt (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  completed BOOLEAN NOT NULL DEFAULT false
);

-- INSERT INTO todo (title, completed) VALUES
--   ('Learn Next.js', true),
--   ('Learn React', false),
--   ('Build something awesome', false);