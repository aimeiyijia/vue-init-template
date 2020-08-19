const { Command } = require("commander");
const chalk = require("chalk");
const program = new Command();

const config = {
	// 假设我们需要用户自定义项目名称
	projectName: null,
};
program
	.command("init")
	.alias("i")
	.description("初始化项目")
	.action((option) => {
		// 使用chalk打印美化的版本信息
		console.log(chalk.default.bold("hello v1.0.0"));

		// 用于存储所有的交互步骤，例如让用户输入项目名称就是其中一个步骤
		let promps = [];
		if (config.projectName === null) {
			promps.push({
				type: "input",
				name: "projectName",
				message: "请输入项目名称",
				validate: (input) => {
					if (!input) {
						return "项目名称不能为空";
					}
					// 更新对象中属性的数据
					config.projectName = input;
					return true;
				},
			});
		}

		// 至此，与用户的所有交互均已完成，answers是收集到的用户所填的所有数据
		// 同时，这也是你开始操作的地方，这个cli工具的核心代码应该从这个地方开始
		inquirer.prompt(promps).then(async (answers) => {
			// do something here
			console.log(answers);
		});
	});

program.parse(process.argv);
