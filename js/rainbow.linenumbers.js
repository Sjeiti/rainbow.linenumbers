/**
 * Adds lines and numbers to the code element by adding a span.line at each newline.
 * Set the starting line number by adding data-line="234" attribute to code element.
 * Disable line numbering by setting data-line="-1"
 * Each span.line has an id so you can easily jump to a specific line using and anchor href like #rb1ln30 (meaning rainbow block 1 line 30)
 * @author Ron Valstar (http://www.sjeiti.com/)
 * @namespace Rainbow.linenumbers
 * @license http://www.apache.org/licenses/LICENSE-2.0
 * @requires Rainbow.js
 */
if (window.Rainbow&&!window.Rainbow.linenumbers) window.Rainbow.linenumbers = (function(Rainbow){
	var iBlock = 0;
	// add generic .line style
	var mGenericLineStyle = document.createElement('style');
	mGenericLineStyle.innerText = 'pre code.rainbow .line { position: relative; padding-right: 10px; }'
	+'pre code.rainbow .line:before{ content: attr(data-line); display: inline-block; text-align: right; }'
	+'pre code.rainbow .line:after{ content:\'\'; position: absolute; left: 0; bottom: 0; }';
	document.head.appendChild(mGenericLineStyle);
	// handle each code block
	Rainbow.onHighlight(function(block) {
		iBlock++;
		var toInt = parseInt
			,rxLineMatch = /\r\n|\r|\n/g
			,iLines = block.innerHTML.replace(rxLineMatch,"\n").split("\n").length
			,iLineStart = block.getAttribute('data-line')<<0||1
			,drawNumbers = iLineStart>=0
			,sBlockId = 'rb'+iBlock
			// <pre>
			,mBlockParent = block.parentNode
			// get <code>- and <pre> styles
			,getStyle = function(el){return el.currentStyle||(document.defaultView&&document.defaultView.getComputedStyle(el,null))||el.style}
			//
			,iCharWidth = calculateCharacterWidth()
			,iLineBlockWidth = String(iLineStart+iLines-1).length*iCharWidth
			//
			// style
			,sStyle = 'pre code.rainbow.'+sBlockId+' .line:before{ width: '+iLineBlockWidth+'px; }'
		;
		function calculateCharacterWidth(){
			var iTestExp = 5
				,mTestDiv = document.createElement('div')
				,oTestStyle = mTestDiv.style
				,oCodeStyle = getStyle(block)
				,oTestCSS = {font:oCodeStyle.font,width:'auto',display:'inline-block'}
				,iReturnWidth
			;
			mTestDiv.appendChild(document.createTextNode(new Array(1<<iTestExp).join('a')+'a'));
			for (var s in oTestCSS) oTestStyle[s] = oTestCSS[s];
			document.body.appendChild(mTestDiv);
			iReturnWidth = mTestDiv.offsetWidth>>iTestExp;
			document.body.removeChild(mTestDiv);
			return iReturnWidth;
		}
		// add line numbers as <span id="rbln-32"></span> to be able to link to a specific line
		function getLine(nr){
			var sId = sBlockId+'ln'+nr;
			return '<span id="'+sId+'" class="line" data-line="'+nr+'"></span>';
		}
		if (drawNumbers) {
			var iLine = iLineStart
				,sBlock = getLine(iLineStart)+block.innerHTML.replace(rxLineMatch,function(match){
					return match+getLine(++iLine);
				})
			;
			// add style element
			var mStyle = document.createElement('style');
			mStyle.innerText = sStyle;
			mBlockParent.parentNode.insertBefore(mStyle, mBlockParent);
			block.innerHTML = sBlock;
			// add class to block
			block.classList.add(sBlockId);
		}
	});
	// return something so as not to run again if accidentally included twice
	return {toString:function(){return '[object Rainbow.linenumbers]'}}
})(window.Rainbow);
