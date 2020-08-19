const path = require("path"),
	chalk = require("chalk");
const rootPath = path.join(__dirname, "/");
const storageDirectoryInLocal = path.join(rootPath, "..", "..", "/dist");
const storageDirectoryInRemote = "/root/xiaofantest";
module.exports = {
	sendFile: async (ssh) => {
		try {
			await ssh.putDirectory(storageDirectoryInLocal, storageDirectoryInRemote);
			ssh.dispose();
			return { ssh, type: true, log: chalk.green("文件传输成功") };
		} catch (err) {
			return { ssh, type: false, log: chalk.red("文件传输失败") };
		}
	},
};
