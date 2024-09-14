import puppeteer from "puppeteer";
import { UseAmagiPageProps } from "../interfaces";

export const useAmagi = async () => {
    console.time("Browser startup");
    //initiate the browser
    const browser = await puppeteer.launch();

    //create a new in headless chrome
    const page = await browser.newPage();
    console.timeEnd("Browser startup");

    const getPage = async ({ url, onEvaluation }: UseAmagiPageProps) => {
        console.time("Page load");
        //go to target website
        await page.goto(url, {
            //wait for content to load
            waitUntil: "networkidle0",
        });

        const html: string = !onEvaluation
            ? await page.content()
            : await page.evaluate(onEvaluation);

        console.timeEnd("Page load");
        return html;
    };

    const close = async () => {
        await browser.close();
    };

    return { getPage, close };
};
