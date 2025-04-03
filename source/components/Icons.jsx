import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active, white }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../assets/nav/1.png');
      active && iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../assets/nav/2.png');
      active && iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../assets/nav/3.png');
      active && iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../assets/nav/4.png');
      active && iconStyle.push(styles.active);
      break;
    case '5':
      imageSource = require('../assets/nav/5.png');
      active && iconStyle.push(styles.active);
      break;
    case 'back':
      imageSource = require('../assets/icons/back.png');
      white && iconStyle.push(styles.white);
      break;
    case 'photo':
      imageSource = require('../assets/icons/photo.png');
      white && iconStyle.push(styles.white);
      break;
    case 'heart':
      imageSource = require('../assets/icons/heart.png');
      break;
    case 'fav':
      imageSource = require('../assets/icons/fav.png');
      break;
    case 'fav-no':
      imageSource = require('../assets/icons/fav-no.png');
      break;
    case 'map':
      imageSource = require('../assets/icons/map.png');
      break;
    case 'plus':
      imageSource = require('../assets/icons/plus.png');
      break;
    case 'mini-star':
      imageSource = require('../assets/icons/mini-star.png');
      break;
    case 'star':
      imageSource = require('../assets/icons/star.png');
      break;
    case 'star-filled':
      imageSource = require('../assets/icons/star-filled.png');
      break;
    case 'save':
      imageSource = require('../assets/icons/save.png');
      break;
    case 'saved':
      imageSource = require('../assets/icons/saved.png');
      break;
  }

  return (
    <Image 
      source={imageSource} 
      style={iconStyle} 
    />
  );
};

const styles = StyleSheet.create({

  icon: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },

  active: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#000',
  },

  white: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    tintColor: '#fff',
  }

});

export default Icons;
