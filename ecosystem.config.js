module.exports = {
    apps: [
        {
            name: 'goflash-api',
            cwd: './dist',
            script: './main.js',
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
