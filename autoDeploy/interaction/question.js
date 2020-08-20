const inquirer = require("inquirer");
let promps = [
	{
		type: "input",
		name: "projectName",
		message: "请输入项目名称",
		validate: (input) => {
			if (!input) {
				return "项目名称不能为空";
			}
			return true;
		},
	},
	{
		type: "input",
		name: "projectDir",
		message: "请输入项目目录",
		validate: (input) => {
			if (!input) {
				return "项目目录不能为空";
			}
			return true;
		},
	},
	{
		type: "input",
		name: "serveIP",
		message: "请输入部署服务器地址",
		validate: (input) => {
			if (!input) {
				return "部署服务器地址不能为空";
			}
			return true;
		},
	},
	{
		type: "input",
		name: "username",
		message: "登录用户名",
		validate: (input) => {
			if (!input) {
				return "用户名不能为空";
			}
			return true;
		},
	},
	{
		type: "input",
		name: "password",
		message: "登录密码",
		validate: (input) => {
			if (!input) {
				return "登录密码不能为空";
			}
			return true;
		},
	},
	{
		type: "input",
		name: "projectDir",
		message: "deployDir",
		validate: (input) => {
			if (!input) {
				return "部署位置不能为空";
			}
			return true;
		},
	},
];
module.exports.promps = promps;
