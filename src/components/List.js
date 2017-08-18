import React from "react"

const List = (props) => {
	//console.log(props)
	const list = props.listItems.map((el, i) => (
		<li
			/*onClick={props.onListItemClick.bind(null, i)}*/
			style={{height:"35px"}}
			key={i}
		>
			<span
				style={
					el.done
					?{textDecoration:"line-through", fontSize:"20px"}
					:{textDecoration:"none", fontSize:"20px"}
				}
				onClick={props.onListItemClick.bind(null, i)}
				>
				{el.item}
			</span>
			{el.done? "已完成": ""}
			<button
				onClick={props.onDelteListItem.bind(null, i)}
				className="btn btn-danger pull-right"
			>
				X
			</button>
		</li>
	))

	/*return (
		<div>
			I'm a list
		</div>
	)*/
	return (
		<div>
			<ul>
				{
					list
				}
			</ul>
		</div>
	)
}

export default List

