const { Command } = require("commander");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { promps } = require("./question");
const program = new Command();
module.exports = {
	getAnswers: () => {
		return new Promise((resolve, reject) => {
			program
				.command("build")
				.alias("b")
				.description("构建项目")
				.action(async (option) => {
					// 使用chalk打印美化的版本信息
					console.log(chalk.default.bold("hello v0.1.0"));
					try {
						const config = await inquirer.prompt(promps);
						resolve({ config, type: true, log: chalk.green("已获取答案") });
					} catch (err) {
						reject({ type: true, log: chalk.red("未获取答案") });
					}
				});

			program.parse(process.argv);
		});
	},
};
