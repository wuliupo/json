var app = new Vue({
    el: '#api-data',
    data: {
        api: {}
    }
});
var applist = new Vue({
    el: '#list-data',
    data: {
        list: [],
        selected: 0,
    },
    methods: {
        load: function (index) {
            this.selected = index;
            loadService(index);
        }
    }

});


loadServiceList();

function loadService(index){
    $.get('./api/service.json?id='+applist.list[index].id, function(response){
        response.paramNote = JSON.parse(response.paramNote);
        response.resultNote = JSON.parse(response.resultNote);
        app.api = response;
        var param_html = new JSONFormat(response.param,4).toString();
        var result_html = new JSONFormat(response.result,4).toString();
        $('#param').html(param_html);
        $('#result').html(result_html);
    });
}
function loadServiceList(){
    $.get('./api/services.json',function(response){
        applist.list = response;
        loadService(applist.selected);
    });
}
var navigation = responsiveNav("#nav");
