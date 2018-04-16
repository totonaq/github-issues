import React, {Component} from 'react';
import placeholder from './placeholder.svg';
import organization from './organization.svg';
import './AuthorTooltip.css';
import PropTypes from 'prop-types';

class AuthorTooltip extends Component {
	componentDidMount() {
		this.props.getTooltipHeight(this.tooltip.clientHeight);
	}

	getRef(node) {
		this.tooltip = node;
	}

	render() {

		const divStyle = this.props.isBelow ? 
			{
				left: this.props.left,
				top: this.props.top
			} : 
			{
				left: this.props.left,
				bottom: this.props.bottom
			};

		const tooltipPlacement = this.props.isBelow ? 'tooltip-below' : 'tooltip-above';
		
		let companies;

		if (this.props.company) {

			companies = this.props.company.split(' ').filter(item => {
				return item[0] === '@';
			})
			.map((item, index, array) => {

				let separator;

				// only at the end standing comma aren't considered
				// as a part of the company name

				if (item.indexOf(',') !== -1) {
					item = item.slice(0, item.indexOf(','));
				}


				if (index === array.length - 2) {
					separator = ' and ';
				} else if (index === array.length - 1) {
					separator = '';
				} else {
					separator = ', ';
				}


				return (
					<span key={index}>
						<a
							href= {`https://github.com/${item.slice(1)}`}
							className='AuthorTooltip-company-title__link'>
							{` ${item.slice(1)}`}
						</a>
						<span>{separator}</span>
					</span>
				)
				
			})

		}
		
		return(
			<div
				ref={this.getRef.bind(this)}
				className={`AuthorTooltip ${tooltipPlacement}`}
				onMouseOut={this.props.onmouseout}
				style={divStyle} 
				onMouseOver={this.props.onmouseover}>

				<img width='60' height='60'
					className='AuthorTooltip__img'
					src={this.props.avatar}
					alt='avatar'
				/>

				<div className='AuthorTooltip-descr'>

					<div className='AuthorTooltip-descr-links'>
						
						<a
							href={this.props.userUrl}
							className='AuthorTooltip-descr-links__link_login'
							>{this.props.login}

						</a>

						{this.props.username &&
							<a
								href={this.props.userUrl}
								className='AuthorTooltip-descr-links__link_username'
								>{this.props.username}
							</a>
						}
						
					</div>

					{this.props.bio &&
						<p className='AuthorTooltip-descr-bio'>
							{this.props.bio}
						</p>
					}

					{this.props.location &&
						<div className='AuthorTooltip-descr-location'>
							<img
								className='AuthorTooltip-descr-location__placeholder'
								src={placeholder}
								alt='map' 
							/>{this.props.location}
						</div>
					}

				</div>
					{this.props.company && this.props.company[0] === '@' &&
						<div className='AuthorTooltip-company'>
							<img 
								src={organization} 
								className='AuthorTooltip-company__icon'
								alt='company'
							/>
							<span className='AuthorTooltip-company-title'>

								Member of 

								{companies}
								
							</span>
						</div>
					}
			</div>
		)
	}
}

AuthorTooltip.propTypes = {
	getTooltipHeight: PropTypes.func.isRequired,

	login: PropTypes.string.isRequired,
	userUrl: PropTypes.string.isRequired,
	avatar: PropTypes.string.isRequired,

	username: PropTypes.string,
	location: PropTypes.string,
	bio: PropTypes.string,
	company: PropTypes.string,

	left: PropTypes.string.isRequired,
	top: PropTypes.string.isRequired,
	bottom: PropTypes.string.isRequired,
	isBelow: PropTypes.bool.isRequired,

	onmouseout: PropTypes.func.isRequired,
	onmouseover: PropTypes.func.isRequired,
}

export default AuthorTooltip