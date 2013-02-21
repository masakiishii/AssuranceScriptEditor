var DNodeEditWindow = (function() {
    var self = this;
    var $select;
    var $desc;
    var onSuccess = function(node) {};
    var node = null;
    self.called = 0;

    function init() {
        $select = $('#edit select');
        $desc = $('#edit textarea');
        $select.children().remove();
        var children = DNode[parent.type].children;
        for (var i=0; i < children.length; i++) {
            var type = children[i].name;
            $('<option></option>')
                .attr('id', 'edit-option-' + type)
                .html(type)
                .appendTo($select);
        }
        $('#edit').css({
            left: ($(document).width() - $('#edit').width()) / 2,
            top: ($(document).height() - $('#edit').height()) / 2
        });
        /* FIXME(ide) adhoc fix*/
        $('#edit-ok').unbind();
        $('#edit-cancel').unbind();

        $('#edit-ok').click(function() {
            self.applyAndClose();
        });
        $('#edit-cancel').click(function() {
            self.close();
        });
    }

    this.applyAndClose = function() {
        var node = self.node;
        if (node != null) {
            node.text = $desc.attr('value');
        } else {
            var selected = $('#edit select option:selected').text();
            node = new DNode(-1, 'NewNode', selected, $desc.attr('value'));
        }
        self.close();
        self.onSuccess(node);
    };

    this.close = function() {
        $('#edit').hide();
    };

    this.open = function(node, parent, onSuccess) {
        self.onSuccess = onSuccess;
        self.node = node;
        self.parent = parent;
        init();
        var selectedType = DNode.NODE_TYPES[0];
        if (node != null) {
            selectedType = node.type;
            $select.attr('disabled', true);
            $desc.attr('value', node.text);
        } else {
            $select.attr('disabled', false);
            $desc.attr('value', '');
        }
        $('edit-option-' + selectedType).attr('selected', true);
        $('#edit').show();
    };

    return this;
}());
