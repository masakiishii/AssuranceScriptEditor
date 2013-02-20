var DCaseAPI = (function(url) {
    function DCaseAPI(url) {
        this.cgi = url;
    }
    DCaseAPI.call = function(method, params) {
        var cmd = {
            jsonrpc: '2.0',
            method: method,
            version: '1.0',
            params: params
        };
        var res = $.ajax({
            type: 'POST',
            url: DCaseAPI.cgi,
            async: false,
            data: JSON.stringify(cmd),
            dataType: 'json',
            error: function(req, stat, err) {
                //alert(stat);
            }
        });
        var resText = res.responseText;
        resText = resText.replace(/\n/g, ' \\n ');
        resText = resText.replace(/\t/g, '');
        try {
            var jres = JSON.parse(resText);
            return jres.result;
        } catch (e) {
        }
    };

    DCaseAPI.get = function(filter, id) {
        return this.call('get', { filter: filter, argument_id: id });
    };

    DCaseAPI.update = function(args) {
        return this.call('update', args);
    };

    DCaseAPI.insert = function(args) {
        return this.call('insert', args);
    };

    DCaseAPI.del = function(args) {
        return this.call('delete', args);
    };

    DCaseAPI.commit = function(msg) {
        return this.call('commit', { message: msg });
    };

    DCaseAPI.search = function(args) {
        return this.call('FindNodeByDescription', args);
    };

    return DCaseAPI;
})(CONFIG.cgi_url);
