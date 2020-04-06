$(document).ready(() => {
    const rows = localStorageGet('rows');
    // console.log(rows);
    // console.log(localStorageGet('used'));
    // console.log(localStorageGet('ordertotal'));
    // console.log(localStorageGet('used_ids'));
    if(rows != null){
        makeTableRows(rows);
    }
    orderTotal();
});

$('body').on('click', '#clear', () => {
    localStorage.removeItem('rows');
    localStorage.removeItem('used');
    localStorage.removeItem('ordertotal');
    localStorage.removeItem('used_ids');
    $('#tbd').html('');
    $('#total').html('Order Total: $0');
});

$('body').on('click', '#insert', () => {
    insertArticles();
});

$("body").on("change", ".one-article", function(){
    const row_id = $(this).data('id');
    const article_id = $(this).val();
    
    if(article_id != 0){
        let used_articles = localStorageGet('used') == null ? [] : localStorageGet('used');
        if(used_articles.length != 0){
            find_row = used_articles.find(x => x.row_id == row_id);
            if(find_row == undefined){
                tmp_obj = used_articles.find(x => x.used_id == article_id);
                if(tmp_obj == undefined){
                    used_articles.push({used_id: article_id, row_id: row_id});
                }
            }
            else{
                let tmp_id = find_row.row_id;
                for(let i=0; i < used_articles.length; i++){
                    if(used_articles[i].row_id == tmp_id){
                        used_articles[i].used_id = article_id;
                    }
                }
            }
        }
        else{
            used_articles.push({used_id: article_id, row_id: row_id});
        }
        localstorageInsert(used_articles, 'used');
        printPriceInSelectedRow(row_id, article_id);
        makeTableRows(localStorageGet('rows'));
        orderTotal();
    }
    else
    {
        let used_articles = localStorageGet('used') == null ? [] : localStorageGet('used');
        if(used_articles.length != 0){
            tmp_used_articles = [];
            for (let item of used_articles) {
                if(item.row_id != row_id){
                    tmp_used_articles.push(item);
                }
            }
            localstorageInsert(tmp_used_articles, 'used');
            printPriceInSelectedRow(row_id, article_id);
            makeTableRows(localStorageGet('rows'));
            orderTotal();
        }
    }
});

$("body").on("keyup change", ".quantity", function(){
    const row_id = $(this).data('id');
    const value = $(this).val();
    const article_id = $('.red-'+row_id).find('.column1').find('.one-article').val();
    printPriceInSelectedRow(row_id, article_id, value);
    orderTotal();
});

$("body").on("click", ".rmv", function(){
    const row_id = $(this).data('id');
    removeRow(row_id);
    orderTotal();
});

$("body").on("click", "#send", function(){
    sendToServer();
});

function insertArticles(){
    let currentArticles = localStorageGet('rows') != null ? localStorageGet('rows') : [];
    if(currentArticles.length == artices.length){
        return;
    }
    let row_id = 0;
    let used_ids = localStorageGet('used_ids') != null ? localStorageGet('used_ids') : [];
    if(used_ids.length != 0){
        row_id = used_ids.length+1;
        used_ids.push({used_id: row_id});
    }
    else{
        row_id = 1;
        used_ids.push({used_id: row_id});
    }
    
    localstorageInsert(used_ids, 'used_ids');

    let row = {
        row_id: row_id,
        selected_article: {
            id: null,
            price1: null,
            price2: null,
            quantity: null,
            used_in_row_with_id: row_id
        },
        artices: artices
    };

    currentArticles.push(row);
    localstorageInsert(currentArticles, 'rows');
    makeTableRows(currentArticles);
}

function localstorageInsert(items, place){
    localStorage.setItem(place, JSON.stringify(items));
}

function localStorageGet(place){
    return JSON.parse(localStorage.getItem(place));
}

function printPriceInSelectedRow(row_id, article_id, quantity = 1){
    const rows = localStorageGet('rows');
    const selector = $('.red-'+row_id);
    let artikal = null;
    for (let row of rows) {
        if(row.row_id == row_id){
            for (let article of row.artices) {
                if(article.id == article_id){
                    row.selected_article.id = article_id;
                    row.selected_article.quantity = quantity;
                    row.selected_article.price1 = article.price1;
                    row.selected_article.price2 = article.price2;
                    artikal = article;
                }

                if(article_id == 0){
                    row.selected_article.id = null;
                    row.selected_article.quantity = null;
                    row.selected_article.price1 = null;
                    row.selected_article.price2 = null;
                }
            }
        }
    }
    localstorageInsert(rows, 'rows');
    if(article_id != 0){
        selector.find('.column2').find('.quantity').val(quantity);
        selector.find('.column2').find('.quantity').prop('disabled', false);
        selector.find('.column3').html(quantity <= 10 ? '$'+artikal.price1 : '$'+artikal.price2);
        selector.find('.column4').html(quantity <= 10 ? '$'+artikal.price1*quantity : '$'+artikal.price2*quantity);
    }
    else{
        selector.find('.column2').find('.quantity').val('');
        selector.find('.column2').find('.quantity').prop('disabled', true);
        selector.find('.column3').html('');
        selector.find('.column4').html('');
    }
}

