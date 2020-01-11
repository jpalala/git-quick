var shell = require('shelljs');
var gg = require('git-guilt');
const program = require('commander');

program
  .option('-g, --guilt', 'output guilt 1 guilt log down')
  .option('-log, --log', 'output the log');

program.parse(process.argv);

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

console.log(program.opts());

if(program.guilt) {
	shell.exec('git-guilt HEAD~1 HEAD');
}

if(program.log) {
	if (shell.exec('git log --pretty=format:"%h - %an, %ar : %s"').code !== 0) {
	  shell.echo('Error: Git commit failed');
	  shell.exit(1);
	}
}




