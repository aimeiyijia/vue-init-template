// 校验package.json文件、dist目录是否存在
const process = require("process"),
	chalk = require("chalk");
const { getAnswers } = require("./interaction/cmdinterface");
const { fileExit } = require("./check.js");
const { execBuild } = require("./generate.js");
const { connectServe } = require("./dispatch/connect.js");
const { sendFile } = require("./dispatch/dispatch.js");

// 执行build命令
// 获取dist所在目录
// 登录服务器
// 放在服务器上的指定位置
async function deploy() {
	try {
		const answers = await getAnswers();
		console.log(answers, "答案");
		if (answers.type) {
			const { projectName, projectDir, serveIP, username, password } = answers.config;
			// 判断package.json是否存在
			const fileStatus = await fileExit();
			if (!fileStatus.type) return;
			// 执行npm run build是否成功
			const execStatus = await execBuild(projectName, projectDir);
			// 服务器是否连接成功
			const connectStatus = await connectServe(serveIP, username, password);
			console.log(connectStatus.log);
			// 是否将文件传输至服务器
			const sendFileStatus = await sendFile(connectStatus.ssh);
			console.log(sendFileStatus.log);
			process.exit();
		}
	} catch (err) {
		// console.log(err)
		// console.log(chalk.red(err.log));
		process.exit();
	}
}
// 捕获未正确处理的错误;
process.on("unhandledRejection", (reason, p) => {
	// console.log("Unhandled Rejection at:", p, "reason:", reason);
});
deploy();
