import fs from 'fs';
import path from 'path';

export function createFile (root, content) {
  var pathArr = root.split('/');
  var dirPath = pathArr.slice(0, pathArr.length);
  for (var i = 0; i < dirPath.length; i++) {
    var p = path.resolve(dirPath.slice(0, i).join('/'));
    if (dirPath[i] && !fs.existsSync(p)) {
      fs.mkdirSync(p, '0777');
    }
  }
  fs.writeFileSync(path.resolve(root), content, {});
}