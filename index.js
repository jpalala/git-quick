var shell = require('shelljs');
const program = require('commander');

program
  .option('-g, --guilt', 'output guilt 1 guilt log down')
  .option('-l, --log', 'output the simple log')
  .option('-d, --debug', 'debug');

program.parse(process.argv);

if (!shell.which('git')) {
  shell.echo('Sorry, this script requires git');
  shell.exit(1);
}

if(program.debug) {
	console.log(program.opts());
	shell.exit(1);
}

if(program.guilt) {
	shell.exec('git-guilt HEAD~1 HEAD');
}

if(program.log) {
	if (shell.exec('git log --pretty=format:"%h - %an, %ar : %s"').code !== 0) {
	  shell.echo('Error: Git commit failed');
	  shell.exit(1);
	}
}




