import React, { Component } from 'react';
import ListItem from './listItem/ListItem';
import AuthorTooltip from './authorTooltip/AuthorTooltip';
import './List.css';
import PropTypes from 'prop-types';

class List extends Component {

	constructor(props) {
		super(props);

		this.state = {
			tooltipId: null,
			isTooltipVisible: false,
			isTooltipBelow: false,
			
			left: 0,
			top: 0,
			bottom: 0,

			userName: '',
			location: '',
			bio: '',
			company: ''
		};

		this.timeMouseOut = null;
		this.timeMouseOver = null;

		// this property is necessary to calculate the
		// tooltip position (above or below)
		this.yOffsetOfTooltipTarget = 0;

		this.getTooltipPosition = this.getTooltipPosition.bind(this);
		this.getUserData = this.getUserData.bind(this);
		this.setTooltipRelativePosition = this.setTooltipRelativePosition.bind(this);
		this.onTooltipMouseOut = this.onTooltipMouseOut.bind(this);
		this.onTooltipMouseOver = this.onTooltipMouseOver.bind(this);
		this.onTooltipMouseOut = this.onTooltipMouseOut.bind(this);

	}

	getRef(node) {
		this.ul = node;
	}

	onListMouseOver(e) {

		if (e.target.closest('li')) {

			let siblings = [].slice.call(this.ul.children, 0);

			siblings.forEach(item => {
				item.classList.remove('gray');
			});
		
			e.target.closest('li').classList.add('gray');

		}

	}

	onTooltipMouseOver(target) {
		// if only .ListItem-content-data_author is being hovered
		if (target.dataset) {
			this.setState({ tooltipId: target.dataset.id });
		}
		//

		clearTimeout(this.timeMouseOut);

		this.timeMouseOver = setTimeout(() => {
			this.setState({
				isTooltipVisible: true 
			});
		}, 50);
		
	}

	onTooltipMouseOut() {
	
		clearTimeout(this.timeMouseOver);

		this.timeMouseOut = setTimeout(() => {
			this.setState({
				isTooltipVisible: false
			});
		}, 50);
	
	}

	getTooltipPosition(data) {
		this.yOffsetOfTooltipTarget = data.yOffset;
		this.setState({
			left: data.left,
			top: data.top,
			bottom: data.bottom
		});
	}

	getUserData(data) {
		this.setState({
			userName: data.userName,
  		location: data.location,
  		bio: data.bio,
  		company: data.company
		});
	}

	setTooltipRelativePosition(height) {

		let isTooltipBelow = height >= 
			this.yOffsetOfTooltipTarget ? true : false;

		this.setState({ isTooltipBelow });
	}

	getCurrentTooltipInfo(id) {
		let info = this.props.listOfIssues.filter(item => {
			return item.id === Number(id);
		});

		return info[0];
	}

	render() {
		
		const tooltipInfo = this.getCurrentTooltipInfo(this.state.tooltipId);
	
		return(
			<div>
				<ul
					className='List'
					ref={this.getRef.bind(this)}
					onMouseOver={(e) => this.onListMouseOver(e)}>

					{this.props.listOfIssues.map(issue => {
						return(
							<ListItem
								key={issue.id}
								id={issue.id}
								user={issue.user.login}
								title={issue.title}
								issueUrl={issue.html_url}
								number={issue.number}
								date={issue.created_at}

								getTooltipPosition={this.getTooltipPosition}
								getUserData={this.getUserData}
								onmouseover={this.onTooltipMouseOver}
								onmouseout={this.onTooltipMouseOut}
								
							/>
						)})
					}
				</ul>

				{this.state.isTooltipVisible && 
					<AuthorTooltip
						setTooltipRelativePosition={this.setTooltipRelativePosition}

						login={tooltipInfo.user.login}
						userUrl={tooltipInfo.user.html_url}
						avatar={tooltipInfo.user.avatar_url}
						username={this.state.userName}
						location={this.state.location}
						bio={this.state.bio}
						company={this.state.company}
					
						left={this.state.left}
						top={this.state.top}
						bottom={this.state.bottom}
						isBelow={this.state.isTooltipBelow}
						onmouseover={this.onTooltipMouseOver}
						onmouseout={this.onTooltipMouseOut}
						
					/> 
				}

			</div>
		)
	}
}

List.propTypes = {
	listOfIssues: PropTypes.array.isRequired
}

export default List