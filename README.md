# Rainbow.linenumbers

A plugin for [Rainbow](http://rainbowco.de) to show linenumbers.

Adds line numbering to the code element by adding a span.line at each newline.

## Instructions

Just include Rainbow.linenumbers.js alongside Rainbow.js

### usage

Set the starting line number by adding ```data-line="234"``` attribute to code element.

Disable line numbering by setting ```data-line="-1"```

### styling

Edit styles and colors by overriding the css:

```pre code.rainbow .line``` <-- the main element

```pre code.rainbow .line:before``` <-- the actual number

```pre code.rainbow .line:after``` <-- the underline

### hyperlinking

Each span.line has an id so you can easily jump to a specific line using and anchor href like #rb1ln30 (meaning rainbow block 1 line 30)