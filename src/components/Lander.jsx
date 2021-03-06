import React, { Component } from 'react'
import '../assets/sass/components/Lander.scss'
import { connect } from 'react-redux'
import { updateSession } from '../redux/reducers/userReducer';
import Navbar from './Navbar'
import ProductCard from './ProductCard'
import { Link } from 'react-router-dom'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import Axios from 'axios';

class Lander extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      login: props.login
    }
  }

  componentDidMount() {
    this.getProducts()
    Axios.get('/api/user')
    .then(res => {
      this.props.updateSession(res.data)
    })
    .catch(err => console.log(err))
    console.log(this.state.login)
  }

  getProducts = () => {
    Axios
      .get('/api/all-products')
      .then(res => { 
        this.setState({ products: res.data }) 
        console.log() 
      })
      .catch(err => console.log(err))
  }

  setFavorite = () => {
    
  }

  saveFavorite = () => {
    Axios
      .post('/api/add-favorite')
      .then(res => {})
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <Navbar />
        <header>
          <div className="header-links">
            <Link to=''>Cars & trucks</Link>
            <Link to=''>Furniture</Link>
            <Link to=''>Appliances</Link>
            <Link to=''>Games & Toys</Link>
            <Link to=''>Clothing & shoes</Link>
            <DropdownButton
              variant="none"
              alignRight
              title="More"
              id="dropdown-menu-align-right"
            >
              <Dropdown.Item eventKey="2">Cars & Trucks</Dropdown.Item>
              <Dropdown.Item eventKey="1">Tools & Machinery</Dropdown.Item>
              <Dropdown.Item eventKey="3">Sports & Outdoors</Dropdown.Item>
            </DropdownButton>
          </div>
        </header>
        <div className="container">
          <div className="product-wrap">
            <div className="card-container">
              {this.state.products.map((product) =>
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  saveFavorite={this.saveFavorite} 
                  // favorite={favorite} 
                  // setFavorite={setFavorite} 
                />
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    login: reduxState.userReducer.login
  }
}

export default connect(mapStateToProps, { updateSession })(Lander);