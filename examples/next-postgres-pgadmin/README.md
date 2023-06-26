# Next Postgres PgAdmin

## Start

```bash
$ cd examples/next-postgres-pgadmin
$ bolt up
```

## Stop

```bash
$ cd examples/next-postgres-pgadmin
$ bolt down
```

## Log

```bash
$ cd examples/next-postgres-pgadmin
# In watch mode
$ bolt log --follow postgres
$ bolt log --follow pgadmin
$ bolt log --follow todonext
# Onetime logging
$ bolt log postgres
$ bolt log pgadmin
$ bolt log todonext
```
