let input__name = document.querySelector("#input__name");
let input__date = document.querySelector("#input__date");
let input__text = document.querySelector("#input__text");
let name__error = document.querySelector("#name__error");
let button__add = document.querySelector("#button__add");
let comment__list = document.querySelector("#comment__list");

input__text.onkeydown = function (key) {
    if (key.key == "Enter") {
        addComment();
    }
};

function checkNameError() {
    if (input__name.value.length === 0) {
        name__error.textContent = "Введите имя!";
        input__name.classList.add("error__border");
        input__name.oninput = checkNameError;
        return true;
    } else {
        input__name.classList.remove("error__border");
        name__error.textContent = "";
        input__name.oninput = null;
        return false;
    }
}

function checkTextError() {
    if (input__text.value.length === 0) {
        text__error.textContent = "Введите комментарий!";
        input__text.classList.add("error__border");
        input__text.oninput = checkTextError;
        return true;
    } else {
        input__text.classList.remove("error__border");
        text__error.textContent = "";
        input__text.oninput = null;
        return false;
    }
}

function addComment() {
    let inputerror;
    if (checkNameError()) {
        inputerror = true;
    }
    if (checkTextError()) {
        inputerror = true;
    }
    if (inputerror) {
        return;
    }

    let comment__block = document.createElement("div");
    comment__block.classList.add("comment__block");

    let comment__header = document.createElement("div");
    comment__header.classList.add("comment__header");

    let comment__name = document.createElement("div");
    comment__name.classList.add("comment__name");
    comment__name.textContent = input__name.value;
    let comment__date = document.createElement("div");
    comment__date.classList.add("comment__date");
    comment__date.textContent = parseDate();

    comment__header.appendChild(comment__name);
    comment__header.appendChild(comment__date);

    let comment__body = document.createElement("div");
    comment__body.classList.add("comment__body");
    comment__body.textContent = input__text.value;

    let comment__footer = document.createElement("div");
    comment__footer.classList.add("comment__footer");

    let comment__like = document.createElement("img");
    comment__like.classList.add("comment__like");
    comment__like.src = "./img/like.svg";
    let comment__remove = document.createElement("img");
    comment__remove.classList.add("comment__remove");
    comment__remove.src = "./img/trash.svg";

    comment__like.onclick = function () {
        if (comment__like.like == undefined) {
            comment__like.src = "./img/like-active.svg";
            comment__like.like = true;
        } else {
            comment__like.src = "./img/like.svg";
            comment__like.like = undefined;
        }
    };

    comment__remove.onclick = function () {
        comment__list.removeChild(comment__block);
    };

    comment__footer.appendChild(comment__like);
    comment__footer.appendChild(comment__remove);

    comment__block.appendChild(comment__header);
    comment__block.appendChild(comment__body);
    comment__block.appendChild(comment__footer);

    comment__list.appendChild(comment__block);

    input__name.value = "";
    input__text.value = "";
    input__date.value = "";
}

function parseDate() {
    let dateValue;
    if (input__date.value == "") {
        dateValue = new Date();
    } else {
        dateValue = new Date(input__date.value);
    }
    let diff = new Date().getDate() - dateValue.getDate();

    // if (diff < 0) {
    //     return new Date().toLocaleString();
    // }
    let nowTime = new Date().getHours() + ":" + new Date().getMinutes();
    if (new Date().getMinutes() < 10) {
        nowTime = new Date().getHours() + ":" + "0" + new Date().getMinutes();
    }
    let stringDay;
    if (diff == 0) {
        stringDay = "Сегодня";
    } else if (diff == 1) {
        stringDay = "Вчера";
    }
    else {
        return dateValue.toLocaleDateString() + ", " + nowTime;
    }

    return stringDay + ", " + nowTime;
}

button__add.onclick = function () {
    addComment();
};