# Tool auto get query id in telegram mini application by NguyenDuc

**Tool created by NguyenDuc and distributed without charge.**

> [!WARNING]
> Tool trafficking of any kind is prohibited!!

## Installation instructions

> Requirements installed NodeJS.

- Step 1: Clone the latest version of the tool [here ⬇️](https://github.com/nguyenduc3701/AutoGetQueryIds.git).
- Step 2: To install the extra libraries, use the `npm install` command.
- Step 3: Open telegram on web press F12 to open DevTools.
- Step 4: Going to Application tab fill information of `Local storage` and `Cookies` into `config.js`.
- Step 5: Edit applications u want to get query id into `config.js`.
  Example:
  ```json
  {
    "name": "BahneAiBot", //name folder
    "rootPath": "D:\\Works\\Tools", // location of folder
    "url": "https://web.telegram.org/k/#@BahneAIBot", //url chat bot
    "queryIds": [] //leave this emptry
  }
  ```

## Usage:

`node index.js`

## Features

- ✅ Auto open and get query ids in telegram application.
- ✅ Auto write result to specific folder in `data.txt`.
- ✅ Auto rerun after 24 hours.

## Update history

<details>
<summary>v0.1 - 📅 39/10/2024</summary>
- Provide resources for a preliminary look.
</details>
