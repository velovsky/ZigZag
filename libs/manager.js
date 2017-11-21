var manager =
{
	init: function()
	{
		manager.bst = new bst();
		
		manager.bst.addChild(25);
		manager.bst.addChild(15);
		manager.bst.addChild(50);
		manager.bst.addChild(10);
		manager.bst.addChild(22);
		manager.bst.addChild(35);
		manager.bst.addChild(70);
		
		//ref inputs
		manager.input_search = $("#input_search")[0];
		manager.input_insert = $("#input_insert")[0];
		manager.input_delete = $("#input_delete")[0];
		
		//ref outputs
		manager.output_search = $("#output_search")[0];
		manager.output_insert = $("#output_insert")[0];
		manager.output_delete = $("#output_delete")[0];
		manager.output_zigzag = $("#output_zigzag")[0];
	},
	search: function()
	{
		var obj = manager.bst.searchChild(parseInt(manager.input_search.value));
		manager.output_search.innerHTML = JSON.stringify(obj);
	},
	insert: function()
	{
		manager.bst.addChild(parseInt(manager.input_insert.value));
		manager.output_insert.innerHTML = JSON.stringify(manager.bst.root);
	},
	delete: function()
	{
		manager.bst.deleteChild(parseInt(manager.input_delete.value));
		manager.output_delete.innerHTML = JSON.stringify(manager.bst.root);
	},
	main: function()
	{
		manager.zig = 0;
		manager.results = [];
		manager.zigzag(manager.bst.root,undefined);
		var output = manager.results.reduce(
			function(a,b)
			{
				if(a >= b)
					return a;
				else
					return b;
			}	
		);

		manager.output_zigzag.innerHTML = output;
	},
	zigzag: function(root,dir)
	{
		if(root === undefined) //leaf
			return 0;

		var right_depth = manager.zigzag(root.right,"right");

		//reset if root
		if(root.parent === undefined)
		{
			manager.results.push(manager.zig);
			manager.zig = 0;
		}

		var left_depth = manager.zigzag(root.left,"left");

		//reset if root
		if(root.parent === undefined)
		{
			manager.results.push(manager.zig);
			manager.zig = 0;
		}

		if(dir === "right" && left_depth > 0)
			manager.zig++;
		else if(dir === "left" && right_depth > 0)
			manager.zig++;

		return Math.max(right_depth,left_depth)+1;
	}
}


$( document ).ready(function() 
{
	manager.init();
});