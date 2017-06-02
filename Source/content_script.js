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


    function matchCase(sub) {
        return function (match) {
            var p = match.charAt(0);
            if (p >= 65 && p < 65 + 26) {
                return sub[0].toUpperCase() + sub.substring(1);
            } else {
                return sub[0].toLowerCase() + sub.substring(1);
            }
        };
    }

    function handleText(textNode) {
        var v = textNode.nodeValue;

        // http://imgur.com/9LgBQ0r
        v = v.replace(/\bBlack\b/ig, "African American");  // Or "the B word"
        v = v.replace(/\bBrown\b/ig, "Muslim American");
        v = v.replace(/\bRed\b/ig, "Native American");
        v = v.replace(/\bYellow\b/ig, "Asian American");
        // https://imgur.com/sEbuvTs
        v = v.replace(/\bWhite\b/ig, "Caucasian American");

        // http://www.voont.com/the-alphabet-of-swearing
        v = v.replace(/ass/ig, matchCase("butt"));  // We need the clbuttic feature back
        v = v.replace(/\bbrothers?\b/ig, "B word");
        v = v.replace(/\bcunts?\b/ig, "C word");
        v = v.replace(/\bdick/ig, "Richard");
        // e
        v = v.replace(/\bfuck/ig, "F word");
        v = v.replace(/\bgay/ig, "G word");
        // h
        // i
        // j
        // k
        // l

        // https://imgur.com/JEBabGs
        v = v.replace(/\bmidgets?(\b)?/ig, "M word");
        // http://www.telegraph.co.uk/culture/film/film-news/9777404/Django-Unchained-star-Samuel-L-Jackson-challenges-TV-reporter-to-say-N-word.html
        // Think of the children!
        v = v.replace(/\bnigg(a|er)s?(\b)?/ig, "N word");

        v = v.replace(/\boppression\b/ig, "O word");
        v = v.replace(/\bpee\b/ig, "P word");
        v = v.replace(/\bpenis\b/ig, "P word");
        v = v.replace(/\bqueer\b/ig, "Q word");
        // r
        v = v.replace(/\bshit\b/ig, "S word");
        v = v.replace(/\btits\b/ig, "T word");
        // u
        // v
        v = v.replace(/\bvagina\b/ig, "V word");
        // w
        // x
        // y
        // z

        // https://imgur.com/PAjutIv
        if (Math.random() > 0.5) {
            v = v.replace(/\bmiddle[-\s]aged man/ig, matchCase("pedophile"));
            v = v.replace(/\bMiddle[-\s]aged men/ig, matchCase("Pedophiles"));
        } else {  // Really hard to tell which one
            v = v.replace(/\bmiddle[-\s]aged man/ig, matchCase("rapist"));
            v = v.replace(/\bmiddle[-\s]aged men/ig, matchCase("rapists"));
        }

        // Bonus Tumblr edition
        // https://i.reddituploads.com/0091a4443710445ebac709bc7dc90c2a?fit=max&h=1536&w=1536&s=334557d549b0b3a4b342aa73ac2021b5
        v = v.replace(/man\b/g, "person");
        v = v.replace(/\bMan\b/g, "Person");
        v = v.replace(/\bwoman\b/g, "person");
        v = v.replace(/\bWoman\b/g, "Person");
        v = v.replace(/\bmen\b/g, "scum");
        v = v.replace(/\bMen\b/g, "Scum");
        // https://en.wikipedia.org/wiki/Womyn
        v = v.replace(/\bWomen/g, "Womyn");
        v = v.replace(/\bwomen/g, "womyn");
        // https://i.redd.it/n86l1nydhb8y.png
        v = v.replace(/\bdude/ig, matchCase("person"));

        if (Math.random() > 0.5) {
            v = v.replace(/\bstraight\b/g, "cisgender");
            v = v.replace(/\bStraight\b/g, "Cisgender");
        } else {
            v = v.replace(/\bstraight\b/g, "homo/transphobic");
            v = v.replace(/\bStraight\b/g, "Homo/transphobic");
        }

        // https://i.redd.it/95xt30yd9jyy.png
        v = v.replace(/\bI think\b/g, "I'm not racist but I think");
        // https://www.youtube.com/watch?v=Y1LMu8V8ZlI
        // https://i.imgur.com/RyBBS5a.jpg
        v = v.replace(/\bhello[\.!]\b/ig, "");
        // http://www.cbsnews.com/news/examiner-recommends-school-board-uphold-pop-tart-suspension/
        v = v.replace(/\bgun(\b)?/ig, "pop tart");
        // https://www.youtube.com/watch?v=aT-MhzcP4U8&feature=share&app=desktop
        v = v.replace(/\bmexican(\b)?/ig, matchCase("undocumented immigrant"));
        // https://thebodyisnotanapology.com/magazine/11-offensive-phrases-you-didnt-realize-are-fat-shaming/

        v = v.replace(/\bfat shaming/g, "beauty contest");
        v = v.replace(/\bFat [Ss]haming/g, "Beauty contest");
        v = v.replace(/\bfat/g, "beautiful");
        v = v.replace(/\bFat/g, "Beautiful");
        v = v.replace(/\boleophobic\b/ig, matchCase("fatphobic"));

        // https://imgur.com/WbsO2X8
        v = v.replace(/\bmirrors/g, "instruments of oppression");
        v = v.replace(/\bMirrors/g, "Instruments of oppression");
        v = v.replace(/\bmirror/g, "instrument of oppression");
        v = v.replace(/\bMirror/g, "Instrument of oppression");
        // https://i.redd.it/36c4dahkwouy.jpg
        v = v.replace(/\bPower/g, "Privilege");
        v = v.replace(/\bpower/g, "privilege");
        // https://i.reddituploads.com/2934495ac67641219e3fe77ec6f54640?fit=max&h=1536&w=1536&s=605aed99b26a3735227ebbe2a4463661
        v = v.replace(/\brepublican\b/g, "bigot");
        v = v.replace(/\bRepublican\b/g, "Bigot");
        // https://imgur.com/rjjFnCd
        v = v.replace(/\bretard/g, "extremely derogatory term");
        v = v.replace(/\bRetard/g, "Extremely derogatory term");
        // https://imgur.com/rO3VvFM
        v = v.replace(/\bhousewife\b/g, "person");
        v = v.replace(/\bHousewife\b/g, "Person");
        v = v.replace(/\bhousewives\b/g, "people");
        v = v.replace(/\bHousewives\b/g, "People");
        // http://i.imgur.com/TJ8PIrN.jpg?1
        v = v.replace(/\bConsensual sex\b/g, "Rape");
        v = v.replace(/\bconsensual sex\b/g, "rape");
        v = v.replace(/\bSex\b/g, "Rape");
        v = v.replace(/\bsex\b/g, "rape");
        // https://www.reddit.com/r/TumblrInAction/comments/500bs1/trigger_warning/d70gy6m/
        v = v.replace(/\btrigger\b/ig, matchCase("the T word"));
        // https://i.redd.it/h87cf9we9lyx.jpg
        v = v.replace(/\bright[-\s]handed\b/ig, matchCase("privileged"));
        // https://i.redd.it/4vl78mu7r0ly.jpg
        v = v.replace(/\bporn\b/g, "hate crime against womyn");
        v = v.replace(/\bPorn\b/g, "Hate crime against womyn");
        // https://heatst.com/tech/youtube-ceo-deems-interrupting-her-a-sexist-microaggression/
        v = v.replace(/\binterruptions\b/g, "sexist microaggression");
        // http://www.dailymail.co.uk/travel/travel_news/article-4522350/Hilarious-photographs-women-FEMSPREADING.html
        v = v.replace(/\bfemspreading\b/ig, "MANSPREADING");
        // https://townhall.com/tipsheet/mattvespa/2017/05/20/in-seattle-police-can-no-longer-report-suspects-they-have-to-say-community-members-n2329542?
        v = v.replace(/\bsuspect/ig, matchCase("community member"));  // even if it is a verb
        v = v.replace(/\bcitizen/ig, matchCase("community member"));  // even if it is the watch brand

        textNode.nodeValue = v;
    }


}());
