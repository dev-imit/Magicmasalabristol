import React from 'react';
import './Menu.css';

const Menu = () => {
  const menuItems = [
    { id: 1, name: 'Butter Chicken', price: '$12.99', image: '/masalamagic/dish1.jpg' },
    { id: 2, name: 'Biryani', price: '$10.99', image: '/masalamagic/dish2.jpg' },
    { id: 3, name: 'Paneer Tikka', price: '$9.99', image: '/masalamagic/dish3.jpg' },
    { id: 4, name: 'Naan Bread', price: '$3.99', image: '/masalamagic/dish4.jpg' },
    { id: 5, name: 'Dal Makhani', price: '$8.99', image: '/masalamagic/dish5.jpg' },
    { id: 6, name: 'Samosa', price: '$4.99', image: '/masalamagic/dish6.jpg' },
  ];

  return (
    <section id="menu" className="menu">
      <div className="menu-container">
        <h2>Our Menu</h2>
        <div className="menu-grid">
          {menuItems.map(item => (
            <div key={item.id} className="menu-item">
              <img src={item.image} alt={item.name} />
              <h3>{item.name}</h3>
              <p className="price">{item.price}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
