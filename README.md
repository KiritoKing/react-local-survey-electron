# React-Electron Local Survey System

*React-Electron Local Survey System* is a open source survey management application using **MIT** license.

This application uses React for UI building and electron for backend API to interact with local file system. **JSON**s are used to store and convey surveys and results.

Considering basic work are already done by boilerplates and libraries, my work mainly focus on the **electron API** needed and **survey editing** utils which is not provided in *SurveyJS* lib.

If you have any problems, just commit a new [Issue](https://github.com/KiritoKing/react-local-survey-electron/issues/new/choose) in Github, and I'll check it soon.

**Author Info: ChlorineC, HUST, Wuhan, 2023**

## Main Dependencies

This application is based on [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate) (Scaffold with *React* and *Electron* support) ,[surveyjs](https://github.com/surveyjs/survey-library) (An open-source survey library) and [mui/material-ui](https://github.com/mui/material-ui) (An open-source component lib for React projects).

Other dependencies are listed in `package.json` in the root folder of the project.

## How to run this project?

We strongly recommend you to download compiled binary packages from our **[Releases Page](https://github.com/KiritoKing/react-local-survey-electron/releases)** if you do not want to modify the codes.

Whatever, if you wanna go on with raw code, just follow the following steps.

### Want to make some changes?

Clone the repo and install dependencies:

```bash
git clone https://github.com/KiritoKing/react-local-survey-electron.git
cd react-local-survey-electron
npm install
```

#### Starting Development

Start the app in the `dev` environment:

```bash
npm start
```

#### Build your own package

To package apps for the local platform:

```bash
npm run package
```

## License

MIT © [React-Electron Local Survey System](https://github.com/KiritoKing/react-local-survey-electron)
