import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios from 'axios';
import { Model } from 'mongoose';
import { AdvisorForm } from 'src/Models/INTERNAL_ADVISOR/AdvisorForm.Model';
import { InternalAdvisor } from 'src/Models/INTERNAL_ADVISOR/internalAdvisor.model';
import { Form } from 'src/Models/Student/form.model';
import { StudentInterface } from 'src/Models/Student/student.model';

@Injectable()
export class InternalAdvisorGetData {
  constructor(
    @InjectModel('InternalAdvisor')
    private InternalAdvisorModel: Model<InternalAdvisor>,
    @InjectModel('AdvisorForm') private AdvisorFormModel: Model<AdvisorForm>,
    @InjectModel('UndergradateStudents')
    private StudentModel: Model<StudentInterface>,
    @InjectModel('formdatas') private StudentFormModel: Model<Form>,
  ) {}
  async getData(students: any[]) {
    const result = await Promise.all(
      students.map((val) => {
        return axios.get('http://localhost:9000/student/getformdata/CT-18008');
      }),
    );
    return result;
  }
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
        proposalAcceptedPlain = await this.getData(
          advisorFormData.proposalAccepted,
        );
        console.log(proposalAcceptedPlain);
        proposalAccepted = proposalAcceptedPlain.map((val) => {
          return val.data;
        });
      }
      if (advisorFormData.proposalRejected.length > 0) {
        proposalRejectedPlain = await this.getData(
          advisorFormData.proposalRejected,
        );
        console.log(proposalRejectedPlain);
        proposalRejected = proposalRejectedPlain.map((val) => {
          return val.data;
        });
      }
      if (advisorFormData.proposalPending.length > 0) {
        proposalPendingPlain = await this.getData(
          advisorFormData.proposalPending,
        );
        console.log(proposalPendingPlain);
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
      throw new Error(error);
    }
  }
}
