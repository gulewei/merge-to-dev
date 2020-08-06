const path = require('path');
const getGitBranchName = require('git-branch-name');
const spawn = require('cross-spawn');
const process = require('process');

// Spawn NPM synchronously
const spawnSync = (command, args) => spawn.sync(command, args, { stdio: 'inherit' });

module.exports = function mergeToDev(msg, target = 'dev') {
    console.log('args', msg, target);

    getGitBranchName(process.cwd(), function(err, branchName) {
        if (msg) {
            spawnSync('git', [ 'add', '.' ]);
            spawnSync('git', [ 'commit', `-m"${msg}"` ]);
            // spawnSync('git', [ 'push' ]);
        }

        spawnSync('git', [ 'checkout', target ]);
        // spawnSync('git', [ 'pull' ]);
        spawnSync('git', [ 'merge', branchName ]);

        // spawnSync('git', [ 'push' ]);
        spawnSync('git', [ 'checkout', branchName ]);
    });
};
