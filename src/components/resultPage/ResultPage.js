import React from 'react';
import { Tooltip } from './../../containers/containers';
import { connect } from 'react-redux';
import NotFound from './../notFound/NotFound';

const mapStateToProps= (state) => {
	return {
		isParamWrong: state.isParamWrong,
		isTooltipVisible: state.tooltip.isTooltipVisible
	}
}

const ResultPage = ({ children, isParamWrong, isTooltipVisible }) => {

	if (isParamWrong) {

		return <NotFound/>

	} else {
		return (
			
			<div className="Issues-wrap">
				{children}
				{isTooltipVisible ?
					<Tooltip /> : null
				}
			</div>
			
		)
	}
	
}

export default connect(mapStateToProps)(ResultPage)