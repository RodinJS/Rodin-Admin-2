/**
 * Created by Reinchard on 7/31/2017.
 */
export function toCamelCase(str) {
    let camelString =  str.replace(/\W+(.)/g, function(match, chr) {
        return chr.toUpperCase();
    });
    return camelString.charAt(0).toLowerCase() + camelString.slice(1);
}

export  function updateQueryString(key, value, props) {
    let uri = props.location.pathname + props.location.search;
    var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
    var separator = uri.indexOf('?') !== -1 ? "&" : "?";
    if (uri.match(re)) {
        return uri.replace(re, '$1' + key + "=" + value + '$2');
    }
    else {
        return uri + separator + key + "=" + value;
    }
}

function hash_to_search(h) {
    let search = String("?");
    for (const k in h) {
        for (let i = 0; i < h[k].length; i++) {
            search += search === "?" ? "" : "&";
            search += encodeURIComponent(k) + "=" + encodeURIComponent(h[k][i]);
        }
    }
    return search;
}