function removeRow(row_id){
    const currentArticles = localStorageGet('rows');
    const used_articles = localStorageGet('used');
    let new_currentArticles = [];
    let new_usedArticles = [];

    for (let item of currentArticles) {
        if(item.row_id != row_id){
            new_currentArticles.push(item);
        }
    }

    if(used_articles != null){
        for (let item of used_articles) {
            if(item.row_id != row_id){
                new_usedArticles.push(item);
            }
        }
    }

    localstorageInsert(new_currentArticles, 'rows');
    localstorageInsert(new_usedArticles, 'used');
    makeTableRows(new_currentArticles);
}

function orderTotal(){
    const currentArticles = localStorageGet('rows');
    let total = 0;
    if(currentArticles != null){
        for (let item of currentArticles) {
            let selected = item.selected_article;
            if(selected.id != null){
                if(selected.quantity <= 10){
                    total += selected.price1*selected.quantity;
                }
                else{
                    total += selected.price2*selected.quantity;
                }
            }
        }
        localstorageInsert({total: total}, 'ordertotal');
        $('#total').html('Order Total: $'+total);
    }
}

function sendToServer(){
    let currentArticles = localStorageGet('rows') != null ? localStorageGet('rows') : [];
    let array_to_server = [];
    for (let item of currentArticles) {
        let tmp_article = item.selected_article;
        if(tmp_article.id != null){
            array_to_server.push({
                id: tmp_article.id,
                quantity: tmp_article.quantity,
                total_price: tmp_article.quantity <= 10 ? tmp_article.price1*tmp_article.quantity : tmp_article.price2*tmp_article.quantity
            });
        } 
    }
    console.log(array_to_server);
    alert('Check console!');
}

const artices = 
[
    {
        "id": 1,
        "name": "Article1",
        "price1": 10,
        "price2": 12
    },
    {
        "id": 2,
        "name": "Article2",
        "price1": 20,
        "price2": 22
    },
    {
        "id": 3,
        "name": "Article3",
        "price1": 30,
        "price2": 32
    },
    {
        "id": 4,
        "name": "Article4",
        "price1": 40,
        "price2": 42
    },
    {
        "id": 5,
        "name": "Article5",
        "price1": 50,
        "price2": 52
    },
    {
        "id": 6,
        "name": "Article6",
        "price1": 60,
        "price2": 62
    }
];

function makeTableRows(rows, place = "#tbd"){
    const used_articles = localStorageGet('used');
    let html = '';
    rows.forEach(row => {
        let tmp_obj = row.selected_article;
        html += `
            <tr class="red-${row.row_id}">
                <td class="column1">
                <select class="form-control form-control-sm one-article" data-id="${row.row_id}"> 
                    <option value='0' ${tmp_obj.id == 0 ? 'selected' : ''}>Select Article</option>`;
                row.artices.forEach(article => {
                    if(tmp_obj.id != null && tmp_obj.id == article.id){
                        html += `<option value="${article.id}" selected>${article.name}</option>`;
                    }
                    else{
                        if(used_articles != null){
                            let used = used_articles.find(x => x.used_id == article.id);
                            //ako pronadje, ne crta
                            if(used == undefined){
                                html += `<option value="${article.id}">${article.name}</option>`;
                            } 
                        }else{
                            html += `<option value="${article.id}">${article.name}</option>`;
                        }
                    }
                });
        html += `</select>
            </td>
            <td class="column2"><input type="number" min="1" class="form-control quantity" data-id="${row.row_id}" value="${tmp_obj.quantity != null ? tmp_obj.quantity : ''}" ${tmp_obj.quantity != null ? '' : "disabled='disabled'"}></td>
            <td class="column3">${tmp_obj.price1 != null ? '$'+tmp_obj.price1 : ''}</td>`;
            if(tmp_obj.quantity != null){
                html += `<td class="column4">${tmp_obj.quantity <= 10 ? '$'+tmp_obj.price1*tmp_obj.quantity : '$'+tmp_obj.price1*tmp_obj.quantity}</td>`;
            }
            else{
                html += '<td class="column4"></td>';
            }
        html += `
            <td class="column6"><button type="button" class="btn btn-secondary rmv" data-id="${row.row_id}">Remove</button></td>
        </tr>`;
    });
    $(place).html(html);
}