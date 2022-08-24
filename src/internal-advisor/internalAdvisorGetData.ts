import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { EvaluationMarks } from 'src/Models/Evaluation/EvaluationMarks.model';
import { Marks } from 'src/Models/Evaluation/Marks.model';
import { AdvisorForm } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { Attendance } from 'src/Models/Student/attendance.model';
import { Form } from 'src/Models/Student/form.model';
import { StudentInterface } from 'src/Models/Student/student.model';
import { External } from 'src/Models/External/Externel.Model';
import { Evaluation } from 'src/Models/Evaluation/Evaluation.Model';
import { FinalEvaluationMarks } from 'src/Models/Evaluation/FinalEvaluationMarks.model';
import { FinalEvaluation } from 'src/Models/Evaluation/FinalEvaluation.model';
@Injectable()
export class InternalAdvisorGetData {
  constructor(
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
    @InjectModel('AdvisorForm') private AdvisorFormModel: Model<AdvisorForm>,
    @InjectModel('UndergradateStudents')
    private StudentModel: Model<StudentInterface>,
    @InjectModel('formdatas') private StudentFormModel: Model<Form>,
    @InjectModel('attendance') private attendanceModel: Model<Attendance>,
    @InjectModel('Marks') private MarksModel: Model<Marks>,
    @InjectModel('EvaluationMarks')
    private EvaluationMarksModel: Model<EvaluationMarks>,
    @InjectModel('FinalEvaluationMarks')
    private FinalEvaluationMarksModel: Model<FinalEvaluationMarks>,
    @InjectModel('External')
    private ExternalModel: Model<External>,
    @InjectModel('Evaluation')
    private EvaluationModel: Model<Evaluation>,
    @InjectModel('FinalEvaluation')
    private FinalEvaluationModel: Model<FinalEvaluation>,
  ) {}

