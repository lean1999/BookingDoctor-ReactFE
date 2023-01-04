import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageAdmin.scss";
import UserManage from "../UserManage";
import { getAllUsers, getAllTypeUsers, getAllListPatient, GetAllUsersPatient } from '../../../services/userService'
import UserRedux from "./UserRedux";
import ManageDoctor from "./ManageDoctor";
import ManageSchedule from "../Doctor/ManageSchedule";
import ManageClinic from "../Clinic/ManageClinic";
import ManageSpecialty from "../Specialty/ManageSpecialty";
import { FaBeer, FaUserCircle } from "react-icons/fa";
import { BiUser, BiLogOut, BiBookContent, BiBrain } from "react-icons/bi";
import { FcDepartment } from "react-icons/fc";
import * as actions from "../../../store/actions";
import ManagePatient from "../Doctor/ManagePatient";
import ManagePrescription from "../Doctor/ManagePrescription";
import ManageHandBook from "./ManageHandBook";
import ListPatientExam from "./ListPatientExam";
import ListPatienShedule from "./ListPatienShedule";
import { Chart } from "react-google-charts";
import { flatMap } from "lodash";


class ManageAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showHandBook: false,
      showManageDoctorRole: false,
      showManagePatient: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      arrUsers: [],
      arrUsers1: [],
      arrUsers2: [],
      arrUsers3: [],
      arrUsers4: [],
      showDashBoard: false
    };
  }

  async componentDidMount() {
    await this.getAllDoctor();
    await this.getAllUsersPatient();
    await this.getALlPatient();
    await this.getALlPatient1();
    await this.getALlPatient2();
  }

  getALlPatient = async () => {
    let response1 = await GetAllUsersPatient("S3");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers2: response1.dataTypeUser,
      });
    }
  };
  getALlPatient1 = async () => {
    let response1 = await GetAllUsersPatient("S2");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers3: response1.dataTypeUser,
      });
    }
  };
  getALlPatient2 = async () => {
    let response1 = await GetAllUsersPatient("S1");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers4: response1.dataTypeUser,
      });
    }
  };
  getAllUsersPatient = async () => {
    let response1 = await getAllTypeUsers("R3");
    if (response1 && response1.err === 0) {
      this.setState({
        arrUsers1: response1.dataTypeUser,
      });
    }
  };
  getAllDoctor = async () => {
    let response = await getAllTypeUsers("R2");
    if (response && response.err === 0) {
      this.setState({
        arrUsers: response.dataTypeUser,
      });
    }
  };
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handShowCrudUser = () => {
    this.setState({
      showCrudUser: true,
      showCrudReduxUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowCrudUserRedux = () => {
    this.setState({
      showCrudReduxUser: true,
      showCrudUser: false,
      showManageDoctor: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowManageDoctor = () => {
    this.setState({
      showManageDoctor: true,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManagePlanExam: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowPlanExam = () => {
    this.setState({
      showManagePlanExam: true,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageClinic: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowManageClinic = () => {
    this.setState({
      showManageClinic: true,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowSpecialist = () => {
    this.setState({
      showSpeciallist: true,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showManageClinic: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: false,
    });
  };
  handShowHandBook = () => {
    this.setState({
      showManageClinic: false,
      showManagePlanExam: false,
      showManageDoctor: false,
      showCrudUser: false,
      showCrudReduxUser: false,
      showSpeciallist: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
      showHandBook: true,
    });
  };

  handShowManagePatient = () => {
    this.setState({
      showManagePatient: true,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handShowManageDoctorMN = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: true,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handShowManagePresition = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: true,
      showListPatientExamined: false,
      showListPatientScheduled: false,
    });
  };
  handleShowListPatientExamined = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: true,
      showListPatientScheduled: false,
    });
  };
  handleShowListPatientScheduled = () => {
    this.setState({
      showManagePatient: false,
      showManageDoctorRole: false,
      showManagePrescription: false,
      showListPatientExamined: false,
      showListPatientScheduled: true,
    });
  };
  showDashBoard = () => {
    this.setState({
      showDashBoard: true

    })
    alert('ádasd');
  }
  render() {
    let {
      showCrudReduxUser,
      showCrudUser,
      showHandBook,
      showManageClinic,
      showManageDoctor,
      showSpeciallist,
      showManagePlanExam,
      showManageDoctorRole,
      showManagePatient,
      showManagePrescription,
      showListPatientExamined,
      showListPatientScheduled,
      showDashBoard
    } = this.state;
    let arrUsers = this.state.arrUsers;
    let arrUsers1 = this.state.arrUsers1;
    let arrUsers2 = this.state.arrUsers2;
    let arrUsers3 = this.state.arrUsers3;
    let arrUsers4 = this.state.arrUsers4;
    console.log('check state aruser', arrUsers)
    console.log('check state aruser1', arrUsers1.length)
    const { isLoggedIn, userInfo, processLogout } = this.props;
    // console.log('checl', userInfo.roleId)
    let testdate = [];
    console.log('âcscsc', typeof (testdate))
    const iads = arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => [`${item.firstName}`, '10', "#b87333"])
    console.log('check 123123', typeof (iads))
    const datatest = [["Element", "Bác sĩ có lượt khám cao nhất", { role: "style" }], iads[1]]

    console.log('âcscascsa', datatest);
    const data = [

      ["Element", "Số lượng bệnh nhân đã khám của bác sĩ", { role: "style" }],
      // [testdate, 8.94, "#b87333"],
      ['Nguyễn Thúy An', 10, "#b87333"],
      ['Lê Đan Tú', 15, "#b87333"],
      ['Phạm Diệu Linh', 30, "blue"],
      ['Nguyễn Diệp Chi', 12, "#b87333"],
      ['Phùng Mạnh', 13, "#b87333"],
      ['Nguyễn Trọng Tuấn', 14, "#b87333"],
      // [arrUsers && arrUsers.length > 0 && arrUsers.map((item, index) => {
      //   let dat = [];
      //   if (item && item.roleId === 'R2' && index === 0) {
      //     dat = item.lastName + ' ' + item.firstName;
      //   }
      //   console.log('check látname', dat)
      //   return dat
      // }), 8.94, "#b87333"], // RGB value
    ];
    console.log('check đâsd', data)
    return (
      <>
        {isLoggedIn && userInfo.roleId === "R1" ? (
          <>
            <div className="container-manage-admin">
              <div className="manage-admin">
                <div className="content-left-admin">
                  <div className="title-app" onClick={this.showDashBoard}>BOOKING DOCTOR </div>
                  <div className="menu-manage-admin">
                    <div className="mn-user">
                      <BiUser className="icon-user" /> Quản Lý Người Dùng
                      <div className="sub-mn" onClick={this.handShowCrudUser}>
                        CRUD User
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowCrudUserRedux}
                      >
                        CRUD Redux User
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctor}
                      >
                        Quản Lý Bác Sĩ
                      </div>
                      <div className="sub-mn" onClick={this.handShowPlanExam}>
                        Quản Lý Kế Hoạch Khám
                      </div>
                    </div>
                    <div className="mn-clinic">
                      Phòng Khám
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageClinic}
                      >
                        Quản Lý Phòng Khám
                      </div>
                    </div>
                    <div className="mn-specialist">
                      Chuyên Khoa
                      <div className="sub-mn" onClick={this.handShowSpecialist}>
                        Quản Lý Chuyên Khoa
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      Biểu Đồ
                      <div className="sub-mn">Quản Lý Biểu đồ</div>
                    </div>

                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        <BiLogOut /> Thoát
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">Quản trị Admin</div>
                    <div className="info-admin"> Admin</div>
                  </div>
                  <div className="show-content-right-admin">
                    {showCrudUser === true || showCrudReduxUser === true ||
                      showManageDoctor === true || showManagePlanExam === true || showManageClinic === true
                      || showSpeciallist === true || showHandBook === true ?
                      <>

                      </> : <>
                        {showDashBoard = true ? <>
                          <div className="dashboard-admin">
                            <div className="content-dashboard">
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers.length}</span>
                                Tổng số bệnh nhân
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers1.length}</span>
                                Tổng số bác sĩ
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers2.length}</span>
                                Số bệnh nhân đợi khám
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers3.length}</span>
                                Số bệnh nhân đã khám
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers4.length}</span>
                                Số bệnh nhân đặt chưa xác nhận
                              </div>
                            </div>
                            <div className="chart-doctor-number">
                              <Chart chartType="ColumnChart" width="100%" height="600px" data={data} />
                            </div>
                          </div></> : <></>}</>}

                    {showCrudUser === true ? <UserManage /> : <></>}
                    {showCrudReduxUser === true ? <UserRedux /> : <></>}
                    {showManageDoctor === true ? <ManageDoctor /> : <></>}
                    {showManagePlanExam === true ? <ManageSchedule /> : <></>}
                    {showManageClinic === true ? <ManageClinic /> : <></>}
                    {showSpeciallist === true ? <ManageSpecialty /> : <></>}
                    {showHandBook === true ? <ManageHandBook /> : <></>}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>

          </>
        )}
        {isLoggedIn && userInfo.roleId === "R2" ? (
          <>
            <div className="container-manage-admin">
              <div className="manage-admin">
                <div className="content-left-admin">
                  <div className="title-app">BOOKING DOCTOR </div>
                  
                  <div className="menu-manage-admin">
                    
                    <div className="mn-user">
                      Quản Lý Lịch Trình Bác Sĩ
                      <div
                        className="sub-mn"
                        onClick={this.handShowManageDoctorMN}
                      >
                        Quản Lý Kế Hoạch Khám
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePatient}
                      >
                        Quản Lý Bệnh Nhân Khám
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handShowManagePresition}
                      >
                        Quản Lý Đơn Thuốc
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientExamined}
                      >
                        Danh sách bệnh nhân đã khám
                      </div>
                      <div
                        className="sub-mn"
                        onClick={this.handleShowListPatientScheduled}
                      >
                        Danh sách bệnh nhân đã đặt lịch
                      </div>
                    </div>
                    <div
                      className="mn-handlebook"
                      onClick={this.handShowHandBook}
                    >
                      Bệnh Nhân
                    </div>
                    <div className="mn-exit">
                      <a
                        href="/"
                        style={{ textDecoration: "none" }}
                        onClick={processLogout}
                      >
                        Thoát <BiLogOut />
                      </a>
                    </div>
                  </div>
                </div>
                <div className="content-right-admin">
                  <div className="header-content-right-admin">
                    <div className="title-manage-admin">Bác Sĩ Quản Lý</div>
                    <div className="info-admin"> Bác Sĩ</div>
                  </div>
                  <div className="show-content-right-admin">
                  {showManageDoctorRole === true || showManagePatient === true ||
                      showManagePrescription === true || showListPatientExamined === true || showListPatientScheduled === true
                    ?
                      <>

                      </> : <>
                        {showDashBoard = true ? <>
                          <div className="dashboard-admin">
                            <div className="content-dashboard">
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers.length}</span>
                                Tổng số bệnh nhân
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers1.length}</span>
                                Tổng số bác sĩ
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers2.length}</span>
                                Số bệnh nhân đợi khám
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers3.length}</span>
                                Số bệnh nhân đã khám
                              </div>
                              <div className="dashborad-pt">
                                <span className="number-sum">{arrUsers4.length}</span>
                                Số bệnh nhân đặt chưa xác nhận
                              </div>
                            </div>
                            <div className="chart-doctor-number">
                              <Chart chartType="ColumnChart" width="100%" height="600px" data={data} />
                            </div>
                          </div></> : <></>}</>}
                    {showManageDoctorRole === true ? <ManageSchedule /> : <></>}
                    {showManagePatient === true ? <ManagePatient /> : <></>}
                    {showManagePrescription === true ? (
                      <ManagePrescription />
                    ) : (
                      <></>
                    )}
                    {showListPatientExamined === true ? (
                      <ListPatientExam />
                    ) : (
                      <></>
                    )}
                    {showListPatientScheduled === true ? (
                      <ListPatienShedule />
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAdmin);
