import React from 'react';
import PropTypes from 'prop-types';

// TODO: пока не понял зачем вообще нужен этот компонент если его можно заменить обычным div с нужным классом, но в заданиях требовалось создать...ещё в module4-task2 предлагают переиспользовать компоненты карточек и списка на другой странице - я вроде так и сделал, но не знаю правильно ли - мб имелось в виду что-то другое, использовать композицию, например... но тогда как? Изначально у меня этот OffersList рендерил внутри себя карточки, но тогда с переиспользованием получались сложности из-за того что надо классами манипулировать - я переделал просто на возврат props.children чтоб все нужные свойства карточкам в родетеле передавать, а не через этот компонент.

const OffersList = (props) => {
  const {className} = props;
  return (
    <div className={className}>
      {props.children}
    </div>
  );
};

OffersList.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export default OffersList;
