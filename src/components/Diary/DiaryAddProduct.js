import DiaryStyled from "./DiaryAddProductStyled";
import PlusIcon from "../icons/PlusIcon";
import {
  searchProductOperation,
  addNewProductOperation,
  getCurentDayInfoOperation,
} from "../../redux/operations/diaryOperations";
import { resetList } from "../../redux/actions/diaryActions";
import React, { Component } from "react";
import { connect } from "react-redux";
import { debounce } from "lodash";
import FilterList from "./FilterList";
import DiaryCalendar from "./DiaryCalendar";
import back from "../modal/svg/icon-back.svg";

const initialState = {
  product: "",
  weight: "",
  productId: "",
  date: "",
  render: false,
  inputValue: "",
};

class DiaryAddProduct extends Component {
  state = {
    ...initialState,
  };

  submitDiaryAddProduct = (event) => {
    event.preventDefault();
    if (this.state.productId && this.state.weight) {
      this.props.addNewProductOperation({
        date: this.state.date,
        productId: this.state.productId,
        weight: Number(this.state.weight),
      });
      this.setState({ ...initialState });
      return;
    }
    this.handleClick();
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.inputValue === this.state.inputValue) {
      return;
    } else {
      if (this.state.inputValue.legth < 2) {
        return;
      }
      this.props.searchProductOperation(this.state.inputValue);
    }
  }

  inputHandlerDiaryAddProduct = (e) => {
    this.setState({ inputValue: e.target.value });
  };
  inputHandlerDiaryAddGramm = (e) => {
    this.setState({ weight: e.target.value });
  };

  filterList = () => {
    return this.props.productVariables
      .map(({ title, _id }) => {
        return { title: title.ru, id: _id };
      })
      .filter((prod, index) => (index <= 9 ? true : false));
  };

  filterListClickLi = (event) => {
    const inputV = this.props.productVariables.find(
      (item) => item._id == event.target.dataset.id
    );
    this.setState((prev) => ({
      ...prev,
      productId: event.target.dataset.id,
      inputValue: inputV.title.ru,
    }));
    this.props.resetList();
  };

  setSelectedData = (date) => {
    this.setState((prev) => ({ ...prev, date: date }));
  };

  handleClick = () => {
    this.setState((prevState) => {
      return { render: !prevState.render };
    });
  };

  render() {
    const filterList = this.filterList();
    if (this.props.mobile) {
      return (
        <DiaryStyled>
          <DiaryCalendar
            setSelectedData={this.setSelectedData}
            getCurentDayInfoOperation={this.props.getCurentDayInfoOperation}
          />
          <div className="triggerButtonWrapper">
            <button
              type="button"
              onClick={this.handleClick}
              className="triggerButton"
            >
              +
            </button>
          </div>
          {this.state.render ? (
            <div className="modal">
              <div className="buttonWrapper">
                <button
                  onClick={this.handleClick}
                  type="button"
                  className="closeModal"
                >
                  <img src={back} alt="back-arrow" />
                </button>
              </div>
              <>
                {/* ================================================================ */}
                <form
                  className="form_add"
                  onSubmit={this.submitDiaryAddProduct}
                >
                  <input
                    className="input_add-product"
                    placeholder="Введите название продукта"
                    name="inputValue"
                    value={this.state.inputValue}
                    onChange={this.inputHandlerDiaryAddProduct}
                  />
                  {filterList.length > 0 && (
                    <FilterList
                      list={filterList}
                      handleClickLi={this.filterListClickLi}
                    />
                  )}
                  <input
                    className="input_add-gramm"
                    placeholder="Грамм"
                    value={this.state.weight}
                    onChange={this.inputHandlerDiaryAddGramm}
                  />
                  {window.innerWidth < 768 ? (
                    <button className="button svg-add" type="submit">
                      Добавить
                    </button>
                  ) : (
                    <button className="button svg-add" type="submit">
                      <PlusIcon width="14" height="14" fill="white" />
                    </button>
                  )}
                </form>
              </>
            </div>
          ) : null}
        </DiaryStyled>
      );
    } else {
      return (
        <DiaryStyled>
          <DiaryCalendar
            setSelectedData={this.setSelectedData}
            getCurentDayInfoOperation={this.props.getCurentDayInfoOperation}
          />
          <form className="form_add" onSubmit={this.submitDiaryAddProduct}>
            <input
              className="input_add-product"
              placeholder="Введите название продукта"
              name="inputValue"
              value={this.state.inputValue}
              onChange={this.inputHandlerDiaryAddProduct}
            />
            {filterList.length > 0 && (
              <FilterList
                list={filterList}
                handleClickLi={this.filterListClickLi}
              />
            )}

            <input
              className="input_add-gramm"
              placeholder="Грамм"
              value={this.state.weight}
              onChange={this.inputHandlerDiaryAddGramm}
            />
            {window.innerWidth < 768 ? (
              <button className="button svg-add" type="submit">
                Добавить
              </button>
            ) : (
              <button className="button svg-add" type="submit">
                <PlusIcon width="14" height="14" fill="white" />
              </button>
            )}
          </form>
        </DiaryStyled>
      );
    }
  }
}

