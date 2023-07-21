# Two Next Apps & Ways to use ENV variables in Bolt Service & Bolt Ingress

## Start

```bash
$ cd examples/two-next-apps
$ bolt up
```

## Stop

```bash
$ cd examples/two-next-apps
$ bolt down
```

## Log

```bash
$ cd examples/two-next-apps
# In watch mode
$ bolt log --follow todoone
$ bolt log --follow todotwo
# Onetime logging
$ bolt log todoone
$ bolt log todotwo
```
