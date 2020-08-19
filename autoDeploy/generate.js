var shell = require("shelljs"),
	path = require("path"),
	chalk = require("chalk");
const { exec } = shell;
module.exports = {
	execBuild: () => {
		console.log(__dirname);
		return new Promise((resolve, reject) => {
			shell.cd(__dirname);
			const build = exec("npm run build");
			if (build.code === 0) {
				resolve({
					type: true,
					log: chalk.green("build成功"),
				});
			} else {
				reject({
					type: false,
					log: chalk.green("build失败，请重试！"),
				});
			}
		});
	},
};
