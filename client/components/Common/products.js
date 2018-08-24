import React, { Component } from 'react';
import { connect } from 'react-redux';

// Actions
import { setModal as setModalAction } from 'actions/Modals';

// Utils
import { cleanMapStateToProps } from 'utils/redux';

// Strings
import { PRODUCT_MODAL } from 'constants/modals';
import { ADD_A_PRODUCT } from 'copy/Components/modals';

// Components
import ContentSection from 'components/Layout/contentSection';
import TableHeader from 'components/Layout/tableHeader';
import TableContainer from 'components/Layout/tableContainer';
import LoadingOverlay from 'components/Common/loadingOverlay';

class Products extends Component {
  static getDerivedStateFromProps({ rulesLoading }) {
    return { rulesLoading };
  }

  constructor(props) {
    super(props);
    const { rulesLoading } = props;
    this.state = { rulesLoading };
  }

  render() {
    const { setModal } = this.props;
    const { rulesLoading } = this.state;

    return (
      <ContentSection>
        { rulesLoading && <LoadingOverlay /> }
        <section className="header-container">
          <header>
            <section
              className="btn-add-container"
              onClick={() => setModal(PRODUCT_MODAL)}
            >
              <div className="btn-add-product">
                <div className="circle" />
                <img src="/static/imgs/icon-add.png" alt={ADD_A_PRODUCT} />
              </div>
              <p>{ADD_A_PRODUCT}</p>
            </section>
          </header>
        </section>
        <section className="table-container">
          <TableHeader />
          <TableContainer />
        </section>
      </ContentSection>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  setModal: (...args) => dispatch(setModalAction(...args))
});

const mapStateToProps = cleanMapStateToProps([
  'rulesLoading'
]);

export const ProductsJest = Products;

export default connect(mapStateToProps, mapDispatchToProps)(Products);
