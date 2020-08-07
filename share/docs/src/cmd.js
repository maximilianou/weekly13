const { append, remove } = require('./readmes.js');

console.log('createing README.md');

const fileOut = '../../../README.md';
const filesIn = [
  { path: '../../../Do.md', mark: '\n' },
  { path: '../../../app13/Makefile', mark: '\n```\n' },
  { path: '../../../app13/docker-compose.dev.yml', mark: '\n```\n' },
  { path: '../../../app13/frontend/Dockerfile.dev', mark: '\n```\n' },
  { path: '../../../app13/frontend/karma.conf.js', mark: '\n```\n' },
  { path: '../../../app13/frontend/package.json', mark: '\n```\n' },
  {
    path: '../../../app13/frontend/src/app/app.component.spec.ts',
    mark: '\n```\n',
  },
  { path: '../../../app13/frontend/src/app/app.component.ts', mark: '\n```\n' },
  {
    path: '../../../app13/frontend/src/app/app.component.html',
    mark: '\n```\n',
  },
];
const publish = (cmd) => {
  remove({ fileOut: cmd.fileOut });
  console.log('removed.');
  cmd.filesIn.forEach((file) => {
    console.log('each file.');
    append({ fileIn: file.path, fileOut, mark: file.mark });
  });
};

publish({ fileOut, filesIn });

console.log('created README.md');
