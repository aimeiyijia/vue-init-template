const inquirer = require("inquirer");
module.exports = {
	projectName: {
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
	},
	projectDir: {
		type: "input",
		name: "projectName",
		message: "请输入项目目录",
		validate: (input) => {
			if (!input) {
				return "项目目录不能为空";
			}
			// 更新对象中属性的数据
			config.projectName = input;
			return true;
		},
	},
};
