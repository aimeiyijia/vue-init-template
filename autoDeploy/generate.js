var shell = require("shelljs"),
	path = require("path"),
	chalk = require("chalk");
const { exec } = shell;
module.exports = {
	execBuild: (projectName, projectDir) => {
		console.log(projectName, "1");
		console.log(projectDir, "1");
		return new Promise((resolve, reject) => {
			shell.cd(projectDir + projectName);
			const build = exec("npm run build");
			if (build.code === 0) {
				resolve({
					type: true,
					log: chalk.green("build成功"),
				});
			} else {
				reject({
					type: false,
					log: chalk.red("build失败，请重试！"),
				});
			}
		});
	},
};
