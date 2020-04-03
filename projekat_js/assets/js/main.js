$(document).ready(() => {
    printArticles(getItemsFromLs('left') == null ? getArticles() : getItemsFromLs('left'), "left");
    const right = getItemsFromLs('right');
    if(right != null){
        printArticles(right, 'right');
    }
});

$('body').on('click', '#ca', (e) => {
    e.preventDefault();
    localStorage.removeItem('left');
    localStorage.removeItem('right');
    location.reload();
});

$('body').on('click', '.left_button', () => {
    moveCheckedItemsTo('left');
});

$('body').on('click', '.right_button', () => {
    moveCheckedItemsTo('right');
});

$('body').on('click', '#cb', (e) => {
    e.preventDefault();
    const articles = getItemsFromLs('right');
    sendArticles(articles);
});

function moveCheckedItemsTo(place){
    var checked = '';
    
    if(place == 'left'){
        checked = $(`.left-chbxs:checked`);
    }
    if(place == 'right'){
        checked = $(`.right-chbxs:checked`);
    }

    let rightitems = getItemsFromLs('right') == null ? [] : getItemsFromLs('right');
    let leftitems = getItemsFromLs('left') == null ? getArticles() : getItemsFromLs('left');

    if(place == 'left'){
        for (let chbx of checked) {
            rightitems.push(leftitems.find(x => x.id == chbx.value));
            leftitems.splice(leftitems.findIndex(i => i.id == chbx.value), 1);
        }
    }

    if(place == 'right'){
        for (let chbx of checked) {
            leftitems.push(rightitems.find(x => x.id == chbx.value));
            rightitems.splice(rightitems.findIndex(i => i.id == chbx.value), 1);
        }
    }

    setItemsToLs(leftitems, rightitems);
    printArticles(getItemsFromLs('right'), "right");
    printArticles(getItemsFromLs('left'), 'left');
}

function setItemsToLs(leftItems, rightItems){
    localStorage.setItem('left', JSON.stringify(leftItems));
    localStorage.setItem('right', JSON.stringify(rightItems));
}

function getItemsFromLs(place){
    return JSON.parse(localStorage.getItem(place));
}

function getArticles(){
    let items = null;
    $.ajax({
        async: false,
        url: location.origin+'/projekat_js/data/articles.json',
        method: 'get',
        dataType: 'json',
        success: (data) => {
            items = data;
        },
        error: (error) => {
            alert(error);
        }
    });
    return items != null ? items : null;
}

function sendArticles(articles){
    $.ajax({
        url: location.origin+'/projekat_js/models/obrada.php',
        method: 'post',
        data: {
            articles: articles
        },
        success: () => {
            alert('Data successfully sent!');
        },
        error: (error) => {
            alert(error);
        }
    });
}

function printArticles(items, place) {
    let html = '';
    items.forEach(item => {
        html += `
        <li class="list-group-item">
          <label class="custom-control custom-checkbox">
            <input type="checkbox" class="custom-control-input ${place}-chbxs" value="${item.id}">
            <span class="custom-control-indicator"></span>
            <span class="custom-control-description">${item.title}</span>
          </label>
        </li>`;
    });
    $('#'+place).html(html);
}