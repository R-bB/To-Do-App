import React, { Component } from 'react';
import './Item.css';
import PropTypes from 'prop-types';

class Item extends Component{

    constructor(props){
        super(props);
        this.itemContent = props.itemContent;
        this.ItemId = props.itemeId;
    }

    render(props){
        return(
            <div>
                <p className="itemContent">{ this.itemContent }</p>
            </div>
        )
    }

}

Item.propTypes ={
    itemContent: PropTypes.string
}

export default Item;
