import React from "react"

import List from "./List"
import Input from "./Input"

class ToDoApp extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			newToDo: "",
			list:[{item:"thing1", done:false}, {item:"thing2", done:false}],
			inp:null
		}
	}
	onInputChange = (event) => {
		this.setState({newToDo: event.target.value, inp: event.target})
	}
	onInputSubmit = (event) => {
		event.preventDefault()
		let{newToDo, list, inp} = this.state
		this.setState((previousState) => ({
			newToDo: "",
			list: [...previousState.list, {item:previousState.newToDo, done:false}]
		}))
		inp.value = ""
	}
	/* 已完成 */
	onListItemClick = (i) => {
		//console.log(i)
		this.setState(previousState => ({
			newToDo: "",
			list: [
				...previousState.list.slice(0, i),
				Object.assign({}, previousState.list[i], {done: !previousState.list[i].done}),
				...previousState.list.slice(i+1)
				]
		}))
	}
	/* 删除 */
	onDelteListItem = (i) =>{
		this.setState(previousState => ({
			newToDo: "",
			list: [
				...previousState.list.slice(0, i),
				...previousState.list.slice(i+1)
				]
		}))
	}
	render() {
		let that = this
		return(
			/*<div>
				To Do App
			</div>*/

			<div className="row">
				<div className="col-md-10 col-md-offset-1">
					<div className="panel panel-default">
						<div className="panel-body">
							<h1> My To Do App</h1>
							<hr/>
							<Input
								value={that.state.value}
								onChange={that.onInputChange}
								onSubmit={that.onInputSubmit}
							/>
							/*list goes here*/
							<List
								onDelteListItem={that.onDelteListItem}
								onListItemClick={that.onListItemClick}
								listItems={this.state.list}
							/>

						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default ToDoApp






