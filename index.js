const path = require('path');
const getGitBranchName = require('git-branch-name');
const spawn = require('cross-spawn');
const process = require('process');

// Spawn NPM synchronously
const spawnSync = (command, args) => spawn.sync(command, args, { stdio: 'inherit' });

module.exports = function mergeToDev(msg, target = 'dev') {
    getGitBranchName(process.cwd(), function(err, branchName) {
        if (msg) {
            console.log('🍺:::: add all files ::::🍺');
            spawnSync('git', [ 'add', '.' ]);
            console.log(`🍺:::: commit with message "${msg}" ::::🍺`);
            spawnSync('git', [ 'commit', `-m"${msg}"` ]);
            console.log(`⬆️:::: push branch [${branchName}] ::::⬆️`);
            spawnSync('git', [ 'push' ]);
        }

        console.log(`🍺:::: checkout to branch [${target}] ::::🍺`);
        spawnSync('git', [ 'checkout', target ]);
        console.log(`⬇️:::: pull branch [${target}] ::::⬇️`);
        spawnSync('git', [ 'pull' ]);
        console.log(`🍺:::: merge [${branchName}] into [${target}] ::::🍺`);
        spawnSync('git', [ 'merge', branchName ]);

        console.log(`⬆️:::: push branch [${target}] ::::⬆️`);
        spawnSync('git', [ 'push' ]);
        console.log(`🍺:::: checkout to branch [${branchName}] ::::🍺`);
        spawnSync('git', [ 'checkout', branchName ]);
    });
};
