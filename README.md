# react-app with json-server like codepen

## You can see the sample animation with user experienece!

## Command
```
forever start -w --watchDirectory ./public/animation db.js

pm2 start play.json
```

## deleted(Deperecated)

```
play.json
  {
        "name": "watch-directory",
        "script": "db.js",
        "watch": ["public"],
        "watch_delay": 100000,
        "cron_restart": "0 6 * * 1",
        "autorestart": true,
        "restart_delay":2000,
        "node_args": ["--max_old_space_size=4096"]
    }




forever start scripts/start.js

forever start server.js
```
