import * as dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

interface RequestProps {
    tag?: string;
    searchString?: string;
    fileName?: string;
}

export async function getRandomDoodle({
    tag,
    searchString,
    fileName
}: RequestProps) {
    let url = `${process.env.API_URL}/doodles/random`;
    if (tag) url += `?tag=${tag}`;
    if (searchString) url += `?search=${searchString}`;
    if (fileName) url += `?file_name=${fileName}`;
    const response = await fetch(url);
    if (!response.ok) {
        return null;
    }
    const data = await response.json();
    return data;
}
