const fs = require('fs');
const path = require('path');
const dirTree = './animation';
const outPut = 'db.json';

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
                        let image = '';
                        if (fs.existsSync(file + '\\Readme.md')) {
                            desc =
                                fs
                                    .readFileSync(file + '\\Readme.md', 'UTF-8')
                                    .split('\n')[0] || '';
                        }

                        if (
                            fs.existsSync(file + '\\*.jpg') ||
                            fs.existsSync(file + '\\*.png')
                        ) {
                            console.log('이미지 있다.');
                        }

                        results.push({
                            type: 'folder',
                            title: path.basename(file),
                            description: desc,
                            url: file + '/index.html',
                            thumbnail:
                                'https://s1.pearlcdn.com/KR/Upload/News/71bab50060920190531115440622.jpg',
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
