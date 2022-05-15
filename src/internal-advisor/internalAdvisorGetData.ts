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
    @InjectModel('External')
    private ExternalModel: Model<External>,
    @InjectModel('Evaluation')
    private EvaluationModel: Model<Evaluation>,
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
  async getProjectListforAdvisor(advisor, Model) {
    try {
      console.log(advisor, 'advisor in');
      let newProjectList = [];
      const projectTitles = await this.EvaluationModel.find(
        {
          $or: [
            { supervisor: advisor.name },
            { external_evaluator: advisor.name },
          ],
        },
        { _id: 0, project_title: 1 },
      );
      console.log(projectTitles, 'projectTitles');
      let projectList = advisor.projectList;

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
      // if (advisor.projectList.length == 0 && advisor.isFirstTime) {
      //   // const projectTitles = await this.StudentFormModel.find(
      //   //   {
      //   //     $or: [
      //   //       { s_internal: advisor.name },
      //   //       { external_evaluator: advisor.name },
      //   //     ],
      //   //   },
      //   //   { _id: 0, s_proj_title: 1 },
      //   // );
      //   // console.log(projectTitles, 'projectTitles');

      //   return projectTitles;
      // } else {
      let NewprojectTitles = advisor.projectList;
      NewprojectTitles = [...projectList, ...newProjectList].map(
        (str, index) => ({
          s_proj_title: str,
        }),
      );
      return NewprojectTitles;
      // }
      return projectTitles;
    } catch (error) {
      return error;
    }
  }
  async getAllProjects(id: number) {
    try {
      const advisor = await this.InternalAdvisorModel.findOne({ id });
      // console.log(advisor, 'advisor>>');
      if (!advisor) {
        const data = await this.ExternalModel.findOne({ id });
        if (!data) return [];
        const projectTitles = await this.getProjectListforAdvisor(
          data,
          this.ExternalModel,
        );
        return projectTitles;
      }
      const projectTitles = await this.getProjectListforAdvisor(
        advisor,
        this.InternalAdvisorModel,
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
        if (checkLength === 3) {
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
  async getEvaluationAverage(id: string) {
    try {
      const evaluationMarks = await this.EvaluationMarksModel.findOne(
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
      return evaluationMarks;
    } catch (error) {
      return error;
    }
  }
}
