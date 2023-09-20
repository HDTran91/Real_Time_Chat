function increaseNumberNotifContact(className) {
    let currentValue = + $(`.${className}`).find("em").text();
    // + chuyen string to integer
    currentValue +=1;
    if(currentValue === 0) {
        $(`.$(className)`).html("");
    } else {
        $(`.$(className)`).htm(`(<em>${currentValue}</em>)`)
    }
}

function decreaseNumberNotifContact(className) {
    let currentValue = + $(`.${className}`).find("em").text();
    // + chuyen string to integer
    currentValue -=1;
    if(currentValue === 0) {
        $(`.$(className)`).html("");
    } else {
        $(`.$(className)`).htm(`(<em>${currentValue}</em>)`)
    }
}