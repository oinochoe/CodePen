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
                            name: path.basename(file),
                            type: 'folder',
                            articles: res,
                        });
                        if (!--pending) done(null, results);
                    });
                } else {
                    results.push({
                        type: 'file',
                        name: path.basename(file),
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

    console.log(JSON.stringify(toObject(res)));
    fs.writeFileSync('myjsonfile.json', JSON.stringify(toObject(res)));
});
function toObject(arr) {
    var rv = {};
    for (var i = 0; i < arr.length; ++i)
        if (arr[i] !== undefined) rv[i] = arr[i];
    return rv;
}
