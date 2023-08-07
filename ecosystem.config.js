module.exports = {
    apps: [
        {
            name: 'goflash-api',
            cwd: './api',
            script: 'main.js -p 3101',
            autorestart: true,
            watch: true,
            ignore_watch: ['node_modules'],
            env: {
                NODE_ENV: 'production',
            },
            exec_mode: 'fork',
        },
    ],
};