  async getData(students: any[]) {
    try {
      const result = await Promise.all(
        students.map((val) => {
          console.log('===============================v1', val);
          return axios.get(
            `https://student-server-app.herokuapp.com/student/getformdata/${val}`,
          );
        }),
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  // https://student-server-app.herokuapp.com
  async getDataProposal(students: any[]) {
    try {
      console.log(students, '+++++++student');
      const result = await Promise.all(
        students.map((val) => {
          console.log('===============================v1', val);
          return axios.get(
            `https://student-server-app.herokuapp.com/student/getProposalData/${val}`,
          );
        }),
      );
      return result;
    } catch (error) {
      console.log(error.message);
    }
  }
  // async leaderInformation(students: any[]) {
  //   try {
  //     students = ['CT-18021'];
  //     const result = await Promise.all(
  //       students.map((val) => {
  //         return this.StudentModel.findOne(
  //           { id: val },
  //           { s_name: 1, s_email: 1, _id: 0 },
  //         ).select('s_name email');
  //       }),
  //     );
  //     return result;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async getAllocationInformation(id: string) {
    try {
      const user = await this.InternalAdvisorModel.findOne({ id });
      if (!user) return 'Not found with the given id';
      const advisorFormId = user.advisorformid;
      console.log(advisorFormId, 'advisor form id');
      if (advisorFormId == 'NONE') {
        return {
          internalAdvisorInfo: {
            name: user.name,
            email: user.email,
            contact: user.contact,
            designation: user.designation,
          },
          allocationAccepted: [],
          allocationRejected: [],
          allocationPending: [],
          proposalPending: [],
          proposalAccepted: [],
          proposalRejected: [],
        };
      }
      const advisorFormData = await this.AdvisorFormModel.findOne({
        _id: advisorFormId,
      });
      console.log(advisorFormData, 'here its ');
      let allocationAcceptedPlain = [];
      let allocationAccepted = [];
      let allocationRejectedPlain = [];
      let allocationRejected = [];
      let allocationPendingPlain = [];
      let allocationPending = [];

      if (advisorFormData.accepted.length > 0) {
        allocationAcceptedPlain = await this.getData(advisorFormData.accepted);
        console.log(allocationAcceptedPlain);

        allocationAccepted = allocationAcceptedPlain.map((val) => {
          return val.data;
        });
      }
      if (advisorFormData.rejected.length > 0) {
        allocationRejectedPlain = await this.getData(advisorFormData.rejected);
        console.log(allocationRejectedPlain);
        allocationRejected = allocationRejectedPlain.map((val) => {
          return val.data;
        });
      }
      if (advisorFormData.pending.length > 0) {
        allocationPendingPlain = await this.getData(advisorFormData.pending);

        allocationPending = allocationPendingPlain.map((val: any) => {
          return val.data;
        });
      }
      console.log(allocationPendingPlain, 'allocatinPending');

      //  let  filterAccepted = accepted.map((val)=>{
      //      return {
      //          name:val.s_name,
      //          email
      //      }
      //  })
      const internalAdvisorInfo = {
        name: user.name,
        email: user.email,
        contact: user.contact,
        designation: user.designation,
      };
      return {
        internalAdvisorInfo,
        allocationAccepted: allocationAccepted || [],
        allocationRejected: allocationRejected || [],
        allocationPending: allocationPending || [],
      };
    } catch (error) {
      throw new Error(error);
    }
  }
  async getProposalInformation(id: string) {
    try {
      const user = await this.InternalAdvisorModel.findOne({ id });
      if (!user) return 'Not found with the given id';
      const advisorFormId = user.advisorformid;
      console.log(advisorFormId, 'advisor form id');
      if (advisorFormId == 'NONE') {
        return {
          internalAdvisorInfo: {
            name: user.name,
            email: user.email,
            contact: user.contact,
            designation: user.designation,
          },

          proposalPending: [],
          proposalAccepted: [],
          proposalRejected: [],
        };
      }
      const advisorFormData = await this.AdvisorFormModel.findOne({
        _id: advisorFormId,
      });
      console.log(advisorFormData, 'here its ');

      let proposalAcceptedPlain = [];
      let proposalAccepted = [];
      let proposalRejectedPlain = [];
      let proposalRejected = [];
      let proposalPendingPlain = [];
      let proposalPending = [];
      if (advisorFormData.proposalAccepted.length > 0) {
        console.log('not run it>>>>>');
        proposalAcceptedPlain = await this.getDataProposal(
          advisorFormData.proposalAccepted,
        );
        console.log(proposalAcceptedPlain);
        proposalAccepted = proposalAcceptedPlain.map((val) => {
          return val.data;
        });
      }
      if (advisorFormData.proposalRejected.length > 0) {
        console.log('not run it>>>>>');
        proposalRejectedPlain = await this.getDataProposal(
          advisorFormData.proposalRejected,
        );
        console.log(proposalRejectedPlain);
        proposalRejected = proposalRejectedPlain.map((val) => {
          return val.data;
        });
      }
      if (advisorFormData.proposalPending.length > 0) {
        console.log('yes run it>>>>>============================');
        proposalPendingPlain = await this.getDataProposal(
          advisorFormData.proposalPending,
        );
        console.log(proposalPendingPlain, 'PROPOSAL PENDING>>');
        proposalPending = proposalPendingPlain.map((val) => {
          return val.data;
        });
      }

      //  let  filterAccepted = accepted.map((val)=>{
      //      return {
      //          name:val.s_name,
      //          email
      //      }
      //  })
      const internalAdvisorInfo = {
        name: user.name,
        email: user.email,
        contact: user.contact,
        designation: user.designation,
      };
      return {
        internalAdvisorInfo,

        proposalPending: proposalPending || [],
        proposalAccepted: proposalAccepted || [],
        proposalRejected: proposalRejected || [],
      };
    } catch (error) {
      return error;
    }
  }
  async getLeaders(list) {
    try {
      const result = await Promise.all(
        list.map((val) =>
          this.attendanceModel.findOne({ _id: val }, { week: 0, _id: 0 }),
        ),
      );
      return result.map((val) => val.id);
    } catch (error) {
      console.log(error);
    }
  }
  async getAttendanceLeaders(id: string) {
    const { advisorformid } = await this.InternalAdvisorModel.findOne({ id });
    if (!advisorformid) return 'Not found with the given id';
    const { Attendance } = await this.AdvisorFormModel.findOne({
      _id: advisorformid,
    });
    console.log(Attendance, 'Attendance');
    const leadersList = await this.getLeaders(Attendance);
    return leadersList;
  }
  async getProjectListforAdvisor(advisor, Model, mid) {
    try {
      if (mid === 'true') {
        console.log(advisor, 'advisor in');
        let newProjectList = [];
        let projectTitles = await this.EvaluationModel.find(
          {
            $or: [
              { supervisor: advisor.name },
              { external_evaluator: advisor.name },
              { external_evaluator2: advisor.name },
              { external_evaluator3: advisor.name },
            ],
          },
          { _id: 0, project_title: 1, midEvaluation: 1 },
        );
        console.log(projectTitles, 'projectTtles befire');
        projectTitles = projectTitles.map((val) => {
          console.log(val, 'val-------');
          if (val.midEvaluation == Boolean(mid)) {
            return val;
          } else return;
        });
        projectTitles = projectTitles.filter((val) => val !== undefined);
        console.log(projectTitles, 'projectTitles7777------------');
        let projectList = [];

        projectList = advisor.projectList;

        console.log(projectList);
        for (let i = 0; i < projectTitles.length; i++) {
          if (
            projectList.includes(projectTitles[i].project_title) ||
            advisor.respondedList.includes(projectTitles[i].project_title)
          ) {
            console.log('yes it inclued ine ', projectTitles[i].project_title);
          } else {
            newProjectList.push(projectTitles[i].project_title);
          }
        }
        console.log('new project st', newProjectList);
        const updateAdvisor = await Model.findOneAndUpdate(
          { id: advisor.id },
          {
            $set: {
              projectList: [...projectList, ...newProjectList],
            },
          },
        );

        let NewprojectTitles = advisor.projectList;
        console.log(NewprojectTitles, 'newwwwwwwww');
        NewprojectTitles = [...projectList, ...newProjectList].map(
          (str, index) => ({
            s_proj_title: str,
          }),
        );
        console.log(NewprojectTitles, 'newww99999999999999swwwwww');
        return NewprojectTitles;
      } else {
        //----------------------------
        console.log(advisor, 'advisor in enteruing in else stGE');
        let newProjectList = [];
        let projectTitles = await this.FinalEvaluationModel.find(
          {
            $or: [
              { supervisor: advisor.name },
              { external_evaluator: advisor.name },
              { external_evaluator2: advisor.name },
              { external_evaluator3: advisor.name },
            ],
          },
          { _id: 0, project_title: 1, midEvaluation: 1 },
        );
        projectTitles = projectTitles.map((val) => {
          console.log(val, 'val-------');
          if (val.midEvaluation == false) {
            return val;
          } else return;
        });
        projectTitles = projectTitles.filter((val) => val !== undefined);
        console.log(
          projectTitles,
          'projectTitles7777------------',
          Boolean(mid),
          mid,
        );
        console.log(projectTitles, 'projectTitles');
        let projectList = [];

        projectList = advisor.finalprojectList;

        console.log(projectList);
        for (let i = 0; i < projectTitles.length; i++) {
          if (
            projectList.includes(projectTitles[i].project_title) ||
            advisor.finalrespondedList.includes(projectTitles[i].project_title)
          ) {
            console.log('yes it inclued ine ', projectTitles[i].project_title);
          } else {
            newProjectList.push(projectTitles[i].project_title);
          }
        }
        console.log('new project st', newProjectList);
        const updateAdvisor = await Model.findOneAndUpdate(
          { id: advisor.id },
          {
            $set: {
              finalprojectList: [...projectList, ...newProjectList],
            },
          },
        );

        let NewprojectTitles = advisor.finalprojectList;
        NewprojectTitles = [...projectList, ...newProjectList].map(
          (str, index) => ({
            s_proj_title: str,
          }),
        );
        return NewprojectTitles;

        ///-----------------
      }
    } catch (error) {
      return error;
    }
  }
  async getAllProjects(id: number, mid: string) {
    try {
      const advisor = await this.InternalAdvisorModel.findOne({ id });
      // console.log(advisor, 'advisor>>');
      if (!advisor) {
        const data = await this.ExternalModel.findOne({ id });
        if (!data) return [];
        const projectTitles = await this.getProjectListforAdvisor(
          data,
          this.ExternalModel,
          mid,
        );
        return projectTitles;
      }
      const projectTitles = await this.getProjectListforAdvisor(
        advisor,
        this.InternalAdvisorModel,
        mid,
      );
      // const projectTitles = await this.StudentFormModel.find(
      //   {
      //     s_internal: advisor.name,
      //   },
      //   { _id: 0, s_proj_title: 1 },
      // );
      return projectTitles;
    } catch (error) {
      console.log(error);
    }
  }
  async getProgressProjectListforAdvisor(advisor, Model) {
    try {
      // console.log(advisor, 'advisor in');
      if (
        advisor.progressProjectList.length == 0 &&
        advisor.isProgressFirstTime
      ) {
        const projectTitles = await this.StudentFormModel.find(
          { $or: [{ s_internal: advisor.name }] },
          { _id: 0, s_proj_title: 1 },
        );
        console.log(projectTitles, 'projectTitles');
        const updateAdvisor = await Model.findOneAndUpdate(
          { id: advisor.id },
          {
            $set: {
              progressProjectList: projectTitles.map((val) => val.s_proj_title),
              isProgressFirstTime: false,
            },
          },
        );
        return projectTitles;
      } else {
        let projectTitles = advisor.progressProjectList;
        projectTitles = projectTitles.map((str, index) => ({
          s_proj_title: str,
        }));
        return projectTitles;
      }
    } catch (error) {
      return error;
    }
  }
  async getAllProgressProjects(id: string) {
    try {
      const projectTitles = await this.EvaluationModel.find(
        {
          $or: [
            { supervisor: id, isProgressResponded: true },
            { external_evaluator: id, isProgressResponded: true },
          ],
        },
        { _id: 0, project_title: 1 },
      );
      console.log(projectTitles, 'project tiles===');
      // const advisor = await this.InternalAdvisorModel.findOne({ id });
      // console.log(advisor, 'advisor======================');

      // const projectTitles = await this.getProgressProjectListforAdvisor(
      //   advisor,
      //   this.InternalAdvisorModel,
      // );

      return projectTitles;
    } catch (error) {
      console.log(error);
    }
  }
  getWeightedAverage(mark1: number, mark2: number, mark3: number) {
    const multiplyByFactor = (mark, factor) => {
      return mark * factor;
    };
    const resultAverage =
      multiplyByFactor(mark1, 0.5) +
      multiplyByFactor(mark2, 0.5) +
      multiplyByFactor(mark3, 0.5);
    return resultAverage;
  }
  async getProgressMarks(body) {
    try {
      const Marks = await this.MarksModel.findOne({
        std1_rollNo: body.std1_rollNo,
      });
      let data;
      const std1_weighted_average = this.getWeightedAverage(
        body.std1_coherence_with_group,
        body.std1_intellectual_contribution,
        body.std1_response_to_questions,
      );
      const std2_weighted_average = this.getWeightedAverage(
        body.std2_coherence_with_group,
        body.std2_intellectual_contribution,
        body.std2_response_to_questions,
      );
      const std3_weighted_average = this.getWeightedAverage(
        body.std3_coherence_with_group,
        body.std3_intellectual_contribution,
        body.std3_response_to_questions,
      );
      if (body.count === 3) {
        data = {
          std1_coherence_with_group: body.std1_coherence_with_group,
          std1_intellectual_contribution: body.std1_intellectual_contribution,
          std1_name: body.std1_name,
          std1_response_to_questions: body.std1_response_to_questions,
          std1_rollNo: body.std1_rollNo,
          std2_coherence_with_group: body.std2_coherence_with_group,
          std2_intellectual_contribution: body.std2_intellectual_contribution,
          std2_name: body.std2_name,
          std2_response_to_questions: body.std2_response_to_questions,
          std2_rollNo: body.std2_rollNo,
          std3_coherence_with_group: body.std3_coherence_with_group,
          std3_intellectual_contribution: body.std3_intellectual_contribution,
          std3_name: body.std3_name,
          std3_response_to_questions: body.std3_response_to_questions,
          std3_rollNo: body.std3_rollNo,
          supervior_id: body.supervior_id,
          count: parseInt(body.count),
          project_title: body.project_title,
          std1_weighted_average,
          std2_weighted_average,
          std3_weighted_average,
        };
      } else if (body.count === 4) {
        const std4_weighted_average = this.getWeightedAverage(
          body.std4_coherence_with_group,
          body.std4_intellectual_contribution,
          body.std4_response_to_questions,
        );
        data = {
          std1_coherence_with_group: body.std1_coherence_with_group,
          std1_intellectual_contribution: body.std1_intellectual_contribution,
          std1_name: body.std1_name,
          std1_response_to_questions: body.std1_response_to_questions,
          std1_rollNo: body.std1_rollNo,
          std2_coherence_with_group: body.std2_coherence_with_group,
          std2_intellectual_contribution: body.std2_intellectual_contribution,
          std2_name: body.std2_name,
          std2_response_to_questions: body.std2_response_to_questions,
          std2_rollNo: body.std2_rollNo,
          std3_coherence_with_group: body.std3_coherence_with_group,
          std3_intellectual_contribution: body.std3_intellectual_contribution,
          std3_name: body.std3_name,
          std3_response_to_questions: body.std3_response_to_questions,
          std3_rollNo: body.std3_rollNo,
          std4_coherence_with_group: body.std4_coherence_with_group,
          std4_intellectual_contribution: body.std4_intellectual_contribution,
          std4_name: body.std4_name,
          std4_response_to_questions: body.std4_response_to_questions,
          std4_rollNo: body.std4_rollNo,
          supervior_id: body.supervior_id,
          count: parseInt(body.count),
          project_title: body.project_title,
          std1_weighted_average,
          std2_weighted_average,
          std3_weighted_average,
          std4_weighted_average,
        };
      }
      const internal = await this.InternalAdvisorModel.findOne({
        id: body.supervior_id,
      });
      console.log('internale', internal);
      if (internal.progressProjectList.includes(body.project_title)) {
        const updateInternal = await this.InternalAdvisorModel.updateOne(
          { id: body.supervior_id },
          {
            $set: {
              progressProjectList: internal.progressProjectList.filter(
                (val) => val !== body.project_title,
              ),

              progressRespondedList: [
                ...internal.progressRespondedList,
                body.project_title,
              ],
            },
          },
        );
        console.log(updateInternal);
      }
      const form = await this.StudentFormModel.findOne({
        mem1: body.std1_rollNo,
      });
      console.log(form);
      const updateForm = await this.EvaluationModel.updateOne(
        { group_leader: body.std1_rollNo },
        { $set: { isProgressResponded: false } },
      );
      console.log(updateForm, 'updare form');
      const marks = await this.MarksModel.create(data);
      return { message: 'FIRST TIME SUBMisso', marks };
      //  else {
      //   if (body.count === 3) {
      //     data = {
      //       std1_coherence_with_group: [
      //         ...Marks.std1_coherence_with_group,
      //         body.std1_coherence_with_group,
      //       ],
      //       std1_intellectual_contribution: [
      //         ...Marks.std1_intellectual_contribution,
      //         body.std1_intellectual_contribution,
      //       ],
      //       std1_response_to_questions: [
      //         ...Marks.std1_response_to_questions,
      //         body.std1_response_to_questions,
      //       ],

      //       std2_coherence_with_group: [
      //         ...Marks.std2_coherence_with_group,
      //         body.std2_coherence_with_group,
      //       ],
      //       std2_intellectual_contribution: [
      //         ...Marks.std2_intellectual_contribution,
      //         body.std2_intellectual_contribution,
      //       ],

      //       std2_response_to_questions: [
      //         ...Marks.std2_response_to_questions,
      //         body.std2_response_to_questions,
      //       ],

      //       std3_coherence_with_group: [
      //         ...Marks.std3_coherence_with_group,
      //         body.std3_coherence_with_group,
      //       ],
      //       std3_intellectual_contribution: [
      //         ...Marks.std3_intellectual_contribution,
      //         body.std3_intellectual_contribution,
      //       ],

      //       std3_response_to_questions: [
      //         ...Marks.std3_response_to_questions,
      //         body.std3_response_to_questions,
      //       ],
      //     };
      //   } else if (body.count === 4) {
      //     data = {
      //       std1_coherence_with_group: [
      //         ...Marks.std1_coherence_with_group,
      //         body.std1_coherence_with_group,
      //       ],
      //       std1_intellectual_contribution: [
      //         ...Marks.std1_intellectual_contribution,
      //         body.std1_intellectual_contribution,
      //       ],
      //       std1_response_to_questions: [
      //         ...Marks.std1_response_to_questions,
      //         body.std1_response_to_questions,
      //       ],

      //       std2_coherence_with_group: [
      //         ...Marks.std2_coherence_with_group,
      //         body.std2_coherence_with_group,
      //       ],
      //       std2_intellectual_contribution: [
      //         ...Marks.std2_intellectual_contribution,
      //         body.std2_intellectual_contribution,
      //       ],

      //       std2_response_to_questions: [
      //         ...Marks.std2_response_to_questions,
      //         body.std2_response_to_questions,
      //       ],

      //       std3_coherence_with_group: [
      //         ...Marks.std3_coherence_with_group,
      //         body.std3_coherence_with_group,
      //       ],
      //       std3_intellectual_contribution: [
      //         ...Marks.std3_intellectual_contribution,
      //         body.std3_intellectual_contribution,
      //       ],

      //       std3_response_to_questions: [
      //         ...Marks.std3_response_to_questions,
      //         body.std3_response_to_questions,
      //       ],
      //       std4_coherence_with_group: [
      //         ...Marks.std4_coherence_with_group,
      //         body.std4_coherence_with_group,
      //       ],
      //       std4_intellectual_contribution: [
      //         ...Marks.std4_intellectual_contribution,
      //         body.std4_intellectual_contribution,
      //       ],

      //       std4_response_to_questions: [
      //         ...Marks.std4_response_to_questions,
      //         body.std4_response_to_questions,
      //       ],
      //     };
      //   }
      //   const UpdatedMarks = await this.MarksModel.updateOne(
      //     { std1_rollNo: body.std1_rollNo },
      //     {
      //       $set: data,
      //     },
      //   );
      // //   return Marks;
      // }
      // return { status: 'ok', body };
    } catch (error) {
      return error;
    }
  }
  async getAverage(id: string) {
    const Marks = await this.MarksModel.findOne({ project_title: id });
    return Marks;
  }
  getSingleEvaluationAverge(number: number[]) {
    let sum = 0;
    for (let i = 0; i < number.length; i++) {
      sum += number[i];
    }
    return sum / number.length;
  }

  async getEvaluationMarks(body) {
    try {
      const EvaluationMarks = await this.EvaluationMarksModel.findOne({
        std1_rollNo: body.std1_rollNo,
      });

      console.log(EvaluationMarks, 'there is');
      let data;
      if (!EvaluationMarks) {
        console.log('frst time');

        data = {
          std1_rollNo: body.std1_rollNo,
          std1_Literature_Review: [body.std1_Literature_Review],
          std1_Methodology: [body.std1_Methodology],
          std1_Adherence_to_Work_Plan: [body.std1_Adherence_to_Work_Plan],
          std1_Reporting_and_Presentation: [
            body.std1_Reporting_and_Presentation,
          ],
          std2_rollNo: body.std2_rollNo,
          std2_Literature_Review: [body.std2_Literature_Review],
          std2_Methodology: [body.std2_Methodology],
          std2_Adherence_to_Work_Plan: [body.std2_Adherence_to_Work_Plan],
          std2_Reporting_and_Presentation: [
            body.std2_Reporting_and_Presentation,
          ],
          std3_rollNo: body.std3_rollNo,
          std3_Literature_Review: [body.std3_Literature_Review],
          std3_Methodology: [body.std3_Methodology],
          std3_Adherence_to_Work_Plan: [body.std3_Adherence_to_Work_Plan],
          std3_Reporting_and_Presentation: [
            body.std3_Reporting_and_Presentation,
          ],
          count: body.count,
          project_title: body.project_title,
          id: body.id,
          comment: [body.comment],
          isPanelSubmitted: false,
        };
        if (body.count === 4) {
          data = {
            ...data,
            std4_rollNo: body.std4_rollNo,
            std4_Literature_Review: [body.std4_Literature_Review],

            std4_Methodology: [body.std4_Methodology],
            std4_Adherence_to_Work_Plan: [body.std4_Adherence_to_Work_Plan],
            std4_Reporting_and_Presentation: [
              body.std4_Reporting_and_Presentation,
            ],
          };
        }
        const SaveMarks = await this.EvaluationMarksModel.create(data);
        const internalAdvisor = await this.InternalAdvisorModel.findOne({
          id: body.id,
        });
        if (!internalAdvisor) {
          const external = await this.ExternalModel.findOne({ id: body.id });
          const updateExternal = await this.ExternalModel.updateOne(
            { id: body.id },
            {
              $set: {
                projectList: external.projectList.filter(
                  (val) => val !== body.project_title,
                ),

                respondedList: [...external.respondedList, body.project_title],
              },
            },
          );
        } else {
          console.log('internal advisor');
          const internal = await this.InternalAdvisorModel.findOne({
            id: body.id,
          });
          console.log('internale', internal);
          if (internal.projectList.includes(body.project_title)) {
            const updateInternal = await this.InternalAdvisorModel.updateOne(
              { id: body.id },
              {
                $set: {
                  projectList: internal.projectList.filter(
                    (val) => val !== body.project_title,
                  ),

                  respondedList: [
                    ...internal.respondedList,
                    body.project_title,
                  ],
                },
              },
            );
          }
        }
        return { SaveMarks };
      } else {
        console.log('entered here');
        const EvaluationMarks = await this.EvaluationMarksModel.findOne({
          std1_rollNo: body.std1_rollNo,
        });

        console.log(EvaluationMarks, '===============there is');
        data = {
          std1_Literature_Review: [
            ...EvaluationMarks.std1_Literature_Review,
            body.std1_Literature_Review,
          ],
          std1_Methodology: [
            ...EvaluationMarks.std1_Methodology,
            body.std1_Methodology,
          ],
          std1_Adherence_to_Work_Plan: [
            ...EvaluationMarks.std1_Adherence_to_Work_Plan,
            body.std1_Adherence_to_Work_Plan,
          ],
          std1_Reporting_and_Presentation: [
            ...EvaluationMarks.std1_Reporting_and_Presentation,
            body.std1_Reporting_and_Presentation,
          ],

          std2_Literature_Review: [
            ...EvaluationMarks.std2_Literature_Review,
            body.std2_Literature_Review,
          ],
          std2_Methodology: [
            ...EvaluationMarks.std2_Methodology,
            body.std2_Methodology,
          ],
          std2_Adherence_to_Work_Plan: [
            ...EvaluationMarks.std2_Adherence_to_Work_Plan,
            body.std2_Adherence_to_Work_Plan,
          ],
          std2_Reporting_and_Presentation: [
            ...EvaluationMarks.std2_Reporting_and_Presentation,
            body.std2_Reporting_and_Presentation,
          ],

          std3_Literature_Review: [
            ...EvaluationMarks.std3_Literature_Review,
            body.std3_Literature_Review,
          ],
          std3_Methodology: [
            ...EvaluationMarks.std3_Methodology,
            body.std3_Methodology,
          ],
          std3_Adherence_to_Work_Plan: [
            ...EvaluationMarks.std3_Adherence_to_Work_Plan,
            body.std3_Adherence_to_Work_Plan,
          ],
          std3_Reporting_and_Presentation: [
            ...EvaluationMarks.std3_Reporting_and_Presentation,
            body.std3_Reporting_and_Presentation,
          ],
          count: body.count,
          project_title: body.project_title,
          comment: [...EvaluationMarks.comment, body.comment],
        };
        console.log(data, 'he dataaa');
        if (body.count === 4) {
          data = {
            ...data,

            std4_Literature_Review: [
              ...EvaluationMarks.std4_Literature_Review,
              body.std4_Literature_Review,
            ],

            std4_Methodology: [
              ...EvaluationMarks.std4_Methodology,
              body.std4_Methodology,
            ],
            std4_Adherence_to_Work_Plan: [
              ...EvaluationMarks.std4_Adherence_to_Work_Plan,
              body.std4_Adherence_to_Work_Plan,
            ],
            std4_Reporting_and_Presentation: [
              ...EvaluationMarks.std4_Reporting_and_Presentation,
              body.std4_Reporting_and_Presentation,
            ],
          };
        }
        const checkLength = [
          ...EvaluationMarks.std1_Methodology,
          body.std1_Methodology,
        ].length;
        console.log(checkLength, 'check length');
        let evaluatorLength = 3;
        const sheduleEvaluation = await this.EvaluationModel.findOne({
          group_leader: body.std1_rollNo,
        });
        if (sheduleEvaluation.external_evaluator3.length > 0) {
          evaluatorLength = 4;
        }
        if (checkLength === evaluatorLength) {
          console.log(' i shoud not enter here');
          const std1_Literature_Review_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Literature_Review,
          );
          const std1_Methodology_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Methodology,
          );
          const std1_Adherence_to_Work_Plan_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Adherence_to_Work_Plan,
            );
          const std1_Reporting_and_Presentation_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Reporting_and_Presentation,
            );
          const std2_Literature_Review_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std2_Literature_Review,
          );
          const std2_Methodology_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std2_Methodology,
          );
          const std2_Adherence_to_Work_Plan_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std2_Adherence_to_Work_Plan,
            );
          const std2_Reporting_and_Presentation_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std2_Reporting_and_Presentation,
            );
          const std3_Literature_Review_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std3_Literature_Review,
          );
          const std3_Methodology_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std3_Methodology,
          );
          const std3_Adherence_to_Work_Plan_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std3_Adherence_to_Work_Plan,
            );
          const std3_Reporting_and_Presentation_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std3_Reporting_and_Presentation,
            );
          const std1_weighted_average = this.getEvaluationWeightedAverage(
            std1_Literature_Review_average,
            std1_Methodology_average,
            std1_Adherence_to_Work_Plan_average,
            std1_Reporting_and_Presentation_average,
          );
          const std2_weighted_average = this.getEvaluationWeightedAverage(
            std2_Literature_Review_average,
            std2_Methodology_average,
            std2_Adherence_to_Work_Plan_average,

            std2_Reporting_and_Presentation_average,
          );
          const std3_weighted_average = this.getEvaluationWeightedAverage(
            std3_Literature_Review_average,
            std3_Methodology_average,
            std3_Adherence_to_Work_Plan_average,
            std3_Reporting_and_Presentation_average,
          );
          data = {
            ...data,
            std1_Literature_Review_average,
            std1_Methodology_average,
            std1_Adherence_to_Work_Plan_average,
            std1_Reporting_and_Presentation_average,
            std2_Literature_Review_average,
            std2_Methodology_average,
            std2_Adherence_to_Work_Plan_average,
            std2_Reporting_and_Presentation_average,
            std3_Literature_Review_average,
            std3_Methodology_average,
            std3_Adherence_to_Work_Plan_average,
            std3_Reporting_and_Presentation_average,
            std1_weighted_average,
            std2_weighted_average,
            std3_weighted_average,
            isPanelSubmitted: true,
          };
          if (body.count === 4) {
            const std4_Literature_Review_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std4_Literature_Review,
              );
            const std4_Methodology_average = this.getSingleEvaluationAverge(
              EvaluationMarks.std4_Methodology,
            );
            const std4_Adherence_to_Work_Plan_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std4_Adherence_to_Work_Plan,
              );
            const std4_Reporting_and_Presentation_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std4_Reporting_and_Presentation,
              );
            const std4_weighted_average = this.getEvaluationWeightedAverage(
              std4_Literature_Review_average,
              std4_Methodology_average,
              std4_Adherence_to_Work_Plan_average,
              std4_Reporting_and_Presentation_average,
            );
            data = {
              ...data,
              std4_Literature_Review_average,
              std4_Methodology_average,
              std4_Adherence_to_Work_Plan_average,
              std4_Reporting_and_Presentation_average,
              std4_weighted_average,
            };
          }
        }
        console.log('------------------final data', data);
        const updatedEvaluationMarks =
          await this.EvaluationMarksModel.updateOne(
            { std1_rollNo: body.std1_rollNo },
            { $set: data },
          );
        const myEvaluation = await this.EvaluationModel.updateOne(
          {
            group_leader: body.std1_rollNo,
          },
          { $set: { isEvaluationResponded: false } },
        );
        const internalAdvisor = await this.InternalAdvisorModel.findOne({
          id: body.id,
        });
        if (!internalAdvisor) {
          const external = await this.ExternalModel.findOne({ id: body.id });
          const updateExternal = await this.ExternalModel.updateOne(
            { id: body.id },
            {
              $set: {
                projectList: external.projectList.filter(
                  (val) => val !== body.project_title,
                ),

                respondedList: [...external.respondedList, body.project_title],
              },
            },
          );
        } else {
          console.log('internal advisor');
          const internal = await this.InternalAdvisorModel.findOne({
            id: body.id,
          });
          console.log('internale', internal);
          if (internal.projectList.includes(body.project_title)) {
            const updateInternal = await this.InternalAdvisorModel.updateOne(
              { id: body.id },
              {
                $set: {
                  projectList: internal.projectList.filter(
                    (val) => val !== body.project_title,
                  ),

                  respondedList: [
                    ...internal.respondedList,
                    body.project_title,
                  ],
                },
              },
            );
          }
        }
        const SaveMarks = await this.EvaluationMarksModel.findOne({
          std1_rollNo: body.std1_rollNo,
        });
        console.log(updatedEvaluationMarks, 'updatedEvaluationMarks');
        return { SaveMarks };
      }
      return 'all has been achieved successfully';
    } catch (error) {
      return error;
    }
  }
  async getFinalEvaluationMarks(body) {
    try {
      // count: "",
      // supervior_id: "",
      // project_title:"",

      // std1_name: "",
      // std1_rollNo: "",
      // std1_Relevance_Content:"",
      // std1_Organization_and_Delivery:"",
      // std1_Design_or_Layout:"",
      // std1_Time_Management:"",
      // std1_Questions_and_Answers:"",
      // std1_weighted_average: "",

      // std2_name:"",
      // std2_rollNo:"",
      // std2_Relevance_Content:"",
      // std2_Organization_and_Delivery:"",
      // std2_Design_or_Layout:"",
      // std2_Time_Management:"",
      // std2_Questions_and_Answers:"",
      // std2_weighted_average: "",

      // std3_name:"",
      // std3_rollNo:"",
      // std3_Relevance_Content:"",
      // std3_Organization_and_Delivery:"",
      // std3_Design_or_Layout:"",
      // std3_Time_Management:"",
      // std3_Questions_and_Answers:"",
      // std3_weighted_average: "",

      // std4_name:"",
      // std4_rollNo:"",
      // std4_Relevance_Content:"",
      // std4_Organization_and_Delivery:"",
      // std4_Design_or_Layout:"",
      // std4_Time_Management:"",
      // std4_Questions_and_Answers:"",
      // std4_weighted_average: "",
      const EvaluationMarks = await this.FinalEvaluationMarksModel.findOne({
        std1_rollNo: body.std1_rollNo,
      });

      console.log(EvaluationMarks, 'there is');
      let data;
      if (!EvaluationMarks) {
        console.log('frst time', body);

        data = {
          supervior_id: body.supervior_id,
          count: body.count,
          project_title: body.project_title,

          std1_rollNo: body.std1_rollNo,
          std1_name: body.std1_name,
          std1_Relevance_Content: [body.std1_Relevance_Content],
          std1_Organization_and_Delivery: [body.std1_Organization_and_Delivery],
          std1_Design_or_Layout: [body.std1_Design_or_Layout],
          std1_Time_Management: [body.std1_Time_Management],
          std1_Questions_and_Answers: [body.std1_Questions_and_Answers],

          std2_rollNo: body.std1_rollNo,
          std2_name: body.std1_name,
          std2_Relevance_Content: [body.std1_Relevance_Content],
          std2_Organization_and_Delivery: [body.std1_Organization_and_Delivery],
          std2_Design_or_Layout: [body.std1_Design_or_Layout],
          std2_Time_Management: [body.std1_Time_Management],
          std2_Questions_and_Answers: [body.std1_Questions_and_Answers],

          std3_rollNo: body.std1_rollNo,
          std3_name: body.std1_name,
          std3_Relevance_Content: [body.std1_Relevance_Content],
          std3_Organization_and_Delivery: [body.std1_Organization_and_Delivery],
          std3_Design_or_Layout: [body.std1_Design_or_Layout],
          std3_Time_Management: [body.std1_Time_Management],
          std3_Questions_and_Answers: [body.std1_Questions_and_Answers],

          id: body.supervior_id,
          comment: [body.comment],
          isPanelSubmitted: false,
        };
        if (body.count === 4) {
          data = {
            ...data,
            std4_rollNo: body.std1_rollNo,
            std4_name: body.std1_name,
            std4_Relevance_Content: [body.std1_Relevance_Content],
            std4_Organization_and_Delivery: [
              body.std1_Organization_and_Delivery,
            ],
            std4_Design_or_Layout: [body.std1_Design_or_Layout],
            std4_Time_Management: [body.std1_Time_Management],
            std4_Questions_and_Answers: [body.std1_Questions_and_Answers],
          };
        }
        const SaveMarks = await this.FinalEvaluationMarksModel.create(data);
        const internalAdvisor = await this.InternalAdvisorModel.findOne({
          id: body.supervior_id,
        });
        if (!internalAdvisor) {
          const external = await this.ExternalModel.findOne({
            id: body.supervior_id,
          });
          const updateExternal = await this.ExternalModel.updateOne(
            { id: body.supervior_id },
            {
              $set: {
                finalprojectList: external.finalprojectList.filter(
                  (val) => val !== body.project_title,
                ),

                finalrespondedList: [
                  ...external.finalrespondedList,
                  body.project_title,
                ],
              },
            },
          );
        } else {
          console.log('internal advisor');
          const internal = await this.InternalAdvisorModel.findOne({
            id: body.supervior_id,
          });
          console.log('internale', internal);
          if (internal.finalprojectList.includes(body.project_title)) {
            const updateInternal = await this.InternalAdvisorModel.updateOne(
              { id: body.supervior_id },
              {
                $set: {
                  finalprojectList: internal.finalprojectList.filter(
                    (val) => val !== body.project_title,
                  ),

                  finalrespondedList: [
                    ...internal.finalrespondedList,
                    body.project_title,
                  ],
                },
              },
            );
          }
        }
        return { SaveMarks };
      } else {
        console.log('entered here');
        const EvaluationMarks = await this.FinalEvaluationMarksModel.findOne({
          std1_rollNo: body.std1_rollNo,
        });

        console.log(EvaluationMarks, '===============there is');
        data = {
          std1_Relevance_Content: [
            ...EvaluationMarks.std1_Relevance_Content,
            body.std1_Relevance_Content,
          ],
          std1_Organization_and_Delivery: [
            ...EvaluationMarks.std1_Organization_and_Delivery,
            body.std1_Organization_and_Delivery,
          ],
          std1_Design_or_Layout: [
            ...EvaluationMarks.std1_Design_or_Layout,
            body.std1_Design_or_Layout,
          ],
          std1_Time_Management: [
            ...EvaluationMarks.std1_Time_Management,
            body.std1_Time_Management,
          ],
          std1_Questions_and_Answers: [
            ...EvaluationMarks.std1_Questions_and_Answers,
            body.std1_Questions_and_Answers,
          ],

          std2_Relevance_Content: [
            ...EvaluationMarks.std2_Relevance_Content,
            body.std2_Relevance_Content,
          ],
          std2_Organization_and_Delivery: [
            ...EvaluationMarks.std2_Organization_and_Delivery,
            body.std2_Organization_and_Delivery,
          ],
          std2_Design_or_Layout: [
            ...EvaluationMarks.std2_Design_or_Layout,
            body.std2_Design_or_Layout,
          ],
          std2_Time_Management: [
            ...EvaluationMarks.std2_Time_Management,
            body.std2_Time_Management,
          ],
          std2_Questions_and_Answers: [
            ...EvaluationMarks.std2_Questions_and_Answers,
            body.std2_Questions_and_Answers,
          ],

          std3_Relevance_Content: [
            ...EvaluationMarks.std3_Relevance_Content,
            body.std3_Relevance_Content,
          ],
          std3_Organization_and_Delivery: [
            ...EvaluationMarks.std3_Organization_and_Delivery,
            body.std3_Organization_and_Delivery,
          ],
          std3_Design_or_Layout: [
            ...EvaluationMarks.std3_Design_or_Layout,
            body.std3_Design_or_Layout,
          ],
          std3_Time_Management: [
            ...EvaluationMarks.std3_Time_Management,
            body.std3_Time_Management,
          ],
          std3_Questions_and_Answers: [
            ...EvaluationMarks.std3_Questions_and_Answers,
            body.std3_Questions_and_Answers,
          ],

          count: body.count,
          project_title: body.project_title,
          comment: [...EvaluationMarks.comment, body.comment],
        };
        console.log(data, 'he dataaa');
        if (body.count === 4) {
          data = {
            ...data,

            std4_Relevance_Content: [
              ...EvaluationMarks.std4_Relevance_Content,
              body.std4_Relevance_Content,
            ],
            std4_Organization_and_Delivery: [
              ...EvaluationMarks.std4_Organization_and_Delivery,
              body.std4_Organization_and_Delivery,
            ],
            std4_Design_or_Layout: [
              ...EvaluationMarks.std4_Design_or_Layout,
              body.std4_Design_or_Layout,
            ],
            std4_Time_Management: [
              ...EvaluationMarks.std4_Time_Management,
              body.std4_Time_Management,
            ],
            std4_Questions_and_Answers: [
              ...EvaluationMarks.std4_Questions_and_Answers,
              body.std4_Questions_and_Answers,
            ],
          };
        }
        const checkLength = [
          ...EvaluationMarks.std1_Relevance_Content,
          body.std1_Relevance_Content,
        ].length;
        console.log(checkLength, 'check length');
        let evaluatorLength = 3;
        const sheduleEvaluation = await this.FinalEvaluationModel.findOne({
          group_leader: body.std1_rollNo,
        });
        if (sheduleEvaluation.external_evaluator3.length > 0) {
          evaluatorLength = 4;
        }
        if (checkLength === evaluatorLength) {
          console.log(' i shoud not enter here');
          const std1_Relevance_Content_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Relevance_Content,
          );
          const std1_Organization_and_Delivery_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Organization_and_Delivery,
            );
          const std1_Design_or_Layout_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Design_or_Layout,
          );
          const std1_Time_Management_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Time_Management,
          );
          const std1_Questions_and_Answers_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Questions_and_Answers,
            );

          const std2_Relevance_Content_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Relevance_Content,
          );
          const std2_Organization_and_Delivery_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Organization_and_Delivery,
            );
          const std2_Design_or_Layout_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Design_or_Layout,
          );
          const std2_Time_Management_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Time_Management,
          );
          const std2_Questions_and_Answers_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Questions_and_Answers,
            );

          const std3_Relevance_Content_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Relevance_Content,
          );
          const std3_Organization_and_Delivery_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Organization_and_Delivery,
            );
          const std3_Design_or_Layout_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Design_or_Layout,
          );
          const std3_Time_Management_average = this.getSingleEvaluationAverge(
            EvaluationMarks.std1_Time_Management,
          );
          const std3_Questions_and_Answers_average =
            this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Questions_and_Answers,
            );

          const std1_weighted_average = this.getFinalEvaluationWeightedAverage(
            std1_Relevance_Content_average,
            std1_Organization_and_Delivery_average,
            std1_Design_or_Layout_average,
            std1_Time_Management_average,
            std1_Questions_and_Answers_average,
          );
          const std2_weighted_average = this.getFinalEvaluationWeightedAverage(
            std2_Relevance_Content_average,
            std2_Organization_and_Delivery_average,
            std2_Design_or_Layout_average,
            std2_Time_Management_average,
            std2_Questions_and_Answers_average,
          );
          const std3_weighted_average = this.getFinalEvaluationWeightedAverage(
            std3_Relevance_Content_average,
            std3_Organization_and_Delivery_average,
            std3_Design_or_Layout_average,
            std3_Time_Management_average,
            std3_Questions_and_Answers_average,
          );
          data = {
            ...data,
            std1_Relevance_Content_average,
            std1_Organization_and_Delivery_average,
            std1_Design_or_Layout_average,
            std1_Time_Management_average,
            std1_Questions_and_Answers_average,
            std2_Relevance_Content_average,
            std2_Organization_and_Delivery_average,
            std2_Design_or_Layout_average,
            std2_Time_Management_average,
            std2_Questions_and_Answers_average,
            std3_Relevance_Content_average,
            std3_Organization_and_Delivery_average,
            std3_Design_or_Layout_average,
            std3_Time_Management_average,
            std3_Questions_and_Answers_average,
            std1_weighted_average,
            std2_weighted_average,
            std3_weighted_average,
            isPanelSubmitted: true,
          };
          if (body.count === 4) {
            const std4_Relevance_Content_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std1_Relevance_Content,
              );
            const std4_Organization_and_Delivery_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std1_Organization_and_Delivery,
              );
            const std4_Design_or_Layout_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std1_Design_or_Layout,
              );
            const std4_Time_Management_average = this.getSingleEvaluationAverge(
              EvaluationMarks.std1_Time_Management,
            );
            const std4_Questions_and_Answers_average =
              this.getSingleEvaluationAverge(
                EvaluationMarks.std1_Questions_and_Answers,
              );
            const std4_weighted_average =
              this.getFinalEvaluationWeightedAverage(
                std4_Relevance_Content_average,
                std4_Organization_and_Delivery_average,
                std4_Design_or_Layout_average,
                std4_Time_Management_average,
                std4_Questions_and_Answers_average,
              );
            data = {
              ...data,
              std4_Relevance_Content_average,
              std4_Organization_and_Delivery_average,
              std4_Design_or_Layout_average,
              std4_Time_Management_average,
              std4_Questions_and_Answers_average,
              std4_weighted_average,
            };
          }
        }
        console.log('------------------final data', data);
        const updatedEvaluationMarks =
          await this.FinalEvaluationMarksModel.updateOne(
            { std1_rollNo: body.std1_rollNo },
            { $set: data },
          );
        const myEvaluation = await this.EvaluationModel.updateOne(
          {
            group_leader: body.std1_rollNo,
          },
          { $set: { isfinalEvaluationResponded: false } },
        );
        const internalAdvisor = await this.InternalAdvisorModel.findOne({
          id: body.supervior_id,
        });
        if (!internalAdvisor) {
          const external = await this.ExternalModel.findOne({ id: body.id });
          const updateExternal = await this.ExternalModel.updateOne(
            { id: body.supervior_id },
            {
              $set: {
                finalprojectList: external.finalprojectList.filter(
                  (val) => val !== body.project_title,
                ),

                finalrespondedList: [
                  ...external.finalrespondedList,
                  body.project_title,
                ],
              },
            },
          );
        } else {
          console.log('internal advisor');
          const internal = await this.InternalAdvisorModel.findOne({
            id: body.id,
          });
          console.log('internale', internal);
          if (internal.finalprojectList.includes(body.project_title)) {
            const updateInternal = await this.InternalAdvisorModel.updateOne(
              { id: body.supervior_id },
              {
                $set: {
                  finalprojectList: internal.finalprojectList.filter(
                    (val) => val !== body.project_title,
                  ),

                  finalrespondedList: [
                    ...internal.finalrespondedList,
                    body.project_title,
                  ],
                },
              },
            );
          }
        }
        const SaveMarks = await this.FinalEvaluationMarksModel.findOne({
          std1_rollNo: body.std1_rollNo,
        });
        console.log(updatedEvaluationMarks, 'updatedEvaluationMarks');
        return { SaveMarks };
      }
      return 'all has been achieved successfully';
    } catch (error) {
      return error;
    }
  }
  getEvaluationWeightedAverage(
    mark1: number,
    mark2: number,
    mark3: number,
    mark4,
  ) {
    const multiplyByFactor = (mark, factor) => {
      return mark * factor;
    };
    const resultAverage =
      multiplyByFactor(mark1, 0.12) +
      multiplyByFactor(mark2, 0.12) +
      multiplyByFactor(mark3, 0.12) +
      multiplyByFactor(mark4, 0.12);
    return resultAverage;
  }
  getFinalEvaluationWeightedAverage(
    mark1: number,
    mark2: number,
    mark3: number,
    mark4: number,
    mark5: number,
  ) {
    const multiplyByFactor = (mark, factor) => {
      return mark * factor;
    };
    const resultAverage =
      multiplyByFactor(mark1, 0.8) +
      multiplyByFactor(mark2, 0.8) +
      multiplyByFactor(mark3, 0.8) +
      multiplyByFactor(mark4, 0.8) +
      multiplyByFactor(mark5, 0.8);
    return resultAverage;
  }
  async getEvaluationAverage(id: string, mid) {
    try {
      // let collection;
      let Collection = this.EvaluationMarksModel;
      // if (mid !== 'true') {
      //   Collection = this.FinalEvaluationMarksModel;
      // }
      // } else collection = this.FinalEvaluationMarksModel;
      const evaluationMarks = await Collection.findOne(
        {
          std1_rollNo: id,
        },
        {
          std1_Literature_Review: 0,
          std1_Methodology: 0,
          std1_Adherence_to_Work_Plan: 0,
          std1_Reporting_and_Presentation: 0,
          std2_Literature_Review: 0,
          std2_Methodology: 0,
          std2_Adherence_to_Work_Plan: 0,
          std2_Reporting_and_Presentation: 0,
          std3_Literature_Review: 0,
          std3_Methodology: 0,
          std3_Adherence_to_Work_Plan: 0,
          std3_Reporting_and_Presentation: 0,
          std4_Literature_Review: 0,
          std4_Methodology: 0,
          std4_Adherence_to_Work_Plan: 0,
          std4_Reporting_and_Presentation: 0,
        },
      );
      console.log(evaluationMarks, 'evaluuation marks----->>>');
      const {
        std1_Methodology_average,
        std1_Adherence_to_Work_Plan_average,
        std1_Reporting_and_Presentation_average,
        std2_Literature_Review_average,
        std2_Methodology_average,
        std2_Adherence_to_Work_Plan_average,
        std2_Reporting_and_Presentation_average,
        std3_Literature_Review_average,
        std3_Methodology_average,
        std3_Adherence_to_Work_Plan_average,
        std3_Reporting_and_Presentation_average,
        std4_Literature_Review_average,
        std4_Methodology_average,
        std4_Adherence_to_Work_Plan_average,
        std4_Reporting_and_Presentation_average,
        std1_weighted_average,
        std2_weighted_average,
        std3_weighted_average,
        std4_weighted_average,
        std1_rollNo,
        std2_rollNo,
        std3_rollNo,
        std4_rollNo,
        project_title,
        count,
      } = evaluationMarks;
      let evaluatedResult;
      evaluatedResult = {
        std1_Methodology_average,
        std1_Adherence_to_Work_Plan_average,
        std1_Reporting_and_Presentation_average,
        std2_Literature_Review_average,
        std2_Methodology_average,
        std2_Adherence_to_Work_Plan_average,
        std2_Reporting_and_Presentation_average,
        std3_Literature_Review_average,
        std3_Methodology_average,
        std3_Adherence_to_Work_Plan_average,
        std3_Reporting_and_Presentation_average,
        std1_weighted_average,
        std2_weighted_average,
        std3_weighted_average,

        std1_rollNo,
        std2_rollNo,
        std3_rollNo,
        project_title,
        count,
      };
      console.log(evaluatedResult, 'evajfhi8484488448848');
      if (evaluationMarks.std4_weighted_average !== 0) {
        evaluatedResult = {
          ...evaluatedResult,
          std4_Literature_Review_average,
          std4_Methodology_average,
          std4_Adherence_to_Work_Plan_average,
          std4_Reporting_and_Presentation_average,
          std4_weighted_average,
          std4_rollNo,
        };
      }
      return evaluatedResult;
    } catch (error) {
      return error;
    }
  }
}
