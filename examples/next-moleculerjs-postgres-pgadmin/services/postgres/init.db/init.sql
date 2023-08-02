CREATE TABLE public.todo (
  id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  iscompleted BOOLEAN NOT NULL DEFAULT false
);

INSERT INTO todo (id,title,iscompleted) VALUES
  ('aaaa','Learn Next.js', true),
  ('bbbb','Learn React', false),
  ('cccc','Build something awesome', false);