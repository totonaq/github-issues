import React, {Component} from 'react';
import placeholder from './placeholder.svg';
import organization from './organization.svg';
import './AuthorTooltip.css';
import PropTypes from 'prop-types';

class AuthorTooltip extends Component {
	
	componentDidMount() {
		this.props.setTooltipRelativePosition(this.tooltip.clientHeight);
	}

	getRef(node) {
		this.tooltip = node;
	}

	render() {

		const { 
			onTooltipMouseOver, 
			onTooltipMouseOut, 
			isTooltipBelow, 
			top, 
			bottom, 
			left, 
			data } = this.props;

		const { login, name, html_url, avatar_url, location, bio, company } = data;

		const divStyle = isTooltipBelow ? 
			{
				left,
				top
			} : 
			{
				left,
				bottom
			};

		const tooltipPlacement = isTooltipBelow ? 'tooltip-below' : 'tooltip-above';
		
		let companies = [];

		if (company) {

			companies = company.split(' ').filter(item => {
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
							{`${item.slice(1)}`}
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
				onMouseOver={onTooltipMouseOver}
				onMouseOut={onTooltipMouseOut}
				style={divStyle}>
				
				<img width='60' height='60'
					className='AuthorTooltip__img'
					src={avatar_url}
					alt='avatar'
				/>

				<div className='AuthorTooltip-descr'>

					<div className='AuthorTooltip-descr-links'>
						
						<a
							href={html_url}
							className='AuthorTooltip-descr-links__link_login'
							>{login}

						</a>

						{name &&
							<a
								href={html_url}
								className='AuthorTooltip-descr-links__link_username'
								>{name}
							</a>
						}
						
					</div>

					{bio &&
						<p className='AuthorTooltip-descr-bio'>
							{bio}
						</p>
					}

					{location &&
						<div className='AuthorTooltip-descr-location'>
							<img
								className='AuthorTooltip-descr-location__placeholder'
								src={placeholder}
								alt='map' 
							/>{location}
						</div>
					}

				</div>
					{company && company[0] === '@' &&
						<div className='AuthorTooltip-company'>
							<img 
								src={organization} 
								className='AuthorTooltip-company__icon'
								alt='company'
							/>
							<span className='AuthorTooltip-company-title'>

								Member of {companies}

							</span>
						</div>
					}
			</div>
		)
	}
}

AuthorTooltip.propTypes = {
	data: PropTypes.object.isRequired,
	left: PropTypes.string.isRequired,
	top: PropTypes.string.isRequired,
	bottom: PropTypes.string.isRequired,
	isTooltipBelow: PropTypes.bool.isRequired,

	setTooltipRelativePosition: PropTypes.func.isRequired,
	onTooltipMouseOver: PropTypes.func.isRequired,
	onTooltipMouseOut: PropTypes.func.isRequired,
}

export default AuthorTooltip