# Rainbow.linenumbers

A plugin for [Rainbow](http://rainbowco.de) to show linenumbers.
Adds line numbering to the code element by adding a span.line at each newline.

## Instructions

Just include Rainbow.linenumbers.js alongside Rainbow.js

Set the starting line number by adding data-line="234" attribute to code element.
Disable line numbering by setting data-line="-1"
Each span.line has an id so you can easily jump to a specific line using and anchor href like #rb1ln30 (meaning rainbow block 1 line 30)