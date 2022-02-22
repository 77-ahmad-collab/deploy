import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdvisorForm } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
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
            rejected: [...advisorForm.rejected, rollno.toUpperCase()],
          },
        },
      );

      console.log(updateAdvisorFormData, 'update adsoor ');
      const student = await this.StudentModel.findOne({
        id: rollno.toUpperCase(),
      });
      console.log(student, 'the student');
      const UpdateStudentData = await this.StudentModel.updateOne(
        { id: rollno.toUpperCase() },
        { $set: { isSUBMIT: false, internal: true, isACCEPTED: false } },
      );
      console.log(UpdateStudentData, 'updateit by me');
      const formid = student.formid;
      const studentForm = await this.StudentFormModel.findOne({ _id: formid });
      console.log(studentForm, 'studet form');
      //update information of studet on allocation rejection
      // const data = await this.UpdateStudents(
      //   studentForm.mem_count,
      //   studentForm,
      //   student.proposalid,
      // );
      const updateStudentFormData = await this.StudentFormModel.updateOne(
        { _id: formid },
        {
          $set: {
            internalAdvisor_status: 'REJECTED',
            // internalAdvisor_remarks: [remarks],
          },
        },
      );
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
      return { student, rollno };
    } catch (error) {
      throw new Error('please deal with errors');
    }
  }
  async reviewProposal(id: string, rollno: string, remarks: string) {
    try {
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
      console.log(filterPending, '>>-===filter pending', rollno);
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
      console.log(updateAdvisorFormData);
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
      throw new Error('please deal with errors');
    }
  }
}
