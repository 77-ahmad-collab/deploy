import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdvisorForm } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { Attendance } from 'src/Models/Student/attendance.model';
import { Form } from 'src/Models/Student/form.model';
import { Proposal } from 'src/Models/Student/proposal.modal';
import { StudentInterface } from 'src/Models/Student/student.model';

@Injectable()
export class InternalAdvisorService {
  constructor(
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
    @InjectModel('AdvisorForm') private AdvisorFormModel: Model<AdvisorForm>,
    @InjectModel('UndergradateStudents')
    private StudentModel: Model<StudentInterface>,
    @InjectModel('formdatas') private StudentFormModel: Model<Form>,
    @InjectModel('proposals') private ProposalModel: Model<Proposal>,
    @InjectModel('attendance') private attendanceModel: Model<Attendance>,
  ) {}

  async openProposalFormForStudent(count, formdata) {
    try {
      console.log(count, formdata, '>>>>=============');
      if (count == 1) {
        const [member1] = [formdata.mem1];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      } else if (count == 2) {
        const [member1, member2] = [formdata.mem1, formdata.mem2];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      } else if (count == 3) {
        const [member1, member2, member3] = [
          formdata.mem1,
          formdata.mem2,
          formdata.mem3,
        ];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member3 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      } else if (count == 4) {
        const [member1, member2, member3, member4] = [
          formdata.mem1,
          formdata.mem2,
          formdata.mem3,
          formdata.mem4,
        ];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member3 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member4 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      }
    } catch (error) {
      throw new Error('ERROR');
    }
  }
  async ProposalFormForStudent(count, formdata) {
    try {
      console.log(count, formdata, '>>>>=============');
      if (count == 1) {
        const [member1] = [formdata.mem1];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      } else if (count == 2) {
        const [member1, member2] = [formdata.mem1, formdata.mem2];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      } else if (count == 3) {
        const [member1, member2, member3] = [
          formdata.mem1,
          formdata.mem2,
          formdata.mem3,
        ];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member3 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      } else if (count == 4) {
        const [member1, member2, member3, member4] = [
          formdata.mem1,
          formdata.mem2,
          formdata.mem3,
          formdata.mem4,
        ];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member3 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
          this.StudentModel.updateOne(
            { id: member4 },
            { $set: { isPROPOSALSUBMIT: true } },
          ),
        ]);
      }
    } catch (error) {
      throw new Error('ERROR');
    }
  }
  async approveAllocation(id: string, rollno: string, remarks: string) {
    try {
      const internalAdvisor = await this.InternalAdvisorModel.findOne({
        id: id,
      });
      const advisorFormId = internalAdvisor.advisorformid;
      const advisorForm = await this.AdvisorFormModel.findOne({
        _id: advisorFormId,
      });
      let pending = advisorForm.pending;
      let filterPending = pending.filter((val) => val != rollno.toUpperCase());
      console.log(filterPending, '>>-===filter pending', rollno);
      const updateAdvisorFormData = await this.AdvisorFormModel.updateOne(
        { _id: advisorFormId },
        {
          $set: {
            pending: filterPending,
            accepted: [...advisorForm.accepted, rollno.toUpperCase()],
          },
        },
      );
      console.log(updateAdvisorFormData);
      console.log(rollno, 'rollno====================>');
      const student = await this.StudentModel.findOne({
        id: rollno.toUpperCase(),
      });
      // const { formid } = student;/
      console.log('=====================');
      console.log(student, '>>==student');
      console.log('=====================');
      const FORMID = student.formid;
      console.log(FORMID, 'formid');
      const studentForm = await this.StudentFormModel.findOne({ _id: FORMID });
      console.log(studentForm, '>>>===STUDENTfORM');
      const openProposal = await this.openProposalFormForStudent(
        studentForm.mem_count,
        studentForm,
      );

      const updateStudentFormData = await this.StudentFormModel.updateOne(
        { _id: FORMID },
        {
          $set: {
            internalAdvisor_status: 'ACCEPTED',
            // internalAdvisor_remarks: [remarks],
          },
        },
      );
      return { student, rollno };
    } catch (error) {
      throw new Error('please deal with errors');
    }
  }
  async UpdateStudents(count, formdata, proposalid) {
    try {
      console.log(count, formdata, '>>>>=============');
      const deleteProposal = await this.ProposalModel.deleteOne({
        _id: proposalid,
      });
      if (count == 1) {
        const [member1] = [formdata.mem1];

        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
        ]);
      } else if (count == 2) {
        const [member1, member2] = [formdata.mem1, formdata.mem2];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
        ]);
      } else if (count == 3) {
        const [member1, member2, member3] = [
          formdata.mem1,
          formdata.mem2,
          formdata.mem3,
        ];
        console.log(member1, member2, member3, 'han bai');
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                // proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                // proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
          this.StudentModel.updateOne(
            { id: member3 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                // proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
        ]);
        console.log(openProposalForm, 'opdnptopos');
      } else if (count == 4) {
        const [member1, member2, member3, member4] = [
          formdata.mem1,
          formdata.mem2,
          formdata.mem3,
          formdata.mem4,
        ];
        const openProposalForm = await Promise.all([
          this.StudentModel.updateOne(
            { id: member1 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
          this.StudentModel.updateOne(
            { id: member2 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
          this.StudentModel.updateOne(
            { id: member3 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
          this.StudentModel.updateOne(
            { id: member4 },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,
                proposalid: '',
                internal: true,
                groupRequest: '',
              },
            },
          ),
        ]);
      }
    } catch (error) {
      throw new Error('ERROR');
    }
  }
  async reviewAllocation(id: string, rollno: string, remarks: string) {
    try {
      const internalAdvisor = await this.InternalAdvisorModel.findOne({
        id: id,
      });
      const advisorFormId = internalAdvisor.advisorformid;
      const advisorForm = await this.AdvisorFormModel.findOne({
        _id: advisorFormId,
      });
      let pending = advisorForm.pending;
      let filterPending = pending.filter((val) => val != rollno.toUpperCase());
      console.log(filterPending, '>>-===filter pending', rollno);
      const updateAdvisorFormData = await this.AdvisorFormModel.updateOne(
        { _id: advisorFormId },
        {
          $set: {
            pending: filterPending,
            rejected: [...advisorForm.rejected],
          },
        },
      );

      console.log(updateAdvisorFormData, 'update adsoor ');
      // <<<<<yahan tak upar ka shi hahy>>
      const student = await this.StudentModel.findOne({
        id: rollno.toUpperCase(),
      });
      const formid = student.formid;
      let allMembers = [];
      console.log(student, 'the student'); //OK
      console.log(formid, 'teh form i', student.formid);
      const studentForm = await this.StudentFormModel.findOne({
        _id: formid,
      });
      console.log(studentForm, 'student form');
      if (studentForm.mem_count == 1) {
        const { mem1 } = studentForm;
        allMembers = [mem1];
      } else if (studentForm.mem_count == 2) {
        const { mem1, mem2 } = studentForm;
        allMembers = [mem1, mem2];
      } else if (studentForm.mem_count == 3) {
        const { mem1, mem2, mem3 } = studentForm;
        console.log('in mem3 ', [mem1, mem2, mem3]);
        allMembers = [mem1, mem2, mem3];
      } else if (studentForm.mem_count == 4) {
        const { mem1, mem2, mem3, mem4 } = studentForm;
        allMembers = [mem1, mem2, mem3, mem4];
      }
      console.log(allMembers, 'all members');
      const result = await Promise.all(
        allMembers.map((val) => {
          return this.StudentModel.updateOne(
            { id: val },
            {
              $set: {
                isPROPOSALSUBMIT: false,
                isPROPOSAL: false,
                isSUBMIT: false,
                isACCEPTED: false,
                isINVITE: false,

                internal: false,
                groupRequest: '',
                formid: '',
                s_status: '',
              },
            },
          );
        }),
      );
      const deleteForm = await this.StudentFormModel.deleteOne({ _id: formid });
      console.log('all done');
      // <------------------------->
      // const UpdateStudentData = await this.StudentModel.updateOne(
      //   { id: rollno.toUpperCase() },
      //   { $set: { isSUBMIT: false, internal: true, isACCEPTED: false } },
      // );
      // console.log(studentForm, 'studet form');
      //update information of studet on allocation rejection
      // const data = await this.UpdateStudents(
      //   studentForm.mem_count,
      //   studentForm,
      //   student.proposalid,
      // );
      // const updateStudentFormData = await this.StudentFormModel.updateOne(
      //   { _id: formid },
      //   {
      //     $set: {
      //       internalAdvisor_status: 'REJECTED',
      //       // internalAdvisor_remarks: [remarks],
      //     },
      //   },
      // );
      return 'please revie wit';
    } catch (error) {
      throw new Error(error);
    }
  }
  async approveProposal(id: string, rollno: string, remarks: string) {
    try {
      const internalAdvisor = await this.InternalAdvisorModel.findOne({
        id: id,
      });
      const advisorFormId = internalAdvisor.advisorformid;
      const advisorForm = await this.AdvisorFormModel.findOne({
        _id: advisorFormId,
      });
      const UpdateStudentData = await this.StudentModel.updateOne(
        { id: rollno.toUpperCase() },
        { $set: { isPROPOSALSUBMIT: true, isPROPOSAL: true } },
      );
      let proposalPending = advisorForm.proposalPending;
      let filterPending = proposalPending.filter(
        (val) => val != rollno.toUpperCase(),
      );
      console.log(filterPending, '>>-===filter pending', rollno);
      const updateAdvisorFormData = await this.AdvisorFormModel.updateOne(
        { _id: advisorFormId },
        {
          $set: {
            proposalPending: filterPending,
            proposalAccepted: [
              ...advisorForm.proposalAccepted,
              rollno.toUpperCase(),
            ],
          },
        },
      );
      console.log(updateAdvisorFormData);
      console.log(rollno, 'rollno====================>');
      const student = await this.StudentModel.findOne({
        id: rollno.toUpperCase(),
      });
      // const { formid } = student;/
      console.log('=====================');
      console.log(student, '>>==student');
      console.log('=====================');
      const FORMID = student.formid;
      console.log(FORMID, 'formid');
      const studentForm = await this.StudentFormModel.findOne({ _id: FORMID });
      console.log(studentForm, '>>>===STUDENTfORM');
      // const openProposal = await this.ProposalFormForStudent(
      //   studentForm.mem_count,
      //   studentForm,
      // );

      const updateStudentFormData = await this.StudentFormModel.updateOne(
        { _id: FORMID },
        {
          $set: {
            proposal_status: 'ACCEPTED',

            // proposal_remarks: [remarks],
          },
        },
      );
      console.log(updateStudentFormData);
      // yahan par hoga
      // const addtheinfo =  await this.attendanceModel.create({

      // });
      const updateAttendance = await this.attendance(
        rollno.toUpperCase(),
        advisorFormId,
      );
      return { student, rollno };
    } catch (error) {
      throw new Error('please deal with errors');
    }
  }
  async attendance(id: string, FORMID) {
    try {
      const baseWeeks = 30;
      const groupMembers = await this.getAllMembers(id);
      // const singleWeek = groupMembers.map((val) => {
      //   return {};
      // });
      // const weeks = [...Array(baseWeeks).keys()].map((val) => {
      //   return groupMembers;
      // });

      const addtheinfo = await this.attendanceModel.create({
        id,
        // week: weeks,
      });
      const getAdvisorFormData = await this.AdvisorFormModel.findOne({
        _id: FORMID,
      });
      let attendanceList = [];
      console.log(getAdvisorFormData, 'adisor');
      if (getAdvisorFormData.Attendance) {
        attendanceList = getAdvisorFormData.Attendance;
      }

      attendanceList.push(addtheinfo._id);
      const updateAdvisorFormData = await this.AdvisorFormModel.updateOne(
        {
          _id: FORMID,
        },
        { $set: { Attendance: attendanceList } },
      );
      console.log(FORMID, 'FORMID>>>>');
      console.log('================================');
      console.log(updateAdvisorFormData, 'addtheinfo');
      return { groupMembers };
    } catch (error) {
      console.log(error);
    }
  }
  async getAllMembers(id: string) {
    try {
      const student = await this.StudentModel.findOne({ id: id });
      const formid = student.formid;
      const studentForm = await this.StudentFormModel.findOne({ _id: formid });
      const { mem_count } = studentForm;
      if (mem_count == 3) {
        const { mem1, mem2, mem3 } = studentForm;
        return {
          mem1,
          mem1_status: 'NOTMARKED',
          mem2,
          mem2_status: 'NOTMARKED',
          mem3,
          mem3_status: 'NOTMARKED',
        };
      } else if (mem_count == 4) {
        const { mem1, mem2, mem3, mem4 } = studentForm;
        return {
          mem1,
          mem1_status: 'NOTMARKED',
          mem2,
          mem2_status: 'NOTMARKED',
          mem3,
          mem3_status: 'NOTMARKED',
          mem4,
          mem4_status: 'NOTMARKED',
        };
      }
    } catch (error) {
      console.log(error);
    }
  }
  // async updateSingleMember (rollno,list){
  //   try {
  //     return (list[weekno].mem1_status = value);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async updateAttendance(advisorid, mem_count, weekno, body) {
    try {
      console.log(weekno, 'weekno >>===');
      // let rollno = 'CT-18008';
      let rollno = body.mem1;
      weekno = parseInt(weekno) - 1;
      console.log('==========================================================');
      console.log(weekno, 'weekno');
      // console.log(status == 'true');
      // let value = '';
      // if (status == 'true') value = 'PRESENT';
      // else value = 'ABSENT';
      const leader = await this.StudentModel.findOne({ id: rollno });
      const formdata = await this.StudentFormModel.findOne({
        _id: leader.formid,
      });

      const attendanceInfo = await this.attendanceModel.findOne({
        id: leader.groupRequest,
      });

      let list = attendanceInfo.week;
      list.push(body);
      console.log(list, 'list');
      let count = Number(attendanceInfo.count);
      // if(mem_count===3){
      //   if(body.mem1 == list[weekno].mem1){
      //     list[weekno].mem1_status = body.mem1_status;
      //   }
      // }
      // list[weekno].mem1_status = body.mem1_status;

      // list[weekno].mem2_status = body.mem2_status;

      // list[weekno].mem3_status = body.mem3_status;
      // if (body.mem4_status != undefined) {
      //   list[weekno].mem4_status = body.mem4_status;
      // }
      console.log(formdata, '>>>>>>formdata');
      console.log(formdata.mem4 != undefined, 'formdata.mem4');
      // if (formdata.mem4 != undefined) {
      //   console.log('all checks croosees');
      //   list[weekno].mem4_status = value;
      // }

      const updateAttendance = await this.attendanceModel.updateOne(
        { id: leader.groupRequest },
        { $set: { week: list, count: count + 1 } },
      );
      return { list: list[weekno], weekno: weekno + 1 };
    } catch (error) {
      console.log(error);
    }
  }
  async reviewProposal(id: string, rollno: string, remarks: string) {
    try {
      console.log('remarks======================', remarks);
      console.log('=============================================');
      console.table(remarks);
      const internalAdvisor = await this.InternalAdvisorModel.findOne({
        id: id,
      });
      const advisorFormId = internalAdvisor.advisorformid;
      const advisorForm = await this.AdvisorFormModel.findOne({
        _id: advisorFormId,
      });
      let proposalPending = advisorForm.proposalPending;
      let filterPending = proposalPending.filter(
        (val) => val != rollno.toUpperCase(),
      );
      // console.log(filterPending, '>>-===filter pending', rollno);
      const updateAdvisorFormData = await this.AdvisorFormModel.updateOne(
        { _id: advisorFormId },
        {
          $set: {
            proposalPending: filterPending,
            proposalRejected: [
              ...advisorForm.proposalRejected,
              rollno.toUpperCase(),
            ],
          },
        },
      );
      // console.log(updateAdvisorFormData);
      const student = await this.StudentModel.findOne({
        id: rollno.toUpperCase(),
      });
      const UpdateStudentData = await this.StudentModel.updateOne(
        { id: rollno.toUpperCase() },
        { $set: { isPROPOSALSUBMIT: true, isPROPOSAL: false } },
      );
      const formid = student.formid;
      const studentForm = await this.StudentFormModel.findOne({ _id: formid });
      const updateStudentFormData = await this.StudentFormModel.updateOne(
        { _id: formid },
        {
          $set: {
            internalAdvisor_status: 'REJECTED',
            proposal_remarks: [remarks],
          },
        },
      );
      return 'please revie wit';
    } catch (error) {
      return error;
    }
  }
}
