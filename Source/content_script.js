(function () {
    function toArray(obj) {
        var array = [];
        if (!obj) {
            return array;
        }
        // iterate backwards ensuring that length is an UInt32
        for (var i = obj.length >>> 0; i--;) {
            array[i] = obj[i];
        }
        return array;
    }

    walk(document.body);

    function walk(node) {
        // I stole this function from here:
        // http://is.gd/mwZp7E

        var child, next;

        classList = toArray(node.classList);

        if (node.tagName && node.tagName.toLowerCase() === 'input') {
            return;
        }
        if (node.tagName && node.tagName.toLowerCase() === 'textarea') {
            return;
        }
        if (classList.indexOf('ace_editor') > -1) {
            return;
        }

        switch (node.nodeType) {
            case 1:  // Element
            case 9:  // Document
            case 11: // Document fragment
                child = node.firstChild;
                while (child) {
                    next = child.nextSibling;
                    walk(child);
                    child = next;
                }
                break;

            case 3: // Text node
                handleText(node);
                break;
        }
    }

    function handleText(textNode) {
        var v = textNode.nodeValue;

        // http://imgur.com/9LgBQ0r
        v = v.replace(/\bBlack\b/ig, "African American");
        v = v.replace(/\bBrown\b/ig, "Muslim American");
        v = v.replace(/\bRed\b/ig, "Native American");
        v = v.replace(/\bYellow\b/ig, "Asian American");
        v = v.replace(/\bWhite\b/ig, "Caucasian American");

        // http://www.telegraph.co.uk/culture/film/film-news/9777404/Django-Unchained-star-Samuel-L-Jackson-challenges-TV-reporter-to-say-N-word.html
        // Think of the children!
        v = v.replace(/\bnigg(a|er)(\b)?/ig, "N word");

        // Bonus Tumblr edition
        v = v.replace(/\bman\b/g, "person");
        v = v.replace(/\bMan\b/g, "Person");
        v = v.replace(/\bwoman\b/g, "Person");
        v = v.replace(/\bWoman\b/g, "Person");
        v = v.replace(/\bmen\b/g, "people");
        v = v.replace(/\bMen\b/g, "People");
        v = v.replace(/\bwomen\b/g, "people");
        v = v.replace(/\bWomen\b/g, "People");
        v = v.replace(/\bstraght\b/g, "cisgender");
        v = v.replace(/\bStraght\b/g, "Cisgender");

        textNode.nodeValue = v;
    }


}());
