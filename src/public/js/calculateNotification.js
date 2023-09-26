function increaseNumberNotification(className) {
    let currentValue = + $(`.${className}`).text();
    // + chuyen string to integer
    currentValue +=1;
    if(currentValue === 0) {
        $(`.$(className)`).css("display","none").html("");
    } else {
        $(`.$(className)`).css("display","block").htm(currentValue)
    }
}

function decreaseNumberNotification(className) {
    let currentValue = + $(`.${className}`).text();
    // + chuyen string to integer
    currentValue -=1;
    if(currentValue === 0) {
        $(`.$(className)`).css("display","none").html("");
    } else {
        $(`.$(className)`).css("display","block").htm(currentValue)
    }
}