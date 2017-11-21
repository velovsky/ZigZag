function Node(id,parent_id)
{
	this.id = id;
	this.left = undefined;
	this.right = undefined;
	this.parent = parent_id;
}

function bst()
{
	this.root = undefined;
	
	this.addChild = function(value)
	{
		if(this.root === undefined) //root
		{
			this.root = new Node(value,undefined);
			return;
		}
		
		if(this.root.id === value) //no duplicates
			return;
		
		var tree_node = this.root; //point to root
		
		//dig in tree		
		while(true)
		{
			//left
			if(value < tree_node.id)
			{
				if(tree_node.left === undefined)
				{
					tree_node.left = new Node(value,tree_node.id);
					break;
				}
				else
					tree_node = tree_node.left; //point to left
			}
			else if(value > tree_node.id) //right
			{
				if(tree_node.right === undefined)
				{
					tree_node.right = new Node(value,tree_node.id);
					break;
				}
				else
					tree_node = tree_node.right; //point to right
			}
			else //no duplicates
			{
				break;
			}
		}
	};
	
	this.searchChild = function(value)
	{
		
		if(this.root.id === value)
			return this.root;
		
		var tree_node = this.root
		
		while(true)
		{
			//left
			if(value < tree_node.id)
			{
				if(tree_node.left === undefined) //end of the tree
					return null;
				else if(value === tree_node.left.id)
					return tree_node.left;
				else
					tree_node = tree_node.left; //go left
			}
			else if(value > tree_node.id) //right
			{
				if(tree_node.right === undefined) //end of the tree
					return null;
				else if(value === tree_node.right.id)
					return tree_node.right;
				else
					tree_node = tree_node.right; //go right
			}
		}
	};
	
	this.minimumChild = function(value) //minimum from starting node
	{
		var tree_node = this.searchChild(value);
		
		if(tree_node === null)
			return;
		
		var min = tree_node.id;
		while(true)
		{
			if(tree_node.left === undefined)
				return tree_node;
			else
			{
				min = tree_node.left.id;
				tree_node = tree_node.left;
			}
		}
	};
	
	this.deleteChild = function(value)
	{

		var tree_node = this.searchChild(value);
		
		if(tree_node === null)
			return;
				
		if(tree_node.left === undefined && tree_node.right === undefined) //is it a leaf?
		{
			var tree_node_parent = this.searchChild(tree_node.parent);
			if(tree_node.id < tree_node_parent.id)
				tree_node_parent.left = undefined;
			else
				tree_node_parent.right = undefined;
		}
		else if(tree_node.left !== undefined && tree_node.right === undefined) //one child and it is from left
		{
			//child
			tree_node.left.parent = tree_node.parent;
			
			//parent left or right
			var tree_node_parent = this.searchChild(tree_node.parent);
			if(tree_node.id < tree_node_parent.id)
				tree_node_parent.left = tree_node.left;
			else
				tree_node_parent.right = tree_node.left;
			
		}
		else if(tree_node.left === undefined && tree_node.right !== undefined) //one child and it is from right
		{
			//child
			tree_node.right.parent = tree_node.parent;
			
			//parent left or right
			var tree_node_parent = this.searchChild(tree_node.parent);
			if(tree_node.id < tree_node_parent.id)
				tree_node_parent.left = tree_node.right;
			else
				tree_node_parent.right = tree_node.right;
		}
		else //has two children
		{
			//node to be swapped (min of right branch)
			tree_node_child = this.minimumChild(tree_node.right.id)
			
			//erase leaf
			var tree_node_parent = this.searchChild(tree_node_child.parent);
			if(tree_node.id < tree_node_parent.id)
				tree_node_parent.left = undefined;
			else
				tree_node_parent.right = undefined;

			//transform parent
			tree_node.id = tree_node_child.id;
			if(tree_node.left !== undefined)
				tree_node.left.parent = tree_node.id;
			if(tree_node.right !== undefined)
			tree_node.right.parent = tree_node.id
		}
	}
}