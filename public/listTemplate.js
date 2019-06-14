(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['list'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = container.invokePartial(partials.createListItem,depth0,{"name":"createListItem","data":data,"indent":"              ","helpers":helpers,"partials":partials,"decorators":container.decorators})) != null ? stack1 : "");
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {});

  return "<article class=\"list\">\n  <div class=\"listContent\">\n    <p class=\"listName\">\n      "
    + container.escapeExpression(((helper = (helper = helpers.listName || (depth0 != null ? depth0.listName : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"listName","hash":{},"data":data}) : helper)))
    + "\n    </p>\n    <div class=\"makeList\">\n        <ul>\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.listItems : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n    <div class=\"newItemInsert\">\n        <div class=\"insertBody\">\n\n            <div class=\"newItemInsertBody\">\n                <label for=\"listItemInput\">New To-Do Item:</label>\n                <input type=\"text\" id=\"listItemInput\"></input>\n            </div>\n\n            <div class=\"newItemInsertButtons\">\n                <button type=\"button\" class=\"addTask\">Add Task</button>\n            </div>\n\n        </div>\n    </div>\n  </div>\n</article>\n";
},"usePartial":true,"useData":true});
})();