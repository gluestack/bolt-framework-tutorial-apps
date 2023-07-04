# Laravel with Auth & MySQL App

## Start App

```bash
$ cd examples/laravel-auth-mysql
$ bolt up
```

## Configure Laravel Service

```
# Goto laravel service directory
$ cd examples/laravel-auth-mysql

# Migrate tables
$ php artisan migrate

INFO  Preparing database.

Creating migration table ............................................................................................................... 25ms DONE

INFO  Running migrations.

2014_10_12_000000_create_users_table ................................................................................................... 61ms DONE
2014_10_12_100000_create_password_reset_tokens_table ................................................................................... 51ms DONE
2019_08_19_000000_create_failed_jobs_table ............................................................................................. 37ms DONE
2019_12_14_000001_create_personal_access_tokens_table .................................................................................. 40ms DONE

# Seed tables
$ php artisan db:seed

INFO  Seeding database.

# Install npm dependencies
$ npm install

# Create app build
$ npm run build

# Or run app build in dev node
$ npm run dev
```

## Stop App

```bash
$ cd examples/laravel-auth-mysql
$ bolt down
```

## Log Laravel Service

```bash
$ cd examples/laravel-auth-mysql
# In watch mode
$ bolt log --follow laravel
# Onetime logging
$ bolt log laravel
```
