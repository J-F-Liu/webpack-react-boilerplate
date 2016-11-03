# Webpack+React+Babel+Sass
It took me several days to learn and assemble these pieces, so this boilerplate can save others time.

# Usage

1. Install Node.js and Git

2. Download the repository
   ```
   git clone https://github.com/J-F-Liu/webpack-react-boilerplate.git
   cd webpack-react-boilerplate
   ```
3. Checkout `react-router` branch if you want to use react-router

   `git checkout react-router`

4. Install npm packages

   `npm install`

5. Start dev server

   `npm start`

6. Build website for production enviroment

   `npm run build`

View [online demo](http://j-f-liu.github.io/webpack-react-boilerplate/).<br>
View [online demo with react-router](https://webpack-react-boiler.firebaseapp.com/).

# Trouble shooting

```
ERROR in ./~/css-loader!./~/sass-loader?indentedSyntax=true!./app/styles/site.sass
Module build failed: Error: ENOENT: no such file or directory, scandir
```
Run `npm rebuild node-sass`.

When using Microsoft Windows, install [Python 2.7](https://www.python.org/downloads/windows/) and [Visual C++ Build Tools](http://landinghub.visualstudio.com/visual-cpp-build-tools), then run
```
npm install node-sass --msvs_version=2015
npm rebuild node-sass
```
