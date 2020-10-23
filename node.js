const fs = require('fs');
const path = require('path');
const dirTree = '/animation';
const outPut = 'db.json';
let image =
    'https://s1.pearlcdn.com/KR/Upload/News/71bab50060920190531115440622.jpg';

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
                                '/animation\\background바닷속효과\\img\\bg_light.jpg';
                        }

                        results.push({
                            type: 'folder',
                            title: path.basename(file),
                            description: desc,
                            url: file + '/index.html',
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
