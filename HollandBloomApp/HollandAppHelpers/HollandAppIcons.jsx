import React from 'react';
import { Image, StyleSheet } from 'react-native';

const Icons = ({ type, active, white }) => {

  let imageSource;
  let iconStyle = [styles.icon];

  switch (type) {
    case '1':
      imageSource = require('../HollandBloomAssets/nav/1.png');
      active && iconStyle.push(styles.active);
      break;
    case '2':
      imageSource = require('../HollandBloomAssets/nav/2.png');
      active && iconStyle.push(styles.active);
      break;
    case '3':
      imageSource = require('../HollandBloomAssets/nav/3.png');
      active && iconStyle.push(styles.active);
      break;
    case '4':
      imageSource = require('../HollandBloomAssets/nav/4.png');
      active && iconStyle.push(styles.active);
      break;
    case '5':
      imageSource = require('../HollandBloomAssets/nav/5.png');
      active && iconStyle.push(styles.active);
      break;
    case 'back':
      imageSource = require('../HollandBloomAssets/icons/back.png');
      white && iconStyle.push(styles.white);
      break;
    case 'photo':
      imageSource = require('../HollandBloomAssets/icons/photo.png');
      white && iconStyle.push(styles.white);
      break;
    case 'heart':
      imageSource = require('../HollandBloomAssets/icons/heart.png');
      break;
    case 'fav':
      imageSource = require('../HollandBloomAssets/icons/fav.png');
      break;
    case 'fav-no':
      imageSource = require('../HollandBloomAssets/icons/fav-no.png');
      break;
    case 'map':
      imageSource = require('../HollandBloomAssets/icons/map.png');
      break;
    case 'plus':
      imageSource = require('../HollandBloomAssets/icons/plus.png');
      break;
    case 'mini-star':
      imageSource = require('../HollandBloomAssets/icons/mini-star.png');
      break;
    case 'star':
      imageSource = require('../HollandBloomAssets/icons/star.png');
      break;
    case 'star-filled':
      imageSource = require('../HollandBloomAssets/icons/star-filled.png');
      break;
    case 'save':
      imageSource = require('../HollandBloomAssets/icons/save.png');
      break;
    case 'saved':
      imageSource = require('../HollandBloomAssets/icons/saved.png');
      break;
    case 'favorite':
      imageSource = require('../HollandBloomAssets/icons/favorite.png');
      break;
    case 'menu':
      imageSource = require('../HollandBloomAssets/icons/menu.png');
      break;
    case 'isFavorite':
      imageSource = require('../HollandBloomAssets/icons/isFavorite.png');
      break;
    case 'restart':
      imageSource = require('../HollandBloomAssets/icons/restart.png');
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
