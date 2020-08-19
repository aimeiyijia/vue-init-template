const fs = require("fs"),
	path = require("path"),
	chalk = require("chalk");
const rootPath = path.join(__dirname, "..", "/");
const file = rootPath + "package.json";
module.exports = {
	fileExit: () => {
		return new Promise((resolve, reject) => {
			fs.access(file, (err) => {
				if (err) {
					reject({
						type: false,
						log: chalk.red(file + "文件不存在"),
					});
				}
				resolve({
					type: true,
					log: chalk.green("成功访问package.json文件"),
				});
			});
		});
	},
};
