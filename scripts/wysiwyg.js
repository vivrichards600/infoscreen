// onmousedown is used instead of onclick for IE to work

var WYSIWYG = {

	list: [],
	defaultButtons: ['bold', 'italic', 'underline', 'strikethrough', '|', 'justifyleft', 'justifycenter', 'justifyright', 'justifyfull', 'indent', 'outdent', '|', 'insertunorderedlist', 'insertorderedlist', '|', 'link', '|', 'removeformat', '|', 'mode'],
	iconIndices: { 'bold': 0, 'italic': 1, 'underline': 2, 'strikethrough': 3, 'justifyleft': 4, 'justifycenter': 5, 'justifyright': 6, 'justifyfull': 7, 'indent': 8, 'outdent': 9, 'insertunorderedlist': 10, 'insertorderedlist': 11, 'link': 12, 'removeformat': 13, 'mode': 14 },
	Create: WYSIWYGCreate,
	Get: WYSIWYGGet,
	E: function(id) { return document.getElementById(id); }
}

function WYSIWYGCreate(settings) {

	var e = this.E("wysiwygCSS");

	if (!e) {

		var style = document.createElement("style");
		style.id = "wysiwygCSS";
		style.type = 'text/css';
		document.getElementsByTagName('head')[0].appendChild(style);

		var sheet = style.sheet;

		var css = '';
		css += '.WYSIWYGToolbar { border: 1px solid #cccccc; background-color: #f3f3f3; margin-left: -1px; margin-right: -1px; padding: 10px; line-height: 0px; }';
		css += '.WYSIWYGArea { border: 1px solid #cccccc; background-color: #ffffff; margin: -1px; }';
		css += '.WYSIWYGButton { display: inline-block; opacity: 0.8; width: 16px; height: 16px; margin: 2px; background-image: url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAAQCAYAAAAoEfIQAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAABaVJREFUeNrsW1tLJEcUPmdn4iWKKCgugu4qifrgQ3aFKP4CL0TNk5cHIwYUEQLZxEHwH7gZNyyoGBIhInhBWEfjFZ9EfHLy5AVFBBOQVRTFa3R0KlWlPfSMPX2f1tU5INNj9anprj7f+b5TVY2EEAjb07XS0lK5ZhYcaKB7Rf/R0dEnNd5nZ2ckOjoaTk5OIDY2FpCakf7s4RAOm4yhFf6dnZ1iFsGpqSlVnQvgp/5+yUKrv1V2dXXFwctIk4F3YmICSkpKIAxgg9bQ0EDcbjfk5uaCls/FxUV8DP4itgwEH9EAUqP+Uuyt+bdF4CUWJCjVtr+/TxISEjh4PR4PzMzMwOTkpLkALisrU7ppdLlcQRupv+JDoP4oI+cUg4BmTVQpBYP1hRLZ1xKmeYj+hYWFcsyHofY36Z58ccKu5/Y6LAOnEusylXxwcADHx8eQlpYG09PTMD4+Dt3d3SgXu0Ksi3CBgQrCrgCYwAwnW9NUVFTcGdjBwUEitNFjVPsgRL8j9T81tVfg+UTF+bJGWSvo7zNWs7ofGfbTAxJCgx8NsJgRf6Ng84tPEYhV2cTEJFl0/317IcjqUnj1+isoLi5CNe1Sdnl5SRjT7u7uwvz8PD23GBYWFmBjYwOGhoagr68PNcSugIE7+Au1hCb3IVdUJAdd2V6QnkFAydot7ScEY6sLAIHjqsPf1FpdM3gX3eBwOKi89d50hs+g/Ren777k2gNBfHFxQSjrwvn5ORwdHcHKygocHh5y6ZyXl8eAC729vVqIRxbEIQUwZVw/ZpZgaLAggaDWANQROJ+yP5EZM61jJ6WerEj0RK8vY9bm5p+h7e3bm8EQVmUoy7o56yLYntk4YMltO2PgNz/9CO3Od4yFfTXuzs4OP46Pjwe73Q5RUVGQmZkJ29vb0NHRAVVVVZCfnw8tLS3Q1tam5x7ugNiuMbBRx6DeB/tiENmPj62GNbHW1FJ2oELZo8XfSFJFiXtArf6e6//4l/LyUvgwMgqO5mYf2/pOpKzrpCAuK/8GRl1/+XyWlpb4zHJERASwSSp2bLPZ+DIRq3sTExMhJSWFSWqYnZ3ls8+UpY0kID8Q2zU+XFlGY4wrsGwg+1rEtlraUGOwPPYaONhElKaEaaJ0Rh3PH/X4e8HDP0coeClyb9gR0a/mZcfX3mtwjYzx74JPTk4OGzNSUFAAkZGRsLm5ydgY4uLiOKDX1tYgNTUV9vb2ICYmBsbGxiArK0uVPFajNuwWgEkXOzC50d/f7/s08MDVXMuTrYFFgEM9/Rr1N0mB6J7Eys7KhPft3fDDmwb4zBYJp6dn8PHjNvzR/Sekvkjj5/y79Q983/AdPH+eQkH4OWXfC+j89Xf4MvMLoebHnp4ekp2dzRk4IyMDvF4vY2dISkriwGaymslvVh+3traqrnGVmNp0AAvMK7Cv+Duz6upqrRmV6HygqCCnwzWwvAq573VgSyaxSkqKwXPpgffvfvNj3K/z8qD825tl0ZEPLvo36df+8uUL7itYXV0d0jqXsHXd5eVlDuD09HTY2trirMyOh4eHlXa+yYFYUmbbFQJZaw1MJMCsdTsev4lb1iUi9jVa55FHWsOGBAQ6+jXib9YklmZ/KmuRApVPQJ2engr/g+TkZN7Ga2OFdsGamprQ4XCQ2tpaPnHFal02G82kNItjJqsrKyvVLqUShfmJuwCW22Shxoz6mxyQRGcAPdUaWI5B9Uw66Vm/NzKJRXTMa6AAYiZ75UAu1y42Wj9jY2Mjqa+v52vATEIzKc0A7XQ6JcdBYktn4IaNoOP30LZSmim5UK2CEHbE6DXqbyjxiPx19WP0+h8AA5uRxBG0L4GFxLq6urCoqIjU1NTA6uoqrK+vw8DAQEiuB8NvIz1tewxvI4lehnhQLzOwrclsKWlubi5kySQM4LCF7RO2/wUYACVpI6BQehDOAAAAAElFTkSuQmCC\'); }';
		css += '.WYSIWYGButton:hover { transform: scale(1.1); opacity: 1 }';
		css += '.WYSIWYGSpace { display: inline-block; width: 12px; height: 20px; }';
		css += '.WYSIWYGSeparator { display: inline-block; margin-left: 7px; width: 8px; height: 20px; border-left: 1px solid #cccccc; }';

		var rules = css.split("}");

		for (var i = 0; i < rules.length; ++i) {

			if (rules[i] != '') {

				sheet.insertRule(rules[i] + '}', i);
			}
		}
	}

	var o = {

		id: settings.id,
		contents: (settings.contents)? settings.contents : '',
		head: (settings.head)? settings.head : '',
		width: (settings.width)? settings.width : 500,
		height: (settings.height)? settings.height : 300,
		buttons: (settings.buttons)? settings.buttons : this.defaultButtons,
		div: settings.div,
		mode: 'WYSIWYG',
		Destroy: WYSIWYGDestroy,
		ButtonClick: WYSIWYGButtonClick,
		InsertLink: WYSIWYGInsertLink,
		InsertHTMLAtSelection: WYSIWYGInsertHTMLAtSelection,
		InsertNodeAtSelection: WYSIWYGInsertNodeAtSelection,
		GetContentWindow: function() { return WYSIWYG.E('wysiwyg' + this.id).contentWindow; },
		GetContentDocument: function() { return WYSIWYG.E('wysiwyg' + this.id).contentWindow.document; },
		GetHTML: function() { return this.GetContentDocument().body.innerHTML; },
		GetSelectedText: function() { return this.GetContentWindow().getSelection().toString(); }
	}

	this.list[o.id] = o;

	var toolbarHeight = 42;

	var s = '';
	s +=  '<div style="width:' + o.width + 'px;"><div class="WYSIWYGToolbar">';
  
	for (var i = 0; i < o.buttons.length; ++i) {

		var button = o.buttons[i];
		
		if (button == "|") {
		
			s += '<div class="WYSIWYGSeparator"></div>';
		
		} else if (button == " ") {

			s += '<div class="WYSIWYGSpace"></div>';

		} else {
			
			var x = this.iconIndices[button] * 16;
			s += '<div class="WYSIWYGButton" style="background-position: -' + x + 'px -0px;" onmousedown="WYSIWYG.Get(\'' + o.id + '\').ButtonClick(\'' + button + '\'); event.preventDefault(); event.cancelBubble = true;"></div>';
		}
	}

	s += '</div></div>';

	s += '<div style="width:' + o.width + 'px; height:' + (o.height - toolbarHeight) + 'px;">';
	s += '<iframe class="WYSIWYGArea" frameborder="0" id="wysiwyg' + o.id + '" style="width: 100%; height: ' + (o.height - toolbarHeight) + 'px;"></iframe>\n'
	s += '</div>\n';
  
	o.div.innerHTML = s;
	
	var e = this.E("wysiwyg" + o.id);

	var doc = e.contentWindow.document;
 	doc.open();
	doc.write('<html><head>' + o.head + '</head><body>' + o.contents + '</body></html>');
	doc.close();

    doc.body.contentEditable = true;

	return o;
}

