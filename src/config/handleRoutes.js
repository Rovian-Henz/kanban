export function getCurrentURL() {
    return window.location.href;
}

export function getCurrentPathName() {
    return window.location.pathname;
}

export function getCurrentHost() {
    return window.location.host;
}

export function setUrl(url = "") {
    window.history.pushState({}, "", `http://${getCurrentHost()}/${url}`);
}
