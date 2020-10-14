const dirTree = require("directory-tree");
const readMarkdown = require('read-markdown')

dirTree('./animation', {normalizePath:true }, (item, PATH, stats) => {
    console.log(item);
});