function WYSIWYGDestroy() {

	o.div.parentNode.removeChild(o.div);
	delete WYSIWYG.list[o.id];
}

function WYSIWYGGet(id) {

	return WYSIWYG.list[id];
}

function WYSIWYGButtonClick(id) {

	if (this.mode == 'Source' && id != 'mode') {

		alert('This is only possible in "WYSIWYG" mode');

	} else {

		this.GetContentWindow().focus(); // ensure focus

		if (id == "mode") {

			var body = this.GetContentDocument().body;

			if (this.mode == 'WYSIWYG') {

				var html = document.createTextNode(body.innerHTML);
				body.innerHTML = "";
				body.appendChild(html);

				this.mode = 'Source';

			} else {

				var html = body.ownerDocument.createRange();
				html.selectNodeContents(body);
				body.innerHTML = html.toString();

				this.mode = 'WYSIWYG';        
			}

		} else if (id == "link") {

			this.InsertLink();

		} else {

			this.GetContentDocument().execCommand(id, false, null);
		}
	}
}

function WYSIWYGInsertHTMLAtSelection(html) {

	var div = this.GetContentDocument().createElement("span"); 
	div.innerHTML = html;

	return this.InsertNodeAtSelection(div);		
}

function WYSIWYGInsertNodeAtSelection(insertNode) {

	var selection = this.GetContentWindow().getSelection();

	var range = selection.getRangeAt(0);

	selection.removeAllRanges();

	range.deleteContents();

	var container = range.startContainer;
	var start = range.startOffset;

	range = document.createRange();

	var rn = container;
	var rse = 0;

	if (container.nodeType == 3 && insertNode.nodeType == 3) { // inserting text into text

		container.insertData(pos, insertNode.nodeValue);

		rse = start + insertNode.length;

	} else {

  		if (container.nodeType == 3) { // inserting node into text

			var text = container.nodeValue;
			var pn = container.parentNode;

			var after = document.createTextNode(text.substring(start));

			pn.insertBefore(document.createTextNode(text.substring(0, start)), container);
			pn.insertBefore(insertNode, container);
			pn.insertBefore(after, container);

			pn.removeChild(container);

			rn = after;

		} else {

			var after = container.childNodes[start];
			container.insertBefore(insertNode, after);

			rn = after;
		}
	}

	range.setStart(rn, rse);
	range.setEnd(rn, rse);

	selection.addRange(range);

	this.GetContentWindow().focus()
}

function WYSIWYGInsertLink(o) {

	var s = this.GetSelectedText();
	var url = prompt('Enter a URL to link to');

	this.InsertHTMLAtSelection('<a href="' + url + '">' + s + '</a>');
}