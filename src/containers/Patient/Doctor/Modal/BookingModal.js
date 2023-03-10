import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./BookingModal.scss";
import moment from "moment";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import ProfileDoctor from "../ProfileDoctor";
import _ from "lodash";
import {
  postPatientAppoiment,
  postBanking,
  getDetailInfoDoctor,
  getAllCodeService,
} from "../../../../services/userService";
import DatePicker from "../../../../components/Input/DatePicker";
import * as actions from "../../../../store/actions";
import { LANGUAGES } from "../../../../utils";
import { toast } from "react-toastify";
import LoadingOverlay from "react-loading-overlay";
class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      phoneNumber: "",
      email: "",
      address: "",
      reason: "",
      birthday: '',
      genders: "",
      doctorId: "",
      selectedGender: "",
      timeType: "",
      isShowLoading: false,
      dataPayment: [],
    };
  }

  async componentDidMount() {
    this.props.getGenders();

    await this.getallpayment();
  }

  getallpayment = async () => {
    let response = await getAllCodeService("PAYMENT");
    if (response && response.errCode === 0) {
      this.setState({
        dataPayment: response.data,
      });
    }
    console.log("check data pay ment 1233", response);
  };
  disableDates = () => {
    var today, dd, mm, yyyy;
    today = new Date();
    dd = today.getDate() + 1;
    mm = today.getMonth() + 1;
    yyyy = today.getFullYear();
    return yyyy + "-" + mm + "-" + dd;
  };
  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;
    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }
    if (this.props.dataTime !== prevProps.dataTime) {
      if (this.props.dataTime && !_.isEmpty(this.props.dataTime)) {
        let doctorId = this.props.dataTime.doctorId;
        let timeType = this.props.dataTime.timeType;
        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };
    stateCopy[id] = valueInput;
    this.setState({
      ...stateCopy,
    });
  };
  handleOnchangeDatePiker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };
  handleChangeSelect = (selectedOption) => {
    this.setState({
      selectedGender: selectedOption,
    });
  };
  handleChangeSelectPhuongThucKham = (selectedOption) => {
    this.setState({
      phuongThucKham: selectedOption.value,
    });
  };

  buildDataBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === LANGUAGES.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;
      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format("dddd - DD/MM/YYYY")
          : moment
              .unix(+dataTime.date / 1000)
              .locale("en")
              .format("ddd - MM/DD/YYYY");

      return `${time}-${date}`;
    }
    return "";
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName}${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName}${dataTime.doctorData.lastName}`;
      return name;
    }
    return "";
  };

  // handlePayBooking =  async () => {

  //   let res = await postBanking({
  //   });
  //   console.log("res", res);
  //   this.setState({
  //     isShowLoading: false,
  //   });

  // };

  handleDoctorInfo = async () => {
    console.log("thanh toan dien tu")
    let data = {};
    data.amount = 350000;
    data.orderInfo = "test create payment 350.000 VND";
    let res = await postBanking(data);
    console.log("res", res);
    this.setState({
      isShowLoading: false,
    });
  };

  handleConfirmBooking = async () => {
    console.log("check confirm", this.state);
    this.setState({
      isShowLoading: true,
    });
    // !data.email || !data.doctorId || !data.timeType || !data.date
    let date = new Date(this.state.birthday).getTime();
    let timeString = this.buildDataBooking(this.props.dataTime);
    let doctorName = this.buildDoctorName(this.props.dataTime);

    let res = await postPatientAppoiment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: this.props.dataTime.date,
      birthday: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
      firstName: this.state.phuongThucKham,
    });

    console.log("res", res);
    this.setState({
      isShowLoading: false,
    });
    if (res && res.errCode === 0) {
      toast.success("Bookign a new appoiment succedd");
      this.props.closeBookingClose();
    } else {
      toast.error("Bookign a new appoiment error");
    }
  };

  render() {
    let { isOpenModal, closeBookingClose, dataTime, dataProfileprop } =
      this.props;
    console.log("check data thanh toan", dataProfileprop);
    console.log("check prop bookign modal", this.props);
    console.log("asdsadasdasd", this.state.dataPayment);
    let yesterday = new Date(new Date().setTime());
    let doctorId = "";
    if (dataTime && !_.isEmpty(dataTime)) {
      doctorId = dataTime.doctorId;
    }
    const optionsPayMent = [
      { value: "Ti???n M???t", label: "Ti???n M???t" },
      { value: "Thanh To??n ??i???n T???", label: "Thanh To??n ??i???n T???" },
    ];

    const optionsExamination = [
      { value: "G???p Tr???c Ti???p", label: "G???p Tr???c Ti???p" },
      { value: "Kh??m T??? Xa", label: "Kh??m T??? Xa" },
    ];

    // fullName: '',
    //     phoneNumber: '',
    //         email: '',
    //             address: '',
    //                 reason: '',
    //                     birthday: '',
    //                         gender: '',
    //                             doctorId: ''
    return (
      <>
        <LoadingOverlay
          active={this.state.isShowLoading}
          spinner
          text="Loading..."
        >
          <Modal
            isOpen={isOpenModal}
            // toggle={}
            className={"booking-modal-container"}
            size="lg"
            centered
            // backdrop={true}
          >
            <div className="booking-modal-content">
              <div className="booking-modal-header">
                <span className="left">
                  <FormattedMessage id={"patient.booking-modal.title"} />
                </span>
                <span className="right" onClick={closeBookingClose}>
                  <i className="fas fa-times"></i>
                </span>
              </div>
              <div className="booking-modal-body">
                {/* {JSON.stringify(dataTime)} */}
                <div className="doctor-infor">
                  <ProfileDoctor
                    doctorId={doctorId}
                    isShowDescriptionDoctor={false}
                    dataTime={dataTime}
                    isShowLinkDetail={false}
                    isShowPrice={true}
                  />
                </div>
                <div className="row">
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id={"patient.booking-modal.fullName"} />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.fullName}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "fullName")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage
                        id={"patient.booking-modal.phoneNumber"}
                      />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.phoneNumber}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "phoneNumber")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id={"patient.booking-modal.email"} />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.email}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "email")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id={"patient.booking-modal.address"} />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.address}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "address")
                      }
                    />
                  </div>
                  {/* <p>test</p> */}
                  <div className="col-12 form-group">
                    <label>
                      <FormattedMessage id={"patient.booking-modal.reson"} />
                    </label>
                    <input
                      className="form-control"
                      value={this.state.reason}
                      onChange={(event) =>
                        this.handleOnChangeInput(event, "reason")
                      }
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id={"patient.booking-modal.birthday"} />
                    </label>
                    <DatePicker
                      onChange={this.handleOnchangeDatePiker}
                      className="form-control"
                      value={this.state.birthday}
                      maxDate={this.disableDates()}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>
                      <FormattedMessage id={"patient.booking-modal.gender"} />
                    </label>
                    <Select
                      value={this.state.selectedGender}
                      onChange={this.handleChangeSelect}
                      options={this.state.genders}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>Ph????ng th???c thanh to??n</label>
                    <Select
                      value={this.state.options}
                      // onChange={this.handleChangeSelect}
                      options={optionsPayMent}
                    />
                  </div>
                  <div className="col-6 form-group">
                    <label>Ph????ng Th???c Kh??m</label>
                    <Select
                      value={this.state.optionsExamination}
                      onChange={this.handleChangeSelectPhuongThucKham}
                      options={optionsExamination}
                    />
                  </div>
                </div>
              </div>
              <div className="booking-modal-footer">
                <button
                  className="btn btn-warning"
                  onClick={() => this.handleDoctorInfo()}
                >
                  Thanh To??n ??i???n T???
                </button>
                <button
                  className=" btn-booking-confirm"
                  onClick={() => this.handleConfirmBooking()}
                >
                  <FormattedMessage id={"patient.booking-modal.btn-confirm"} />
                </button>
                <button
                  className=" btn-booking-cancel"
                  onClick={closeBookingClose}
                >
                  <FormattedMessage id={"patient.booking-modal.btn-cancel"} />
                </button>
              </div>
            </div>
          </Modal>
        </LoadingOverlay>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
    getRequiredDoctorInfo: () => dispatch(actions.getRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
