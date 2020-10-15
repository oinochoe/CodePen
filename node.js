// const dirTree = require('directory-tree');
// const readMarkdown = require('read-markdown');
// const tree = dirTree('./animation');

// readMarkdown('./animation/dist/**/*.md')
//     .then(function (data) {
//         console.log(data);
//     })
//     .catch(console.error);

var fs = require('fs');
var path = require('path');

var diretoryTreeToObj = function (dir, done) {
    var results = [];

    fs.readdir(dir, function (err, list) {
        if (err) return done(err);

        var pending = list.length;

        if (!pending)
            return done(null, {
                name: path.basename(dir),
                type: 'folder',
                articles: results,
            });

        list.forEach(function (file) {
            file = path.resolve(dir, file);
            fs.stat(file, function (err, stat) {
                if (stat && stat.isDirectory()) {
                    diretoryTreeToObj(file, function (err, res) {
                        results.push({
                            type: 'folder',
                            title: path.basename(file),
                            articles: res,
                            description: '안녕하세요',
                            url: 'http://',
                            urlToImage:'http://www.placeholderit.png'
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

var dirTree = './animation';

diretoryTreeToObj(dirTree, function (err, res) {
    if (err) console.error(err);

    console.log(JSON.stringify(arrayToObject(res, 'title')));
    fs.writeFileSync(
        'myjsonfile.json',
        JSON.stringify(arrayToObject(res, 'title')),
    );
});
const arrayToObject = (array, keyField) =>
    array.reduce((obj, item) => {
        obj[item[keyField]] = item;
        return obj;
    }, {});