const mapStateToPtops = (state) => ({
  productVariables: state.userDiary.user.productsFound,
});
const mapDispatchToProps = (dispatch) => ({
  searchProductOperation: (query) => dispatch(searchProductOperation(query)),
  addNewProductOperation: (product) =>
    dispatch(addNewProductOperation(product)),
  getCurentDayInfoOperation: (date) =>
    dispatch(getCurentDayInfoOperation(date)),
  resetList: () => dispatch(resetList()),
});
export default connect(mapStateToPtops, mapDispatchToProps)(DiaryAddProduct);

// import DiaryStyled from './DiaryAddProductStyled'
// import PlusIcon from "../icons/PlusIcon"
// import { searchProductOperation, addNewProductOperation, getCurentDayInfoOperation } from "../../redux/operations/diaryOperations"
// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import debounce from 'lodash.debounce'
// import FilterList from './FilterList'
// import DiaryCalendar from './DiaryCalendar'
// import { toggleModal } from "../../redux/actions/calcAction"
// //import Modal from "../modal/Modal"

// class DiaryAddProduct extends Component {
//     state = {
//         product: "",
//         weight: "",
//         productId: "",
//         date: "",
//         windowInnerWidth: window.innerWidth,
//     }

//     submitDiaryAddProduct = event => {
//         event.preventDefault();
//         if (this.state.productId && this.state.weight) {
//             this.props.addNewProductOperation({
//                 date: this.state.date, productId: this.state.productId,
//                 weight: this.state.weight
//             });
//         }
//         if (this.state.windowInnerWidth <= 767) {
//             this.props.toggleModal()
//         }
//     }

//     inputHandlerDiaryAddProduct = ({ target }) => {

//         if (target.value === "") {
//             return
//         }
//         this.props.searchProductOperation(target.value);
//     }
//     inputHandlerDiaryAddGramm = (event) => {
//         this.setState((prev) => ({ ...prev, weight: event.target.value }))
//     }

//     filterList = () => {
//     return this.props.productVariables.map(({ title, _id }) => { return {title: title.ru , id: _id}})
//             .filter((prod, index) => index <= 9 ? true : false)
//     }

//     filterListClickLi = event => {
//        this.setState((prev) => ({...prev, productId: event.target.dataset.id }))
//     }

//     setSelectedData = (date) => {
//         this.setState((prev) => ({...prev, date: date }))
//     }

//     // componentDidUpdate() {
//     //     console.log(this.state);
//     // }

//     render() {
//         const filterList = this.filterList()
//         console.log(this.state.windowInnerWidth);
//         const { windowInnerWidth } = this.state;

//         return (
//             <DiaryStyled>
//                 <DiaryCalendar setSelectedData={this.setSelectedData} getCurentDayInfoOperation={this.props.getCurentDayInfoOperation} />
//                 <form className="form_add" onSubmit={this.submitDiaryAddProduct} >
//                     {/* <Modal>

//                     </Modal> */}
//                     <input className="input_add-product" placeholder="Введите название продукта" onChange={debounce(this.inputHandlerDiaryAddProduct, 500)} />
//                     {filterList.length > 0 && <FilterList list={filterList} handleClickLi={this.filterListClickLi} />}
//                         <input className="input_add-gramm" placeholder="Грамм" onChange={this.inputHandlerDiaryAddGramm} />
//                     {windowInnerWidth >= 768 ? <button className="button" type="submit" className="svg-add" ><PlusIcon width="14" height="14" fill="white" /></button> :
//                             <button className="button" type="submit">Добавить</button>}

//                 </form>
//             </DiaryStyled>
//         )
//     }
// }
// const mapStateToPtops = (state) => ({
//     productVariables: state.userDiary.user.productsFound,
// })

// const mapDispatchToProps = (dispatch) => ({
//     searchProductOperation: query => dispatch(searchProductOperation(query)),
//     addNewProductOperation: product => dispatch(addNewProductOperation(product)),
//     getCurentDayInfoOperation: date => dispatch(getCurentDayInfoOperation(date)),
//     toggleModal: () => dispatch(toggleModal())
// })

// export default connect(mapStateToPtops, mapDispatchToProps)(DiaryAddProduct);
