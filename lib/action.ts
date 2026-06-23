"use server";

import path from "path";
import { promises as fs } from "fs";
import { cache } from "react";

// Create a cached version of the file reading operation
const readFileCache = cache(async (filePath: string) => {
    return await fs.readFile(filePath, "utf-8");
});

// Helper to find a file case-insensitively and character-insensitively (e.g., matching "inbox-deck" to "InboxDeck.tsx")
async function findFileCaseInsensitive(dir: string, baseName: string): Promise<string | null> {
    try {
        const files = await fs.readdir(dir);
        const lowerBase = baseName.toLowerCase();
        const normalizedBase = baseName.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
        
        // 1. Try exact case-insensitive match
        for (const file of files) {
            const ext = path.extname(file);
            if (ext !== ".tsx" && ext !== ".ts" && ext !== ".jsx" && ext !== ".js") continue;
            const nameWithoutExt = path.basename(file, ext);
            if (nameWithoutExt.toLowerCase() === lowerBase) {
                return path.join(dir, file);
            }
        }
        
        // 2. Try normalized alphanumeric match (ignores hyphens, casing, etc.)
        for (const file of files) {
            const ext = path.extname(file);
            if (ext !== ".tsx" && ext !== ".ts" && ext !== ".jsx" && ext !== ".js") continue;
            const nameWithoutExt = path.basename(file, ext);
            const normalizedFile = nameWithoutExt.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
            if (normalizedFile === normalizedBase) {
                return path.join(dir, file);
            }
        }
    } catch (e) {
        // Directory doesn't exist or cannot be read
    }
    return null;
}

// Improve caching for the entire component getter
export const getComponent = async (fileName: string | null, folder: string) => {
    const baseDir = path.join(process.cwd(), "components/jackui");
    
    let folderToUse = folder;
    if (folder === "button") folderToUse = "buttons";
    else if (folder === "card") folderToUse = "cards";

    if (!fileName || fileName === "undefined") {
        let foundPath = await findFileCaseInsensitive(baseDir, folderToUse);
        if (!foundPath) {
            foundPath = await findFileCaseInsensitive(baseDir, folder);
        }
        if (foundPath) {
            return await readFileCache(foundPath);
        }
        throw new Error(`Component file not found: ${folderToUse}`);
    }

    let foundPath = await findFileCaseInsensitive(path.join(baseDir, folderToUse), fileName);
    if (!foundPath) {
        foundPath = await findFileCaseInsensitive(path.join(baseDir, folder), fileName);
    }

    if (foundPath) {
        return await readFileCache(foundPath);
    }

    throw new Error(`Component file not found: ${folder}/${fileName}`);
};

export type CopyComponentState = {
    error: string;
    content: string;
    success: boolean;
};

export const copyComponent = async (
    prevState: CopyComponentState,
    formData: FormData
) => {
    try {
        const folder = formData.get("folder");
        const fileName = formData.get("fileName");

        if (!folder && !fileName) {
            return {
                error: "Folder or file name not found",
                content: "",
                success: false,
            };
        }

        const content = await getComponent(
            fileName as string,
            folder as string
        );

        if (!content) {
            return {
                error: "Component not found",
                content: "",
                success: false,
            };
        }

        return {
            error: "",
            content: content,
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            error: "Failed to copy component",
            content: "",
            success: false,
        };
    }
};
