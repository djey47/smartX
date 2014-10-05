'use strict';

//noinspection JSUnresolvedVariable,JSUnresolvedFunction
define([	'jquery',
			'knockout',
            '../../../assets/js/views/style.js'
		], function ($, ko, Style) {

	//noinspection JSUnresolvedFunction,JSUnresolvedVariable
	return {
	    currentDisk: ko.observable({model: ''}),

	    items: ko.observableArray([]),

    	get: function(disk) {
            var SmartDetailsViewModel = this;

            SmartDetailsViewModel.currentDisk(disk);

			if (disk.smart != null) {
				$.each(disk.smart.items, function(index, item){
                    SmartDetailsViewModel.items.push(item);
				});
			}
    	},

        // Called from binding: computed
        status_css_class: function(status) {
            return Style.getStatusLabelCssClass(status);
        },

        // Called from binding: computed
        status_label_text: function(status) {
            return Style.getStatusLabelText(status);
        }
	};
});