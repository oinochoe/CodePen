const fs = require('fs');
const watchDir = require('chokidar');
const path = require('path');
const dirTree = './public/animation';
const outPut = 'db.json';
let image =
    '/animation/background/배경이미지겹칩(이동효과)/img/tumblr_p7n8kqHMuD1uy4lhuo1_540.png';

const watcher = watchDir.watch(dirTree, {
    ignored: /^\./,
    persistent: true,
});

const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});

const diretoryTreeToObj = (dir, done) => {
    let results = [];

    fs.readdir(dir, (err, list) => {
        if (err) return done(err);

        let pending = list.length;

        if (!pending)
            return done(null, {
                name: path.basename(dir),
                type: 'folder',
                articles: results,
            });

        list.forEach((file) => {
            file = path.resolve(dir, file);
            fs.stat(file, (err, stat) => {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, (err, res) => {
                        let desc = '';
                        if (fs.existsSync(file + '\\Readme.md')) {
                            desc =
                                fs
                                    .readFileSync(file + '\\Readme.md', 'UTF-8')
                                    .split('\n')[0] || '';
                        }

                        if (file.split('\\').pop() === 'img') {
                            image =
                                file.split('public')[1] + '\\' + 'thumb.jpg';
                        }

                        results.push({
                            type: 'folder',
                            title: path.basename(file),
                            description: desc,
                            url: file.split('public')[1] + '\\' + 'index.html',
                            thumbnail: image,
                            articles:
                                res.articles === undefined
                                    ? res
                                    : [
                                          {
                                              title:
                                                  'UI Interaction 효과가 없습니다.',
                                          },
                                      ],
                        });
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push({
                        type: 'file',
                        title: path.basename(file),
                    });

                    if (!--pending) done(null, results);
                }
            });
        });
    });
};

diretoryTreeToObj(dirTree, (err, res) => {
    if (err) console.error(err);
    fs.writeFileSync(outPut, JSON.stringify(arrayToObject(res, 'title')));
});
