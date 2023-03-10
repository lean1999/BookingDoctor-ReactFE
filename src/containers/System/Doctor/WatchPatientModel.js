import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import "./WatchPatientModel.scss";
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { toast } from "react-toastify";
import ManagePatient from "./ManagePatient";
import { LANGUAGES, CommonUtils } from "../../../utils";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment";
import { savePatientService } from "../../../services/userService";
class WatchPatientModel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      updatedAt: "",
      date: "",
      lastName: "",
      address: "",
      phoneNumber: "",
      patientReason: "",
      genders: "",
      idPatient: this.props.Idtesst,
      code: "",
    };
  }

  async componentDidMount() {
    if (this.props.dataModel) {
      this.setState({
        // email: this.props.dataModel.patientData.email,
        // date: this.props.dataPatient.updatedAt,
        // phoneNumber: this.props.dataPatient.phoneNumber,
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModel !== this.props.dataModel) {
      this.setState({
        // email: this.props.dataModel.patientData.email,
      });
    }
  }
  handleOnChangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };

  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  onChangeCode = (e) => {
    this.setState({
      code: e.target.value,
    });
  };
  onSaveForm = async () => {
    console.log(this.state);
    let res = await savePatientService({
      id: this.state.idPatient,
      code: this.state.code,
      isUpdateCode: true,
    });
    if (res && res.errCode === 0) {
      toast.success("Save success");
    } else {
      toast.error("Save error");
    }
    this.props.closeRemedyClose();
  };
  render() {
    let { isOpenModal, closeRemedyClose, language, dataPatient, Idtesst } =
      this.props;
    console.log("dataPatient", dataPatient);
    console.log("cgeck prop Idtesst", Idtesst);
    return (
      <>
        <Modal
          isOpen={isOpenModal}
          // toggle={}
          className={"booking-modal-container"}
          size="lg"
          style={{ width: "1500px" }}
          centered
          // backdrop={true}
        >
          <div className="modal-header">
            <h5 className="modal-title"> Form Th??ng tin B???nh Nh??n</h5>
            <button
              className="close"
              type="button"
              aria-label="Close"
              onClick={closeRemedyClose}
            >
              <span aria-hidden="true">x</span>
            </button>
          </div>
          <ModalBody style={{ height: "500px" }}>
            <div className="booking-modal-content">
              <div className="booking-modal-body">
                {/* {JSON.stringify(dataTime)} */}
                {dataPatient &&
                  dataPatient.length > 0 &&
                  dataPatient.map((item, index) => {
                    let data = item.date;
                    data = moment(new Date()).format("dddd - DD/MM");
                    console.log("data Date", Idtesst === item.patientId);
                    return (
                      <>
                        <div className="row" key={index}>
                          {Idtesst === item.patientId ? (
                            <>
                              <div className="col-6 form-group">
                                <label>H??? V?? T??n</label>
                                <input
                                  className="form-control"
                                  value={item.patientData.lastName}
                                  // onChange={(event) =>
                                  //   this.handleOnChangeInput(event, "fullName")
                                  // }
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>SDT</label>
                                <input
                                  className="form-control"
                                  value={item.patientData.phoneNumber}
                                  // onChange={(event) =>
                                  //   this.handleOnChangeInput(event, "phoneNumber")
                                  // }
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>Email</label>
                                <input
                                  className="form-control"
                                  value={item.patientData.email}
                                  // onChange={(event) =>
                                  //   this.handleOnChangeInput(event, "email")
                                  // }
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>?????a Ch???</label>
                                <input
                                  className="form-control"
                                  value={item.patientData.address}
                                  // onChange={(event) =>
                                  //   this.handleOnChangeInput(event, "address")
                                  // }
                                />
                              </div>
                              {/* <p>test</p> */}
                              <div className="col-6 form-group">
                                <label>L?? Do Kh??m B???nh :</label>
                                <input
                                  className="form-control"
                                  value={item.patientData.patientReason}
                                  // onChange={(event) =>
                                  //   this.handleOnChangeInput(event, "reason")
                                  // }
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>Gi???i t??nh</label>
                                <input
                                  // onChange={this.handleOnchangeDatePiker}
                                  className="form-control"
                                  value={item.patientData.genderData.valueVi}
                                  // value={this.state.birthday}
                                  // maxDate={this.disableDates()}
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>Ng??y ?????t</label>
                                <input
                                  className="form-control"
                                  value={data}
                                  // onChange={this.handleChangeSelect}
                                  // options={this.state.genders}
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>Th???i Gian kh??m :</label>
                                <input
                                  className="form-control"
                                  value={item.timeTypeDataPatient.valueEn}
                                  // onChange={this.handleChangeSelect}
                                  // options={this.state.genders}
                                />
                              </div>
                              <div className="col-6 form-group">
                                <label>Ph????ng th???c kh??m</label>

                                <input
                                  className="form-control"
                                  value={item.patientData.firstName}
                                ></input>
                              </div>
                              <div className="col-6 form-group">
                                <label>M?? Ph??ng Kh??m</label>

                                <input
                                  className="form-control"
                                  onChange={(e) => this.onChangeCode(e)}
                                ></input>
                              </div>
                              {/* <div className="col-12 form-group">
                    <label>8</label>
                    <textarea />
                  </div> */}
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </>
                    );
                  })}
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="warning" onClick={() => this.onSaveForm()}>
              Save
            </Button>{" "}
            <Button color="secondary" onClick={closeRemedyClose}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(WatchPatientModel);
