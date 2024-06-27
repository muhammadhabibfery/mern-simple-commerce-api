import fs from "fs/promises";
import path from "path";
import CustomError from "../errors/customError.js";
import { convertToSlug, dirName } from "./global.js";

const setFilePath = async (file, directory, oldFile = null) => {
	let result;
	const currentFileName = file.name;
	const oldFileName = oldFile && unpackFilePath(oldFile)[1];

	if (currentFileName !== oldFileName) {
		if (oldFile) await remove(dirName(import.meta.url), `../../public/${oldFile}`);

		let fileName = currentFileName;
		fileName = fileName.split(".");
		const fileExtension = fileName.pop();
		const randomNumber = Math.ceil(Math.random() * 1000);
		fileName = convertToSlug([...fileName, randomNumber].join("-"));
		result = `${directory}/${fileName}.${fileExtension}`;
	} else {
		result = oldFile;
	}

	return result;
};

const upload = async (fileHandler, filePath) => {
	const [directory, fileName] = unpackFilePath(filePath);

	const existsDirectory = await checkExistingDirectory(directory);
	if (existsDirectory === false) await createDirectory(directory);

	await fileHandler.mv(`${directoryPath(directory)}/${fileName}`);
};

const remove = async (...filePath) => {
	try {
		await fs.rm(path.join(...filePath));
	} catch (err) {
		if (err?.code === "ENOENT") return;
		throw new CustomError(err.message, err?.code || 500);
	}
};

const checkExistingDirectory = async (directory) => {
	try {
		await fs.stat(directoryPath(directory));
		return true;
	} catch (err) {
		if (err?.code === "ENOENT") return false;
		throw new CustomError(err.message, err?.code || 500);
	}
};

const createDirectory = async (directory) => {
	try {
		await fs.mkdir(directoryPath(directory), { recursive: true });
	} catch (err) {
		throw new CustomError(err.message, err?.code || 500);
	}
};

const directoryPath = (directory) => path.join(dirName(import.meta.url), `../../public/${directory}`);

const unpackFilePath = (filePath) => {
	filePath = filePath.split("/");
	const directory = filePath.shift();
	const fileName = filePath.join("");

	return [directory, fileName];
};

export default { upload, remove, setFilePath, unpackFilePath };
