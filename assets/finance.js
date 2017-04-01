function seekZero(a){for(var b=1;a(b)>0;)b+=1;for(;a(b)<0;)b-=.01;return b+.01}function sumEq(a,b,c){for(var d=0,e=0,f=0;f<a.length;f++)d+=a[f]/Math.pow(1+c,b[f]);for(f=0;f<a.length;f++)e+=-a[f]*b[f]*Math.pow(1+c,-1-b[f]);return d/e}function durYear(a,b){return Math.abs(b.getTime()-a.getTime())/31536e6}var Finance=function(){};Finance.prototype.PV=function(a,b,c){c="undefined"!=typeof c?c:1;var d,a=a/100;return d=b/Math.pow(1+a,c),Math.round(100*d)/100},Finance.prototype.FV=function(a,b,c){var d,a=a/100;return d=b*Math.pow(1+a,c),Math.round(100*d)/100},Finance.prototype.NPV=function(a){for(var a=a/100,b=arguments[1],c=2;c<arguments.length;c++)b+=arguments[c]/Math.pow(1+a,c-1);return Math.round(100*b)/100},Finance.prototype.IRR=function(a){function f(a){if(c++,c>1e3)throw new Error("IRR can't find a result");for(var d=1+a/100,e=b[0],f=1;f<b.length;f++)e+=b[f]/Math.pow(d,f);return e}var d,e,b=arguments,c=1;if(Array.prototype.slice.call(b).forEach(function(a){a>0&&(d=!0),a<0&&(e=!0)}),!d||!e)throw new Error("IRR requires at least one positive value and one negative value");return Math.round(100*seekZero(f))/100},Finance.prototype.PP=function(a,b){if(0===a)return Math.abs(arguments[1])/arguments[2];var c=arguments[1],d=1;for(i=2;i<arguments.length;i++){if(c+=arguments[i],c>0)return d+=(c-arguments[i])/arguments[i];d++}},Finance.prototype.ROI=function(a,b){var c=(b-Math.abs(a))/Math.abs(a)*100;return Math.round(100*c)/100},Finance.prototype.AM=function(a,b,c,d,e){function j(a){return e&&(a-=1),i*Math.pow(1+i,a)}var f,g,h,i=b/12/100;return d?1===d?(f=j(c),g=Math.pow(1+i,c)-1):console.log("not defined"):(f=j(12*c),g=Math.pow(1+i,12*c)-1),h=a*(f/g),Math.round(100*h)/100},Finance.prototype.PI=function(a,b){for(var d,c=0,e=2;e<arguments.length;e++){var f;f=1/Math.pow(1+a/100,e-1),c+=arguments[e]*f}return d=c/Math.abs(arguments[1]),Math.round(100*d)/100},Finance.prototype.DF=function(a,b){for(var d,c=[],e=1;e<b;e++)d=1/Math.pow(1+a/100,e-1),roundedDiscountFactor=Math.ceil(1e3*d)/1e3,c.push(roundedDiscountFactor);return c},Finance.prototype.CI=function(a,b,c,d){var e=c*Math.pow(1+a/100/b,b*d);return Math.round(100*e)/100},Finance.prototype.CAGR=function(a,b,c){var d=Math.pow(b/a,1/c)-1;return Math.round(1e4*d)/100},Finance.prototype.LR=function(a,b,c){return(a+b)/c},Finance.prototype.R72=function(a){return 72/a},Finance.prototype.WACC=function(a,b,c,d,e){E=a,D=b,V=a+b,Re=c,Rd=d,T=e;var f=E/V*Re/100+D/V*Rd/100*(1-T/100);return Math.round(1e3*f)/10},Finance.prototype.PMT=function(a,b,c){return-c*a/(1-Math.pow(1+a,-b))},Finance.prototype.IAR=function(a,b){return 100*((1+a)/(1+b)-1)},Finance.prototype.XIRR=function(a,b,c){if(a.length!=b.length)throw new Error("Number of cash flows and dates should match");var d,e;if(Array.prototype.slice.call(a).forEach(function(a){a>0&&(d=!0),a<0&&(e=!0)}),!d||!e)throw new Error("XIRR requires at least one positive value and one negative value");c=c?c:0;var g,f=100,h=[];h.push(0);for(var i=1;i<b.length;i++)h.push(durYear(b[0],b[i]));do g=c,c=g-sumEq(a,h,g),f--;while(g.toFixed(5)!=c.toFixed(5)&&f>0);var j=g.toFixed(5)!=c.toFixed(5)?null:100*c;return Math.round(100*j)/100},"undefined"!=typeof exports&&"undefined"!=typeof module&&module.exports&&(module.exports=Finance,module.exports.Finance=Finance);