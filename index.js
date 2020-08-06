const path = require('path');
const getGitBranchName = require('git-branch-name');
const spawn = require('cross-spawn');

var dirPath = path.resolve(__dirname, '../');

// Spawn NPM synchronously
const spawnSync = (command, args) => spawn.sync(command, args, { stdio: 'inherit' });

module.exports = function mergeToDev(msg, target = 'dev') {
    getGitBranchName(dirPath, function(err, branchName) {
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
