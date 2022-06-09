import "./featuredInfo.css";
import React, {Component} from "react";
import {Link} from "react-router-dom";

class FeaturedInfoItem extends Component {
    render (){
        return (
            <div className="featuredItem">
                <Link to={this.props.linkTitulo} className="featuredTitle">
                    <span className="featuredTitle">{this.props.titulo}</span>
                </Link>
                <div className="featuredCantidadContainer">
                    <span className="featuredCantidad">{this.props.cantidad}</span>
                    {this.props.icon}
                </div>
                <Link to={this.props.linkInsert}>
                    <button className="featuredButtonInsert">Insert</button>
                    <button className="featuredButtonUpdate">Update</button>
                </Link>
            </div>
        )
    }
}

export default FeaturedInfoItem;