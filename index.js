#!/usr/bin/node
import path from "path";
import * as fs from 'fs'
import chalk from "chalk";
import spawn from "cross-spawn";

//common variables
const currentDir = process.cwd();
const projectName = process.argv[2];
let projectDir;

//general checks
if (projectName === undefined){
  console.log(chalk.red('Please enter correct folder name'));
  process.exit()
} else if (fs.existsSync(projectDir)) {
  console.log(chalk.red('Project with that name already exists'));
  process.exit()
} else {
  projectDir = path.resolve(currentDir, projectName);
  main()
  console.log(chalk.green('Successfully! Your new project is ready!'));
  console.log('Created',chalk.bold.yellow(projectName),'at',chalk.bold.yellow(projectDir));
  console.log('Enter -',chalk.bold.blue(`cd ${projectName},`), 'after -',chalk.bold.blue('npm start'));
}

function main() {
  //create a project directory with the project name
  fs.mkdirSync(projectDir, { recursive: true });
  const srcPath = path.resolve(projectDir, "src");

  //----------- CREATING FOLDER AND FILE STRUCTURE -----------
  //function for creating folder structure
  const createFolderStructure = (paths) => {
    for (let i = 0; i < paths.length; i++) {
      fs.mkdirSync(paths[i], { recursive: true });
    }
  };

  //function for creating file structure
  const createFileStructure = (paths) => {
    for (let i = 0; i < paths.length; i++) {
      fs.writeFileSync(paths[i].path, paths[i].data);
    }
  };

  const folderStructure = [
    `${srcPath}/app`,
    `${srcPath}/assets`,
    `${srcPath}/components`,
    `${srcPath}/features`,
    `${srcPath}/hooks`,
    `${srcPath}/layout`,
    `${srcPath}/pages`,
    `${srcPath}/scss`,
  ];

  const README_FILE = `# Webpack - built by Dmytro Rylov \\<yawuxi>
  
  ## Documentation navigation
  1. [Lets begin](#Lets-begin)
  2. [Installed packages](#Installed-packages)
  3. [Project structure](#Project-structure)
  4. [Distributable structure](#Distributable-structure)
  
  ## Lets-begin
  For work with this build in new project, clone that repository \`git clone <link to repository>\`<br>
  After, being in the project root, launch \`npm i\` - that command will install all dependencies which stored in package.json.<br>
  Thereafter you can start build by type in terminal \`npm start\`. Done!<br>
  
  ## Installed-packages
  ###### Webpack
  * webpack - webpack :D
  * webpack-cli - work with webpack from CLI
  * webpack-dev-server - development server
  
  ###### Loaders
  * babel-loader - loader for JavaScript
  * sass-loader - loader for SCSS/SASS
  * style-loader - loader for JS styles
  * ts-loader - loader for TypeScript
  
  ###### Plugins
  * eslint-webpack-plugin - eslint plugin for webpack
  * html-minimizer-webpack-plugin - plugin for minimizing html
  * html-webpack-plugin - plugin for integrating script into html file
  * clean-webpack-plugin - removing dist directory every changing
  * copy-webpack-plugin - copying files "from" "to"
  * css-minimizer-webpack-plugin - plugin for minimizing css
  
  ###### Babel and polyfills
  * @babel/cli - work with babel from CLI
  * @babel/core - transpiling JSX/TSX to JavaScript
  * @babel/preset-env - allows use the latest JavaScript without polyfills, etc
  * @babel/preset-react - allows use to work with React
  * @babel/preset-typescript - allows use to work with Typescript
  * core-js - polyfills
  
  ###### Typescript
  * @types/react - types for React
  * @types/react-dom - types for ReactDOM
  
  ###### Eslint
  * @typescript-eslint/eslint-plugin - plugin for analyze TypeScript
  * @typescript-eslint/parser - eslint parses for TypeScript
  
  ###### Other
  * react - React UI library
  * react-dom - rendering page in browser
  * @reduxjs/toolkit - state manager
  * react-redux - connecting redux with react
  * eslint - linter
  * sass - needs to working preprocessor
  * terser-webpack-plugin - minimizing JavaScript
  * typescript - needs to working TypeScript
  
  __Installed packages - 32__
  
  ## Project-structure
  \`\`\`
  project-name/
  ├── src/                           # Source folder
  │   ├── app/                       # Redux folder
  │   │
  │   ├── assets/                    # Images, etc
  │   │
  │   ├── components/                # Common components, frequently used, example: Button
  │   │
  │   ├── data/                      # Dummy js files, const file, etc
  │   │
  │   ├── features/                  # Feature folder, example: authentication
  │   │
  │   ├── hooks/                     # Custom react hooks folder, example: http.hook.ts
  │   │
  │   ├── layouts/                   # Layout components folder, example: Header, Footer
  │   │
  │   ├── pages/                     # Pages folder, example: MainPage, UserPage
  │   │
  │   ├── scss/                      # Styles folder, example: reset.scss, variables.scss, etc
  │   │
  │   ├── utils/                     # Utils folder, for small functions or something same
  │   │
  │   ├── App.scss                   # App styles
  │   ├── App.tsx                    # App component
  │   ├── index.html                 # main html file
  │   ├── index.scss                 # main styles, here use imports from scss folder
  │   └── index.tsx                  # index component, rendering App component
  │
  ├── .babelrc                       # babel configuration
  ├── .eslintignore                  # eslint ignore configuration
  ├── .eslintrc                      # eslint configuration
  ├── .gitignore                     # git ignore configuration
  ├── package.json                   # dependencies config
  ├── package-lock.json              # dependencies versions, etc
  ├── README.md                      # That file
  ├── tsconfig.json                  # TypeScript configuration
  └── webpack.config.js              # Webpack configuration
  
  \`\`\`
  
  ## Distributable-structure
  \`\`\`
  ├── dist/                         # Distributable folder
  │   ├── assets                    # Assets folder
  │   ├── index.html                # Final markup
  └── └── bundle.<hash>.js          # Final JavaScript code
  \`\`\`
  
  ## Documentation navigation
  1. [Lets begin](#Lets-begin)
  2. [Installed packages](#Installed-packages)
  3. [Project structure](#Project-structure)
  4. [Distributable structure](#Distributable-structure)`;

  const fileStructure = [
    //in project folder
    {
      path: `${projectDir}/.babelrc`,
      data: `{
    "presets": [
      [
        "@babel/preset-env",
        {
          "useBuiltIns": "usage",
          "corejs": 3
        }
      ],
      "@babel/preset-typescript",
      "@babel/preset-react"
    ]
  }
  `
    },
    {
      path: `${projectDir}/.eslintignore`,
      data: `node_modules
  .vscode
  .git
  .idea
  `
    },
    {
      path: `${projectDir}/.eslintrc`,
      data: `{
    "env": {
      "es6": true,
      "browser": true
    },
    "parser": "@typescript-eslint/parser",
    "plugins": [
      "@typescript-eslint",
      "react"
    ],
    "extends": [
      "plugin:@typescript-eslint/recommended",
      "react-app",
      "plugin:react-hooks/recommended",
      "prettier"
    ],
    "rules": {
      "@typescript-eslint/no-var-requires": 0
    },
    "parserOptions": {
      "ecmaFeatures": {
        "jsx": true
      },
      "ecmaVersion": "latest",
      "sourceType": "module"
    }
  }
  `
    },
    {
      path: `${projectDir}/.gitignore`,
      data: `dist
  node_modules
  .idea
  `
    },
    {
      path: `${projectDir}/.prettierignore`,
      data: `dist
  node_modules
  .idea
  .git
  `
    },
    {
      path: `${projectDir}/.prettierrc.json`,
      data: `{
    "tabWidth": 2,
    "useTabs": false,
    "semi": true,
    "singleQuote": false,
    "trailingComma": "all",
    "printWidth": 80
  }
  `
    },
    {
      path: `${projectDir}/README.md`,
      data: README_FILE,
    },
    {
      path: `${projectDir}/package.json`,
      data: `{
    "name": "webpack-build",
    "version": "1.0.0",
    "description": "yawuxi\`s webpack build for react project",
    "main": "index.tsx",
    "scripts": {
      "start": "webpack-dev-server --node-env development --open",
      "dev": "webpack --node-env development",
      "build": "webpack --node-env production"
    },
    "keywords": [
      "webpack",
      "yawuxi",
      "react"
    ],
    "author": "Dmytro <ryliov.work@gmail.com>",
    "license": "ISC",
    "dependencies": {
      "@reduxjs/toolkit": "^1.9.0",
      "react": "^18.2.0",
      "react-dom": "^18.2.0",
      "react-redux": "^8.0.5"
    },
    "devDependencies": {
      "@babel/cli": "^7.19.3",
      "@babel/core": "^7.20.2",
      "@babel/preset-env": "^7.20.2",
      "@babel/preset-react": "^7.18.6",
      "@babel/preset-typescript": "^7.18.6",
      "@types/react": "^18.0.25",
      "@types/react-dom": "^18.0.8",
      "@typescript-eslint/eslint-plugin": "^5.42.1",
      "@typescript-eslint/parser": "^5.42.1",
      "babel-loader": "^9.1.0",
      "clean-webpack-plugin": "^4.0.0",
      "copy-webpack-plugin": "^11.0.0",
      "core-js": "^3.26.0",
      "css-loader": "^6.7.1",
      "css-minimizer-webpack-plugin": "^4.2.2",
      "eslint": "^8.27.0",
      "eslint-config-prettier": "^8.5.0",
      "eslint-config-react-app": "^7.0.1",
      "eslint-plugin-react": "^7.31.11",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-webpack-plugin": "^3.2.0",
      "file-loader": "^6.2.0",
      "html-minimizer-webpack-plugin": "^4.3.0",
      "html-webpack-plugin": "^5.5.0",
      "prettier": "2.8.1",
      "sass": "^1.56.1",
      "sass-loader": "^13.2.0",
      "style-loader": "^3.3.1",
      "terser-webpack-plugin": "^5.3.6",
      "ts-loader": "^9.4.1",
      "typescript": "^4.8.4",
      "webpack": "^5.75.0",
      "webpack-cli": "^4.10.0",
      "webpack-dev-server": "^4.11.1"
    },
    "browserslist": [
      "last 2 version",
      ">1%",
      "not dead"
    ]
  }
  `,
    },
    {
      path: `${projectDir}/tsconfig.json`,
      data: `{
    "compilerOptions": {
      "target": "es5",
      "lib": [
        "dom",
        "dom.iterable",
        "esnext"
      ],
      "allowJs": false,
      "skipLibCheck": true,
      "esModuleInterop": true,
      "allowSyntheticDefaultImports": true,
      "strict": true,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "module": "esnext",
      "moduleResolution": "node",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "noEmit": true,
      "jsx": "react-jsx",
      "baseUrl": "src"
    },
    "include": [
      "src"
    ]
  }
  `,
    },
    {
      path: `${projectDir}/webpack.config.js`,
      data: `const path = require("path");
  const { CleanWebpackPlugin } = require("clean-webpack-plugin");
  const HtmlWebpackPlugin = require("html-webpack-plugin");
  const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
  const HtmlMinimizerWebpackPlugin = require("html-minimizer-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
  const TerserWebpackPlugin = require("terser-webpack-plugin");
  const ESLintWebpackPlugin = require("eslint-webpack-plugin");
  
  //getting mode, development or production
  const mode = process.env.NODE_ENV === "development";
  
  module.exports = {
    //file i/o settings
    entry: path.resolve(__dirname, "src/index.tsx"),
    output: {
      filename: "bundle.[hash].js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".scss", ".sass"],
    },
  
    //webpack settings
    mode: mode ? "development" : "production",
    optimization: {
      minimize: true,
      minimizer: [
        new TerserWebpackPlugin({
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          parallel: true,
        }),
        new CssMinimizerWebpackPlugin(),
      ],
    },
    devtool: mode ? "eval-source-map" : "nosources-source-map",
  
    //dev server
    devServer: {
      port: 4250,
      historyApiFallback: true,
    },
  
    //loaders
    module: {
      rules: [
        //scss loaders
        {
          test: /.s[ac]ss/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
  
        //js + jsx loaders
        {
          test: /.js$/i,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: "babel-loader",
        },
        {
          test: /.jsx$/i,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: "babel-loader",
        },
  
        //ts + tsx loaders
        {
          test: /.ts$/i,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: "babel-loader",
        },
        {
          test: /.tsx$/i,
          exclude: /node_modules/,
          include: path.resolve(__dirname, "src"),
          use: "babel-loader",
        },
  
        //image loader
        {
          test: /\\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: "file-loader",
            },
          ],
        },
      ],
    },
  
    // plugins
    plugins: [
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: path.resolve(__dirname, "src/index.html"),
          },
  
          //Only for production
          mode
            ? undefined
            : {
                minify: {
                  removeComments: true,
                  collapseWhitespace: true,
                  removeRedundantAttributes: true,
                  useShortDoctype: true,
                  removeEmptyAttributes: true,
                  removeStyleLinkTypeAttributes: true,
                  keepClosingSlash: true,
                  minifyJS: true,
                  minifyCSS: true,
                  minifyURLs: true,
                },
              },
        ),
      ),
      new CssMinimizerWebpackPlugin({
        minimizerOptions: {
          presets: [
            "default",
            {
              discardComments: {
                removeAll: true,
              },
            },
          ],
        },
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "src/assets"),
            to: path.resolve(__dirname, "dist/assets"),
          },
        ],
      }),
      new HtmlMinimizerWebpackPlugin(),
      new ESLintWebpackPlugin({
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      }),
    ],
  };
  `,
    },
    //in src folder
    {
      path: `${srcPath}/app/store.ts`,
      data: `import { configureStore } from "@reduxjs/toolkit";
  
  export const store = configureStore({
    reducer: {}
  })
  
  export type RootState = ReturnType<typeof store.getState>
  export type AppDispatch = typeof store.dispatch
  `
    },
    {
      path: `${srcPath}/app/hooks.ts`,
      data: `import { useDispatch, useSelector } from 'react-redux'
  import type { TypedUseSelectorHook } from 'react-redux'
  import type { RootState, AppDispatch } from '../app/store'
  
  export const useAppDispatch: () => AppDispatch = useDispatch
  export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
  `
    },
    {
      path: `${srcPath}/assets/null.gitkeep`,
      data: ''
    },
    {
      path: `${srcPath}/components/null.gitkeep`,
      data: ''
    },
    {
      path: `${srcPath}/features/null.gitkeep`,
      data: ''
    },
    {
      path: `${srcPath}/hooks/null.gitkeep`,
      data: ''
    },
    {
      path: `${srcPath}/layout/null.gitkeep`,
      data: ''
    },
    {
      path: `${srcPath}/pages/null.gitkeep`,
      data: ''
    },
    {
      path: `${srcPath}/scss/css-reset.scss`,
      data: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 100%;
  }
  
  body {
    //!CHANGE ME!
    // font-family: "Nunito", sans-serif;
    font-weight: 400;
    font-style: normal;
  }
  
  ul li {
    list-style: none;
  }
  
  nav,
  footer,
  header,
  aside,
  section {
    display: block;
  }
  
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 400;
    font-size: 100%;
  }
  
  a,
  a:visited,
  a:hover {
    text-decoration: none;
  }
  
  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    font-family: inherit;
  }
  `
    },
    {
      path: `${srcPath}/App.scss`,
      data: ''
    },
    {
      path: `${srcPath}/App.tsx`,
      data: `//react
  import React from 'react';
  //styles
  import './App.scss'
  
  const App: React.FC = () => {
    return (
      <div className="app">
        <h1>I am webpack built by yawuxi!</h1>
      </div>
    );
  };
  
  export { App };
  `
    },
    {
      path: `${srcPath}/index.html`,
      data: `<!doctype html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport"
            content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>Yawuxi\`s webpack build</title>
  </head>
  <body>
  <div id="root"></div>
  </body>
  </html>
  `
    },
    {
      path: `${srcPath}/index.scss`,
      data: `@import "scss/css-reset";
      `
    },
    {
      path: `${srcPath}/index.tsx`,
      data: `//react
  import React from 'react'
  import ReactDOM from 'react-dom/client'
  //rtk
  import { Provider } from "react-redux";
  import { store } from "./app/store";
  //components
  import { App } from './App'
  //styles
  import './index.scss'
  
  const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  )
  `
    },
  ];

  createFolderStructure(folderStructure);
  createFileStructure(fileStructure);

  //automatically install all project dependencies
  spawn.sync('npm', ['install'], {stdio: 'inherit'})
}
