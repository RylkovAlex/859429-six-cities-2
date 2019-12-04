import React, {useEffect} from "react";
import PropTypes from "prop-types";
import {
  reviewPropTypes,
  offerCardPropTypes
} from "../../prop-types/prop-types";
import {connect} from "react-redux";
import OffersList, {ListType} from "../offers-list/offers-list.jsx";
import ReviewsList from "../reviews-list/reviews-list.jsx";
import Header from "../header/header.jsx";
import ActionCreator, {
  Operation
} from "../../redux/actions/action-creator/action-creator";
import ReviewForm from "../review-form/review-form.jsx";
import {getNearbyCards, getMapConfig} from "../../redux/selectors/selectors";
import MapComponent from "../map-component/map-component.jsx";

const OfferPage = (props) => {
  const {
    reviews,
    offers,
    isAuthorized,
    changeActiveCard,
    postFavorite,
    isFetching,
    nearbyCards,
    loadReviews,
    isReviewsLoading,
    isReviewsLoadingError,
    activeCard
  } = props;
  const hotelId = +props.match.params.id;
  const card = offers.find((offer) => +offer.id === hotelId);
  const {
    id,
    images,
    title,
    isPremium,
    isFavorite,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description
  } = card;
  const ratingStyle = {
    width: `${rating * 20}%`
  };

  useEffect(() => {
    loadReviews(id);
  }, []);

  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((src, i) => {
                return (
                  <div
                    className="property__image-wrapper"
                    key={`property__image - ${i}`}
                  >
                    <img
                      className="property__image"
                      src={src}
                      alt="Photo studio"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              <div className="property__mark">
                {isPremium ? <span>Premium</span> : ``}
              </div>
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <button
                  className={`property__bookmark-button button ${
                    isFavorite ? `place-card__bookmark-button--active` : ``
                  }`}
                  type="button"
                  disabled={isFetching}
                  onClick={() => postFavorite(id, !isFavorite)}
                >
                  <svg
                    className="property__bookmark-icon place-card__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={ratingStyle}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good, i) => (
                    <li
                      className="property__inside-item"
                      key={`inside-item-${i}`}
                    >
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={`/${host.avatarUrl}`}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  <span className="property__user-status">
                    {host.isPro ? `Pro` : ``}
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              {/* ОТЗЫВЫ */}
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot; <span className="reviews__amount">1</span>
                </h2>
                {/* Список отзывов */}
                {isReviewsLoadingError && (
                  <p>
                    Connection problem, can`t load reviews! To try again refresh
                    page!
                  </p>
                )}
                {isReviewsLoading ? (
                  <p>Loading...</p>
                ) : (
                  <ReviewsList reviews={reviews} />
                )}
                {/* Форма для отправки нового отзыва */}
                {isAuthorized && <ReviewForm hotelId={hotelId} />}
              </section>
            </div>
          </div>
          {/* КАРТА */}
          <section className="property__map map">
            <MapComponent
              config={getMapConfig(nearbyCards)}
              activePointId={activeCard}
            />
          </section>
        </section>

        {/* Похожие */}
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <OffersList
              offerCards={nearbyCards}
              listType={ListType.NearbyList}
              handleCardHover={changeActiveCard}
              handleBookmarkClick={postFavorite}
            ></OffersList>
          </section>
        </div>
      </main>
    </div>
  );
};

OfferPage.propTypes = {
  activeCard: PropTypes.number.isRequired,
  offers: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)).isRequired,
  nearbyCards: PropTypes.arrayOf(PropTypes.shape(offerCardPropTypes)),
  reviews: PropTypes.arrayOf(PropTypes.shape(reviewPropTypes)),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  }).isRequired,
  changeActiveCard: PropTypes.func.isRequired,
  postFavorite: PropTypes.func.isRequired,
  loadReviews: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool,
  isReviewsLoading: PropTypes.bool.isRequired,
  isReviewsLoadingError: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool
};

export {OfferPage};

const mapStateToProps = (state, ownProps) =>
  Object.assign({}, ownProps, {
    activeCard: state.activeCard,
    nearbyCards: getNearbyCards(ownProps.match.params.id, state),
    offers: state.allOffers,
    reviews: state.reviews,
    isAuthorized: !!state.user,
    isReviewsLoading: state.isReviewsLoading,
    isReviewsLoadingError: state.isReviewsLoadingError,
    isFetching: state.isFetching,
    isFetchError: state.isFetchError
  });

const mapDispatchToProps = (dispatch) => ({
  changeActiveCard: (cardId) => dispatch(ActionCreator.changeActiveCard(cardId)),
  postFavorite: (cardId, status) =>
    dispatch(Operation.postFavorite(cardId, status)),
  loadReviews: (cardId) => dispatch(Operation.loadReviews(cardId))
});

export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);
