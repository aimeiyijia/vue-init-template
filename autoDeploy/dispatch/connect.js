const fs = require("fs"),
	path = require("path"),
	process = require("process"),
	{ NodeSSH } = require("node-ssh"),
	chalk = require("chalk");
const ssh = new NodeSSH();

const rootPath = path.join(__dirname, "..");

module.exports = {
	connectServe: async () => {
		try {
			await ssh.connect({
				host: "11.0.0.34",
				username: "root",
				password: "@wsx7ujm",
				port: 22, //SSH连接默认在22端口
			});
			return { ssh, type: true, log: chalk.green("服务器连接成功") };
		} catch (err) {
			return { type: false, log: chalk.red("服务器连接失败，请重试") };
		}
	},
};

// ssh.connect({
// 	host: "11.0.0.34",
// 	username: "root",
// 	password: "@wsx7ujm",
// 	port: 22, //SSH连接默认在22端口
// })
// 	.then(function (e) {
// 		console.log(e, "成功");
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	})

// 	.finally(() => {
// 		console.log(1);
// 		process.exit();
// 	});
