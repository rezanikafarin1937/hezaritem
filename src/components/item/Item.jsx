import {PureComponent} from 'react';
import { Link } from 'react-router-dom';
import './item.scss';

class Item extends PureComponent{
    render(){
        return(
            <Link to={`/products/${this.props.data.id}`} className='item'>
                <div className='item__ratio'></div>
                <div className='item__text'>
                    <div className='item__text--title'>{this.props.data.title}</div>
                    <div className='item__text--description'>{this.props.data.description}</div>
                </div>
                <div className='item__image' style={ {backgroundImage : `url(${this.props.data.image})`} }></div>
            </Link>
        )
    }
}

export default Item;