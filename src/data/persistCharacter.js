import { remote } from "electron";
import path from "path";
import fs from "fs";
// import { promises as fsPromises } from "fs";

const userDataPath = path.join(remote.app.getPath("userData"), "characters");

const baseDir =
    process.env.NODE_ENV === "production"
        ? userDataPath
        : path.resolve("./test_files");

console.log(baseDir);

/**
 * reads a character file in json format and returns the object with the data
 * @param {string} characterFile the path of the character file relative to the base dir
 * @returns an object with the character data
 */
export const readCharacter = async characterFile => {
    const filePath = path.join(baseDir, characterFile);
    const data = fs.readFileSync(filePath, "utf-8");
    const character = JSON.parse(data);
    return character;
};

/**
 * Reads the list of all characters in the file characters.json
 * @returns a list of character names and file paths
 */
export const characterList = async () => {
    const charFile = path.join(baseDir, "characters.json");
    console.log("Character file location: " + charFile);
    try {
        console.log("before read data");
        const data = fs.readFileSync(charFile, "utf-8");
        console.log("Read the data");
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
};

/**
 * Saves the current character to the file
 * @param {Object} characterData the data to write to the file
 * @param {string} characterFile the path of the file to save the character
 */
export const saveCharacter = async (characterData, characterFile) => {
    const filePath = path.join(baseDir, characterFile);
    let data = characterData;
    if (typeof data !== "string") {
        data = JSON.stringify(characterData, null, 4);
    }
    console.log("Writing data to file");
    console.log(data);
    fs.writeFileSync(filePath, data);
};
