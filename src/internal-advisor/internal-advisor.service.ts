import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AdvisorForm } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { Form } from 'src/Models/Student/form.model';
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
  async approveAllocation(id: string, rollno: string) {
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
          },
        },
      );
      return { student, rollno };
    } catch (error) {
      throw new Error('please deal with errors');
    }
  }
  async reviewAllocation(id: string, rollno: string) {
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
      console.log(updateAdvisorFormData);
      const student = await this.StudentModel.findOne({
        id: rollno.toUpperCase(),
      });
      const UpdateStudentData = await this.StudentModel.updateOne(
        { id: rollno.toUpperCase() },
        { $set: { isSUBMIT: false } },
      );
      const formid = student.formid;
      const studentForm = await this.StudentFormModel.findOne({ _id: formid });
      const updateStudentFormData = await this.StudentFormModel.updateOne(
        { _id: formid },
        {
          $set: {
            internalAdvisor_status: 'REJECTED',
          },
        },
      );
      return 'please revie wit';
    } catch (error) {
      throw new Error('please deal with errors');
    }
  }
}
