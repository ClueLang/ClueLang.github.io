ace.define("ace/mode/clue_highlight_rules",[],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:"constant.numeric.integer.hexadecimal.clue",regex:/(?<![\w\d.])0[xX][0-9A-Fa-f]+(?![pPeE.0-9])/},{token:"constant.numeric.float.hexadecimal.clue",regex:/(?<![\w\d.])0[xX][0-9A-Fa-f]+(?:\.[0-9A-Fa-f]+)?(?:[eE]-?\d*)?(?:[pP][-+]\d+)?/},{token:"constant.numeric.integer.clue",regex:/(?<![\w\d.])\d+(?![pPeE.0-9])/},{token:"constant.numeric.float.clue",regex:/(?<![\w\d.])\d+(?:\.\d+)?(?:[eE]-?\d*)?/},{token:"punctuation.definition.string.multilined.begin.clue",regex:/'/,push:[{token:"punctuation.definition.string.multilined.end.clue",regex:/'/,next:"pop"},{include:"#escaped_char"},{defaultToken:"string.quoted.single.clue"}]},{token:"punctuation.definition.string.multilined.begin.clue",regex:/"/,push:[{token:"punctuation.definition.string.multilined.end.clue",regex:/"/,next:"pop"},{include:"#escaped_char"},{defaultToken:"string.quoted.double.clue"}]},{token:"punctuation.definition.string.multilined.begin.clue",regex:/`/,push:[{token:"punctuation.definition.string.multilined.end.clue",regex:/`/,next:"pop"},{include:"#escaped_char"},{defaultToken:"string.multiline.clue"}]},{token:"comment.line.double-dash.clue",regex:/\/\/.*/},{token:"punctuation.definition.comment.begin.clue",regex:/\/\*/,push:[{token:"punctuation.definition.comment.end.clue",regex:/\*\//,next:"pop"},{include:"#escaped_char"},{defaultToken:"comment.block.clue"}]},{token:"keyword.control.clue",regex:/\b(?:if|elseif|else|for|of|in|with|while|meta|until|fn|method|return|loop|enum|continue|break|try|catch|match|default|macro)\b/},{token:"keyword.scope.clue",regex:/\b(?:local|global|static)\b/},{token:"constant.language.clue",regex:/(?<![^.]\.|:)\b(?:false|nil|true|_G|_VERSION|math\.(?:pi|huge))\b|(?<![.])\.{3}(?!\.)/},{token:"variable.language.self.clue",regex:/(?<![^.]\.|:)\bself\b/},{token:"support.function.any-method.clue",regex:/\b[a-zA-Z_][a-zA-Z0-9_]*\b(?=\(\s*)/},{token:"variable.other.clue",regex:/[A-Za-z_][0-9A-Za-z_]*/},{token:"keyword.operator.clue",regex:/\&|\||\!|\~|\?|\.|\$|@|:|\+|-|%|#|\*|\/|\^|==?|<=?|>=?|(?<!\.)\.{2}(?!\.)/}],"#escaped_char":[{token:"constant.character.escape.clue",regex:/\\[abfnrtvz\\"'$]/},{token:"constant.character.escape.byte.clue",regex:/\\\d{1,3}/},{token:"constant.character.escape.byte.clue",regex:/\\x[0-9A-Fa-f][0-9A-Fa-f]/},{token:"constant.character.escape.unicode.clue",regex:/\\u\{[0-9A-Fa-f]+\}/},{token:"invalid.illegal.character.escape.clue",regex:/\\./}]},this.normalizeRules()};s.metaData={name:"Clue",scopeName:"source.clue"},r.inherits(s,i),t.ClueHighlightRules=s}),ace.define("ace/mode/folding/cstyle",[],function(e,t,n){"use strict";var r=e("../../lib/oop"),i=e("../../range").Range,s=e("./fold_mode").FoldMode,o=t.FoldMode=function(e){e&&(this.foldingStartMarker=new RegExp(this.foldingStartMarker.source.replace(/\|[^|]*?$/,"|"+e.start)),this.foldingStopMarker=new RegExp(this.foldingStopMarker.source.replace(/\|[^|]*?$/,"|"+e.end)))};r.inherits(o,s),function(){this.foldingStartMarker=/([\{\[\(])[^\}\]\)]*$|^\s*(\/\*)/,this.foldingStopMarker=/^[^\[\{\(]*([\}\]\)])|^[\s\*]*(\*\/)/,this.singleLineBlockCommentRe=/^\s*(\/\*).*\*\/\s*$/,this.tripleStarBlockCommentRe=/^\s*(\/\*\*\*).*\*\/\s*$/,this.startRegionRe=/^\s*(\/\*|\/\/)#?region\b/,this._getFoldWidgetBase=this.getFoldWidget,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);if(this.singleLineBlockCommentRe.test(r)&&!this.startRegionRe.test(r)&&!this.tripleStarBlockCommentRe.test(r))return"";var i=this._getFoldWidgetBase(e,t,n);return!i&&this.startRegionRe.test(r)?"start":i},this.getFoldWidgetRange=function(e,t,n,r){var i=e.getLine(n);if(this.startRegionRe.test(i))return this.getCommentRegionBlock(e,i,n);var s=i.match(this.foldingStartMarker);if(s){var o=s.index;if(s[1])return this.openingBracketBlock(e,s[1],n,o);var u=e.getCommentFoldRange(n,o+s[0].length,1);return u&&!u.isMultiLine()&&(r?u=this.getSectionRange(e,n):t!="all"&&(u=null)),u}if(t==="markbegin")return;var s=i.match(this.foldingStopMarker);if(s){var o=s.index+s[0].length;return s[1]?this.closingBracketBlock(e,s[1],n,o):e.getCommentFoldRange(n,o,-1)}},this.getSectionRange=function(e,t){var n=e.getLine(t),r=n.search(/\S/),s=t,o=n.length;t+=1;var u=t,a=e.getLength();while(++t<a){n=e.getLine(t);var f=n.search(/\S/);if(f===-1)continue;if(r>f)break;var l=this.getFoldWidgetRange(e,"all",t);if(l){if(l.start.row<=s)break;if(l.isMultiLine())t=l.end.row;else if(r==f)break}u=t}return new i(s,o,u,e.getLine(u).length)},this.getCommentRegionBlock=function(e,t,n){var r=t.search(/\s*$/),s=e.getLength(),o=n,u=/^\s*(?:\/\*|\/\/|--)#?(end)?region\b/,a=1;while(++n<s){t=e.getLine(n);var f=u.exec(t);if(!f)continue;f[1]?a--:a++;if(!a)break}var l=n;if(l>o)return new i(o,r,l,t.length)}}.call(o.prototype)}),ace.define("ace/mode/clue",[],function(e,t,n){"use strict";var r=e("../lib/oop"),i=e("./text").Mode,s=e("./clue_highlight_rules").ClueHighlightRules,o=e("./folding/cstyle").FoldMode,u=function(){this.HighlightRules=s,this.foldingRules=new o};r.inherits(u,i),function(){this.$id="ace/mode/clue"}.call(u.prototype),t.Mode=u});                (function() {
                    ace.require(["ace/mode/clue"], function(m) {
                        if (typeof module == "object" && typeof exports == "object" && module) {
                            module.exports = m;
                        }
                    });
                })();
            